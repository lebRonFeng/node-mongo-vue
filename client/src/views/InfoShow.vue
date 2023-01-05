<template>
  <div class="infoshow">
    <el-row type="flex" justify="center" class="row-bg">
      <el-col :span="8">
        <div class="user">
          <img src="user.avatar" class="avatar" alt="" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="el-icon-s-custom"></i>&nbsp;
            <span>{{user.name}}</span>
          </div>
          <div class="user-item">
            <i class="el-icon-s-tools"></i>&nbsp;
            <span>{{user.identity == 'manager' ? "管理员" : "普通员工"}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'infoshow',
    computed: {
        user(){
            return this.$store.getters.user;
        }
    }
}
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user{
    text-align: center;
    position: relative;
    top: 30%;
}
.user img{
    width: 150px;
    border-radius: 50%;
}
.user span {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    font-weight: blod;
}
.userinfo{
    height: 100%;
    background-color: #eee;
}
.user-item {
  font-size: 28px;
  padding: 26px;
  position: relative;
  top: 3%;
  color: #333;
}
</style>