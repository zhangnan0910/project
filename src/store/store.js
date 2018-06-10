import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

let  store = new Vuex.Store({
    state:{
        menu:[],
        group:[],
        tableList:[],
        tree:[]
    },
    mutations:{ // 通过commit来触发mutation下的某个方法
        updateMenu(state,payload){
            state.menu = payload
        },
        updateGroup(state, payload){
            state.group = payload
        },
        updateTable(state, payload){
            state.tableList = payload
        },
        removeItem(state, payload){
            let ind;
            state.tableList.map((res,index)=>{
                if(res.code==payload){
                    ind = index
                }
            })
            state.tableList.splice(ind,1)
         
        },
        updateTree(state, payload){
            state.tree = payload
        },
        // 保存更换数据位置
        Preservation(state, payload){
            let ind;
            state.menu.map((res,index)=>{
                if (res.name === payload.user){
                    data = res
                    ind = index
                }
            })
            state.menu.splice(ind, 1, ...state.menu.splice((payload.number - 1), 1, state.menu[ind]))
        }
    },
    actions:{ // 通过dispatch来触发一个action
        // 参数1（context对象含有{dispatch,commit,state}等）
        fetchMenu(context){
            axios.get("/getdata").then(data=>{
                // 请求数据成功后把值传入到updateMenu()里
                context.commit('updateMenu', data.data.data)
            })
        },
        fetchGroup({commit}){
            axios.get("/getGroup").then(data => {
                commit('updateGroup', data.data.orgs)
            })
        },
        fetchTableList({commit}){
            axios.get("/getTable").then(data => {
                commit('updateTable', data.data.mockList)
            })
        },
        removeItem({commit},payload){
            commit('removeItem', payload.code)
        },
        fetchTree({ commit }){
            axios.get("/gettree").then(data=>{
                commit('updateTree',data.data.tree)
            })
        },
        Preservation({commit},payload){
            commit('Preservation', payload)
        }
    },
    getters:{
        filterGroup(state){
            // 接收input框的值
            return (filters)=>{
                if(filters){
                    let newArr = state.group.filter(res => {
                        return res.ORGNAME.indexOf(filters) > -1 || res.FORGNAME.indexOf(filters) > -1
                    })
                    return newArr 
                }else{
                    return state.group
                }
                
            }
        }
    },
    modules:{}
})
export default store