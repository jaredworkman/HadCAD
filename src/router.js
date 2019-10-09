import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import People from '@/components/People'
import Projects from '@/views/Projects'
import Profile from '@/views/Profile'
import Client from '@/views/Client'
import Manager from '@/views/Manager'
import Group from '@/views/Group'
import Dashboard from '@/views/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/client',
      name: 'Client',
      component: Client
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/team',
      name: 'Team',
      component: People
    },
  ]
})
