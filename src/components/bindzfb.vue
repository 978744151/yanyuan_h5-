<template>
    <div>
        <div class="bind_zfb_content">
            <div class="bind_white">
                <div>
                    <span>真实姓名</span>
                    <input type="text" placeholder="请输入您的真实姓名" v-model="zfb_name">
                </div>
                <div>
                    <span>支付宝账号</span>
                    <input type="text" placeholder="请输入正确的支付宝账号" v-model="zfb_zh">
                </div>
                <div>
                    <span>手机号码</span>
                    <input type="text" placeholder="请输入您的手机号码" v-model="z_phone">
                </div>
                <div>
                    <span>验证码</span>
                    <input type="text" placeholder="请输入你的验证码" v-model="z_yzm">
                    <button v-if="yzm<=60 && yzm >=0" @click="sendYzm" disabled>{{yzm}}</button>
                    <button v-if=" yzm =='发送验证码'" @click="sendYzm">{{yzm}}</button>
                </div>
            </div>
            <div class="pay_button">
                <span @click="zfb_button">确认提交</span>
            </div>

        </div>
        <div class="zfb_pop" ref="pupop" v-show="pupop">
            <div class="shop_rg_once">
                <p>温馨提示</p>
                <p>确认绑定当前支付宝账号吗?绑定账号后不可更改，账号审核通过后，提现金额将以支付宝转账的形式将提现金额转至您的支付宝账户！</p>
                <div class=" d_end">
                    <button class="d_conform" @click="pupop = false">取消</button>
                    <button class="d_none" @click="zfb_true">确认</button>
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
            pupop: false,
            yzm: '发送验证码',
            z_phone: '',
            zfb_name: '',
            zfb_zh: '',
            z_yzm: '',
            access_code: '',
            userid: '',
            appVersion:''
        }
    },
    methods: {
        zfb_button() {
            this.pupop = true
        },
        zfb_true() {
            var data = {
                access_code: this.access_code,
                userid: this.userid,
                payacount: this.zfb_zh,
                phonenumber: this.z_phone,
                yzm: this.z_yzm,
                realname: this.zfb_name,
                appVersion:this.appVersion
            }
            axios.get('http://yue.wojianwang.com/api/api-bin/ywms/cash/withdraw/aliPayAccountBinding.action',
                { params: data }
            ).then(res => {
                (console.log(res.data))
                if (res.data.success == 1) {
                  Toast({
                        message: '绑定成功',
                        position: 'bottom',
                        duration: 2000
                    });
                    window.control.getResult(1,'');
                } else {
                    Toast({
                        message: res.data.errmsg,
                        position: 'bottom',
                        duration: 2000
                    });
                    window.control.getResult(0,'');
                }
            }).catch(error => {
                Toast({
                    message: '请求出错',
                    position: 'bottom',
                    duration: 2000
                });
                window.control.getResult(0,'');
            })           
        },
        sendYzm() {

            var data = {
                type: 6,
                phonenumber: this.z_phone,
                appVersion:this.appVersion
            }
            axios.get('http://yue.wojianwang.com/api/api-bin/ywms/entry/sendYzm.action',
                { params: data }
            ).then(res => {
                (console.log(res.data))
                if (res.data.success == 1) {
                    this.yzm = 60;
                    var yz_timer = setInterval(() => {
                        this.yzm--
                        if (this.yzm <= 0) {
                            clearInterval(yz_timer)
                            yz_timer = null;
                            this.yzm = '发送验证码'
                        }
                    }, 1000)
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
        },
    },
    mounted() {
        this.appVersion = this.$route.query.appVersion
        this.access_code = this.$route.query.access_code
        this.userid = this.$route.query.userid
    }
}
</script>

<style lang="less">
.bind_zfb_content {
    width: 100%;
    .bind_white {
        width: 100%;
        >div {
            background-color: #fff;
            border: 1px solid #f5f5f5;
            height: 50px; // width: 100%;
            line-height: 50px;
            display: flex;
            position: relative;
            box-sizing: content-box;
            span {
                font-size: 16px;
                color: #333333;
                font-weight: 500;
                display: inline-block;
                width: 30%;
                padding-left: 15px;
            }
            input {
                border: none;
                color: #333333;
                font-size: 14px;
                width: 70%;
                padding-right: 15px;
                resize: none;
                margin: 0;
            }
            button {
                position: absolute;
                height: 30px;
                border-radius: 30px;
                line-height: 30px;
                /* text-align: center; */
                color: #4038A5;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                margin-top: 5px;
                background: white;
                resize: none;
                border: 1px solid #4038a5;
                right: 10px;
                font-size: 14px;
                top: 4px;
                padding: 0px 5px;
                width: 84px;
            }
        }
    }
    .pay_button {
        height: 40px;
        padding: 0 40px;
        line-height: 40px;
        margin-top: 70px;
        span {
            text-align: center;
            border-radius: 40px;
            width: 100%;
            display: inline-block;
            height: 40px;
            background: -webkit-linear-gradient(left, #7a55f3, #2ee2df);
            /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #7a55f3, #2ee2df);
            /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #7a55f3, #2ee2df);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #7a55f3, #2ee2df);
            color: #ffffff;
            border: none;
        }
    }
}

.zfb_pop {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0px;
    z-index: 999; // display: none;
    .draw_span {
        padding: 0px 10px;
    }
    .shop_rg_once {
        position: absolute;
        top: 35%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        background: white;
        width: 80%;
        min-height: 200px;
        height: auto;
        background-size: 100% 100%;
        text-align: center;
        p:nth-child(1) {
            height: 35px;
            color: #4038a5;
            font-size: 15px;
            font-weight: 700;
            line-height: 35px;
            text-align: center;
        }
        p:nth-child(2) {
            text-align: center;
            margin-top: 10px;
            color: #333333;
            font-size: 14px;
            padding: 0px 17px;
        }
        .d_end {
            height: 40px;
            width: 100%;
            display: flex;
            position: absolute;
            bottom: 0px;
            button:nth-child(1) {
                width: 50%;
                color: #333333;
                background: #eeeeee;
                text-align: center;
                line-height: 40px;
                border: none;
            }
            button:nth-child(2) {
                width: 50%;
                color: #ffffff;
                background: #4036a5;
                text-align: center;
                line-height: 40px;
                border: none;
            }
        }
    }
}
</style>
