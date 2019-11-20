import Vue from 'vue';
import VueRouter from 'vue-router';
import Splash from '../views/Splash.vue';
import Home from '../views/Home.vue';
import CreateRadio from '../components/admin/CreateRadio.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: Splash,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home/:id',
    name: 'HomeId',
    component: Home,
  },
  {
    path: '/admin/radios/create',
    name: 'Admin',
    component: CreateRadio,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
