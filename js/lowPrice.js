$(function () {
    // 导航栏区域滚动初始化
    mui('.nav .mui-scroll-wrapper').scroll({
        scrollX: true, //是否横向滚动
        bounce: true, //是否启用回弹
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //主体部分区域滚动初始化
    mui('#main .mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 进度条
    mui(".demo1").progressbar({progress:40}).show();
    // 导航栏的渲染
    $.ajax({
        url:'http://localhost:9090/api/getbaicaijiatitle',
        success:function (data) {
            // console.log(data);
            var html = template('navTpi',data);
            // console.log(html);
            $('.nav .mui-scroll').html(html);
        }
    });

    
    // 商品列表的渲染
    queryshops(0);
    $('.nav .mui-scroll').on('tap','.nav-id',function () {
        var id = $(this).data('titleid');
        // console.log(id);
        $(this).addClass('active').siblings().removeClass('active');
        queryshops(id)
    })
    function queryshops(id) {
        $.ajax({
            url:'http://localhost:9090/api/getbaicaijiaproduct',
            data:{titleid:id},
            success:function (data) {
                console.log(data);
                var html = template('shopsTpi',data);
                // console.log(html);
                $('.shops').html(html);
            }
        })
    }
    // 返回顶部
    $('.top_back').on('tap',function (e) {
        
        e.preventDefault();
        mui('#list').scroll().scrollTo(0,0,1000);
        
    })
})