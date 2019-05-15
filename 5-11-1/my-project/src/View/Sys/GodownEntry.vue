<template>
    <div class="container" style="width:100%;margin-top:-25px;margin-left:-230px;">
        <!-- 入库单 -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="出库单号">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <!-- <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域" style="width:300px;float:left;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="出库时间">
                <el-col :span="6">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width:100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">—</el-col>
                <el-col :span="6">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width:100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="发货单号">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="客户">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="业务员">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="存货名称">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="规格类型">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="件数">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="数量">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="单价">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="总额">
                <el-input v-model="form.name" style="width: 400px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="即时配送">
                <el-switch v-model="form.delivery" style="float: left;margin-left:170px;"></el-switch>
            </el-form-item>
            <!-- <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item> -->
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
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
        }
    }
}
</script>

<style>

</style>
