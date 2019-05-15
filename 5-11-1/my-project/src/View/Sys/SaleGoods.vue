<template>
  <!-- 产品销售 -->
  <div class="container" style="width:100%">
    <!-- 工具栏 -->
    <div class="toolbar" style="float:left;padding:18px;">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="formProduct_sales" class="demo-form-inline">
        <el-form-item label="商品销售">
          <el-input v-model="formProduct_sales.product" placeholder="商品id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
         <el-form-item>
          <el-button label="新增" type="primary" @click="handleAdd" />
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格内容栏 -->
      <el-table ref="Product_storage Table" :data="productData" border style="width: 100%" 
    @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column fixed prop="productId" label="商品Id" width="120">
        </el-table-column>
        <!-- <el-table-column prop="storageId" label="库房Id" width="120"> -->
        <!-- </el-table-column> -->
        <el-table-column prop="userId" label="销售人员" width="120">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="120">
        </el-table-column>
        <el-table-column prop="price" label="商品单价" width="150">
        </el-table-column>
        <!-- <el-table-column prop="email" label="邮箱" width="150"> -->
        <!-- </el-table-column> -->
        <!-- <el-table-column prop="address" label="家庭地址" width="200" show-overflow-tooltip> -->
        <!-- </el-table-column> -->
        <el-table-column label="售出时间" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <div class="fenye" style="float:right">
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
        <div style="margin-top: 20px;float:left">
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">批量删除</el-button>
        </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formProduct_sales: {
          product: ''
         
        },
        productData:[{
          productId:'20101102',
        //   storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        }],
        // multipleSelection:[]
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