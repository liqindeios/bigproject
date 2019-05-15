<template>
  <!-- 出库管理 -->
  <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
    <!-- 工具栏 -->
    <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="formExit_storage" class="demo-form-inline">
        <!-- <el-form-item label="出库商品"> -->
        <el-form-item>
          <el-input v-model="formExit_storage.product" placeholder="商品id号" style="width:430px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
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
    <!-- 表格内容栏 -->
      <el-table ref="Exit_storage Table" :data="outproductData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="productDate" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="productName" label="名称" width="130">
        </el-table-column>
        <el-table-column prop="productSize" label="规格" width="120">
        </el-table-column>
        <el-table-column prop="productNum" label="数量" width="120">
        </el-table-column>
        <el-table-column prop="productPrice" label="单价" width="120">
        </el-table-column>
        <el-table-column prop="productAmount" label="金额" width="140">
        </el-table-column>
        <el-table-column prop="productNol" label="送货单号" width="140">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
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
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formExit_storage: {
          product: ''
        },
        outproductData:[{
          productDate:'2019-04-03',
          productName:'雪花牌',
          productSize:'A1',
          productNum: '23',
          productPrice: '3',
          productAmount: '31231',
          productNol: '323131'
        }],
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleAdd(){

      },
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
  }
</script>

<style>
</style>