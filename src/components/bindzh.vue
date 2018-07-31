<template>
    <div>
        <!-- <div class="bind_header">
            <img src="../assets/btn_back_icon.png" alt="" @click="$router.go(-1)">
            <span style="font-size:1.125rem;">我的认证</span>
        </div> -->
        <div class="bind_content">

            <div class="bind_list">
                <div class="bind_img"><img src="../assets/iphone.png" alt=""></div>
                <div class="bind_coin">
                    <span>绑定手机号码</span>
                </div>
                <span class="bind_span" @click="bindzh()" v-if="statuslist.phonenumber == ''">未绑定</span>
                <p v-else>{{statuslist.phonenumber}}</p>
            </div>
            <div class="bind_list">
                <div class="bind_img"><img src="../assets/weixin.png" alt=""></div>
                <div class="bind_coin">
                    <span>绑定微信号码</span>
                </div>
                <span class="bind_span" @click="bindwx()" v-if="statuslist.weixinopenid == ''">未绑定</span>
                <p v-else>{{statuslist.weixinopenid}}</p>
            </div>
            <div class="bind_list">
                <div class="bind_img"><img src="../assets/QQ.png" alt=""></div>
                <div class="bind_coin">
                    <span>绑定QQ号码</span>
                </div>
                <span class="bind_span" @click="bindQQ()" v-if="statuslist.qqopenid == ''">未绑定</span>
                <p v-else>{{statuslist.qqopenid}}</p>
            </div>
            <div class="bind_list">
                <div class="bind_img"><img src="../assets/weibo.png" alt=""></div>
                <div class="bind_coin">
                    <span>绑定微博号码</span>
                </div>
                <span class="bind_span" @click="bindweibo()" v-if="statuslist.weiboopenid == ''">未绑定</span>
                <p v-else>{{statuslist.weiboopenid}}</p>
            </div>
        </div>
        <div class="bind_pop" ref="pupop" v-show="pupop">
            <div class="shop_rg_once">
                <img src="../assets/close@3x.png" alt="" class="bind_close" @click="bind_close">
                <p>绑定手机号码</p>
                <div class="draw_input">
                    <img src="../assets/phone@3x.png" alt="">
                    <input type="text" v-model="phone">
                </div>
                <div class="draw_input">
                    <img src="../assets/lock@3x.png" alt="">
                    <input type="text" v-model="yzm">
                    <input type="hidden" v-model="bind_y">
                    <div v-if="bind_y <= 60">
                        <button disabled @click="bind_yzm">{{bind_y}}</button>
                    </div>
                    <div v-else-if="bind_y == '获取验证码'">
                        <button @click="bind_yzm">{{bind_y}}</button>
                    </div>
                </div>
                <div class="pay_button">
                    <button @click="bind_phone">立即绑定</button>
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
Vue.use(Icon)
export default {
    data() {
        return {
            phone: '',
            pupop: false,
            yzm: '',
            bind_y: '获取验证码',
            access_code: '',
            userid: '',
            statuslist:[]
        }
    },
    methods: {
        bind_close(){
            this.pupop = false
        },
        bindzh() {
            this.pupop = true
        },
        bindwx(){
            console.log('wx')
        },
        bindQQ(){
console.log('qq')
        },
        bindweibo(){
console.log('weibo')
        },
        bind_phone() {
            if (!this.phone.trim()) {
                Toast({
                    message: '请输入正确的手机号',
                    position: 'bottom',
                    duration: 3000
                });
                return false;
            }
            if (!this.yzm.trim()) {
                Toast({
                    message: '请输入正确的验证码',
                    position: 'bottom',
                    duration: 3000
                });
                return false
            }
            let data = {
                userid: this.userid,
                phonenumber: this.phone,
                yzm: this.yzm,
                access_code: this.access_code
            }
            axios({
                method: 'post',
                transformRequest: [data => Qs.stringify(data)],
                url: 'http://192.168.2.10:8080/api/api-bin/ywms/updatePhonenumber.action',
                data: data
            }).then(res => {
                console.log(res)
                if (res.data.success == 1) {
                    Toast({
                        message: '绑定成功',
                        position: 'bottom',
                        duration: 3000
                    });
                    this.pupop = false;
                    this.router.go(0)
                } else {
                    Toast({
                        message: res.data.errmsg,
                        position: 'bottom',
                        duration: 3000
                    });
                }
            }).catch(error => {
                Toast({
                    message: '请求出错',
                    position: 'bottom',
                    duration: 5000
                });
            })
        },
        bind_yzm() {
            console.log(1)
            if (!this.phone.trim()) {
                Toast({
                    message: '请输入正确的手机号',
                    position: 'bottom',
                    duration: 3000
                });
                return false;
            }
            var time;
            this.bind_y = 60;
            time = setInterval(() => {
                this.bind_y--
                if (this.bind_y == 0) {
                    this.bind_y = '获取验证码';
                    clearInterval(time)
                }
            }, 1000)
            axios({
                method: 'post',
                transformRequest: [data => Qs.stringify(data)],
                url: 'http://yue.wojianwang.com:8080/api/api-bin/ywms/entry/sendYzm.action',
                data: {
                    type: 1,
                    phonenumber: this.phone,
                    deviceid: 1212
                }
            }).then(res => {
                console.log(res)
                if (res.data.success == 1) {
                    this.yzm = res.data.result.yzm
                }else{
                    Toast({
                    message: res.data.errmsg,
                    position: 'bottom',
                    duration: 3000
                });
                }
            }).catch(error => {
                Toast({
                    message: '请求出错',
                    position: 'bottom',
                    duration: 3000
                });
            })
        }
    },
    mounted(){
        this.access_code = this.$route.query.access_code
        this.userid = this.$route.query.userid
        var data = {
            access_code:this.access_code,
            userid:this.userid
        }
        axios.get('http://yue.wojianwang.com/api/api-bin/ywms/auth/data/getAuthBindingInfo.action',{params:data}).then(res=>{
            console.log(res.data)
            if(res.data.success == 1){
                this.statuslist = res.data.result
            }
        })
    }
}
</script>

