<template>
    <!-- 用户管理 -->
    <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
        <!-- 工具栏 -->
        <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
            <!-- 行内表单 -->
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="员工ID" v-model="userId" style="width:430px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">
                        <i class="el-icon-search"></i>查询
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">
                        <i class="el-icon-plus"></i>新增
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 用户信息 -->
        <el-table border style="width: 100%" height="500"
        :data="UserTable.slice((currentPage-1)*pagesize,currentPage*pagesize)">
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
                        <el-form-item label="员工工号 ID">
                            <span>{{ props.row.userid }}</span>
                        </el-form-item>
                        <el-form-item label="职位">
                            <span>{{ props.row.position }}</span>
                        </el-form-item>
                        <el-form-item label="电话号码">
                            <span>{{ props.row.tel }}</span>
                        </el-form-item>
                         <el-form-item label="邮箱" prop="email">
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
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="员工工号 ID" prop="userid"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="职位" prop="position"></el-table-column>
            <el-table-column label="电话号码" prop="tel"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="工龄" prop="workyear" ></el-table-column>
        </el-table>
        <div class="botToolbar" style="margin-top:20px;">
            <div style="float:left">
                <el-button type="danger" :disabled="true">批量删除</el-button>
            </div>
            <div class="fenye" style="float:right">
                <el-pagination background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 15, 20, 25, 30]"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="currentPage"
                :page-size="pagesize"
                :total="UserTable.length">
                </el-pagination>
            </div>
        </div>
        <!--新增界面-->
      <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="addDialogVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
          <el-form-item label="员工ID" prop="userid">
            <el-input v-model="addForm.userid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="username">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-input v-model="addForm.birthday" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input v-model="addForm.position" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="tel">
            <el-input v-model="addForm.tel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="addForm.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="工龄" prop="workyear">
            <el-input v-model="addForm.workyear" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addDialogVisible=false">取消</el-button>
          <el-button type="primary" @click.native="handleconfirm()">提交</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
// import axios from '@/http/axios';
export default {
  data() {
    return {
        userId:'',
        pagesize: 5, //每页的数据条数
        currentPage: 1, //默认开始页面
        istag: true,
        addDialogVisible: false, // 新增编辑界面是否显示
        addForm: {
          userid: '',
          username: '',
          birthday: '',
          position: '',
          tel: '',
          address: '',
          workyear: ''
        },
        UserTable: [],
        dataFormRules: {
            name: [
                { required: true, message: '请输入用户名', trigger: 'blur' }]
        },
    };
    
  },
  mounted() {
    //表格初始化
    this.$api.inte.getUser().then((res) => {
        console.log("员工信息",res.user)
        this.UserTable=res.user
    })
  },
  methods:{
    operation(){
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
    },
    handleAdd(){
        this.addDialogVisible = true
    },
    handleconfirm(){
        this.UserTable.push(this.addForm),
          this.addForm={
            userid: '',
            username: '',
            birthday: '',
            position: '',
            tel: '',
            address: '',
            workyear: ''
          }
    },
    //搜索
    handleSearch(){
        console.log("this.userId",this.userId)
        // var uid = this.userId
        // console.log(uid)
        // let userInfo = {userid:this.loginForm.userid, password:this.loginForm.password}
        let uid = {userId:this.userId}
        // this.$api.inte.findUser(uid).then((res) => {
            // console.log(uid)
        // })
    }
  }
};
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
