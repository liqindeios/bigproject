<template>
    <el-col :span="24" class="main">
            <aside class="aside">
        <!--导航菜单-->
        <el-menu default-active="1-3" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item index="2">                
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item> -->
            <el-submenu index="2">
                <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </template>
                    <el-menu-item index="2-1">选项2-1</el-menu-item>
                    <el-menu-item index="2-2">选项2-2</el-menu-item>
            </el-submenu>
          <!-- <el-menu-item index="3" disabled> -->
         <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
            </aside>
        </el-col>
</template>
