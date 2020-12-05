import Vue from 'vue'
import Router from 'vue-router'

// Dashboard Components
import dashboard from '../views/dashboard'
import dashAdmin from '../views/dashAdmin'

//  Widgets Components
import mainView from '../mainView'

import listaPacientes from '../views/basic-elements/listaPacientes'
import nuevaConsulta from '../views/basic-elements/nuevaConsulta'
import nuevoPaciente from '../views/basic-elements/nuevoPaciente'
import Tratamiento from '../views/basic-elements/Tratamiento'

//  Chart Components
import agendaCita from '../views/charts/agendaCita'
import registro from '../views/charts/registro'



import login from '../views/samples/user-pages/login'
import register from '../views/samples/user-pages/register'

//  Table Components
import basicTables from '../views/tables/basic-table'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/dashboard',
    component: mainView,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
      },
      {
        path: '/dashAdmin',
        name: 'dashAdmin',
        component: dashAdmin
      },
      {
        path: '/listaPacientes',
        name: 'listaPacientes',
        component: listaPacientes
      },
      {
        path: '/Tratamiento',
        name: 'Tratamiento',
        component: Tratamiento
      },
      {
        path: '/nuevaConsulta',
        component: nuevaConsulta
      },
      {
        path: '/nuevoPaciente',
        component: nuevoPaciente
      },
      {
        path: '/agendaCita',
        component: agendaCita
      },
        {
        path: '/registro',
        component: registro
      },
      
      {
        path: '/basic_table',
        name: 'basicTables',
        component: basicTables
      }
    ]
  },
  {
    path: '*',
    redirect: '/pages/error_404',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/pages/login',
        component: login
      },
      {
        path: '/pages/register',
        component: register
      }
    ]}
  ]
})
