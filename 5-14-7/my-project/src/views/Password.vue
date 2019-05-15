<template>
    <div id="main">
        <div class="all">
            <div class="header">
			        <h1>{{mes}}</h1>
            </div>
            <div class="main">          
                <!-- <form>
                    <input type="text" class="inp" placeholder="请输入你的工号" />
                    <input type="text" class="inp" placeholder="请输入你的手机号" />                    
                    <input type="text" class="inp" placeholder="请输入新密码" />
                    <input type="text" class="inp" placeholder="请再次确认密码" />
                </form> -->
                <el-form :label-position="labelPosition" class="password-form" status-icon :rules="passwordRules" label-width="0px" ref="passwordForm" :model="passwordForm">
                  <!-- 工号 -->
                  <el-form-item prop="userid">
                    <el-input v-model="passwordForm.userid" @keyup.enter.native="handlePassword" auto-complete="off" style="width:300px" placeholder="工号"></el-input>
                  </el-form-item>
                  <!-- 电话号码 -->
                  <el-form-item prop="usertele">
                    <el-input v-model="passwordForm.usertele" @keyup.enter.native="handlePassword" auto-complete="off" style="width:300px" placeholder="手机号"></el-input>
                  </el-form-item>
                  <!-- 密码 -->
                  <el-form-item prop="password">
                      <el-input type="password" v-model="passwordForm.password" @keyup.enter.native="handlePassword" auto-complete="off" style="width:300px" placeholder="密码"></el-input>
                  </el-form-item>
                  <!-- 密码 -->
                  <el-form-item prop="newpassword">
                      <el-input type="password" v-model="passwordForm.newpassword" @keyup.enter.native="handlePassword" auto-complete="off" style="width:300px" placeholder="确认密码"></el-input>
                  </el-form-item>
                  <!-- 忘记密码和登录按钮 -->
                <el-form-item style="width:100%;">
                    <el-button type="primary" @click.native.prevent="handlePassword" class="password-submit" style="width:40%;">提交</el-button>
                </el-form-item>
                </el-form>
            </div>
            <!-- <div class="footer">
                <button @click="togo()">提交</button>
            </div> -->
        </div>		
    </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    //工号自定义验证规则
    const validateUserid = (rule, value, callback) => {
      if(isvalidUserid==""){
          callback(new Error("请输入工号"));
      }
      else if (!isvalidUserid(value)) {
        callback(new Error("请输入正确的工号"));
      } else {
        console.log("user", value);
        callback();
      }
    };
    //电话号码自定义验证规则
    const validateUsertele = (rule, value, callback) => {
      if(isvalidUsertele==""){
          callback(new Error("请输入电话号码"));
      }
      else if (!isvalidUsertele(value)) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        console.log("user", value);
        callback();
      }
    };
    return {
      mes: "手机号验证",
      labelPosition: 'right',
      passwordForm: {
        userid: "",
        usertele:"",
        password: "",
        newpassword: "",
      },
      passwordRules: {
        // 绑定在form表单中的验证规则
        userid: [          
          { required: true, message: "请输入工号", trigger: "blur" }
        ],
        usertele: [          
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, message: "电话号码长度最少为11位", trigger: "blur" },
          { max: 11, message: "电话号码长度最多为11位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        newpassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ]
      },
      // checked: true
    };
  },
  methods: {
    handlePassword(){
      //点击提交按钮
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          // this.$api.login.login(JSON.stringify(userInfo)).then((res) => {
                this.$router.push('/')  // 提交成功，跳转到主页
              // }).catch((res) => {
                // alert(res);
              // });
        }        
      });
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#main {
  width: 100%;
  height: 740px;
  background-color: lightcyan;
  position: relative;
}
.all {
  width: 380px;
  height: 560px;
  margin-top: 100px;
  margin-left: 39%;
  background-color: lightsteelblue;
  position: absolute;
  border-radius: 20px;
}
.header {
  width: 380px;
  height: 200px;
  background-color: lightblue;
}
.header h1 {
  color: white;
  font-size: 32px;
  line-height: 200px;
  text-align: center;
}
.main {
  margin-top: 40px;
  margin-left: 20px;
}
.inp {
  width: 230px;
  height: 35px;
  margin-bottom: 15px;
}
.yz {
  width: 150px;
  height: 35px;
  /* padding-bottom: 40px; */
  margin-bottom: 15px;
}
form > button {
  width: 80px;
  height: 33px;
  border-width: 0px;
  border-radius: 3px;
  background: cadetblue;
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei;
  color: white;
}
.footer button {
  margin-left: 20px;
  width: 240px;
  height: 33px;
  border-width: 0px;
  border-radius: 3px;
  background: orangered;
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei;
  color: white;
}
</style>