<template>
    <div class="container" style="width:100%;margin-top:0px;margin-left:50px;">
        <!-- 出库单填写 -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="日期" prop="date">
                <el-input v-model="form.date" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="productId">
                <el-input v-model="form.productId" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="productsize">
                <el-input v-model="form.productsize" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="num">
                <el-input v-model="form.num" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="price">
                <el-input v-model="form.price" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <!-- <el-form-item label="金额">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="送货单号">
                <el-input v-model="form.desc" style="width: 400px;float: left;"></el-input>
            </el-form-item> -->
            <el-form-item style="width: 480px;">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="empty">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
        form: {
            date: '',
            productId: '',
            num: '',
            price: '',
            productsize: ''
        }
        };
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
            if (valid) {
              let productInfo = {
                    userid:JSON.parse(sessionStorage.user).userid,
                    // id:this.addForm.id,
                    date:this.form.date,
                    productId:this.form.productId,
                    num:this.form.num,
                    productsize:this.form.productsize,
                    price:this.form.price
                    // productAmount:this.addForm.productAmount
              }
              console.log("productInfo",productInfo)
              this.$api.inte.addoutProduct(productInfo).then((res)=>{
                // var user = 
                // console.log("user",user.userid)
                console.log(res.message)
                // this.inproductData.push(this.addForm),
                // this.addForm={
                //   // id:'',
                //   date: '',
                //   productid: '',
                //   productsize: '',
                //   num: '',
                //   price: ''
                //   // productAmount: ''
                // }
              })
            }
          })
        },
        empty(){
            this.name="",
            this.region= "",
            this.date1="",
            this.date2="",
            this.delivery=false,
            this.type= [],
            this.resource= "",
            this.desc=""
        }
    }
}
</script>

<style>
.el-button{
    width: 100px;
}
</style>