<template>
  <!-- 入库 -->
  <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
    <!-- 工具栏 -->
    <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="formEnter_storage" class="demo-form-inline">
        <el-form-item>
          <!-- v-model="formEnter_storage.product" -->
          <el-input placeholder="商品id" v-model="search" style="width:430px"></el-input>
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
     <!-- :data="inproductData" -->
     <!-- " -->
     <!-- @selection-change='selectRow' -->
    <!-- 表格内容栏 -->
      <el-table
      ref="Find"
      :data="inproductData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
       border style="width: 100%" 
       height="500"
       @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column fixed prop="productId" label="商品Id" width="120">
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
        <!-- <el-table-column prop="remark" label="备注" width="150">
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="220" >
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit-outline"></i>编辑
            </el-button>
            <!-- @click.prevent="delData()" -->
            <el-button type="danger" 
            @click.native.prevent="deleteRow(scope.$index, inproductData)">
              <i class="el-icon-delete"></i>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="botToolbar" style="margin-top:20px;">
        <div style="float:left">
          <!--  @click="handleDelete(scope.$index, scope.row)" -->
          <el-button type="danger"
          >批量删除</el-button>
        </div>
        <div class="fenye" style="float:right;">
          <!-- layout="sizes, prev, pager, next" -->
          <el-pagination background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="currentPage"
            :page-size="pagesize"
            :total="inproductData.length"
            >
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5,    //    每页的数据
        formEnter_storage: {
          product: ''
        },
        inproductData: [
          {
          productId:'000001',
          storageId:'00000',
          num:'56',
          userId:'20161103',
          price:'55',
          date:'2016-09-08',
          remark: '备注'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        },{
          productId:'20101102',
          storageId:'00000',
          num:'56',
          userId:'20161103',
        //   tel:'11111111',
        //   email:'222222',
          price:'55',
          date:'2016-09-08'
        }],
        search: ''
      }
    },
    computed:{
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val
      },
       // 删除选中行
      delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.inproductData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.inproductData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        // this.$refs.inproductData.clearSelection()
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
      onSubmit() {
        // console.log('submit!');
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
      },
      // 获取分页数据
      findPage: function (data) {
        if(data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name}}
        this.$api.user.findPage(this.pageRequest).then((res) => {
          this.pageResult = res.data
        })
      },
    }
  }
</script>