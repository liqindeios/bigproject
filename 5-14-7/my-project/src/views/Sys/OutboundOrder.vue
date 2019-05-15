<template>
    <div class="container" style="width:100%;margin-top:0px;margin-left:50px;">
        <!-- 出库单填写 -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="日期">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="规格">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="数量">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="单价">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="金额">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="送货单号">
                <el-input v-model="form.desc" style="width: 400px;float: left;"></el-input>
            </el-form-item>
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
            name: "",
            region: "",
            date1: "",
            date2: "",
            delivery: false,
            type: [],
            resource: "",
            desc: ""
        }
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!");
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