import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ViewUser from '@/components/ViewUser'
import NewUser from '@/components/NewUser'
import EditUser from '@/components/EditUser'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-user',
      component: NewUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:user_id',
      name: 'view-user',
      component: ViewUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:user_id',
      name: 'edit-user',
      component: EditUser,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

//Nav Guards
router.beforeEach((to, from, next) => {
  //Check for requred auth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Check if not logged in
    if (!firebase.auth().currentUser) {
      //Go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //Check if logged in
    if (firebase.auth().currentUser) {
      //Go to dashboard page
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route
      next();
    }
  } else {
    next();
  }
})

export default router;