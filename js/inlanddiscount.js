$(function(){
    $.ajax({
        url: 'http://localhost:9090/api/getinlanddiscount',
        
        success:function(data){
            console.log(data);
            var html = template('productDiscountTpl',data);
            $('.product-list .mui-row').html(html);
        }
    })
    $('.product-list').on('tap','.productbyid',function(){
        var id = $(this).data('id');
        // console.log(id);
        location = './getdiscountproduct1.html?productId='+id;
        
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


})