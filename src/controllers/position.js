// 这里引进来要插入的摸板
const indexTpl=require("./../views/index.html");
let count=1;
let arr=[];

module.exports={
    list(){
            $.ajax({
                url:"/api/index.php?r=index/ajaxnew&page=1",//从网站获取数据
                success(data) {
                    let result=JSON.parse(data);
                    result=result.data.data;
                    arr=result;
                   
                    const rendpositionTpl=template.render(indexTpl,{result});
                    // 进行图片的布局
                    $("#temp").html(rendpositionTpl);
                    // 添加一个区域滚动效果，使得页面在到最底部的时候就会有弹的效果
                    let bscroll=new BScroll("main",{
                        probeType:2,
                        click:true
                    });
                    let foot = $('.foot img'),
                    bottomImgHasClass = foot.hasClass('down')
                    bscroll.on('scroll', function () {
                        let y = this.y
                        let maxY = this.maxScrollY - y
                        console.log(maxY);
                        // 上拉，当滚动到最底部时候触发
                        if ( maxY >=0 ) {
                        !bottomImgHasClass && foot.addClass('down')
                        return
                        }
                    })
                    bscroll.on("scrollEnd",function(){
                        // 下拉加载处理
                        let maxY = this.maxScrollY - this.y
                        if (maxY >= 0) {
                        foot.attr('src', '/images/ajax-loader.gif')
                        // 上拉加载更多
                        $.ajax({
                            url:`/api/index.php?r=index/ajaxnew&page=${++count}&cac_id=cXVlcnlUaGVuRmV0Y2g7NjsxMzY0MDAxMjY6NFIxVmgxc2FTelNmNXN1SjlCVXFrZzsxMzYzODAyMDI6dWlMcXBzX0RSVzZVVm9CYWx5VTlBdzsxMzY0MDAxMjc6NFIxVmgxc2FTelNmNXN1SjlCVXFrZzs2ODUwMjAzMTo2V0thWlU0dVFUSy1ibGJaR255T0dnOzY4NjgxNzk4OjFJSGNjLV9lUTF5bzNTOFRMaEY2QVE7MTM2MzgwMTk0OnVpTHFwc19EUlc2VVZvQmFseVU5QXc7MDs%3D`,//从网站获取数据
                            success(data) {
                                let result=JSON.parse(data);
                               
                                result=result.data.data;
                                
                                result=arr.concat(result);
                                arr=result;
                                console.log(arr);
                                // 在这里进行渲染页面
                                const renderedindexTpl=template.render(indexTpl,{result});
                                // 进行图片的布局
                                $("#temp").html(renderedindexTpl);
                                bscroll.refresh();
                                // 数据加载完成之后要向上滚动多少距离
                                bscroll.scrollTo(0,bscroll.maxScrollY + 1800);
                                foot.removeClass('down');
                                foot.attr('src', './../images/arrow.png')
                            }
                        })
                        }
                       
    
                    })
                    let swiper=new Swiper("#swiper",{
                        // 切换画面做的事情
                        on:{
                            slideChangeTransitionStart:function(){
                                $("nav li").eq(this.activeIndex).addClass("active").siblings().removeClass("active");
                            }
    
                        }
                    })

                }
            })
    },
    SW(){
        // 使用swiper切换画面
        let swiper=new Swiper("#swiper",{
            // on:{
            //     slideChangeTransitionStart:function(){
            //         // $("nav li").eq(this.activeIndex).addClass("active").siblings().removeClass("active");
            //     }

            // }
        })
        var mySwiper = new Swiper('#swiper1',{
            slidesPerView : 4,
            })
        var mySwiper = new Swiper('#swiper2',{
            autoplay:true,
            pagination: {
                el: '.swiper-pagination',
              },
        })
    }
}
