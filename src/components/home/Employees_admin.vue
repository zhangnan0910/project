<template>
    <div>
        <!-- 查询区 -->
        <el-form ref='from' :model="form" label-width="60px">
            <el-form-item label="用户姓名 :">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="用户手机号 :">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱 :">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="员工编号 :">
                <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="身份证号 :">
                <el-input v-model="form.Documents"></el-input>
            </el-form-item>
            <!-- 触发归属组织时弹出框 -->
            <el-form-item label="归属组织 :">
                <!-- 弹窗 -->
                <!-- @after-enter="$store.dispatch('fetchGroup')触发事件进行获取数据 -->
                <el-popover
                    placement="bottom"
                    width="400"
                    trigger="click"
                    @after-enter="$store.dispatch('fetchGroup')">
                    <!-- v-loading.lock="loading2" -->
                    <el-container direction="vertical"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        style="width: 100%">
                        <!-- 弹窗里的input框  -->
                        <el-form>
                            <el-input v-model="msg"></el-input>
                            <el-button @click="btn">查询</el-button>
                        </el-form>
                        <!-- 弹窗里的表格  -->
                        <el-table :data="$store.getters.filterGroup(msg)" @row-click="rowChange" height="200">
                            <el-table-column width="50" type="index" label="序号"></el-table-column>
                            <el-table-column width="150" property="ORGNAME" label="组织名称"></el-table-column>
                            <el-table-column width="220" property="FORGNAME" label="上级组织"></el-table-column>
                        </el-table>
                    </el-container>
                    <el-input v-model="form.ORGname" slot="reference">
                        <i slot="suffix" class="el-icon-caret-bottom"></i>
                    </el-input>
                </el-popover>
            </el-form-item>
            <el-button>查询</el-button>
            <el-button type="primary" @click="addClick()">新增</el-button>
        </el-form>
       <hr />
       <!-- 表格区 -->
       <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index"  label="序号"  ></el-table-column>
            <el-table-column prop="name"  label="姓名"  ></el-table-column>
            <el-table-column prop="id"  label="员工ID"  ></el-table-column>
            <el-table-column prop="code"  label="员工编号"  :show-overflow-tooltip='true'></el-table-column>
            <el-table-column prop="phone"  label="手机号"  :show-overflow-tooltip='true'></el-table-column>
            <el-table-column prop="email"  label="邮箱"  :show-overflow-tooltip='true'></el-table-column>
            <el-table-column prop="org"  label="权限"  :show-overflow-tooltip='true'></el-table-column>
            <el-table-column prop="forg"  label="上级组织"  :show-overflow-tooltip='true'></el-table-column>
            <el-table-column prop="date"  label="创建时间"  :show-overflow-tooltip='true'></el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
            <!-- 对数据进行操作 -->
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="removeClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
       </el-table>
       <!-- 分页器 -->
       <el-pagination 
            :total="$store.state.tableList.length"  
            :page-size="count" background layout="prev, pager, next" 
            @current-change="pageChange" >
        </el-pagination>
        <!-- 弹窗 -->
        <!-- :before-close="handleClose" -->
        
        <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="50%"
            >
            <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm"  class="demo-form-inline">
                <el-form-item label="用户姓名 :" prop="name">
                    <el-input v-model="newForm.name"></el-input>
                </el-form-item>
                <el-form-item label="用户手机号 :" >
                    <el-input v-model="newForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱 :" prop="email">
                    <el-input v-model="newForm.email"></el-input>
                </el-form-item>
                <el-form-item label="员工编号 :">
                    <el-input v-model="newForm.code"></el-input>
                </el-form-item>
              
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submits">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";

// console.log(mapActions,mapState)
export default {
    data() {
        // let validator = (rults,value,callback)=>{
        //     if(!value){
        //         return callback(new Error('请输入正确的内容'))
        //     }
        //     return callback()
        // }
        return {
            form: {
                name: "",
                ORGname: "",
                phone: "",
                email: "",
                code: "",
                Documents: ""
            },
            newForm:{},
            rules:{
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱号', trigger: 'change' },
                    {type:'email', massage:'必填'}
                ]
            },
            dialogVisible:false,
            count: 5,
            page: 1,
            // loading2: true
            msg: ""
        };
    },

    methods: {
        // 对弹出框的处理
        // 点击选中时改变归属组织的值
        rowChange(row, event, column) {
        this.form.ORGname = row.ORGNAME;
        },
        // ...mapGetters['filterGroup'],
        // 点击btn按钮时 传input框值到getters
        btn() {
        this.$store.getters.filterGroup(this.msg);
        },
        // 触发分页器返回page页
        pageChange(page) {
        this.page = page;
        },
        // 编辑信息弹窗
        handleClick(row) {
            this.dialogVisible = !this.dialogVisible
            //  赋值点击数据
            this.newForm = row
        },
        // 新增
        addClick(){
            this.newForm = {}
            this.dialogVisible = !this.dialogVisible
        },
        // 删除信息弹窗
        removeClick(row){
            this.$store.dispatch('removeItem',row)
        },
        // 弹窗确定验证
        submits(){
            // el-form定义ref calidata接收回调函数,参数(是否校验成功，未通过的校验字段)
            this.$refs.ruleForm.validate((booleans,Faileddata)=>{
               
                // if(booleans){
                //     // 关闭弹窗
                //     this.dialogVisible = false
                //     // 请求数据接口
                // }
                // 关闭弹窗
                    this.dialogVisible = false

            })
        }
    },
    computed: {
        // 分页器处理
        tableData() {
            return this.$store.state.tableList.slice(
                this.count * (this.page - 1),
                this.page * this.count
            );
        }
    },
    mounted() {
        // table数据
        this.$store.dispatch("fetchTableList");
    },
 
};
</script>
<style scoped>
.el-form-item {
  display: inline-block;
  margin-left: 40px;
}
.el-form-item[data-v-139d9230] {
  position: relative;
}
.el-popover {
  height: 200px;
}
</style>

