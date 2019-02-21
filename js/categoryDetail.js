$(function () {
    
    //区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    
    var id = queryId('categoryId');
    console.log(id);
    
    $.ajax({
        
        url:'http://localhost:9090/api/getcategorybyid',
        data:{categoryid:id},
        success:function(obj){
            console.log(obj);
            var html = template('navTpl',obj);
                $('.nav-left').html(html);
        }
    })
    var page=1;
    
    var totalPage;
    render();
    function render(){
        $.ajax({
            url:"http://localhost:9090/api/getproductlist",
            data:{
                categoryid: id,
                pageid: page
            },
            success:function(obj){
               console.log(obj);
               var html = template('productTpl',obj);
               $('#detail').html(html);    
               totalPage = Math.ceil(obj.totalCount/obj.pagesize);
               var optionList ="";
               for(let i=1;i<=totalPage;i++){
                   var option = "<option class='option' style='width:10px'  value="+i+">"+
                   "<span class='spanFirst'>"+i+"</span> / <span>"+totalPage+"</span>"+
                   " </option>";
                   optionList += option;
               }
               $('.selectList').html(optionList);
               $('.option').eq(page - 1).attr('selected',true);
               mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,10);
            }
        })
    }
    $('.selectList').on('change',function(){
        page = $(this).val();
        console.log(page);
        render();
    })
    $('.nextPage').on('tap',function(e){
        e.preventDefault();
        console.log(page);
        page++;
        if (page <= totalPage) {
            render();
        } else {
            page = 1;
            render();
            location.reload();
        }
    })

    $('.lastPage').on('tap',function(e){
        e.preventDefault();
        page--;
        if (page > 0) {
            render();
        } else {
            page = totalPage;
            render();
            
        }
    })

    $('.back').on('tap',function (e) {
        e.preventDefault();
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);
    })
    
    

    



    function queryId (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var URL = decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if (r != null) {
            //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
            return decodeURI(r[2]);
        };
        return null;
    }
})