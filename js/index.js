$(function () {
    // window.addEventListener('load',function(){
    // 1,初始化轮播图 插件
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
    });

    // 2,首页导航栏的api请求
    $.ajax({
        url: 'http://localhost:9090/api/getindexmenu',
        dataType: 'json',
        success: function (data) {
            // console.dir(data);
            // 调用导航栏的模板
            var html = template('navTpl', {
                data: data.result
            });
            // 将生成的导航栏内容添加到nav-box中
            $('.nav-box').html(html);
            // 给动态生成的导航栏逐一添加不同的跳转页面
            
        }
    })
    // 3,点击更多按钮 将第三行的导航栏显示出来
    // 动态生成 事件委托
    $('.nav-box').on('tap', '.btn-more a', function () {
        $('#gf-nav').toggleClass('navShow');
    })

    // 3,折扣列表
    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrl',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            // discountListTpl
            // 调用导航栏的模板
            var html = template('discountListTpl', {
                data: data.result
            });
            // 将生成的导航栏内容添加到nav-box中
            $('.content-box').html(html);
            // 给动态生成的img标签添加一系列插件类名
            $('.product-line img').attr('class', 'mui-media-object mui-pull-left product-img');
        }
    })

    // 4,小火箭
    // 1,隐藏 与页面顶部的距离超过轮播图 就会显示 (页面变化就要获取高度)

    // 获取轮播图的高度
    var gfSlide = document.querySelector('#gf-slide');
    var gfSlideHeight = gfSlide.offsetHeight;
    console.log(gfSlideHeight);

    window.onscroll = function () {
        if ($(window).scrollTop() > gfSlideHeight) {
            $('#rocket').fadeIn(1000);
        } else {
            $('#rocket').fadeOut(1000);
        }
    }

    // 2,点击小火箭 滑动回到页面顶部
    $('#rocket').on('tap', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
    })
    $('#toTop').on('tap', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
    })

    // 5,悬浮窗
    // 点击事件
 $('#dots').on('tap', function () {
        // alert('悬浮窗变大!');
        // $('#dot').animate({width:'80px',height:'80px'},200);
        //  $('.dot-bg').toggleClass('dotBig');
        if($('.dot-icon').css("display") == "none"){
            $('.dot-bg').addClass('dotBig');
            setTimeout(function(){
                $('.link').toggleClass('xuanzhuan');
                $('.dot-icon').show();

            },500)
        }else{
            $('.dot-bg').removeClass('dotBig');
            $('.link').toggleClass('xuanzhuan');
            $('.dot-icon').hide();
        }
    })
    // 悬浮窗的a标签跳转事件 事件委托
    $('#dots').on('tap','a', function () {
        var aAddr = $(this).attr('href');
        // console.log(aAddr);
        location= aAddr;
    });

//    悬浮窗的拖拽 移动事件
var startX,startY,moveX,moveY,shortX,shortY,distanceX,distanceY;
    // touchstart事件
    $('#dots')[0].addEventListener('touchstart', function (e) {
        //阻止触摸时页面的缩放
        e.preventDefault(); 
        // 获取手指位置
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
        // 获取手指相对于圆点的距离
        shortX = startX - this.offsetLeft;
        shortY = startY - this.offsetTop;
        // console.log(shortX);
        // console.log(shortY);
    })
    // touchmove事件
    $('#dots')[0].addEventListener('touchmove',function (e) { 
        // 不断获取移动位置
        moveX = e.targetTouches[0].clientX;
        moveY = e.targetTouches[0].clientY;
        // 计算偏移
        distanceX = moveX - shortX;
        distanceY = moveY - shortY;
        // 获取可以移动的最大距离
        moveBigX = document.documentElement.clientWidth - this.offsetWidth || document.body.clientWidth -this.offsetWidth;
        moveBigY = document.documentElement.clientHeight - this.offsetHeight || document.body.clientHeight -this.offsetHeight;
        // console.log(moveBigX);
        // console.log(moveBigY);
        // 限制移动距离
        if(distanceX < 0){
            distanceX = 0;
        } else if (distanceX > moveBigX){
            distanceX = moveBigX;
        }
        if(distanceY < 0){
            distanceY = 0;
        } else if (distanceY > moveBigY){
            distanceY = moveBigY;
        }
        // 开始偏移
        this.style.left = distanceX + 'px';
        this.style.top = distanceY + 'px';
     })
    //  touchend事件
    $('#dots')[0].addEventListener('touchend',function(e){
        e.preventDefault(); 
    })
})