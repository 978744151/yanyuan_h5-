<template>
  <div>
    <!-- <div class="ar_header">
        <img src="../assets/btn_back_icon.png" alt="" @click = "$router.go(-1)">
        <span style="font-size:1.125rem;">我的认证</span>
    </div>  -->
    <div class="ar_content">
        <div class="ar_content_img">
            <img src="../../assets/approve.png" alt="">
        </div>
        <div class="ar_content_rz" >
            <span v-if="approve == '0'">未认证</span>
            <span v-if="approve == '2'">审核中</span>
            <span v-if="approve == '1'">已认证</span>
        </div>
        <div class="ar_content_p">
            <p>平台专属认证,认证通过后享有诸多便利，更容易获得好友的好感哦!</p>
        </div>
        <div class="app_button">
            <button v-if="approve == '0'" @click="app_rove">眼缘网红认证</button>
            <button v-if="approve == '1'" @click="app_rove">眼缘网红认证</button>
            <button v-if="approve == '2'" @click="app_rove">眼缘网红认证</button>
        </div>
        
    </div>    
  </div>
</template>

<script>
export default {
    data(){
        return  {
            access_code:'',
            userid:'',
            approve:0
        }
    },
    methods:{
        app_rove(){
            console.log(1)
            window.location.href = 'my://sendMessage_3';
        }
    },
    mounted(){
        this.access_code = this.$route.query.access_code
        this.userid = this.$route.query.userid
        this.approve = this.$route.query.approve
    }
}
</script>

<style lang="less">
.ar_header {
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
.ar_content{
    position: relative;
    background: white;
    padding-bottom: 45px;
    .ar_content_img{
        padding-top: 20px;
        width: 100%;
        height: 65px;
        text-align: center;
        img{
            height: 100%;
        }
    }
    .ar_content_rz{
        position: absolute;
        top: 0px;
        right: 0px;
        height: 0px;
        width: 0px;
        border-top: 0px solid transparent;
        border-right: 65px solid #CADF9D;
        border-bottom: 65px solid transparent;
        span{
            -webkit-transform: rotate(-45deg);
            transform: rotate(45deg);
            color: #4038a5;
            font-size: 14px;
            display: inline-block;
            word-spacing: 0.1;
            position: av;
            position: absolute;
            top: 14px;
            right: -63px;
        }
    }
    .ar_content_p{
        margin-top: 30px;
        p{
            text-align: center;
            font-size: 14px;
            color: #333333;
            padding: 0px 50px;
        }
    }
.app_button {
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
</style>
