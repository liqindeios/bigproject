<template>
  <div class="NavBar">
    <!-- logo -->
    <div class="logo">
      <span style="color:white;">文化用品库房管理系统</span>
    </div>
    <!-- 导航菜单 -->
    <!-- <el-menu ref="navmenu" default-active="1" @open="handleopen" @close="handleclose" @select="handleselect">
      <menu-tree v-for="item in menuTree" :key="item.menuId" :menu="item"></menu-tree>
    </el-menu> -->
    <el-menu ref="navmenu" default-active="1" :unique-opened="true "@open="handleopen" @close="handleclose" @select="handleselect">
      <!-- 导航菜单树组件，动态加载菜单 -->
      <menu-tree v-for="item in menuTree" :key="item.id" :menu="item"></menu-tree>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuTree from "@/components/MenuTree"
export default {
components:{
    MenuTree
  },
  computed: {
    ...mapState({
      // appName: state=>state.app.appName,
      navTree: state=>state.menu.navTree,
      menuTree: state=>state.menu.navTree,
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
  // mounted:function(){
  //   this.findMenuTree()
  // },
  watch: {
    $route: 'handleRoute'
  },
  created () {
    this.handleRoute(this.$route)
  },
  methods: {
    handleopen() {
      // console.log('handleopen')
    },
    handleclose() {
      // console.log('handleclose')
    },
    handleselect(a, b) {
      // console.log('handleselect')
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
    }
    //加载导航菜单
    // findMenuTree(){
    //   this.$api.menu.findMenuTree().then((res) => {
    //     this.$store.commit('setMenuTree',res.data)
    //     //添加动态路由
    //     let routes = this.addDynamicMenuRoutes(res.data)
    //     for(var i = 0;i < routes.length;i++){
    //       this.$router.options.routes[0].children.push(routes[i])
    //     }
    //     this.$router.addRoutes(this.$router.options.routes);
    //   })
    //   .catch(function(res) {
    //     alert(res);
    //   });
    //   // console.log("输出")
    //   // console.log(this.$store.state.menu.navTree[2])
    // },
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