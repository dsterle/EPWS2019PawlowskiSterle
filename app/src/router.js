import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/tutorial',
    //   name: 'tutorial',
    //   props: true,
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: function () {
    //     return import(/* webpackChunkName: "about" */ './views/Tutorial.vue')
    //   }
    // },
    {
      path: '/waiting/:userid',
      name: 'waiting',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Waiting.vue')
      }
    },
    {
      path: '/user/:userid/painting/:id',
      name: 'painting',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Painting.vue')
      }
    },
    {
      path: '/user/:userid/noPainting',
      name: 'noPainting',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/NoPainting.vue')
      }
    },
    {
      path: "/user/:userid/history",
      name: 'history',
      props: true,
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/History.vue')
      }
    },
    {
      path: "/user/:userid/search",
      name: 'search',
      props: true,
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Search.vue')
      }
    },
    {
      path: "/user/:userid/settings",
      name: 'settings',
      props: true,
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/settings/Settings.vue')
      }
    },
    {
      path: "/user/:userid/settings/layout",
      name: 'layout',
      props: true,
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/settings/Layout.vue')
      }
    },
    {
      path: "/user/:userid/settings/colors",
      name: 'colors',
      props: true,
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/settings/Colors.vue')
      }
    },
    {
      path: "/user/:userid/settings/language",
      name: 'language',
      props: true,
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/settings/Language.vue')
      }
    },
    {
      path: "/user/:userid/settings/audio",
      name: 'audio',
      props: true,
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/settings/Audio.vue')
      }
    },
    {
      path: '/docs',
      name: 'documentation',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Docs.vue')
      }
    },
    {
      path: '/user/:userid/tutorial',
      name: 'tutorial',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Tutorial.vue')
      }
    }
  ],
});

