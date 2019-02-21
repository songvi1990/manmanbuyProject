window.onload=function(){
        mui.ajax('http://localhost:9090/api/getcoupon',{
            data:{

            },
            dataType:'json',//服务器返回json格式数据
            type:'get',//HTTP请求类型
            // timeout:10000,//超时时间设置为10秒；
            // imglist:[
            //     'http://image1.quanmama.com/AdminImageUpload/5639468kfc.png',
            //     'http://image1.quanmama.com/AdminImageUpload/4331946bsk.png',
            //     'http://image1.quanmama.com/ImageUpload/2013310205511184.jpg',
            //     'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=58cb4db5780e0cf3b4fa46a96b2f997a/9358d109b3de9c8219c119286681800a18d843f5.jpg'
            // ],
            success:function(data){
                data.result[0].couponImg='http://image1.quanmama.com/AdminImageUpload/5639468kfc.png';
                data.result[1].couponImg= 'http://image1.quanmama.com/AdminImageUpload/4331946bsk.png';
                data.result[2].couponImg= 'http://image1.quanmama.com/ImageUpload/2013310205511184.jpg';
                data.result[3].couponImg='https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=58cb4db5780e0cf3b4fa46a96b2f997a/9358d109b3de9c8219c119286681800a18d843f5.jpg';
                console.log(data.result);
                var html='';
                for (var  i = 0; i <data.result.length ; i++) {
                    console.log(data.result[i]);
                    html+=`<li>
                                <a href="couponproduct.html?couponid=${data.result[i].couponId}">
                                    <img src=${data.result[i].couponImg} alt="">
                                    <span>${data.result[i].couponTitle}</span>
                                </a>
                            </li>`
                }
                $('.swyh_main_li').html(html);
            },
            error:function(xhr,type,errorThrown){
                console.log(2222);
            }
        });

}