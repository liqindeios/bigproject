<template>
  <!-- 业务员销售表 -->
  <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
    <!-- 工具栏 -->
    <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
      <!-- 行内表单 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item prop="username">
          <!-- v-model="formEnter_storage.product" -->
          <el-input placeholder="业务员" v-model="searchform.username" style="width:430px"></el-input>
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
     <!-- :data="inproductData" -->
     <!-- " -->
     <!-- @selection-change='selectRow' -->
    <!-- 表格内容栏 -->
      <el-table
      ref="Find"
      :data="inproductData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border style="width: 100%" 
      height="500"
      show-summary
      @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="userName" label="业务员" width="90">
        </el-table-column>
         <el-table-column prop="userDate" label="日期" width="100">
        </el-table-column>
        <el-table-column prop="orderUnit" label="订货单位" width="100">
        </el-table-column>
        <el-table-column prop="productName" label="名称" width="100">
        </el-table-column>
        <el-table-column prop="productSize" label="规格" width="100">
        </el-table-column>
        <el-table-column prop="productNum" label="数量" width="100">
        </el-table-column>
        <el-table-column prop="productPrice" label="单价" width="100">
        </el-table-column>
        <el-table-column prop="userSale" label="销售额" width="100">
        </el-table-column>
        <el-table-column prop="amountAlready" label="已结款额" width="100">
        </el-table-column>
        <el-table-column prop="amountOut" label="未结款额" width="100">
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
      <!--新增界面-->
      <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="addDialogVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
          <el-form-item label="业务员" prop="userName">
            <el-input v-model="addForm.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="userDate">
            <el-input v-model="addForm.userDate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订货单位" prop="orderUnit">
            <el-input v-model="addForm.orderUnit" auto-complete="off"></el-input>
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
          <el-form-item label="单价" prop="productSPrice">
            <el-input v-model="addForm.productSPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="销售额" prop="userSales">
            <el-input v-model="addForm.userSales" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="已结款额" prop="amountAlready">
            <el-input v-model="addForm.amountAlready" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="未结款额" prop="amountOut">
            <el-input v-model="addForm.amountOut" auto-complete="off"></el-input>
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
          <el-form-item label="业务员" prop="userName">
            <el-input v-model="editForm.userName" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="日期" prop="userDate">
            <el-input v-model="editForm.userDate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订货单位" prop="orderUnit">
            <el-input v-model="editForm.orderUnit" auto-complete="off"></el-input>
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
          <el-form-item label="单价" prop="productSPrice">
            <el-input v-model="editForm.productSPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="销售额" prop="userSales">
            <el-input v-model="editForm.userSales" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="已结款额" prop="amountAlready">
            <el-input v-model="editForm.amountAlready" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="未结款额" prop="amountOut">
            <el-input v-model="editForm.amountOut" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editDialogVisible=false">取消</el-button>
          <el-button type="primary" @click.native="handleconfirm('editForm')">提交</el-button>
        </div>
      </el-dialog>
  </div>
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
        searchform:{
          username: ''
        },
        index: '',
        row: '',
        inproductData:[],
         addForm: {
          userName: '',
          userSales: '',
          orderUnit: '',
          productName: '',
          productSize: '',
          productNum: '',
          productSPrice: '',
          userSales: '',
          amountAlready: '',
          amountOut: '',
        },
        editForm: {
          userName: '',
          userSales: '',
          orderUnit: '',
          productName: '',
          productSize: '',
          productNum: '',
          productSPrice: '',
          userSales: '',
          amountAlready: '',
          amountOut: '',
        },
        search:'',
        dataFormRules:{
        }
      }
    },
    mounted() {
    //表格初始化
    this.$api.inte.getProductSale().then((res) => {
        console.log("员工销售信息",res)
        this.inproductData=res.informations
      })
    },
    methods: {
      //搜索业务员销售
      handleSearch(){
        if(this.searchform.username == ""){
          alert("输入为空！")
        }else{
          let userproduct = {username:this.searchform.username}
          this.$api.inte.findProductSalename(userproduct).then((res) => {
              console.log(res.message)
              console.log(res.productInformation)
              // this.inproductData = []
              this.inproductData=res.productInformation
          })
        } 
      },
      operation(){
      },
      //删除
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
      handleAdd(){
        this.addDialogVisible = true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
          userName: '',
          userSales: '',
          orderUnit: '',
          productName: '',
          productSize: '',
          productNum: '',
          productSPrice: '',
          userSales: '',
          amountAlready: '',
          amountOut: '',
          }
        }
        if(forName == "editForm"){
          this.inproductData.splice(this.index, 1);
          this.inproductData.push(this.editForm)
        }
      },
       // 删除选中行
      // delData () {
      //   for (let i = 0; i < this.selectlistRow.length; i++) {
      //     let val = this.selectlistRow
      //     // 获取选中行的索引的方法
      //     // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
      //     // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
      //     val.forEach((val, index) => {
      //       this.inproductData.forEach((v, i) => {
      //         if (val.rowNum === v.rowNum) {
      //           // i 为选中的索引
      //           this.inproductData.splice(i, 1)
      //         }
      //       })
      //     })
      //   }
      //   // 删除完数据之后清除勾选框
      //   // this.$refs.inproductData.clearSelection()
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
      onSubmit() {
        // console.log('submit!');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // handleDelete(index, row) {
      //   console.log(index, row);
      // },
      // 获取分页数据
      // findPage: function (data) {
      //   if(data !== null) {
      //     this.pageRequest = data.pageRequest
      //   }
      //   this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name}}
      //   this.$api.user.findPage(this.pageRequest).then((res) => {
      //     this.pageResult = res.data
      //   })
      // },
    }
  }
</script>