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
                <!-- <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item> -->
            </el-form>
        </div>
        <!-- :data="inproductData.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
        <!-- 表格内容栏 -->
        <el-table ref="Enter_storage Table" height="500"
        :data="inproductData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="productId" label="产品ID" width="210">
            </el-table-column>
            <el-table-column prop="productName" label="名称" width="210">
            </el-table-column>
            <el-table-column prop="productSize" label="规格" width="210">
            </el-table-column>
            <el-table-column prop="productNum" label="库存量" width="210">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220" >
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
    </div>
</template>

<script>
export default {
  data() {
    return {
      pagesize: 5, //每页的数据条数
      currentPage: 1, //默认开始页面
      istag: true,
      filters: {
        name: ''
      },
      productid: '',
      inproductData: [
        {
          productId: "01",
          productName: "三一牌",
          productSize: "A1",
          productNum: "434"
        },
        {
          productId: "02",
          productName: "三一牌",
          productSize: "A2",
          productNum: "2234"
        },
        {
          productId: "03",
          productName: "三一牌",
          productSize: "A3",
          productNum: "49023"
        },
        {
          productId: "04",
          productName: "三一牌",
          productSize: "A4",
          productNum: "5345"
        },
        {
          productId: "05",
          productName: "三一牌",
          productSize: "B4",
          productNum: "3123"
        },
        {
          productId: "06",
          productName: "三普牌",
          productSize: "A1",
          productNum: "31313"
        },
        {
          productId: "07",
          productName: "三普牌",
          productSize: "A2",
          productNum: "43242"
        },
        {
          productId: "08",
          productName: "三普牌",
          productSize: "A3",
          productNum: "4242"
        },
        {
          productId: "09",
          productName: "三普牌",
          productSize: "A4",
          productNum: "43242"
        },
        {
          productId: "10",
          productName: "三普牌",
          productSize: "B4",
          productNum: "43242"
        },
        {
          productId: "11",
          productName: "雪莲牌",
          productSize: "A1",
          productNum: "43242"
        },
        {
          productId: "12",
          productName: "雪莲牌",
          productSize: "A2",
          productNum: "43242"
        },
        {
          productId: "13",
          productName: "雪莲牌",
          productSize: "A3",
          productNum: "43242"
        },
        {
          productId: "14",
          productName: "雪莲牌",
          productSize: "A4",
          productNum: "43242"
        },
        {
          productId: "15",
          productName: "雪莲牌",
          productSize: "B4",
          productNum: "43242"
        },
        {
          productId: "16",
          productName: "金达牌",
          productSize: "A1",
          productNum: "43242"
        },
        {
          productId: "17",
          productName: "金达牌",
          productSize: "A2",
          productNum: "43242"
        },
        {
          productId: "18",
          productName: "金达牌",
          productSize: "A3",
          productNum: "43242"
        },
        {
          productId: "19",
          productName: "金达牌",
          productSize: "A4",
          productNum: "43242"
        },
        {
          productId: "20",
          productName: "金达牌",
          productSize: "B4",
          productNum: "43242"
        },
        {
          productId: "21",
          productName: "三工牌",
          productSize: "A1",
          productNum: "43242"
        },
        {
          productId: "22",
          productName: "三工牌",
          productSize: "A2",
          productNum: "43242"
        },
        {
          productId: "23",
          productName: "三工牌",
          productSize: "A3",
          productNum: "43242"
        },
        {
          productId: "24",
          productName: "三工牌",
          productSize: "A4",
          productNum: "43242"
        },
        {
          productId: "25",
          productName: "三工牌",
          productSize: "B4",
          productNum: "43242"
        },
        {
          productId: "26",
          productName: "富工牌",
          productSize: "A1",
          productNum: "43242"
        },
        {
          productId: "27",
          productName: "富工牌",
          productSize: "A2",
          productNum: "43242"
        },
        {
          productId: "28",
          productName: "富工牌",
          productSize: "A3",
          productNum: "43242"
        },
        {
          productId: "29",
          productName: "富工牌",
          productSize: "A4",
          productNum: "43242"
        },
        {
          productId: "30",
          productName: "富工牌",
          productSize: "A4",
          productNum: "43242"
        }
      ]
    };
  },
  methods: {
    searchProductInfo() {
      return this.inproductData.filter(item => {
        if (item.productName.includes(productid)) {
          return item;
        }
      });
    },
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