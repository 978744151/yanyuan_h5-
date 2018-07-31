<template>
    <div>
        <!-- <div class="pay_header">
                    <img src="../assets/btn_back_icon.png" alt="" @click = "$router.go(-1)">
                    <span style="font-size:1.125rem;">充值</span>
                    <span class="pay_header_span">充值记录</span>
                </div> -->
        <div class="pay_content">
            <div class="yuandou">
                <p>缘豆余额
                    <span>{{parseInt(yuandouyue)}}</span>
                </p>
            </div>
            <div class="select">
                <p>选择充值余额</p>
            </div>
            <div class="coin">
                <div class="coin_flex">
                    <div :class="{'on':money === items.active}" @click="paychange(items)" v-for="(items,index) in orderlist" :key="index">
                        <p>{{parseInt(items.rmb)}}元</p>
                        <span>{{parseInt(items.yuandou)}}缘豆</span>
                    </div>
                </div>
            </div>
            <div class="pay_methods">
                <div class="pay_order">
                    <p>付款方式</p>
                </div>
                <div class="pay_image">
                    <!-- <div style="    background: white;" v-if="zfbpay"> -->
                    <div style="    background: white;">    
                        <img src="../assets/zfb_pay.png" alt="">
                        <span>支付宝充值</span>
                        <span class="pay_checkbox">
                            <input type="checkbox" v-model="c_zfb" @click="zfb">
                            <label for="checkbox">true</label>
                            <span :class="[ c_zfb == false ? 'check_span_nor' : 'check_span_sel']"></span>
                        </span>
                    </div>
                    <!-- <div style="background: white;" v-if="wxpay"> -->
                    <div style="background: white;" >
                        <img src="../assets/wx_pay.png" alt="">
                        <span>微信充值</span>
                        <span class="pay_checkbox">
                            <div>
                                <input type="checkbox" v-model="c_wx" @click="wx">
                                <label for="checkbox">true</label>
                                <span :class="[c_wx == false  ? 'check_span_nor' : 'check_span_sel']"></span>
                            </div>
                        </span>
                    </div>
                    <!-- <div>
                                <img src="../assets/zfb_pay.png" alt="">
                                <span>微信方式</span>
                                <span class="pay_checkbox" >
                                    <input type="radio" v-model="radio" value="zfb" class="radio2">
                                    <label for="checkbox">{{ radio }}</label>
                                    <span :class="[radio == 'zfb'? 'check_span_sel' : 'check_span_nor']"></span>
                                 </span>
                            </div>
                            <div>
                                <img src="../assets/wx_pay.png" alt="">
                                <span>微信方式</span>
                                <span class="pay_checkbox" >
                                    <input type="radio" v-model="radio"  value="wx" class=".radio" >
                                    <label for="checkbox">{{ radio }}</label> 
                                    <span :class="[radio == 'wx'   ? 'check_span_sel' : 'check_span_nor']"></span>
                                 </span>
                            </div> -->
                </div>
            </div>
            <div class="androd_pay_button">
                <button @click="pay_buttom">立即充值</button>
            </div>
        </div>
        <div class="pay_foot">

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
export default {
    data() {
        return {
            // radio:'',
            c_zfb: true,
            c_wx: false,
            money: 'true',
            orderlist: [],
            rmb: '10',
            yuandou: '1000',
            access_code: '',
            userid: '',
            appVersion:'',
            // "result":
            // [
            //     {
            //         "rmb": "10.0",
            //         "yuandou": "1000.0",
            //         "active": 'true'
            //     },
            //     {
            //         "rmb": "30.0",
            //         "yuandou": "3000.0",
            //         "active": 'false'
            //     },
            //     {
            //         "rmb": "50.0",
            //         "yuandou": "5000.0",
            //         "active": 'false'
            //     },
            //     {
            //         "rmb": "100.0",
            //         "yuandou": "10000.0",
            //         "active": 'false'
            //     },
            //     {
            //         "rmb": "200.0",
            //         "yuandou": "20000.0",
            //         "active": 'false'
            //     },
            //     {
            //         "rmb": "300.0",
            //         "yuandou": "30000.0",
            //         "active": 'false'
            //     },
            //     {
            //         "rmb": "500.0",
            //         "yuandou": "50000.0",
            //         "active": 'false'
            //     },
            //     {
            //         "rmb": "1000.0",
            //         "yuandou": "100000.0",
            //         "active": 'false'
            //     },
            //     {
            //         "rmb": "2000.0",
            //         "yuandou": "200000.0",
            //         "active": 'false'
            //     }
            // ],
            yuandouyue:'',
            channelList:'',
            zfbpay:'',
            wxpay:''
        }
    },
    methods: {
        paychange(items) {
            this.orderlist.forEach((value, index) => {
                // console.log(value.active)
                value.active = false
            })
            items.active = !items.active
            this.money = items.active
            this.rmb = items.rmb
            this.yuandou = items.yuandou
        },
        check() {
            this.c_wx = false
            this.c_zfb = false;
        },
        wx() {
            this.check()
            this.c_wx = !this.c_wx
        },
        zfb() {
            this.check()
            this.c_zfb = !this.c_zfb
        },
        pay_buttom() {
            console.log(this.rmb)
            console.log(this.yuandou)
            if (this.c_zfb == false && this.c_wx == false) {
                Toast('请选择充值方式');
                return false
            }
                    var payType;
                    // var pay_flag
                    if (this.c_zfb == true) {
                        payType = 0
                        // pay_flag = this.channelList[0].pay_flag
                    }
                    if (this.c_wx == true) {
                        payType = 1
                        // pay_flag = this.channelList[1].pay_flag
                    }
                    // console.log(pay_flag)
                    console.log(payType)
                    window.control.getPayInfo(parseInt(this.rmb), parseInt(this.yuandou), parseInt(payType))
                    // window.control.getPayInfo(parseInt(this.rmb), parseInt(this.yuandou), parseInt(payType),parseInt(pay_flag))
        }
    },
    created() {
        // axios.get('http://192.168.1.6:8080/api/api-bin/ywms/entry/channel/chargeChannelPay.action').then(res => {
        //     if(res.data.success == 1){
        //             this.channelList = res.data.result.channelList
        //             this.zfbpay = res.data.result.channelList[0].pay_type
        //             this.wxpay = res.data.result.channelList[1].pay_type
        //         }
        //     })
        this.access_code = this.$route.query.access_code
        this.userid = this.$route.query.userid
        this.appVersion = this.$route.query.appVersion
        // alert(access_code)
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
        var date = {
            access_code : this.access_code,
            userid: this.userid,
            appVersion:this.appVersion
            // access_code: 'cc629687-27e9-4227-ad6e-88e51585d915',
            // userid: 123
        }
        console.log(date)
        axios.get('http://yue.wojianwang.com:8080/api/api-bin/ywms/yuandou/data/getLastestYandou.action',
            { params: date })
            .then(res => {
                console.log(res.data)
                if (res.data.success = 1) {
                    this.yuandouyue = res.data.result.yuandou
                    console.log(this.yuandouyue)
                    // this.yuanbiyue = da
                } else {
                    Toast({
                        message: res.data.errmsg,
                        position: 'bottom',
                        duration: 2000
                    });
                }
            })
    }
}
</script>

