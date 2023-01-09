<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">全栈后台管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="registerUser.name"
              autocomplete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerUser.email"
              placeholder="请输入邮箱"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerUser.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="password2">
            <el-input
              type="password"
              v-model="registerUser.password2"
              autocomplete="off"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="选择身份">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('registerForm')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: "register",
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            message: "长度要在2-30个字符之间",
            trigger: "blur",
          },
        ],
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
        ],
        password2: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30个字符",
            trigger: "blur",
          },
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        identify: [],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let data = qs.stringify(this.registerUser);
        /**
         *  `email=${this.registerUser.email}&identity=${this.registerUser.identity}&name=${this.registerUser.name}&password=${this.registerUser.password}&password2=${this.registerUser.password2}`
         */
      if(valid) {
      this.$axios
        .post(
          "/api/users/register", data)
        .then((res) => {
          this.$router.push('/login');
          // 注册成功
          this.$message({
            message: "账号注册成功！",
            type: "success",
          });

        })
        .catch((err) => console.log(err));
      }
      })
    },
  },
};
</script>
<style scoped>
.register {
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

.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}
/* .el-form {
  margin-top: 20px;
  padding: 20px 35px 20px 4px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  background-color: #384866;
}
.el-form :deep(.el-form-item__label) {
  color: #fff;
  padding-top: 5px;
}
.el-form :deep(.el-input__wrapper) {
  background-color: #384866;
}
.el-form :deep(.el-input__wrapper) .el-input__inner {
  color: #fff;
  padding: 20px 0;
} */
.el-button {
  width: 100%;
}
.manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
</style>
