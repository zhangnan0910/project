<template>
    <div>
  
        <el-form  :model="login"  ref='form'>
 
            <el-form-item label="登录账号" style="margin: 10px;" prop="account" :rules="rules" >
                <el-input v-model="login.account" placeholder="请输入手机号/邮箱"></el-input>
            </el-form-item>
            <el-form-item class="btn-box" >
                <el-button type="primary" @click="validateField('phone')" :disabled="disableds.isPhone">{{btnVal.phone}}</el-button>
                <el-button type="primary" @click="validateField('email')" :disabled="disableds.isEmail">{{btnVal.email}}</el-button>
            </el-form-item>
            <el-form-item label="动态密码" style="margin: 10px;">
                <el-input v-model="login.region" placeholder="请输入动态密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn" @click="goLogin">提交</el-button>
            </el-form-item>

        </el-form>
        
    </div>
</template>
<script>
export default {
    data() {
      return {
        labelPosition: 'top',
        login: {
          account: '',
          region: '',
        },
        rules:[
            { required: true,message:'请输入手机号/邮箱'}
        ],
        timer : null,
        btnVal:{
            phone:'手机动态码',
            email:"邮箱动态码"
        },
        disableds:{
            isPhone:false,
            isEmail:false
        }
      }
    },
    methods:{
        validateField(type){
            // 当rults的长度大于1时删除改变数组
            if(this.rules.length>1){
                this.rules.pop()
            }
            // 邮箱及电话验证判断
            if(type=="phone"){
                this.rules.push({ type: 'number',validator:(rules,value,callback)=>{
                    let phone = /^1[3|4|5|7|8]\d{9}$/;
                    if(phone.test(value)){
                        callback()
                    }else{
                        callback(new Error('请输入正确的格式'))
                    }
                }, message: '请输入正确的手机号'})
            }else if(type=="email"){
                this.rules.push({ type, message: '请输入正确的邮箱地址'})
            }
            // ref 加给父元素
            // 回调参数(是否校验成功,未通过校验的字段)
            this.$refs.form.validate((is_valid,rules)=>{
                
                if(is_valid){
                    // 获取验证密码倒计时
                    this.countDown(type)
                    // 数据请求成功后请求接口
                    // axios.post(url,{account:this.login.account}).then()
                }
            })
                
        },
        countDown(type){
           
            let start = 8;
        
            if(type==='phone'){
                this.timer = setInterval(()=>{
                    start--
                    this.disableds.isPhone = true
                    this.btnVal.phone = start+'s后重试'
                    if(start<1){
                        this.btnVal.phone = '请重新获取'
                        clearInterval(this.timer)
                        this.disableds.isPhone = false
                    }
                },1000)
            }else if(type==='email'){
                this.timer = setInterval(()=>{
                    start--
                    this.disableds.isEmail = true
                    this.btnVal.email = start+'s后重试'
                    if(start<1){
                        this.btnVal.email = '请重新获取'
                        clearInterval(this.timer)
                        this.disableds.isEmail = false
                    }
                },1000)
            }
            
        },
        goLogin(){
            sessionStorage.setItem("isLogin",1)
            this.$router.push("/home")
        }
    }
}
</script>

