<template>
  <!-- 出库管理 -->
  <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
    <!-- 工具栏 -->
    <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
      <!-- 行内表单 -->
      <el-form :inline="true" v-model="searchform" class="demo-form-inline">
        <!-- <el-form-item label="出库商品"> -->
        <el-form-item>
          <el-input placeholder="商品id号" v-model="searchform.id" style="width:430px"></el-input>
        </el-form-item>
        <el-form-item>
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
    <!-- 表格内容栏 -->
      <el-table ref="Exit_storage Table" border style="width: 100%" @selection-change="handleSelectionChange" height="500"
      :data="outproductData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="250">
        </el-table-column>
        <el-table-column prop="id" label="出库单号" width="180">
        </el-table-column>
        <el-table-column prop="productId" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="productsize" label="规格" width="180">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="180">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit-outline"></i>编辑
            </el-button>
            <el-button type="danger" @click="deleteRow(scope.$index, scope.row)">
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
          <el-form-item label="日期" prop="date">
            <el-input v-model="addForm.date" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
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
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
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
        // formExit_storage: {
        //   product: ''
        // },
        index: '',
        row: '',
        searchform:{
          id: '',
          name: ''
        },
        addForm: {
          // date productId num price productsize
          date: '',
          productId: '',
          num: '',
          price: '',
          productsize: ''
        },
        editForm: {
          date: '',
          productId: '',
          num: '',
          price: '',
          productsize: ''
        },
        outproductData:[],
        dataFormRules:{

        }
      }
    },
    mounted() {
      this.$api.inte.getoutProduct().then((res)=>{
        // console.log("信息")
        console.log("出库产品信息",res)
        this.outproductData=res.informations
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
      // handleconfirm(forName){
      //   if(forName == "addForm"){
      //     this.outproductData.push(this.addForm),
      //     this.addForm={
      //       date: '',
      //       productId: '',
      //       num: '',
      //       price: '',
      //       productsize: ''
      //     }
      //   }
      //   if(forName == "editForm"){
      //     this.outproductData.splice(this.index, 1);
      //     this.outproductData.push(this.editForm)
      //   }
      // },
      //添加和编辑
      handleconfirm(forName){
        if(forName == "addForm"){
          this.$refs.dataForm.validate(valid => {
            if (valid) {
              let productInfo = {
                    userid:JSON.parse(sessionStorage.user).userid,
                    // id:this.addForm.id,
                    date:this.addForm.date,
                    productId:this.addForm.productId,
                    num:this.addForm.num,
                    productsize:this.addForm.productsize,
                    price:this.addForm.price
                    // productAmount:this.addForm.productAmount
              }
              console.log("productInfo",productInfo)
              this.$api.inte.addoutProduct(productInfo).then((res)=>{
                // var user = 
                // console.log("user",user.userid)
                console.log(res.message)
                // this.inproductData.push(this.addForm),
                this.addForm={
                  // id:'',
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
        }
      },
      //搜索
      handleSearch(){
        if(this.searchform.id != ""){
          let product = {id: this.searchform.id}
          console.log(product)
          this.$api.inte.findoutProduct(product).then((res) => {
              console.log(res.message)
              this.outproductData = []
              this.outproductData.push(res.buyerInformation)
          })
        }
        if(this.searchform.name != ""){
          let name = { productid: this.searchform.name}
          console.log(name)
          this.$api.inte.findoutProductName(name).then((res) => {
              console.log(res.message)
              this.outproductData=res.productInformation
          })
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
      //删除
      deleteRow(index, row) {
        let id = {id:Object.assign({}, row).id}
        // let productInfo
        this.$api.inte.deloutProduct(id).then((res)=>{
          // row.splice(index, 1);
          console.log(res.result)
          alert("删除成功！")
        })
      },
    }
  }
</script>

<style>
</style>