<template>
  <!-- 入库管理 -->
  <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
    <!-- 工具栏 -->
    <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
      <!-- 行内表单 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <!-- v-model="formEnter_storage.product" -->
          <el-input placeholder="商品id" v-model="searchform.id" style="width:430px"></el-input>
          <el-input placeholder="商品名称" v-model="searchform.name" style="width:430px"></el-input>
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
       @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="230">
        </el-table-column>
        <el-table-column prop="id" label="入库单号" width="120">
        </el-table-column>
        <el-table-column prop="productid" label="名称" width="150">
        </el-table-column>
        <el-table-column prop="productsize" label="规格" width="120">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="120">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="120">
        </el-table-column>
        <el-table-column prop="productAmount" label="金额" width="120">
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
          <el-form-item label="日期" prop="date">
            <el-input v-model="addForm.date" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="入库单号" prop="id">
            <el-input v-model="addForm.id" auto-complete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="名称" prop="productid">
            <el-input v-model="addForm.productid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格" prop="productsize">
            <el-input v-model="addForm.productsize" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input v-model="addForm.num" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="addForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="金额" prop="productAmount">
            <el-input v-model="addForm.productAmount" auto-complete="off"></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addDialogVisible=false">取消</el-button>
          <el-button type="primary" @click.native="handleconfirm('addForm')">提交</el-button>
        </div>
      </el-dialog>
      <!-- 编辑页面 -->
      <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
          <el-form-item label="日期" prop="date">
            <el-input v-model="editForm.date" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库单号" prop="id">
            <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="productid">
            <el-input v-model="editForm.productid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格" prop="productsize">
            <el-input v-model="editForm.productsize" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input v-model="editForm.num" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="editForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="金额" prop="productAmount">
            <el-input v-model="editForm.productAmount" auto-complete="off"></el-input>
          </el-form-item> -->
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
        searchform:{
          id: '',
          name:''
        },
        addForm: {
          id:'',
          date: '',
          productid: '',
          productsize: '',
          num: '',
          price: ''
          // productAmount: ''
        },
        editForm: {
          id: '',
          date: '',
          productid: '',
          productsize: '',
          num: '',
          price: ''
          // productAmount: ''
        },
        inproductData:[],
        search: '',
        dataFormRules: {
          date: [
            { required: true, message: '请输入日期', trigger: 'blur' }
          ]},
        }
    },
    mounted() {
      this.$api.inte.getProduct().then((res)=>{
        console.log("信息")
        console.log("入库产品信息",res.informations)
        this.inproductData=res.informations
      })
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
          this.$refs.dataForm.validate(valid => {
            if (valid) {
              let productInfo = {
                    userid:JSON.parse(sessionStorage.user).userid,
                    // id:this.addForm.id,
                    date:this.addForm.date,
                    productid:this.addForm.productid,
                    productsize:this.addForm.productsize,
                    num:this.addForm.num,
                    price:this.addForm.price
                    // productAmount:this.addForm.productAmount
              }
              console.log("productInfo",productInfo)
              this.$api.inte.addProduct(productInfo).then((res)=>{
                // var user = 
                // console.log("user",user.userid)
                console.log(res.message)
                // this.inproductData.push(this.addForm),
                this.addForm={
                  id:'',
                  date: '',
                  productid: '',
                  productsize: '',
                  num: '',
                  price: ''
                  // productAmount: ''
                }
              })
            }
          })
        }
        if(forName == "editForm"){
          this.$refs.dataForm.validate(valid => {
            if (valid) {
              let productInfo = {
                    userid:JSON.parse(sessionStorage.user).userid,
                    id:this.editForm.id,
                    date:this.editForm.date,
                    productid:this.editForm.productid,
                    productsize:this.editForm.productsize,
                    num:this.editForm.num,
                    price:this.editForm.price
                    // productAmount:this.editForm.productAmount
              }
              console.log("UpdataproductInfo",productInfo)
              this.$api.inte.updateProduct(productInfo).then((res)=>{
                console.log(res.message)
                console.log(JSON.parse(sessionStorage.user).userid)
                // this.inproductData.push(this.addForm),
                this.addForm={
                  id:'',
                  date: '',
                  productid: '',
                  productsize: '',
                  num: '',
                  price: ''
                  // productAmount: ''
                }
              })
            }
          })
          // this.inproductData.splice(this.index, 1);
          // this.inproductData.push(this.editForm)
        }
      },
      //搜索入库单号
      handleSearch(){
          let product = {id:this.searchform.id}
          this.$api.inte.findProduct(product).then((res) => {
              console.log(res.message)
              this.inproductData = []
              this.inproductData.push(res.enterStorageInformation)
          })
          // let productname = {id:this.searchform.name}
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