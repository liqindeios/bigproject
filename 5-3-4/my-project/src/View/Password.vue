<template>
    <div id="main">
        <div class="all">
            <div class="header">
			    <h1>{{mes}}</h1>
            </div>
            <div class="main">            
                <form>
                    <input type="text" class="inp" placeholder="请输入你的工号" />
                    <input type="text" class="inp" placeholder="请输入你的手机号" />                    
                    <input type="text" class="inp" placeholder="请输入新密码" />
                    <input type="text" class="inp" placeholder="请再次确认密码" />
                </form>
            </div>
            <div class="footer">
                <button @click="">提交</button>
            </div>
        </div>		
    </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    return {
      mes: "手机号验证"
    };
  },
  methods: {
    change() {
      this.$router.push("/Change");
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
  height: 750px;
  background-color: lightcyan;
  position: relative;
}
.all {
  width: 350px;
  height: 530px;
  margin-top: 100px;
  margin-left: 39%;
  background-color: lightsteelblue;
  position: absolute;
  border-radius: 20px;
}
.header {
  width: 350px;
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