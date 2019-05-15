<template>
  <div class="NavBar">
    <!-- logo -->
    <div class="logo">
      <img src="@/assets/logo.png"/>
      <div>呵呵</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu default-active="1-1" @open="handleopen" @close="handleclose" @select="handleselect">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>1
        </template>
        <el-menu-item index="1-1" @click="$router.push('/SysMng/Main')">用户管理</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push('/SysMng/User')">菜单管理</el-menu-item>
        <el-menu-item index="1-3" @click="$router.push('')">菜单管理</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('')">菜单管理</el-menu-item>
        <el-menu-item index="1-5" @click="$router.push('')">菜单管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>2
        </template>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>3
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>4
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
components:{
    // MenuTree
  },
  computed: {
    ...mapState({
      appName: state=>state.app.appName,
      navTree: state=>state.menu.navTree,
    //   menuTree: state=>state.menu.menuTree
    }),
    mainTabs: {
      get () { return this.$store.state.tab.mainTabs },
      set (val) { this.$store.commit('updateMainTabs', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.tab.mainTabsActiveName },
      set (val) { this.$store.commit('updateMainTabsActiveName', val) }
    }
  },
//   mounted:function(){
//     this.findMenuTree()
//   },
  watch: {
    $route: 'handleRoute'
  },
  created () {
    this.handleRoute(this.$route)
  },
  methods: {
    handleopen() {
      console.log('handleopen')
    },
    handleclose() {
      console.log('handleclose')
    },
    handleselect(a, b) {
      console.log('handleselect')
    },
    // 路由操作处理
    handleRoute (route) {
      // tab标签页选中, 如果不存在则先添加
      var tab = this.mainTabs.filter(item => item.name === route.name)[0]
      if (!tab) {
        tab = {
          name: route.name,
          title: route.name,
          icon: route.meta.icon
        }
        this.mainTabs = this.mainTabs.concat(tab)
      }
      this.mainTabsActiveName = tab.name
      // 切换标签页时同步更新高亮菜单
      if(this.$refs.navmenu != null) {
        this.$refs.navmenu.activeIndex = '' + route.meta.index
        this.$refs.navmenu.initOpenedMenu()
      }
    },
    //加载导航菜单
    // findMenuTree(){
    //   this.$api.menu.findMenuTree.then((res) => {
    //     this.$store.commit('setMenuTree',res,data)
    //   }).catch((res) => {
    //     alert(res);
    //   });
    // }
  }
}
</script>

<style scoped lang="scss">
.NavBar{
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  z-index: 1020;
  background-color: #4b5f6e;
  .el-menu {
    position: absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
    width: 245px;
    // background-color: #2968a30c;
  }
  .logo {
    width: 245px;
    position:absolute;
    top: 0px;
    height: 60px;   
    line-height: 60px;
    background: #4b5f6e;
    cursor:pointer;
    img {
        width: 40px;
        height: 40px;
        border-radius: 0px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
    div {
      font-size: 25px;
      color: white;
      text-align: left;
      padding-left: 20px;
    }
  }
}
</style>