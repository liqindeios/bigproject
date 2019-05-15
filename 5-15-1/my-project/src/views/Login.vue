<template>
  <div id="main">
    <div class="login">        
        <!-- <div class="title">
            <h2 class="logo">登录界面</h2>
        </div> -->
        <el-form :label-position="labelPosition" class="login-form" status-icon :rules="loginRules" label-width="0px" ref="loginForm" :model="loginForm">
            <h2 class="logo">登录界面</h2>
            <!-- 用户名 -->
            <!-- <el-form-item prop="username" label="用户名"> -->
                <el-form-item prop="userid">
                <el-input v-model="loginForm.userid" @keyup.enter.native="handleLogin" auto-complete="off" style="width:300px" placeholder="账号"></el-input>          
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" @keyup.enter.native="handleLogin" auto-complete="off" style="width:300px" placeholder="密码"></el-input>                
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item prop="verifycode">
                <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
                <el-input v-model="loginForm.verifycode" class="identifyinput" style="width:300px" placeholder="验证码"></el-input>                
            </el-form-item>
            <!-- 验证码图片 -->
            <el-form-item>            
              <div class="identifybox">
                  <div @click="refreshCode">
                    <s-identify :identifyCode="identifyCode"></s-identify>
                  </div>
                  <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
              </div>
            </el-form-item>           
            <!-- 忘记密码和登录按钮 -->
            <el-form-item style="width:100%;">
                <el-button type='primary' @click="gotopassword" style="width:40%;">忘记密码</el-button>
                <el-button type="primary" @click.native.prevent="handleLogin" class="login-submit" style="width:40%;">登录</el-button>
            </el-form-item>            
        </el-form>        
    </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import SIdentify from "@/components/identify.vue";
import mock from '@/mock/index.js';
import Cookies from "js-cookie";
import router from '@/router'
export default {
  name: "Login",
  data() {
    //用户名自定义验证规则
    const validateUsername = (rule, value, callback) => {
      if(isvalidUsername==""){
          callback(new Error("请输入用户名"));
      }
      else if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        console.log("user", value);
        callback();
      }
    };
    // 验证码自定义验证规则
    const validateVerifycode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.identifyCode) {
        console.log("validateVerifycode:", value);
        callback(new Error("验证码不正确!"));
      } else {
        callback();
      }
    };
    return {
      // fontstyle: {},
      logining: false,
      mes1: "文化产品库管理系统",
      labelPosition: 'right',
      loginForm: {
        userid: "10020",
        password: "123456",
        verifycode: ""
      },
      // checked: false,
      identifyCodes: "1234567890",
      identifyCode: "",
      loginRules: {
        // 绑定在form表单中的验证规则
        userid: [          
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        verifycode: [
          { required: true, trigger: "blur", validator: validateVerifycode }
        ]
      },
      passwordType: "password",
      checked: true
    };
  },
  components: {
    SIdentify
  },
  created() {},
  mounted() {
    // 验证码初始化
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  // computed: {},
  // props: [],
  methods: {    
    // 点击登入按钮
    handleLogin(){
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let userInfo = {userid:this.loginForm.userid, password:this.loginForm.password}
          this.$api.login.login(userInfo).then((res) => {
            //后台数据连接
            console.log(res.message)
            Cookies.set('token',res.user.token)
            sessionStorage.menu = JSON.stringify(res.menu)
            // sessionStorage.user =JSON.stringify(res.user)
            console.log("menu",JSON.stringify(res.menu))
            sessionStorage.setItem('userid', userInfo.usreid) // 保存用户到本地会话
            // sessionStorage.setItem('user', userInfo)
            sessionStorage.user = JSON.stringify(res.user)
            // console.log("user",JSON.stringify(res.user))
            //Mock数据连接
            // Cookies.set('token',res.user.token)
            // this.$store.commit('menuRouteLoaded',false)
            // Cookies.set('token', res.data.token) // 放置token到Cookie
            // sessionStorage.setItem('user', userInfo.usreid) // 保存用户到本地会话
            console.log("正确");
            this.$router.push('/Home')// 登录成功，跳转到主页
          }).catch((res) => {
            // console.log("错误")
            alert("用户不存在!")
            // alert(res);
          });
          this.$router.push('/Home');
        }        
      });
    },
    //忘记密码
    gotopassword(){
      this.$router.push('/Password')
      // next("/Password")
      // alert("点击后");
    },
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },    
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  /* border: 1px solid cadetblue; */
}
#main {
  width: 100%;
  height: 735px;
  background-color: lightcyan;
  position: relative;
}
.logo {
  /* width: 100%;
  height: 200px;
  background-color: lightsteelblue;
  line-height: 200px;
  margin-top: 90px;
  font-family: "宋体";
  font-size: 25px;
  position: absolute; */
  height: 60px;
  line-height: 60px;  
  /* background-color: darkseagreen; */
}
.login{
  /* width: 350px; */
  /* width: 360px; */
  height: 360px;
  background-color: lightcyan;
  margin-top: 200px;
  margin-left: 550px;
  position: absolute;
  border: 1px solid darkslateblue;
  text-shadow: #ee82ee;
  box-shadow: 2px 2px darkslateblue;
  border-radius: 10px;
  background-color: rgba(70, 154, 202, 0.2);
  /* background-color: white; */
}
.login-form{
  width: 350px;
}
.el-form-item{
  margin-bottom: 20px;
  font-size: 34px;
}
.identifybox {
  display: flex;
  justify-content: space-between;
  /* margin-top: 5px; */
  margin-right: 35px;
  margin-left: 35px;
  margin-bottom: -20px;
}
.iconstyle {
  color: #409eff;
}
/* .login-submit */
.el-button{
    /* width: 200px; */
    width: 100px;
    height: 40px;
    /* margin-top: -50px;
    margin-right: 22px; */
}
</style>