$(function(){
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0001, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        bounce: false //是否启用回弹  
    });

     //初始化商品导航
    $.ajax({
        url:"http://localhost:9090/api/getsitenav",
        success:function(data){
            var html = template("brandListTpl",data);
            $("#xy-main ul").html(html);
        }
    });

    //返回顶部
    $('.return').on('tap', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });
});
