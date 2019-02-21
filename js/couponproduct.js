window.onload = function () {
    var list = [];
    getQueryString("couponid");

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        location.href = 'coupon.html';
    }

    var couponid = getQueryString("couponid");
    console.log(couponid);

    mui.ajax("http://localhost:9090/api/getcouponproduct?couponid=" + couponid, {
        data: {},
        dataType: 'json', //服务器返回json格式数据
        type: 'get', //HTTP请求类型
        success: function (data) {
            // console.log(data.result);
            var html = '';
            for (let i = 0; i < data.result.length; i++) {
                // console.log(data.result[i].couponProductId);
                html += `<div class="swyhq_main_list">
							<div class="left">
								<div class="top">
									<a class="left picList" data-id=${data.result[i].couponProductId}>
										${data.result[i].couponProductImg}
									</a>
									<a href="#" class="right">
										${data.result[i].couponProductName}
										<p>${data.result[i].couponProductPrice}</p>
									</a>
								</div>
								<div class="bottom">
									<p>${data.result[i].couponProductTime}</p>
								</div>
							</div>
							<div class="right">
								<a href="#"><i class="mui-icon mui-icon-arrowright"></i></a>
							</div>
						</div>`
                $('#swyhq_main').html(html);

                var pcname = data.result[i].couponProductName;
                var pcsrc = $(data.result[i].couponProductImg).attr('src');
                var obj = {
                    "alt": pcname ? pcname : '没名字',
                    "pid": data.result[i].couponProductId, //图片id
                    "src": pcsrc, //原图地址
                    "thumb": pcsrc //缩略图地址
                };
                list.push(obj)
            }
        },
        error: function (xhr, type, errorThrown) {
            s
        }

    });
    var list = $('.picList');
    $('#swyhq_main').on('click', ' .picList', function () {
        var index = $(".picList").index(this);
        console.log(index);
        layer.photos({
            photos: {
                "title": "", //相册标题
                "id": 123, //相册id
                "start": index, //初始显示的图片序号，默认0
                "data": list
            },
            anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        });
    })


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
    mui(".demo1").progressbar({progress: 40}).show();
    // 导航栏的渲染
    $.ajax({
        url: 'http://localhost:9090/api/getbaicaijiatitle',
        success: function (data) {
            // console.log(data);
            var html = template('navTpi', data);
            // console.log(html);
            $('.nav .mui-scroll').html(html);
        }
    });

    // 返回顶部
    $('.top_back').on('tap', function (e) {

        e.preventDefault();
        mui('#list').scroll().scrollTo(0, 0, 1000);

    })
}
