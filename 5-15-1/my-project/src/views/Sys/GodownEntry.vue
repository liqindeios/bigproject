<template>
    <div class="container" style="width:100%;margin-top:0px;margin-left:50px;">
        <!-- 入库单填写 -->
        <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
            <el-form-item label="日期" prop="date">
                <el-input v-model="form.date" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="productid">
                <el-input v-model="form.productid" style="width: 400px;float: left;"></el-input>
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
                id:'',
                date: '',
                productid: '',
                productsize: '',
                num: '',
                price: ''
            },
            formRules: {
                date: [
                    { required: true, message: '请输入日期', trigger: 'blur' }]
            },
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
                    productid:this.form.productid,
                    productsize:this.form.productsize,
                    num:this.form.num,
                    price:this.form.price
                    // productAmount:this.addForm.productAmount
              }
              console.log("productInfo",productInfo)
              this.$api.inte.addProduct(productInfo).then((res)=>{
                // var user = 
                // console.log("user",user.userid)
                console.log(res.message)
                // this.inproductData.push(this.addForm),
                this.form={
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
        },
        empty(){
            this.id="",
            this.date= "",
            this.productid="",
            this.productsize="",
            this.productsize="",
            this.num= "",
            this.price= ""
        }
    }
}
</script>

<style>
.el-button{
    width: 100px;
}
</style>