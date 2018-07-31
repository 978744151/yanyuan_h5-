<template>
    <div class="yuanbi">
        <!-- <div class="zfbrun_header">
                <img src="../assets/btn_back_icon.png" alt="" @click = "$router.go(-1)">
                <span style="font-size:1.125rem;">缘豆流水</span>
            </div> -->
        <div class="iosrun_content">
            <div class="category">
                <!-- <span  :class="{'on' :color === '1'}" @click="changecolor('1')">全部</span> -->
                <span :class="{'on' :color === '1'}" @click="changeliaotian('1')">聊天</span>
                <span :class="{'on' :color === '2'}" @click="changebuy('2')">购买</span>
                <span :class="{'on' :color === '3'}" @click="changetixian('3')">提现</span>
            </div>
            <div id="mescroll" class="mescroll">
                <div v-if="yuandoulist.length == 0">
                    <p style="padding:10px 0px 0px 10px;font-size:14px;">没有记录</p>
                </div>
                <div style="background:white;" v-else>
                    <div class="zfbrun_list liaotian" v-show=" color === color" v-for="(items,index) in yuandoulist" :key="index">
                        <div class="zfbrun_box">
                            <div>
                                <p style="color: #333333">{{items.nickname}}</p>
                                <p style="color: #666666">{{items.createtime.substr(0,19)}}</p>
                            </div>
                             <div class="zfbrun_box_right" v-if="color == 1">
                                <p>+{{items.expensenum}}</p>
                                <p v-if="items.TYPE == 3">语音聊天</p>
                                <p v-if="items.TYPE == 4">视频聊天</p>
                                <p ></p>
                                <p></p>
                            </div>
                            <div class="zfbrun_box_right" v-else-if="color == 2">
                                <p>+{{items.expensenum}}</p>

                                <p v-if="items.TYPE == 1">购买专辑</p>
                                <p v-if="items.TYPE == 2">购买视频</p>
                                <p ></p>
                                <p></p>
                            </div>
                             <div class="zfbrun_box_right" v-else>
                                <p>-{{items.expensenum}}</p>

                                <p v-if="items.TYPE == 1">支付宝</p>
                                <p v-if="items.TYPE == 2">微信</p>
                                <p v-if="items.TYPE == 3">苹果支付</p>
                                <p ></p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant';
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);
import MeScroll from 'mescroll.js/mescroll.min'
import 'mescroll.js/mescroll.min.css'
import axios from "axios"
import Qs from 'qs'
Vue.use(Icon);
export default {
    data() {
        return {
            color: '1',
            num: '1',
            yuandoulist: [],
            allyuandou: [],
            rownumber: 0,
            mescroll: null,
            access_code:'',
            userid: '',
            appVersion:''
        }
    },
    methods: {
        changeliaotian(type) {
            this.color = type
             this.mescroll.resetUpScroll()
        //    this.getListDataFromNet(this.color,0,10,'','')
        },
        changebuy(type) {
            this.color = type
             this.mescroll.resetUpScroll()
            // this.getListDataFromNet(this.color,0,10,'','')
        },
        changetixian(type) {
            this.color = type
            this.mescroll.resetUpScroll()
            // this.getListDataFromNet(this.color,0,10,'','')
        },
        upCallback: function(page) {
            //联网加载数据
            var self = this;
            this.getListDataFromNet(this.color,page.num - 1, page.size, function(curPageData, data) {
                // curPageData = []; //打开本行注释,可演示列表无任何数据empty的配置
                //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
                // if(page.num == 1) self.pdlist = [];
                if (data.length == 0) {
                    self.mescroll.endSuccess(curPageData.length, false)
                } else if(data.length > 0) {
                    self.mescroll.endSuccess(curPageData.length)
                } else{
                    self.mescroll.endErr();
                }
                // })

                // //更新列表数据
                // self.pdlist = self.pdlist.concat(curPageData);

                //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
                // console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.pdlist.length==" + self.pdlist.length);

                //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                // self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

                //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                //self.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

                //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                //self.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

                //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.

            }, function() {
                //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                self.mescroll.endErr();
            });
        },
        // 函数可以调用
        getListDataFromNet(color,pageNum, pageSize, successCallback, errorCallback) {
            //延时一秒,模拟联网
            // console.log(this.color)
            // console.log(pageNum)
            let data = {
                userid: this.userid,
                type: this.color,
                access_code: this.access_code,
                rownumber: pageNum * 10,
                appVersion:this.appVersion
            }
            // console.log(data)
            // 
            // yue.wojianwang.com
            axios.get('http://yue.wojianwang.com/api/api-bin/ywms/data/selectEarningRecord.action', { params: data }).then(res => {
                console.log(res.data)
                if(res.data.success == 1){
                    if (pageNum == 0) {
                        this.yuandoulist = res.data.result
                    } else {
                        this.yuandoulist = this.yuandoulist.concat(res.data.result)
                    }
                    console.log(this.yuandoulist.length)
                    successCallback && successCallback(this.yuandoulist, res.data.result);
                }else{
                    Toast({
                    message: res.data.errmsg,
                    position: 'bottom',
                    duration: 2000
                });
                }
                
            }).catch(error => {
                Toast({
                    message: '请求出错',
                    position: 'bottom',
                    duration: 2000
                });
            })

        },
    },
    mounted() {
        this.access_code = this.$route.query.access_code
        this.userid = this.$route.query.userid
        this.appVersion = this.$route.query.appVersion
        let $this = this;
        $this.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
            up: {
                callback: $this.upCallback, //上拉回调
                //以下参数可删除,不配置
                isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                //page:{size:8}, //可配置每页8条数据,默认10
                toTop: { //配置回到顶部按钮
                    src: require("../assets/mescroll-totop.png"), //默认滚动到1000px显示,可配置offset修改
                    //html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
                    //offset : 1000
                },
                offset: 100,
                empty: { //配置列表无任何数据的提示
                    icon: require("../assets/mescroll-empty.png"),
                    						  	tip : "亲,暂无相关数据哦~" , 
                    //						  	btntext : "去逛逛 >" , 
                    //						  	btnClick : function() {
                    //						  		alert("点击了去逛逛按钮");
                    //						  	} 
                },
                // clearEmptyId:null,
                htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>', //上拉加载中的布局
                htmlNodata: '<p class="upwarp-nodata">-- END --</p>', //无数据的布局
                loadFull: {
                    use: false, //列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size避免这个情况
                    delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
                },
                //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
                //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
                //						clearId: "dataList",
                //						clearEmptyId: "dataList"
            }
        });
    }
}
</script>

