<template>
  <div class="container">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" style="font-size:18px;">
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import axios from '@/http/axios';
export default {
  components:{
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
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
  margin-top: 5px;
  height: 25px;
  border-bottom: 1px solid gray;
}
</style>