<style lang="less">
.pay_header {
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
    .pay_header_span {
        position: absolute;
        right: .9375rem;
    }
}

.pay_content {
 
    .yuandou {
        padding: 0px 15px;
        height: 45px;
        line-height: 45px;
        margin-bottom: 5px;
        background-color: #fff;
        p {
            font-size: 15px;
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
    .pay_methods {
        margin-top: 10px;
        .pay_order {
            height: 40px;
            line-height: 40px;
            padding: 0px 15px;
            background: white;
        }
        .pay_image {
            div {
                height: 50px;
                line-height: 50px;
                position: relative;
                padding-left: 15px;
                margin-top: 1px;
            }
            img {
                vertical-align: middle;
                width: 27px;
                height: 27px;
            }
            span {
                margin-left: 10px;
            }

            .pay_checkbox {
                position: absolute;
                right: 15px;
                top: 10px;
                z-index: 0;
                input {
                    opacity: 0;
                    position: absolute;
                    right: 0px;
                    top: -4px;
                    z-index: 999;
                    width: 325px;
                    height: 32px;
                }
                .check_span_nor {
                    width: 18px;
                    height: 18px;
                    background: url('../assets/nor.png');
                    display: inline-block;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 8px;
                    z-index: -1;
                }
                .check_span_sel {
                    width: 18px;
                    height: 18px;
                    background: url('../assets/sel.png');
                    display: inline-block;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 8px;
                    z-index: -1;
                }
            }
        }
    }
    .androd_pay_button {
        margin-top: 30px;
        height: 40px;
        padding: 50px 0px 120px 0px;
        line-height: 40px;
        text-align: center;
        button {
            text-align: center;
            border-radius: 40px;
            // width: 100%;
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
}
</style>
