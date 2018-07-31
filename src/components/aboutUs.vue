<template>
  <div class="aboutUs">
      <!-- <div class="yuandou_tx">
          <img src="../assets/yanyuantoux.png" alt="" height="90px;">
      </div> -->
      <div class="erweima"> 
          <img src="../assets/erweima.jpg" alt="" height="120px;">
      </div>
      <div class="about_gzh">
          <p>微信公众号:yanyuanapp</p>
      </div>
        <div class="about_pay_button" @click="href">
            <P>www.yanyuan666.com <span>点击查看</span></P>
        </div>
      <div class="about_yuandou">
        <img src="../assets/yan_yuan.png" alt="" height="24px;">
          <p>2018 备案/许可证号：苏ICP备18028180号</p>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        href(){
            window.top.location = "http://www.yanyuan666.com"
        }
    }
}   
</script>

<style lang="less">
.aboutUs{
    background-color: #fff;
    width: 100%;
    height: 100%;
    div{
        text-align: center;
    }
     .yuandou_tx{
        text-align: center;
    }
     .about_yuandou{
            position: absolute;
            bottom: 30px;
            width: 100%;
            img{
                margin-bottom: 20px;
            }
            p{
                color:#999999;
                font-size: 14px;
            }
    }
    .erweima{
        text-align: center;
        padding-top: 50px;
    }
    .about_gzh{
        text-align: center;
        margin-top: 10px;
        p{
        color:#4048a5;
        font-size: 16px;
        font-weight: 600;
        }
    }
    .about_pay_button {
        height: 45px;
        padding: 45px 0px 0px 0px;
        line-height: 45px;
        text-align: center;
    P {
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
    span{
        font-size: 14px;
    }
}
}
</style>
