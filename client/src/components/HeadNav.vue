
<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/images/logo.png" alt="" class="logo" />
        <span class="title">刘皇叔在线后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img
            v-if="!user"
            src="../assets/images/userfirst.png"
            alt=""
            class="avatar"
          />
          <img
            v-if="user && user.avatar"
            :src="user.avatar"
            alt=""
            class="avatar"
          />
          <div class="welcome">
            <p class="name comename">
              欢迎 <span class="name avatarname">{{ user.name }}</span> ！
            </p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "head-nav",
  components: {},
  computed: {
    user(){
        return this.$store.getters.user;
    }
  },
  methods:{
    setDialogInfo(comdItem){
        switch (comdItem) {
            case "info":
                this.showInfoList();
                break;
            case "logout":
                this.logout();
                break;
        }
    },
    showInfoList(){
        // console.log('个人信息')
        this.$router.push('/infoshow');
    },
    logout(){
        // 清除tolken
        localStorage.removeItem('eleToken');
        // 设置vuex store
        this.$store.dispatch('clearCurrentState');
        // 跳转到登录页面
        this.$router.push('/login')
    }
  }
};
</script>
<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin-right: 5px;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>


