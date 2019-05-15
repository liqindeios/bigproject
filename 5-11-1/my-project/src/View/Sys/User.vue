<template>
    <!-- 用户管理 -->
    <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
        <!-- 工具栏 -->
        <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
            <!-- 行内表单 -->
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="用户名或员工工号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">
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
        <el-table :data="UserTable" border style="width: 100%">
            <el-table-column type="expand">
                <!-- 隐藏的信息 -->
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="姓名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <span>{{ props.row.birthday }}</span>
                        </el-form-item>
                        <el-form-item label="员工工号 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="职位">
                            <span>{{ props.row.position }}</span>
                        </el-form-item>
                        <el-form-item label="电话号码">
                            <span>{{ props.row.tele }}</span>
                        </el-form-item>
                         <el-form-item label="邮箱" prop="email">
                            <span>{{ props.row.address }}</span>
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
            <el-table-column label="员工工号 ID" prop="id"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="职位" prop="position"></el-table-column>
            <el-table-column label="电话号码" prop="tele"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="工龄" prop="workyear" ></el-table-column>
        </el-table>
        <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
            <el-form-item label="ID" prop="id">
                <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="dataForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="机构" prop="deptName">
                <popup-tree-input 
                    <!-- :data="deptData" 
                    :props="deptTreeProps" 
                    :prop="dataForm.deptName" 
                    :nodeKey="''+dataForm.deptId" 
                    :currentChangeHandle="deptTreeCurrentChangeHandle" -->
                    >
                </popup-tree-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="dataForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editDialogVisible=false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">提交</el-button>
            <!--  :loading="editLoading" -->
        </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
        editDialogVisible: false, // 新增编辑界面是否显示
        UserTable: [
        {
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        }, {
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        }, {
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        }, {
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        }, {
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        }, {
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        }, {
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        },{
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        },{
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        },{
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        },{
          id: "200912034",
          name: "张世杰",
          birthday: "1989-03-12",
          position: "总经理",
          tele: "01234567890",
          address: "上海市普陀区真北路",
          workyear: "12年"
        }],
        dataFormRules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ]
            },
            // 新增编辑界面数据
            dataForm: {
                id: 0,
                name: '',
                password: '123456',
                deptId: 1,
                deptName: '',
                email: 'test@qq.com',
                mobile: '13889700023',
                status: 1
            },
    };
    
  },
  methods:{
      operation(){

      },
    //   editDialogVisible(){

    //   },
      handleAdd(){
        this.editDialogVisible = true
      },
      editSubmit(){}
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
