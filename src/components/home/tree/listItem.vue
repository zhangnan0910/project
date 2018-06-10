<template>
    
    <el-form :inline="true" ref="from" :model="formInline" class="demo-form-inline">
        <el-form-item label="菜单名称" :span="12">
            <el-input v-model="formInline.user" ></el-input>
        </el-form-item>
        <el-form-item label="菜单显示名称" >
            <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="菜单显示顺序">
            <el-input v-model="formInline.number"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="Preservation()">保存</el-button>
        </el-form-item>
    </el-form>
  
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                user: '组织权限管理',
                region: '',
                number:1
            }
        }
    },
    methods:{
        Preservation(){
           
            this.$store.dispatch('Preservation',this.formInline)
        }
    }
}
</script>
