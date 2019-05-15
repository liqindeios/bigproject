<template>
  <div class="container">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" style="font-size:18px;">
        <!-- <a href="www.baidu.com">{{ item.name }}</a> -->
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {

  },
  mounted() {
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 245px;
  right: 0px;
}
.el-breadcrumb {
  height: 25px;
  border: 1px solid lightgray;
}
</style>