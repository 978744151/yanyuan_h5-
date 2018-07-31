<template>
    <div>

        <!-- <div class="draw_header">
                <img src="../../assets/btn_back_icon.png" alt="" @click="$router.go(-1)">
                <span style="font-size:1.125rem;">收益提现</span>
                <span class="draw_header_span">提现记录</span>
            </div> -->
        <div class="draw_content">
            <div class="draw_yuandou">
                <p>缘币余额
                    <span>{{parseInt(yuanbiyue)}}</span>
                </p>
            </div>
            <div class="draw_list">
                <div class="draw_method" v-for="(items,index) in drawlist" :key="index">
                    <div class="draw_img"><img src="../../assets/zfb_z.png" alt=""></div>
                    <div class="draw_coin">
                        <span>需要{{parseInt(items.yuanbi)}}缘币</span>
                        <p>提现{{parseInt(items.prermb)}}实到{{parseInt(items.rmb)}}元</p>
                    </div>
                    <span class="draw_checkbox">
                        <input type="radio" v-model="radios" :value="items.rmb" class="radio2" @input="getYuanbi(items.yuanbi)">
                        <span :class="[radios == items.rmb ? 'check_draw_sel' : 'check_draw_nor']" class="check_draw_nor"></span>
                    </span>
                </div>
            </div>

            <div class="ios_draw_button">
                <button @click="draw_pay_buttom">立即提现</button>
            </div>
        </div>
        <div class="draw_pop" ref="pupop" v-show="pupop">
            <div class="shop_rg_once">
                <p>温馨提示</p>
                <p>你确定提现{{parseInt(radios)}}元至支付宝账户</p>
                <div class="draw_span">
                    <span>1、请绑定本人有效支付宝账户,绑定账户后不能更改,账户审核通过后,将以支付宝转账的形式将提现金额转至您的支付宝账号;</span>
                    <span>2、选择提现金额后系统已自动扣除20%个人所得税;</span>
                </div>
                <div class=" d_end">
                    <span class="d_conform" @click="pupop = false">取消</span>
                    <span class="d_none" @click="d_true">确认</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import axios from "axios"
