<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">全栈后台管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="60px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginUser.email"
              placeholder="请输入邮箱"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginUser.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
    data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30个字符",
            trigger: "blur",
          },
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
      if(valid) {
      this.$axios
        .post(
          "/api/users/login",
          `email=${this.loginUser.email}&password=${this.loginUser.password}`
        )
        .then((res) => {
          // 登录成功
          this.$message({
            message: "账号登录成功！",
            type: "success",
          });
          const { token } = res.data;
        //   存储到localStorage中
        localStorage.setItem('eleToken', token);
              this.$router.push('/index');
        })
        .catch((err) => console.log(err));


      }
      })
    },
  },
};
</script>
<style scoped>
.login {
  position: relative;
  background: url(../assets/images/bg.jpg) no-repeat center center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  left: 34%;
  top: 10%;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}

.submit_btn{
    width: 100%;
}

.tiparea{
    text-align: right;
    font-size: 12px;
    color: #333;
}

.tiparea p a{
    color: #409eff;
}
</style>
