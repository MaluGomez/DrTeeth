import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import ProfileUser from '@/views/ProfileUser'
import PatientList from '@/views/PatientList'
import NewConsultation from '@/views/NewConsultation'
import NewPatient from '@/views/NewPatient'
import AppointmentList from '@/views/AppointmentList'
import AppointmentNew from '@/views/AppointmentNew'
import AdminList from '@/views/AdminList'
import OdontoList from '@/views/OdontoList'
import OdontoNew from '@/views/OdontoNew'
import AdminNew from '@/views/AdminNew'
import ApointmentPatient from '@/views/ApointmentPatient'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      autentification: true
    }
  },
  {
    path: '/perfil',
    name: 'ProfileUser',
    component: ProfileUser,
    meta: {
      autentification: true
    }
  },
  {
    path: '/nuevoodontologo',
    name: 'OdontoNew',
    component: OdontoNew,
    meta: {
      autentification: true
    }
  },
  {
    path: '/nuevoadmin',
    name: 'AdminNew',
    component: AdminNew,
    meta: {
      autentification: true
    }
  },
  {
    path: '/listaodontologos',
    name: 'OdontoList',
    component: OdontoList,
    meta: {
      autentification: true
    }
  },
  {
    path: '/listacitas',
    name: 'AppointmentList',
    component: AppointmentList,
    meta: {
      autentification: true
    }
  },
  {
    path: '/listaadmin',
    name: 'AdminList',
    component: AdminList,
    meta: {
      autentification: true
    }
  },
  {
    path: '/nuevacita',
    name: 'AppointmentNew',
    component: AppointmentNew,
    meta: {
      autentification: true
    }
  },
  {
    path: '/nuevaconsulta',
    name: 'NewConsultation',
    component: NewConsultation,
    meta: {
      autentification: true
    }
  },
  {
    path: '/nuevopaciente',
    name: 'NewPatient',
    component: NewPatient,
    meta: {
      autentification: true
    }
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PatientList,
    meta: {
      autentification: true
    }
  },
  {
    path: '/AgendarCita',
    name: 'apointmentPatient',
    component: ApointmentPatient
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const auth = to.matched.some(record => record.meta.autentification)
  if (auth) {
    if (store.state.user.email) {
      next()
    } else {
      next({ path: '/Login' })
    }
  } else {
    next()
  }
})

export default router
