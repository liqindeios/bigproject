<template>
  <div class="HeadBar">
    <!-- 横向导航 -->
    <span class="navbar">
      <el-menu class="el-menu-demo" background-color="#4b5f6e" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/Home')">
          <i class="el-icon-menu"></i>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/Sys/UserInfo')">
          <i class="el-icon-tickets"></i>个人信息
          </el-menu-item>
        <!-- <el-menu-item index="3" @click="$router.push('/Sys/UserIndi')">
          <i class="el-icon-news"></i>个人绩效
          </el-menu-item> -->
      </el-menu>
    </span>
    <!-- 个人消息 -->
    <span class="userbar">
      <el-menu background-color="#4b5f6e">
        <el-menu-item index="1" v-popover:popover-personal>
          <span class="user-info"><img :src="user.avatar" />{{user.name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import mock from "@/mock/index";
import axios from '@/axios';
import { mapState } from 'vuex'
import PersonalPanel from "@/views/Core/PersonalPanel";
export default {
  components:{
    PersonalPanel
  },
  data() {
    return {
      user: {
        name: "hehe",
        avatar: "",
        role: "超级管理员",
        registeInfo: "注册时间：2018-12-20 "
      },
      activeIndex: '1',
    };
  },
  methods: {
    openWindow(url) {
      window.open(url)
    },
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted() {
    this.sysName = "hehe"
    var user = sessionStorage.getItem("user")
    if (user) {
      // this.user.name = user
      this.user.avatar = require("@/assets/user1.png")
    }
  },
  computed:{
    ...mapState({
      // themeColor: state=>state.app.themeColor,
      collapse: state=>state.app.collapse
    })
  }
};
</script>

<style scoped lang="scss">
.HeadBar {
  position: fixed;
  top: 0;
  right: 0;
  left: 245px;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
  background-color: #4b5f6e;
  .navbar {
    float: left;
  }
}
.userbar {
  float: right;
  width: 150px;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}
.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
}
.badge {
  line-height: 18px;
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
</style>