<style lang="less">

.yuanbi{
    height: 100%;
    overflow: hidden;
}
.zfbrun_header {
    width: 100%;
    height: 44px;
    background: -webkit-linear-gradient(left, #7a55f3, #2ee2df);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #7a55f3, #2ee2df);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #7a55f3, #2ee2df);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #7a55f3, #2ee2df);
    color: #FFFFFF;
    line-height: 44px;
    text-align: center;
    img {
        width: .625rem;
        height: 18px;
        position: absolute;
        left: .9375rem;
        top: 13px;
    }
    .zfbrun_header_span {
        position: absolute;
        right: .9375rem;
    }
}

.iosrun_content {
    .mescroll-upwarp{
        padding: 0px 0px 30px 0px;;
    }
    padding-top: 40px;
    height: 100%;
    .category {
        width: 100%;
        display: flex;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e5e5e5;
        position: fixed;
        top: 0px;
        z-index: 999;
        background-color: #FAFAFA;
        span {
            width: 33.33%;
            display: inline-block;
            text-align: center;
            font-size: 16px;
            color: #666666;
        }
        .on {
            border-bottom:3px solid #4038A5;
            color: #4038A5;
        }
    }
    .zfbrun_list {

        .zfbrun_box {
            padding: 5px 15px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f5f5f5;
            height: 50px;
            p {
                font-size: 14px;
                margin-top: 5px;
            }
            .zfbrun_box_right {
                text-align: right;

                p:nth-child(1) {
                    color: #4038A5;
                }
                p {
                    font-size: 14px;
                    color: #666666;
                }
            }
        }
    }
    .mescroll {
        overflow: auto;
    }   
}
</style>
