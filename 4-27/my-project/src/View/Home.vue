<template>
  <div class="container">
      <!-- 导航菜单栏 -->
      <!-- <nav-bar></nav-bar> -->
      <!-- 头部区域 -->
      <!-- <head-bar></head-bar> -->
      <!-- 主内容区域 -->
      <!-- <main-content></main-content> -->
      <h2>Home Page</h2>
      <!-- <el-button type="primary" @click="testAxios()">测试axios调用</el-button> -->
      <!-- <el-button type="primary" @click="getUser()">获取用户信息</el-button>
      <el-button type="primary" @click="getMenu()">获取菜单信息</el-button> -->
      <!-- <el-button type="primary" @click="login()">登录</el-button> -->        
  </div>
</template>

<script>
// import HeadBar from "./HeadBar/HeadBar"
// import NavBar from "./NavBar/NavBar"
// import MainContent from "./MainContent/MainContent"

// import axios from 'axios'
import mock from "@/mock/index.js";
import Cookies from "js-cookie";
import router from "@/router";
export default {
  name: "Home",
  // components:{
  //     HeadBar,
  //     NavBar,
  //     MainContent
  // }
  methods: {
    // testAxios(){
    //   axios.get('http://localhost:8080').then(function(res){
    //     alert(res.data);
    //   }).catch(function(res){
    //     alert(res);
    //   });
    // }
    // getUser(){
    //   axios.get('http://localhost:8080/user').then(function(res){
    //     alert(JSON.stringify(res.data));
    //   }).catch(function(res){
    //     alert(res);
    //   });
    // },
    // getMenu(){
    //   axios.get('http://localhost:8080/menu').then(function(res){
    //     alert(JSON.stringify(res.data));
    //   }).catch(function(res){
    //     alert(res);
    //   });
    // }
    login() {
      this.$api
        .login()
        .then(function(res) {
          alert(res.data.token);
          Cookies.set("token", res.data.token); //放置token到Cookie
          router.push("/"); //登陆成功，跳转到主页
        })
        .catch(function(res) {
          alert(res);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(224, 234, 235, 0.1);
}
</style>