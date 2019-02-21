// $(function(){


    var page;
    var flag = true;
    getData(0);
    function getData(pageID){
        page = pageID;
        // console.log(page);
    
        if (page == 0) {
            $('#previous').addClass("disabled");
        } else {
            $('#previous').removeClass("disabled");
        }
        if (page == 14) {
            $('#below').addClass("disabled");
        } else {
            $('#below').removeClass("disabled");
        } 


        $.ajax({
            url:'http://localhost:9090/api/getmoneyctrl',
            data: {pageid: pageID},
            success: function(res){
                console.log(res);
                var html = template('productTpl',res);
                $('.product-list').html(html);
                
                var allPage = Math.ceil(res.totalCount / res.pagesize);
                // console.log(page);
                if (flag == true) {
                    newOpt(allPage);
                    flag = false;
                }
                $('#selectAge').val(page + 1);
            }
            
        })
    }


    function newOpt(allPage) {
        for (var i = 0; i < allPage; i++) {
            var opt = document.createElement('option');
            opt.value = i + 1;
            opt.innerHTML = opt.value + '/' + allPage;
            $('#selectAge').append(opt);
        }
    }
    
    $('#selectAge').change(function (e) {
    
        e.preventDefault();
    
        getData(parseInt(this.value) - 1)
    });


    $('.product-list').on('tap','.product-info',function(){
        var id = $(this).data('id');
        console.log(id);
        location = './moneycategory1.html?productId='+id;
        
    })
    
    


    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
        bounce: true //是否启用回弹
    });

    // 点击回到顶部
    $('#footer').on('tap',function(){
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
    })
// })