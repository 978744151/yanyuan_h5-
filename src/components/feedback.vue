<template>
    <div>
        <!-- <div class="feed_header">
            <img src="../assets/btn_back_icon.png" alt="" @click = "$router.go(-1)">
            <span style="font-size:1.125rem;">意见反馈</span>
            <span class="feed_header_span">充值记录</span>
        </div> -->
        <div class="feed_content">
            <!-- <div class="feed_more">
                <span>如果你遇到任何问题或者有更好的建议和意见，您可以通过下面的意见反馈框描述反馈的问题与建议，我们将尽快给你回复</span>
            </div> -->
            <div class="feed_textarea">
                <textarea name="" id="" rows=1 cols=27 v-model="textVal" placeholder="如果您遇到任何问题或者有更好的建议与意见，您可以通过下面的意见反馈框描述反馈的问题与建议，我们将尽快给您回复！">

                </textarea>
            </div>
            <div class="feed_contact">
                <!-- <span>我们怎么联系你(电话、qq、微信)任意方式</span> -->
                <input type="text" placeholder="填写您的联系方式（电话、QQ、微信等）" v-model="inputVal">
            </div>

        </div>
        <div class="feed_pay_button">
            <span @click="draw_pay_buttom">提交反馈</span>
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
            textVal: '',
            inputVal: '',
            access_code: '',
            userid: '',
            appVersion: ''
        }
    },
    methods: {
        draw_pay_buttom() {
            // window.location.href = 'my://sendMessage_feedback';
            console.log(this.textVal)
            console.log(this.inputVal)
            let data = {
                access_code: this.access_code,
                userid: this.userid,
                advisecontent: this.textVal,
                contactdetail: this.inputVal,
                appVersion: this.appVersion
            }
            console.log(data)
            axios.get('http://yue.wojianwang.com:8080/api/api-bin/ywms/advice/operation/insertAdvice.action', { params: data }).then(res => {
                console.log(res.data)
                if (res.data.success == 1) {
                    Toast({
                        message: '已完成',
                        position: 'bottom',
                        duration: 5000
                    });
                    window.control.getResult(1, '');
                } else {
                    Toast({
                        message: res.data.errmsg,
                        position: 'bottom',
                        duration: 5000
                    });
                    window.control.getResult(0, '');
                }
            }).catch(error => {
                window.control.getResult(0, '请求出错');
                Toast({
                    message: '请求出错',
                    position: 'bottom',
                    duration: 5000
                });
                window.control.getResult(0, '');
            })
        }
    },
    mounted() {

        this.access_code = this.$route.query.access_code
        this.userid = this.$route.query.userid
        this.appVersion = this.$route.query.appVersion
    }
}
</script>

<style lang="less">
.feed_header {
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

.feed_content {
    // background-color: #fff;
    .feed_more {
        background: #fffde2;
        box-sizing: border-box;
        span {
            display: inline-block;
            font-size: 15px;
            padding: 10px;
            color: #4038a5;
        }
    }
    .feed_textarea {
        padding: 15px 15px; // border-bottom: 5px solid #f5f5f5;
        textarea {
            width: 100%;
            height: 200px;
            border-radius: 6px;
            border: none;
            min-height: 150px;
            font-size: 14px;
            color: #333333;
            box-sizing: border-box;
            resize: none;
            padding: 10px;
            outline: none;
        }
    }
    input::-webkit-input-placeholder {
        /* WebKit browsers*/
        color: #cccccc;
        font-size: 14px;
    }
    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18*/
        color: #cccccc;
        font-size: 14px;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 19+*/
        color: #cccccc;
        font-size: 14px;
    }
    input:-ms-input-placeholder {
        /* Internet Explorer 10+*/
        color: #cccccc;
        font-size: 14px;
    }
    textarea::-webkit-input-placeholder {
        /* WebKit browsers*/
        color: #cccccc;
        font-size: 14px;
    }
    textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18*/
        color: #cccccc;
        font-size: 14px;
    }
    textarea::-moz-placeholder {
        /* Mozilla Firefox 19+*/
        color: #cccccc;
        font-size: 14px;
    }
    textarea:-ms-input-placeholder {
        /* Internet Explorer 10+*/
        color: #cccccc;
        font-size: 14px;
    }
    .feed_contact {
        padding: 0px 15px 15px 15px;
        span {
            color: #4038a5;
            font-size: 14px;
        }
        input {
            margin-top: 10px;
            box-sizing: border-box;
            padding-left: 15px;
            width: 100%;
            height: 50px;
            font-size: 14px;
            border: none;
            border-radius: 5px;
            outline: none;
            resize: none;
        }
    }
}

.feed_pay_button {
    margin-top: 30px;
    height: 45px;
    padding: 50px 0px 120px 0px;
    line-height: 45px;
    text-align: center;
    span {
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
</style>
