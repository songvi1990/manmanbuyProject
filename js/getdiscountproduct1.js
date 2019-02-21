$(function () {
    // 取出id
    var id = getQueryString('productId');
    console.log(id);

    // 渲染详细信息
    $.ajax({
        url: 'http://localhost:9090/api/getdiscountproduct',
        data:{
            productid:id
        },
        success:function(data){
            console.log(data);
            var html = template('discountProductTpl',data);
            $('.product-info').html(html);
        }
    })

    // 渲染评论
    $.ajax({
        url: 'http://localhost:9090/api/getdiscountproduct',
        data:{
            productid:id
        },
        success:function(data){
            console.log(data);
            var html = template('productCommentTpl',data);
            $('.CommentContent').html(html);
        }
    })
   
    // 初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
        bounce: true //是否启用回弹
    });
    
    // 点击回到顶部
    $('#footer').on('tap',function(){
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
    })


    // 获取location传过来的id值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }
})