<template>
  <!-- 入库管理 -->
  <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
    <!-- 工具栏 -->
    <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
      <!-- 行内表单 -->
      <el-form :inline="true" class="demo-form-inline">
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
        <el-table-column prop="productDate" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="productName" label="名称" width="150">
        </el-table-column>
        <el-table-column prop="productSize" label="规格" width="150">
        </el-table-column>
        <el-table-column prop="productNum" label="数量" width="150">
        </el-table-column>
        <el-table-column prop="productPrice" label="单价" width="150">
        </el-table-column>
        <el-table-column prop="productAmount" label="金额" width="150">
        </el-table-column>
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
          <el-button type="danger" :disabled="true">批量删除</el-button>
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
            :total="inproductData.length">
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
            <el-input v-model="addForm.productNum" type="number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="productPrice">
            <el-input v-model="addForm.productPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额" prop="productAmount">
            <el-input v-model="addForm.productAmount" auto-complete="off"></el-input>
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
        // formEnter_storage: {
        //   product: ''
        // },
        index: '',
        row: '',
        addForm: {
          productDate: '22',
          productName: '',
          productSize: '',
          productNum: '',
          productPrice: '',
          productAmount: ''
        },
        editForm: {
          productDate: '22',
          productName: '',
          productSize: '',
          productNum: '',
          productPrice: '',
          productAmount: ''
        },
        inproductData:[{
          productDate:'2019-04-03',
          productName:'雪花牌',
          productSize:'A1',
          productNum: '23',
          productPrice: '3',
          productAmount: '31231'
        }],
        search: '',
        dataFormRules: {
          date: [
            { required: true, message: '请输入日期', trigger: 'blur' }
          ]},
        }
    },
    computed:{
    },
    methods: {
      operation(){

      },
      //添加
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
          this.inproductData.push(this.addForm),
          this.addForm={
            productDate: '',
            productName: '',
            productSize: '',
            productNum: '',
            productPrice: '',
            productAmount: ''
          }
        }
        if(forName == "editForm"){
          this.inproductData.splice(this.index, 1);
          this.inproductData.push(this.editForm)
        }
      },
      // handleaddconfirm(){
      //   this.inproductData.push(this.addForm),
      //   this.addForm={
      //     productDate: '',
      //     productName: '',
      //     productSize: '',
      //     productNum: '',
      //     productPrice: '',
      //     productAmount: ''
      //   }
      // },
      // handleeditconfirm(){
      //   // console.log(this.index)
      //   this.inproductData.splice(this.index, 1);
      //   // console.log("index",handleEdit(index, row).index)
      //   this.inproductData.push(this.editForm)
      // },
      // addSubmit(){
        // this.inproductData.push(this.addForm)
      // },
      // editForm(){
      // },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage)  //点击第几页
      },
      //删除行
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val
      },
      onSubmit() {
        // console.log('submit!');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // handleEdit(index, row) {
      //   console.log(index, row);
      // },
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