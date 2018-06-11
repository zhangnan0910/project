# administration

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 项目总结

#### 1. 项目内容
```
电信通集团长城宽带的项目。主要是员工操作权限（增删改查）
```
#### 2. 做cmd后台管理系统
```
项目使用Vue框架结合Vuex做数据管理,以及vue-Router,element-ui
```
#### 3. 使用vue-cli启用 脚手架
``` 
    vue init webpack name
```
#### 4. 路由搭建
```
    new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path:"Employees_admin",
          name:"Employees_admin",
          component: Employees_admin
        },{
          path: "Menu_admin",
          name: "Menu_admin",
          component: Menu_admin,
          // tree 路由传参
          children:[
            {
              path: "child/:id",
              name: "child",
              component: Child_admin
            }
          ]
        }
      ]
    }
  ]
```
#### 5. 代表性
```
1. login页tab切换(二维码或账号)
    利用vue内置组件component实现
    <component :is="currentTab"></component>

2. 利用element-ui 做表单验证
    * ref 加给父元素
        <el-form  :model="login"  ref='form'></el-form>
    * 回调参数(是否校验成功,未通过校验的字段)
        $refs.form.validate((is_valid,rules)=>{
            if(is_valid){ 
                // 数据请求成功后请求接口
            }
        })
3. 使用vue-router的守卫导航(作用：路由跳转前做一些验证，比如登录验证)
    router.beforeEach((to, from, next) => {

        // 获取是否存在isLogin
        let isLogin = sessionStorage.getItem("isLogin")
        
        // 如果在login页面 next(执行下一步)
        if (to.name === 'login') {
            next()
        } else { //  如果不在login页面

            //判断是否登录 
            
            // 未登录时 跳转到login (next("/login"))
            if (!isLogin) {
                next("/login")
            } else {  //已登录 next(执行下一步)
                next()
            }
        }
        next()
    })
4. home页
    <el-container>
        <el-header></el-header>
        </el-container> 
            <el-aside>
                侧边栏(跳转路由)
            </el-aside>
            <el-main>
                路由切换显示内容
                <router-view></router-view>
            </el-main>
        </el-container>   
    </el-container>
5. home侧边栏路由点击进入员工管理

    * 查询栏
        * 查询
        * 点击归属组织 -> 弹窗 -> 渲染数据，查询栏

   * table渲染数据
        * 编辑，删除，新增

   * 分页器
        * 根据数据长度及分页等进行数据修改及渲染
```

#### 6. 坑 
```
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
