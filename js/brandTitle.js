$(function(){
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0001, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        bounce: false //是否启用回弹  
    });

    //初始化品牌大全标题
    $.ajax({
        url:"http://localhost:9090/api/getbrandtitle",
        success:function(data){
            console.log(data);
            var html = template("brandListTpl",data);
            $(".xy-con-list ul").html(html);
        }
    });

    //点击品牌标题跳转品牌详情
    $(".xy-con-list").on("tap","li",function(){
          var brandTitleId = $(this).data("id");
          var brandTitle = $(this).data("title");
          
          location.href = "brandDetail.html?id="+brandTitleId + "&brandTitle="+brandTitle;
    });

    //跳转主页面
    $(".top").on("tap",function(){
        location = "../index.html";
    });


    //返回顶部
    $('.return').on('tap', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });

    
});