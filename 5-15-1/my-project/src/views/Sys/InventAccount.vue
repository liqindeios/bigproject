<template>
    <!-- 库存帐 -->
    <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
        <!-- 工具栏 -->
        <div class="toolbar" style="float:left;padding-top:15px;padding-left:15px;">
        <!-- 行内表单 -->
            <el-form :inline="true" class="demo-form-inline" :model="filters">
                <el-form-item>
                    <el-input v-model="productid" placeholder="产品名字" style="width:430px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchProductInfo()">
                        <i class="el-icon-search"></i>查询
                        </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- :data="inproductData.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
        <!-- 表格内容栏 -->
        <el-table ref="Enter_storage Table" height="500"
        :data="inproductData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="产品ID" width="160">
            </el-table-column>
            <el-table-column prop="productid" label="名称" width="210">
            </el-table-column>
            <el-table-column prop="size" label="规格" width="210">
            </el-table-column>
            <el-table-column prop="price" label="库存量" width="210">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220" >
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
                :page-sizes="[5, 10, 15, 20, 25, 30]"
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
          <el-form-item label="ID" prop="id">
            <el-input v-model="addForm.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="productId">
            <el-input v-model="addForm.productId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格" prop="size">
            <el-input v-model="addForm.size" auto-complete="off"></el-input>
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
          <el-form-item label="名称" prop="productId">
            <el-input v-model="editForm.productId" auto-complete="off"></el-input>
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
      pagesize: 5, //每页的数据条数
      currentPage: 1, //默认开始页面
      istag: true,
      filters: {
        name: ''
      },
      //  searchform:{
      //     id: '',
      //     name: ''
      //   },
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
      productid: '',
      inproductData: []
    };
  },
  mounted() {
    this.$api.inte.getProductInfo().then((res)=>{
    // console.log("信息")
    console.log("产品信息",res)
      this.inproductData=res.informations
    })
  },
  methods: {
    operation(){
      },
    //删除
    deleteRow(index, row) {
        let id = {id:Object.assign({}, row).id}
        // let productInfo
        this.$api.inte.delProductInfo(id).then((res)=>{
          // row.splice(index, 1);
          console.log(res.result)
          alert("删除成功！")
        })
      },
    // searchProductInfo() {
    //   return this.inproductData.filter(item => {
    //     if (item.productName.includes(productid)) {
    //       return item;
    //     }
    //   });
    // },
    search() {
      console.log("submit!");
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
    handleAdd() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    }
  }
};
</script>

<style>
</style>