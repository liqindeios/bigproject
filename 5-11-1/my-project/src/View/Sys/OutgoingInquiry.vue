<template>
    <!-- 出库单查询 -->
    <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
        <!-- 工具栏 -->
        <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
        <!-- 行内表单 -->
            <el-form :inline="true" :model="formEnter_storage" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="formEnter_storage.product" placeholder="出库单号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">
                        <i class="el-icon-search"></i>查询
                        </el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item> -->
            </el-form>
        </div>
        <!-- 表格内容栏 -->
        <el-table ref="Enter_storage Table" :data="inproductData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column fixed prop="productId" label="出库单号" width="120">
            </el-table-column>
            <el-table-column prop="storageId" label="库房Id" width="120">
            </el-table-column>
            <el-table-column prop="num" label="数量" width="120">
            </el-table-column>
            <el-table-column prop="userId" label="库房管理人员" width="120">
            </el-table-column>
            <el-table-column prop="price" label="商品单价" width="120">
            </el-table-column>
            <el-table-column label="入库时间" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="260">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220" >
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)">
                      <i class="el-icon-edit-outline"></i>编辑
                    </el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                      <i class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="botToolbar" style="margin-top:20px;">
            <div style="float:left">
                <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">批量删除</el-button>
            </div>
            <div class="fenye" style="float:right">
                <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      total: 1000, //默认数据总数
      pagesize: 2, //每页的数据条数
      currentPage: 1, //默认开始页面
      istag: true,
      formEnter_storage: {
      product: ""
      },
      inproductData: [
        {
          productId: "20101102",
          storageId: "00000",
          num: "56",
          userId: "20161103",
          //   tel:'11111111',
          //   email:'222222',
          price: "55",
          date: "2016-09-08"
        },
        {
          productId: "20101102",
          storageId: "00000",
          num: "56",
          userId: "20161103",
          //   tel:'11111111',
          //   email:'222222',
          price: "55",
          date: "2016-09-08"
        },
        {
          productId: "20101102",
          storageId: "00000",
          num: "56",
          userId: "20161103",
          //   tel:'11111111',
          //   email:'222222',
          price: "55",
          date: "2016-09-08"
        },
        {
          productId: "20101102",
          storageId: "00000",
          num: "56",
          userId: "20161103",
          //   tel:'11111111',
          //   email:'222222',
          price: "55",
          date: "2016-09-08"
        },
        {
          productId: "20101102",
          storageId: "00000",
          num: "56",
          userId: "20161103",
          //   tel:'11111111',
          //   email:'222222',
          price: "55",
          date: "2016-09-08"
        },
        {
          productId: "20101102",
          storageId: "00000",
          num: "56",
          userId: "20161103",
          //   tel:'11111111',
          //   email:'222222',
          price: "55",
          date: "2016-09-08"
        },
        {
          productId: "20101102",
          storageId: "00000",
          num: "56",
          userId: "20161103",
          //   tel:'11111111',
          //   email:'222222',
          price: "55",
          date: "2016-09-08"
        }
      ]
      // multipleSelection:[]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleAdd() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style>
</style>