<style lang="less">
.bind_header {
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
}

.bind_content {
        background: white;
    .bind_list {
        padding: 0px 15px;
        display: flex;
        position: relative;
        height: 60px;
        border-bottom: 1px solid #cccccc;
        .bind_img {
            width: 40px;
            height: 40px;
            margin-top: 10px;
            img {
                max-height: 100%;
            }
        }
        p{
            color: #4038a5;
            font-size: 14px;
            margin-top: 21px;
            position: absolute;
            right: 15px;
        }
        .bind_coin {
            line-height: 60px;
            text-align: center;
            margin-left: 20px;
            span {
                font-size: 14px;
                color: #333333;
            }
        }
        .bind_span {
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 30px;
            color: #4038a5;
            border: 1px solid #4038a5;
            font-size: 14px;
            margin-top: 15px;
            position: absolute;
            right: 15px;
        }
        .bind_span_bg {
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 30px;
            color: white;
            background: #cccccc;
            font-size: 14px;
            margin-top: 15px;
            position: absolute;
            right: 15px;
        }
    }
}

.bind_pop {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0px;
    z-index: 999; // display: none;
    .bind_close {
        position: absolute;
        top: 10px;
        right: 14px;
        width: 18px;
        height: 18px;
    }
    p {
        color: #4038a5;
        margin-top: 15px;
    }
    .draw_span {
        padding: 0px 10px;
    }
    .shop_rg_once {
        border-radius: 20px;
        position: absolute;
        top: 25%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        background: white;
        width: 80%;
        min-height: 240px;
        height: auto;
        background-size: 100% 100%;
        text-align: center; // border-radius: 10px;  
        p:nth-child(1) {
            height: 35px;
            color: #4038a5;
            font-size: 18px;
            font-weight: 700;
            line-height: 35px;
            text-align: center;
        }
        .draw_input {
            margin-top: 15px;
            height: 40px;
            width: 100%;
            text-align: center;
            position: relative;
            img {
                position: absolute;
                width: 16px;
                height: 16px;
                top: 13px;
                left: 25px;
            }
            input {
                width: 80%;
                height: 100%;
                border-radius: 6px;
                background-color: #f1f1f1;
                border: none;
                padding-left: 30px;
                font-size: 14px;
            }
            button {
                border: none;
                background: #f1f1f1;
                position: absolute;
                right: 38px;
                top: 12px;
                font-size: 14px;
                color: #4038a5;
            }
        }
        .pay_button {
            height: 40px;
            padding: 0 40px;
            line-height: 40px;
            margin-top: 30px;
            button {
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
}
</style>
