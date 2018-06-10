<template>
    <div class="login">
        <Header/>
        <div class="page">
            <div class="login">
                <ul>
                    <li @click="toggleTab('QRcode')" :class="currentTab=='QRcode'?'active':''">二维码登陆</li>
                    <li @click="toggleTab('Accountlogin')" :class="currentTab=='Accountlogin'?'active':''">账号登陆</li>
                </ul>
                <div class="box">
                    <component :is="currentTab"></component>
                </div>
            </div>
        </div>
        <Footers/>
    </div>
</template>
<script>

import Header from './header'
import QRcode from './QR-code'
import Accountlogin from './Account-login'
import Footers from './footer'
export default {
  name:'login',
  data(){
      return{
          currentTab:'QRcode'
      }
  },
  components:{
      Header,
      Footers,
      QRcode,
      Accountlogin
  },
  methods:{
      toggleTab(com){
          this.currentTab = com
      }
  }
}
</script>

<style slot-scoped src="./index.css">
    
   
</style>

