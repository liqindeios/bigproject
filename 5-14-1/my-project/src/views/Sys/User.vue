<template>
    <!-- 用户管理 -->
    <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
        <!-- 工具栏 -->
        <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
            <!-- 行内表单 -->
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="用户名或员工工号" style="width:430px"></el-input>
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
        <el-table border style="width: 100%" height="500"
        :data="UserTable.slice((currentPage-1)*pagesize,currentPage*pagesize)">
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
        <div class="botToolbar" style="margin-top:20px;">
            <div style="float:left">
                <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">批量删除</el-button>
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
    </div>
</template>

<script>
export default {
  data() {
    return {
        pagesize: 5, //每页的数据条数
        currentPage: 1, //默认开始页面
        istag: true,
        editDialogVisible: false, // 新增编辑界面是否显示
        UserTable: [{
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
