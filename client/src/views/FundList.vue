<template>
  <div class="fillontainer">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" @click="handleAdd()"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-if="tableData.length > 0"
      max-height="450"
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="70" align="center">
      </el-table-column>
      <el-table-column prop="date" label="创建时间" align="center" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收支类型" align="center">
      </el-table-column>
      <el-table-column prop="describe" label="收支描述" align="center">
      </el-table-column>
      <el-table-column prop="income" label="收入" align="center">
        <template slot-scope="scope">
          <span style="color: #f56767">+{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expend" label="支出" align="center">
        <template slot-scope="scope">
          <span style="color: #00d053">-{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" label="账户现金" align="center">
        <template slot-scope="scope">
          <span style="color: #4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        align="center"
        prop="operation"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog.vue";
export default {
  name: "fundList",
  data() {
    return {
      tableData: [],
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      },
      dialog: {
        show: false,
        title: "",
        option: "edit",
      },
    };
  },
  components: {
    Dialog,
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表单数据
      this.$axios
        .get("/api/profiles")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit",
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id,
      };
    },
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/profiles/delete/${row._id}`)
        .then((res) => {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.getProfile();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add",
      };

      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      };
    },
  },
};
</script>

<style scoped>
.btnRight {
  float: right;
}
</style>