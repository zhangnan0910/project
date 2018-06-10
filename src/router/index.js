import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/index'
import Home from '../components/home/index'
import Employees_admin from '../components/home/Employees_admin'
import Menu_admin from '../components/home/tree/tree'
import Child_admin from '../components/home/tree/listItem'
Vue.use(Router)

let router = new Router({
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
})
// 守卫导航作用 : 路由跳转前做一些验证，比如登录验证
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
export default router