import Qs from 'qs'
Vue.use(Icon);
export default {
    data() {
        return {
            value: '',
            pupop: false,
            radios: 40,
            yuanbi: '5000',
            drawlist: [],
            access_code: '',
            userid: '',
            yuanbiyue: '',
            appVersion:''
            //               "result":
            //         [
            //          {
            //                 "yuanbi": "5000.0",
            //                 "rmb": "40.0",
            //          },
            //          {
            //                 "yuanbi": "10000.0",
            //                 "rmb": "80.0",
            //          },
            //          {
            //                 "yuanbi": "20000.0",
            //                 "rmb": "160.0",
            //          },
            //          {
            //                 "yuanbi": "50000.0",
            //                 "rmb": "400.0",
            //          },
            //          {
            //                 "yuanbi": "100000.0",
            //                 "rmb": "800.0",
            //          }
            //   ],
        }
    },
    methods: {

        getYuanbi(yuanbi) {
            this.yuanbi = yuanbi
        },
        draw_pay_buttom() {
            this.pupop = true;
        },
        d_true() {
            var data = {
                access_code: this.access_code,
                userid: this.userid,
                yuanbi: parseInt(this.yuanbi),
                amount: ParseInt(this.radios),
                withdrawtype: 1,
                appVersion:this.appVersion
            }
            axios.get('http://yue.wojianwang.com/api/api-bin/ywms/cash/withdraw/createWidthdrawRequest.action', { params: data }).then(res => {
                (console.log(res.data))
                if (res.data.success == 1) {
                    this.pupop = false;
                    Toast({
                        message: '提现成功',
                        position: 'bottom',
                        duration: 2000
                    });
                    // window.control.getResult(1, '');
                    window.location.href = 'my://sendMessage_1';
                } else  {
                    Toast({
                        message: res.data.errmsg,
                        position: 'bottom',
                        duration: 2000
                    });
                    // window.control.getResult(2, res.data.errmsg);
                    window.location.href = 'my://sendMessage_2';
                } 
            }).catch(error => {
                Toast({
                    message: 'error',
                    position: 'bottom',
                    duration: 2000
                });
                // window.control.getResult(0, '请求出错');
                window.location.href = 'my://sendMessage_0';
                
            })
        }
    },
    mounted() {       
        this.access_code = this.$route.query.access_code
        this.userid = this.$route.query.userid
        this.appVersion = this.$route.query.appVersion
        axios({
            method: 'get',
            url: 'http://yue.wojianwang.com/api/api-bin/ywms/entry/items/selectWidthdrawPrice.action'
        }).then(res => {
            console.log(res)
            if (res.data.success == 1) {
                this.drawlist = res.data.result
            }
        }).catch(error => {
            Toast({
                message: '请求出错',
                position: 'bottom',
                duration: 2000
            });
        })

        var date = {
            access_code : this.access_code,
            userid: this.userid,
            appVersion:this.appVersion
            // access_code: 'cc629687-27e9-4227-ad6e-88e51585d915',
            // userid: 123
        }
        axios.get('http://yue.wojianwang.com:8080/api/api-bin/ywms/yuandou/data/getLastestYandou.action',
            { params: date })
            .then(res => {
                console.log(res.data)
                if (res.data.success = 1) {
                    this.yuanbiyue = res.data.result.yuanbi
                    // this.yuanbiyue = da
                } else {
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
    }
}
</script>

<style lang="less">
.draw_header {
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
    .draw_header_span {
        position: absolute;
        right: .9375rem;
    }
}

.draw_content {
    .draw_yuandou {
        padding: 0px 15px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 1px;
        background: white;
        p {
            font-size: 15px;
            color: #4038a5;
        }
    }
    .draw_list {
        .draw_method {
            display: flex;
            position: relative;
            height: 80px;
            background: white;
            padding: 0px 15px;
            border-bottom: 1px solid #f5f5f5;
            .draw_img {
                width: 115px;
                height: 55px;
                margin-top: 13px;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .draw_coin {
                margin-top: 10px;
                margin-left: 20px;
                text-align: center;
                span {
                    font-size: 13px;
                    color: #333333;
                }
                p {
                    width: 115px;
                    height: 30px;
                    background: rgb(0, 160, 233);
                    font-size: 11px;
                    color: white;
                    line-height: 30px;
                    margin-top: 4px;
                }
            }
            .draw_checkbox {
                position: absolute;
                right: 15px;
                top: 20px;
                z-index: 0;
                input {
                    opacity: 0;
                    position: absolute;
                    right: 0px;
                    top: -4px;
                    z-index: 999;
                    width: 325px;
                    height: 50px;
                }
                .check_draw_nor {
                    margin-top: 10px;
                    width: 18px;
                    height: 18px;
                    background: url('../../assets/nor.png');
                    display: inline-block;
                    background-size: 100% 100%;
                }
                .check_draw_sel {
                    margin-top: 10px;
                    width: 18px;
                    height: 18px;
                    background: url('../../assets/sel.png');
                    display: inline-block;
                    background-size: 100% 100%;
                }
            }
        }
    }
    .ios_draw_button {
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

.draw_pop {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0px;
    z-index: 999; // display: none;
    .draw_span {
        padding: 0px 15px;
    }
    .shop_rg_once {
        position: absolute;
        top: 30%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        background: white;
        width: 80%;
        height: auto;
        background-size: 100% 100%;
        text-align: center; // border-radius: 10px;  
        p:nth-child(1) {
            height: 40px; 
            color: #4038a5;
            font-size: 15px;
            font-weight: 700;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid rgb(244,244,244)
        }
        p:nth-child(2) {
            text-align: center;
            margin-top: 10px;
            color: #4038a5;
            font-size: 14px;
            font-weight: 700;
        }
        span {
            margin-top: 10px;
            display: inline-block;
            font-size: 13px;
            color: #333333;
            text-align: left;
        }
        .d_end {
            height: 45px;
            width: 100%;
            display: -ms-flexbox;
            display: flex;
            /* position: absolute; */
            /* bottom: 22px; */
            margin-top: 20px;
            span:nth-child(1) {
                width: 50%;
                color: #333333;
                background: #eeeeee;
                text-align: center;
                line-height: 45px;
                border: none;
                box-sizing: border-box;
                padding: 0;
                margin: 0
            }
            span:nth-child(2) {
                width: 50%;
                color: #ffffff;
                background: #4038a5;
                text-align: center;
                line-height: 45px;
                border: none;
                box-sizing: border-box;
                padding: 0;
                margin: 0
            }
        }
    }
}
</style>
