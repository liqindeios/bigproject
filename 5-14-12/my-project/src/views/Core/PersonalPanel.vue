<template>
  <div class="personal-panel">
    <div class="personal-desc" style="background:#4b5f6e">
        <div class="avatar-container">
          <img class="avatar" :src="require('@/assets/user1.png')" />
        </div>  
        <div class="name-role">
          <span class="sender">{{ user.name }} - {{ user.position }}</span>  
        </div>  
        <div class="registe-info">
          <span class="registe-info">{{ user.hiredate }}</span>
        </div>  
    </div>
    <div class="main-operation">
        <span class="main-operation-item">
          <el-button icon="fa fa-key" @click="gotopassword">个人中心</el-button>
        </span>    
    </div>    
    <div class="personal-footer" @click="logout">退出登录</div>
  </div>
</template>

<script>
export default {
  name: 'PersonalPanel',
  props: {
    user: {
      type: Object,
      default: {
        name: "",
        avatar: "",
        position: "",
        hiredate: ""
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 退出登录
    logout: function() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
      .then(() => {
        sessionStorage.removeItem("userid")
        this.$api.login.logout().then((res) => {
          console.log(res.message)
          this.$router.push("/")
          }).catch(function(res) {
        })
      })
      .catch(() => {})
    },
    gotopassword(){
      this.$router.push("/Sys/UserInfo")
    }
  },
  mounted(){
        var u = sessionStorage.user;
        var user = JSON.parse(u);
        // console.log(user.username);
        this.user.name=user.username
        this.user.hiredate=user.hiredate
        this.user.position=user.position
        this.user.avatar=user.photo
  }
}
</script>

<style scoped>
.personal-panel {
  font-size: 14px;
  width: 280px;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
}
.personal-desc {
  padding: 15px;
  color: #fff;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 90px;
}
.name-role {
  font-size: 16px;
  padding: 5px;
}
.personal-relation {
  font-size: 16px;
  padding: 12px;
  margin-right: 1px;
  background: rgba(200, 209, 204, 0.3);
}
.relation-item {
  padding: 12px;
}
.relation-item:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
}
.main-operation {
  padding: 8px;
  margin-right: 1px;
  /* background: rgba(175, 182, 179, 0.3); */
  border-color: rgba(201, 206, 206, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.main-operation-item {
  margin: 15px;
}
.other-operation {
  padding: 15px;
  margin-right: 1px;
  text-align: left;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.other-operation-item {
  padding: 12px;
}
.other-operation-item:hover {
  cursor: pointer;
  background: #9e94941e;
  color: rgb(19, 138, 156);
}
.personal-footer {
  margin-right: 1px;
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.personal-footer:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
  background: #b1a6a61e;
}
.el-button{
  width: 90%;
}
</style>