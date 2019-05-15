<template>
    <!-- 个人绩效 -->
    <el-table :data="UserIndiTable" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="迟到" prop="late"></el-table-column>
        <el-table-column label="早退" prop="leaveearly"></el-table-column>
        <el-table-column label="请假" prop="leave"></el-table-column>
        <el-table-column label="备注" prop="remarks"></el-table-column>
    </el-table>
</template>

<script>
export default {
    data () {
        return {
            UserIndiTable: [{
                date: '2018-08-09',
                late: '1',
                leaveearly: '1',
                leave: '0',
                remarks: ''
            },{
                date: '2018-08-10',
                late: '0',
                leaveearly: '0',
                leave: '0',
                remarks: ''
            },{
                date: '2018-08-12',
                late: '0',
                leaveearly: '1',
                leave: '0',
                remarks: ''
            }]
        }
    }
}
</script>

<style>
</style>
