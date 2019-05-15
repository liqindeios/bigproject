<template>
    <!-- 用户个人信息 -->
  <el-table :data="UserTable" border style="width: 100%">
    <el-table-column type="expand">
        <!-- 隐藏的信息 -->
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                    <span>{{ props.row.username }}</span>
                </el-form-item>
                <el-form-item label="出生日期">
                    <span>{{ props.row.birthday }}</span>
                </el-form-item>
                <el-form-item label="性别">
                    <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item label="员工工号 ID">
                    <span>{{ props.row.userid }}</span>
                </el-form-item>
                <el-form-item label="职位">
                    <span>{{ props.row.position }}</span>
                </el-form-item>
                <el-form-item label="电话号码">
                    <span>{{ props.row.tel }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="工龄">
                    <span>{{ props.row.workyear }}</span>
                </el-form-item>
                <el-form-item label="地址">
                    <span>{{ props.row.address }}</span>
                </el-form-item>
            </el-form>
        </template>
    </el-table-column>
    <!-- 显示的信息 -->
    <el-table-column label="员工工号 ID" prop="userid"></el-table-column>
    <el-table-column label="姓名" prop="username"></el-table-column>
    <el-table-column label="职位" prop="position"></el-table-column>
    <el-table-column label="电话号码" prop="tel"></el-table-column>
    <el-table-column label="地址" prop="address"></el-table-column>
    <el-table-column label="工龄" prop="workyear"></el-table-column>
  </el-table>
</template>

<script>
import axios from '@/http/axios';
  export default {
    data() {
      return {
        UserTable: [],
        userInfo:{
            userid: '',
            username: '',
            gender: '',
            birthday: '',
            position: '',
            tel: '',
            address: '',
            workyear: '',
            email: '',
            photo: ''
        }
      }
    },
    mounted(){
        var u = sessionStorage.user;
        var user = JSON.parse(u);
        // console.log(user.username);
        this.userInfo.userid=user.userid
        this.userInfo.username=user.username
        this.userInfo.gender=user.gender
        this.userInfo.birthday=user.birthday
        this.userInfo.position=user.position
        this.userInfo.tel=user.tel
        this.userInfo.address=user.address
        this.userInfo.workyear=user.workyear
        this.userInfo.email=user.email
        this.UserTable.push(this.userInfo)
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>