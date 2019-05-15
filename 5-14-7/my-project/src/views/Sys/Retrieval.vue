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
      <el-table ref="Exit_storage Table" border style="width: 100%" @selection-change="handleSelectionChange"
      :data="outproductData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
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
            <el-button type="danger" @click="deleteRow(scope.$index, outproductData)">
              <i class="el-icon-delete"></i>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="botToolbar" style="margin-top:20px;">
        <div style="float:left">
          <el-button type="danger" :disabled="true">批量删除</el-button>
        </div>
        <div class="fenye" style="float:right">
          <el-pagination background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="currentPage"
            :page-size="pagesize"
            :total="outproductData.length">
          </el-pagination>
        </div>
      </div>

      <!--新增界面-->
      <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="addDialogVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
          <el-form-item label="日期" prop="productDate">
            <el-input v-model="addForm.productDate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="productName">
            <el-input v-model="addForm.productName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格" prop="productSize">
            <el-input v-model="addForm.productSize" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="productNum">
            <el-input v-model="addForm.productNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="productPrice">
            <el-input v-model="addForm.productPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额" prop="productAmount">
            <el-input v-model="addForm.productAmount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货单号" prop="productNol">
            <el-input v-model="addForm.productNol" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addDialogVisible=false">取消</el-button>
          <el-button type="primary" @click.native="handleconfirm('addForm')">提交</el-button>
        </div>
      </el-dialog>
      <!-- 编辑页面 -->
      <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
          <el-form-item label="日期" prop="productDate">
            <el-input v-model="editForm.productDate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="productName">
            <el-input v-model="editForm.productName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格" prop="productSize">
            <el-input v-model="editForm.productSize" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="productNum">
            <el-input v-model="editForm.productNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="productPrice">
            <el-input v-model="editForm.productPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额" prop="productAmount">
            <el-input v-model="editForm.productAmount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货单号" prop="productNol">
            <el-input v-model="addForm.productNol" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editDialogVisible=false">取消</el-button>
          <el-button type="primary" @click.native="handleconfirm('editForm')">提交</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addDialogVisible: false,
        editDialogVisible: false,
        currentPage: 1, //初始页
        pagesize: 5,    //    每页的数据
        formExit_storage: {
          product: ''
        },
        index: '',
        row: '',
        addForm: {
          productDate: '',
          productName: '',
          productSize: '',
          productNum: '',
          productPrice: '',
          productAmount: '',
          productNol: '',
        },
        editForm: {
          productDate: '',
          productName: '',
          productSize: '',
          productNum: '',
          productPrice: '',
          productAmount: '',
          productNol: '',
        },
        outproductData:[{
          productDate:'2019-04-03',
          productName:'雪花牌',
          productSize:'A1',
          productNum: '23',
          productPrice: '3',
          productAmount: '31231',
          productNol: '323131',
        }],
        dataFormRules:{

        }
      }
    },
    methods: {
      operation(){
      },
      onSubmit() {
        console.log('submit!');
      },
      handleAdd(){
        // console.log("dasd")
        this.addDialogVisible = true;
      },
      handleEdit(index, row) {
        this.editDialogVisible = true;
        this.editForm = Object.assign({}, row); //这句是关键！！！
        this.index = index
      },
      handleconfirm(forName){
        if(forName == "addForm"){
          this.outproductData.push(this.addForm),
          this.addForm={
            productDate: '',
            productName: '',
            productSize: '',
            productNum: '',
            productPrice: '',
            productAmount: '',
            productNol:''
          }
        }
        if(forName == "editForm"){
          this.outproductData.splice(this.index, 1);
          this.outproductData.push(this.editForm)
        }
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val
      },
      // handleEdit(index, row) {
      //   console.log(index, row);
      // },
      // handleDelete(index, row) {
      //   console.log(index, row);
      // }
    }
  }
</script>

<style>
</style>