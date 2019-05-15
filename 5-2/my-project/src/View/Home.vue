<template>
    <div class="headbar">
        <el-row class="container">
            <el-col :span="24" class="header">
                <el-col :span="5" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
                    <img :src="this.logo"/>
                    {{isCollapse?sysName:sysName}}
                </el-col>
                <el-col :span="1">
                <div class="tools" @click.prevent="collapse">
                    <i class="el-icon-menu"></i>
                </div>
                    <i class="fa fa-align-justify"></i>
            </el-col>
                <el-col :span="13"> 
                    <div class="hearNavBar">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#4b5f6e" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="handleSelectHearNavBar">
                            <el-menu-item index="1" @click="$router.push('Main')">首页</el-menu-item>
                            <el-menu-item index="2" @click="$router.push('User')">消息中心</el-menu-item>
                            <el-menu-item index="3">订单管理</el-menu-item>
                            <el-menu-item index="4">员工管理</el-menu-item>
                            <el-menu-item index="5">财务管理</el-menu-item>
                            <!-- <el-dropdown style="float:right;">
                                <el-button type="" class="elbtn">
                                    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>黄金糕</el-dropdown-item>
                                    <el-dropdown-item>狮子头</el-dropdown-item>
                                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> -->
                        </el-menu>
                    </div>                
                </el-col>
                <el-col :span="5" class="userinfo" style="float:right;background:#4b5f6e;height:60px;line-height:60px;">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner"><img :src="this.userAvatar" /> {{username}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside class="aside">
            <!--导航菜单-->
            <el-menu default-active="1-3" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">库房管理</span>
                    </template>
                    <el-menu-item index="1-1">入库管理</el-menu-item>
                    <el-menu-item index="1-2">出库管理</el-menu-item>
                    <!-- <el-menu-item index="1-3">选项3</el-menu-item> -->
                </el-submenu>
            <!-- <el-menu-item index="2">                
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item> -->
            <el-submenu index="2">
                <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">员工管理</span>
                    </template>
                    <el-menu-item index="2-1">员工信息</el-menu-item>
                    <el-menu-item index="2-2">员工工资</el-menu-item>
            </el-submenu>
          <!-- <el-menu-item index="3" disabled> -->
         <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">财务管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item> -->
        </el-menu>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="20" class="breadcrumb-container" style="float:right;">
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>          
        </el-col>
    </el-row>
    </div>
</template>

<script>
import axios from "axios";
import mock from "@/mock/index.js";
import Cookie from "js-cookie";
import router from "@/router";
export default {
  name: "Home",
  data() {
    return {
      username: "点击头像"
    };
  },
  methods: {
    openWindow(url) {
      window.open(url);
    },
    selectNavBar(key, keyPath) {
      console.log(key, keyPath);
    },
    //折叠导航栏
    collapse: function() {
      this.isCollapse = !this.isCollapse;
    },
    //语言切换
    // handleCommand(command) {
    //   let lang = command === "" ? "zh" : command;
    //   this.$i18n.locale = lang;
    // },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确定退出吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.push("/");
        })
        .catch(() => {});
    },
    mounted() {
      this.sysName = "哈哈";
      this.logo = require("@/assets/logo.png");
      var user = sessionStorage.getItem("user");
      if (user) {
        this.username = user;
        this.userAvatar = require("@/assets/user.png");
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* border: 1px solid red; */
}
.headbar {
  background-color: white;
}
.elbtn {
  height: 40px;
  margin: 10px;
}
.el-menu-vertical-demo {
  width: 254px;
  /* background-color: cyan; */
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
