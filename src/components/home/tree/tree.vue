<template>
    <el-container>
        <el-aside width="200px" class="left">
            <el-tree :data="$store.state.tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
        
    </el-container>
</template>
<script>
    export default{
        data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
        },
        mounted(){
            this.$store.dispatch('fetchTree')  
        },
        methods: {
            handleNodeClick(obj) {
             
              if(!obj.children){
                  this.$router.push({path:'/home/Menu_admin/child/'+obj.$treeNodeId})
              }else{
                  this.$router.push({path:'/home/Menu_admin'})
              }
              
            }
        }
    }
</script>
<style scoped>
  .el-tree{
      background: #fefefe;
  }
</style>
