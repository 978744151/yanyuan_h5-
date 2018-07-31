<template>
    <div>
        <div class="wx_content">
            <div class="search">
                <input type="text" placeholder="请输入要充值的眼缘ID" v-model='yanyuanid' @input="changeinput">
                <span @click="findID">查询</span>
            </div>
            <div class="user" ref="none">
                <div style="display:flex;">
                    <div class="user_img">
                        <img :src="portraiturl" alt="">
                    </div>
                    <div class="user_ziti">
                        <p>{{username}}</p>
                        <span style="color:#4038a5;">眼缘ID: {{yanyuanid}}</span>
                    </div>
                </div>
                <p class="user_true" @click="user_true"></p>
            </div>
            <div class="select">
                <p>选择充值金额</p>
            </div>
            <div class="coin">
                <div class="coin_flex">
                    <div :class="{'on':money === items.active}" @click="paychange(items,index)" v-for="(items,index) in orderlist" :key="index">
                        <p>{{parseInt(items.rmb)}}元</p>
                        <span>{{parseInt(items.yuandou)}}缘豆</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="gzh_pay_button">
            <button @click="gzh_pay_button">立即充值</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant';
import { Toast } from 'mint-ui';
import axios from "axios"
import Qs from 'qs'
Vue.use(Icon);
import wx from 'weixin-js-sdk'
import { Dialog } from 'vant';
export default {
    data() {
        return {
            money: 'true',
            orderlist: [],
            rmb: '10',
            yuandou: '1000',
            yuandouyue: '',
            index: '',
            code: '',
            openid: '',
            appId: '',
            timeStamp: '',
            nonceStr: '',
            pg: '',
            signType: '',
            paySign: '',
            yyid: '',
            portraiturl: '',
            username: '',
            yanyuanid: '',
            userid: ''
        }
    },
    methods: {
        paychange(items, index) {
            this.orderlist.forEach((value, index) => {
                // console.log(value.active)
                value.active = false
            })
            items.active = true
            this.money = items.active
            this.rmb = items.rmb;
            this.yuandou = items.yuandou

            console.log(this.yuandou)
        },
        user_true() {

        },
        changeinput() {
            this.$refs.none.style.display = 'none';
        },
        findID() {
            var getid = {
                yyid: this.yanyuanid
            }
            axios.get('http://yue.wojianwang.com:8080/api/api-bin/ywms/entry/getUserInfoById.action',
                { params: getid }).then(res => {
                    console.log()
                    console.log(res.data)
                    if (res.data.success == 1 && res.data.result) {
                        this.$refs.none.style.display = 'block';
                        this.yyid = res.data.result.yyid;
                        this.username = res.data.result.nickname;
                        this.portraiturl = res.data.result.portraiturl
                        this.userid = res.data.result.userid
                    } else if (res.data.result == '' && !res.data.result) {
                        Toast({
                            message: '没有此用户',
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                    else {
                        Toast({
                            message: res.data.errmsg,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                }).catch(error => {
                    Toast({
                        message: '找不到此id',
                        position: 'bottom',
                        duration: 5000
                    });
                })
        },
        gzh_pay_button() {
            if (!this.yanyuanid.trim()) {
                Toast({
                    message: '请输入眼缘id',
                    position: 'bottom',
                    duration: 5000
                });
                return false
            }
            if(this.$refs.none.style.display == 'none'){
                Toast({
                    message: '请点击查询按钮',
                    position: 'bottom',
                    duration: 5000
                });
                return false
            }
            Dialog.confirm({
                title: '您好: '+this.username,
                message: '请核对你的眼缘id: '+this.yanyuanid+'和金额'
            }).then(() => {
                var openid = {
                    userid: this.userid,
                    ordercount: this.rmb,
                    paytype: 2,
                    productname: 'yuandou',
                    openId: this.openid
                }
                axios.get('http://yue.wojianwang.com/api/api-bin/ywms/weixin/entry/wxJsApiPay.action',
                    { params: openid }).then(res => {
                        if (res.data.result.codeFlag == 0) {
                            this.appId = res.data.result.result.appid;
                            this.timeStamp = res.data.result.result.timeStamp;
                            this.nonceStr = res.data.result.result.nonceStr;
                            this.pg = res.data.result.result.packages;
                            this.signType = res.data.result.result.signType;
                            this.paySign = res.data.result.result.paySign;
                            // wx.chooseWXPay({
                            //         appId:this.appId,
                            //         timestamp: this.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            //         nonceStr: this.nonceStr, // 支付签名随机串，不长于 32 位
                            //         package: this.pg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            //         signType: this.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            //         paySign: this.paySign, // 支付签名
                            //         success: function (res) {
                            //         // 支付成功后的回调函数
                            //             }
                            // });
                            // 进行支付
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId": this.appId,
                                    "timeStamp": this.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                    "nonceStr": this.nonceStr, // 支付签名随机串，不长于 32 位
                                    "package": this.pg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                    "signType": this.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                    "paySign": this.paySign, // 支付签名
                                },
                                function(res) {
                                    if (res.err_msg == "get_brand_wcpay_request:ok") { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                         Toast({
                                            message: '微信交易成功',
                                            position: 'bottom',
                                            duration: 3000
                                        });
                                        // setTimeout(() => {
                                        //     window.location.href = location.href
                                        // }, 1000);
                                    }
                                    //交易取消
                                    if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                        Toast({
                                            message: '微信交易取消',
                                            position: 'bottom',
                                            duration: 3000
                                        });
                                        // setTimeout(()=> {
                                        //     window.location = "http://www.yanyuan666.com/JSAPI/kong.html"
                                        // }, 1000);
                                    }
                                    //支付失败
                                    if (res.err_msg == "get_brand_wcpay_request:fail") {
                                        Toast({
                                            message: '微信支付异常',
                                            position: 'bottom',
                                            duration: 3000
                                        });
                                        setTimeout(() => {
                                            window.location.href = location.href
                                        }, 1000);
                                    }
                                }
                            )
                        } else {
                            Toast({
                                message: '微信支付异常',
                                position: 'bottom',
                                duration: 3000
                            });
                            setTimeout(() => {
                                window.location.href = location.href
                            }, 1000);
                        }
                    }).catch(error => {
                        Toast({
                            message: '微信支付异常',
                            position: 'bottom',
                            duration: 3000
                        });
                        setTimeout(() => {
                            // window.location = "http://www.yanyuan666.com/JSAPI/kong.html"
                        }, 1000);
                    })
            }).catch(() => {
                Dialog.close
            });
        },
    },
    created() {
        if(localStorage.getItem('openid')){
            this.openid = localStorage.getItem('openid')
        }
        var tools = {
            //获取地址栏中所有的参数
            getParamObj: function() {
                var obj = {};
                var search = location.search;
                search = search.slice(1);
                var arr = search.split("&");
                for (var i = 0; i < arr.length; i++) {
                    var key = arr[i].split("=")[0];
                    var value = decodeURI(arr[i].split("=")[1]);
                    obj[key] = value;
                }
                return obj;
            },
            getParam: function(key) {
                return this.getParamObj()[key];
            },
        }
        if(tools.getParam('code')){
            this.code = tools.getParam('code')
        }
        var data = {
            code: this.code
        }
        axios.get('http://yue.wojianwang.com:8080/api/api-bin/ywms/weixin/entry/wxUserInfo.action',
            { params: data }).then(res => {
                if (res.data.result.codeFlag == 0) {
                    // alert(res.data.result.result.openid)
                    // if (res.data.codeFlag == 1) {}
                    this.openid = res.data.result.result.openid
                    localStorage.setItem('openid',this.openid)
                }
            }).catch(error => {
                Toast({
                    message: '请求出错',
                    position: 'bottom',
                    duration: 5000
                });
            })


        axios({
            method: 'get',
            url: 'http://yue.wojianwang.com:8080/api/api-bin/ywms/entry/items/selectPriceInfo.action'
        }).then(res => {
            console.log(res)
            if (res.data.success == 1) {
                this.orderlist = res.data.result
            }
        }).catch(error => {
            Toast({
                message: '请求出错',
                position: 'bottom',
                duration: 5000
            });
        })
    }
}
</script>

<style lang="less">
.wx_content {
    width: 100%;
    height: 100%;
    .search {
        padding: 20px 15px;
        border-bottom: 5px solid #f5f5f5;
        position: relative;
        box-sizing: border-box;
        background-color: #fff;
        input {
            width: 100%;
            height: 40px;
            border: none;
            resize: none;
            border-radius: 50px;
            color: #999999;
            padding-left: 20px;
            font-size: 14px;
            background-color: #f5f5f5;
            box-sizing: border-box;
        }
        span {
            color: #4038a5;
            font-size: 15px;
            position: absolute;
            right: 35px;
            top: 30px;
        }
    }
    .user {
        height: 80px;
        background-color: #fff;
        padding: 0px 15px;
        display: flex;
        justify-content: space-between;
        border-bottom: 5px solid #f5f5f5;
        display: none;
        .user_img {
            width: 60px;
            height: 60px;
            display: inline-block;
            border-radius: 50%;
            margin-top: 10px;
            img {
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }
        .user_ziti {
            margin-left: 15px;
            margin-top: 13px;
            p {
                color: #333333;
                font-size: 15px;
            }
            span {
                display: inline-block;
                margin-top: 14px;
                font-size: 14px;
                color: #4038a5;
            }
        }
        .user_true {
            margin-top: 30px;
            color: #4038a5;
        }
    }
    .select {
        height: 40px;
        line-height: 40px;
        margin-bottom: 1px;
        background-color: #fff;
        padding: 0px 15px;
        p {
            color: #333333;
            font-size: 14px;
        }
    }
    .coin {
        padding: 10px 15px 20px 15px;
        background: white;
        margin-bottom: 5px;
    }
    label {
        opacity: 0;
    }
    .coin_flex {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        div {
            width: 28%;
            border-radius: 5px;
            height: 50px;
            border: 1px solid #4038a5;
            text-align: center;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin-top: 10px;
            p {
                margin-top: 5px;
                font-size: 14px;
                color: #4038a5;
            }
            span {
                font-size: 14px;
                color: #4038a5;
            }
        }
        div.on {
            background: #4038a5;
            p {
                color: white;
            }
            span {
                color: white;
            }
        }
    }
}

.gzh_pay_button {
    margin-top: 30px;
    height: 40px;
    padding: 50px 0px 40px 0px;
    line-height: 40px;
    text-align: center;
    button {
        text-align: center;
        border-radius: 40px; // width: 100%;
        display: inline-block;
        height: 45px;
        background: -webkit-gradient(linear, left top, right top, from(#7a55f3), to(#2ee2df));
        background: linear-gradient(to right, #7a55f3, #2ee2df);
        color: #ffffff;
        border: none;
        display: inline-block;
        width: 80%;
    }
}
.van-dialog__message--withtitle{
    color: black;
    text-align: center;
}
</style>
