import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { 
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { 
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { 
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/newparty',
    name: 'NewParty',
    component: () => import('../views/NewParty.vue'),
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/editparty/:id',
    name: 'EditParty',
    component: () => import('../views/EditParty.vue'),
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/party/:id',
    name: 'Party',
    component: () => import('../views/Party.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){

    if(store.getters.authenticated === false){
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
