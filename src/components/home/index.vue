<template>
    
    <el-container class="home_box">

        <el-header class="home_top">el-header</el-header>
        <el-container>
            <el-aside class="home_aside">
                <el-menu :default-openeds="['1']">
                   <!-- 遍历 -->
                    <el-submenu v-for="(item,ind) in $store.state.menu" :index="ind+'1'" :key="ind">  
                         <!-- 遍历一级路由 -->
                        <template slot="title" ><span>{{item.name}}</span></template>
                        <!-- 遍历二级路由 -->
                        <el-menu-item v-for="(res,i) in item.menus" :index="ind+1+'-'+i+1" :key="i">
                            <router-link :to="{name:res.type}">{{res.name}}</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <div class="line"></div>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>


export default {
    data(){
        return{
            menu : []
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    },
    mounted(){
        this.$store.dispatch('fetchMenu')
    }
}
</script>

<style scoped src="./index.css">

</style>

