<template>
  <!-- 公司月销售表 -->
  <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
    <!-- 工具栏 -->
    <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
      <!-- 行内表单 -->
      <el-form :inline="true" v-model="searchform" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="Id号" v-model="searchform.id" style="width:430px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="业务员" v-model="searchform.name" style="width:430px"></el-input>
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
        <el-table-column prop="id" label="序号" width="220">
        </el-table-column>
        <el-table-column prop="userName" label="业务员" width="220">
        </el-table-column>
        <el-table-column prop="userSales" label="销售额" width="240">
        </el-table-column>
        <el-table-column prop="amountAlready" label="已结款额" width="240">
        </el-table-column>
        <el-table-column prop="amountOut" label="未结款额" width="240">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220" >
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit-outline"></i>编辑
            </el-button>
            <!-- @click.prevent="delData()" -->
            <el-button type="danger" 
            @click.native.prevent="deleteRow(scope.$index, scope.row)">
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
          <el-form-item label="ID" prop="id">
            <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="业务员" prop="userName">
            <el-input v-model="editForm.userName" auto-complete="off"></el-input>
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
        searchform:{
          id: '',
          name: ''
        },
        index: '',
        row: '',
        inproductData:[],
        addForm: {
          userName: '',
          userSales: '',
          amountAlready: '',
          amountOut: '',
        },
        editForm: {
          userName: '',
          userSales: '',
          amountAlready: '',
          amountOut: '',
        },
        search:'',
        dataFormRules:{

        }
      }
    },
    mounted(){
      // getSell
      this.$api.inte.getSell().then((res)=>{
        // console.log("信息")
        console.log("出库产品信息",res)
        this.inproductData=res.informations
      })
    },
    methods: {
      operation(){

      },
      //删除
      deleteRow(index, row) {
        // rows.splice(index, 1);
        let id = {id:Object.assign({}, row).id}
        console.log(id)
        this.$api.inte.delSell(id).then((res)=>{
          // row.splice(index, 1);
          console.log(res.result)
          alert("删除成功！")
        })
      },
      //搜索
      handleSearch(){
        if(this.searchform.id != ""){
          let product = {id: this.searchform.id}
          console.log(product)
          this.$api.inte.findSell(product).then((res) => {
              console.log(res.message)
              this.inproductData = []
              this.inproductData.push(res.enterStorageInformation)
          })
        }
        if(this.searchform.name != ""){
          let name = { username: this.searchform.name}
          console.log(name)
          this.$api.inte.findSellName(name).then((res) => {
              console.log(res.message)
              this.inproductData=res.productInformation
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
              // if(forName == "addForm"){
        //   this.inproductData.push(this.addForm),
        //   this.addForm={
        //     userName: '',
        //     userSales: '',
        //     amountAlready: '',
        //     amountOut: '',
        //   }
        // }
        // if(forName == "editForm"){
        //   this.inproductData.splice(this.index, 1);
        //   this.inproductData.push(this.editForm)
        // }
      handleconfirm(forName){
        if(forName == "addForm"){
          this.$refs.dataForm.validate(valid => {
            if (valid) {
              let productInfo = {
                    // userid:JSON.parse(sessionStorage.user).userid,
                    // id:this.addForm.id,
                    userName:this.addForm.userName,
                    userSales:this.addForm.userSales,
                    amountAlready:this.addForm.amountAlready,
                    amountOut:this.addForm.amountOut
                    // productAmount:this.addForm.productAmount
              }
              console.log("productInfo",productInfo)
              this.$api.inte.addSell(productInfo).then((res)=>{
                // var user = 
                // console.log("user",user.userid)
                console.log(res.message)
                this.inproductData.push(this.addForm),
                this.addForm={
                  // id:'',
                  userName: '',
                  userSales: '',
                  amountAlready: '',
                  amountOut: '',
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
                    id:this.editForm.id,
                    // userid:JSON.parse(sessionStorage.user).userid,
                    userName:this.editForm.userName,
                    userSales:this.editForm.userSales,
                    amountAlready:this.editForm.amountAlready,
                    amountOut:this.editForm.amountOut
                    // productAmount:this.editForm.productAmount
              }
              console.log("UpdataproductInfo",productInfo)
              this.$api.inte.updateProductSale(productInfo).then((res)=>{
                console.log(res.message)
                console.log(JSON.parse(sessionStorage.user).userid)
                // this.inproductData.push(this.addForm),
                // this.addForm={
                //   userName: '',
                //   userSales: '',
                //   amountAlready: '',
                //   amountOut: '',
                //   // productAmount: ''
                // }
              })
            }
          })
        }
      }
      // handleDelete(index, row) {
      //   console.log(index, row);
      // },
      // // 获取分页数据
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