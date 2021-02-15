<template>
  <div class="d-sm-flex bodyLogin align-center">
    <v-container
      sm
      style="height: 700px; width: 500px"
      class="d-flex text-center"
      secondary
      dark
    >
      <v-layout white>
        <v-flex col-12 align-self-center style="padding: 50px">
          <div class="d-flex justify-center">
            <v-img
              src="@/assets/img/Logo.png"
              style="height: 300px; width: 300px; top: -1px"
            />
          </div>
          <br />
          <h3 class="titleLogin pb-5">INICIAR SESIÓN</h3>
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              label="Usuario*"
              :rules="[rulesEmail.required, rulesEmail.email]"
              outlined
              rounded
              dense
            >
            </v-text-field> 
            
            <v-text-field
              v-model="password"
              label="Contraseña"
              :type="show4 ? 'text' : 'password'"
              
              :rules="[
                (value) => !!value || 'Required.',
                (value) => value.length >= 3 || 'Min 8 characters',
              ]"
              outlined
              rounded
              dense
              :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show4 = !show4"
            >
            </v-text-field>
            
            <v-btn
              class="mb-5"
              color="#235988"
              rounded
              outlined
              title
              :disabled="!valid"
              @click="Login()"
            >
              Iniciar Sesión <v-icon>mdi-login</v-icon></v-btn>
          </v-form>
          <v-flex col-12 align-self-center>
          <v-alert
            :value="alertLogin"
            color="red"
            dark
            border="top"
            icon="mdi-warning"
            transition="scale-transition"
          >
           <p> Usuario o contraseña incorrecta!!! </p>
          </v-alert>
          
        </v-flex>
           
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                style="cursor: help"
                v-bind="attrs"
                v-on="on"
                @click="alert = !alert"
              >
                <v-icon>mdi-information-variant</v-icon>
              </v-btn>
            </template>
            <span>Olvidaste tu contraseña?</span>
          </v-tooltip>
         </v-flex>
        
        <v-flex col-12 align-self-center>
          <v-alert
            :value="alert"
            color="pink"
            dark
            border="top"
            icon="mdi-information"
            transition="scale-transition"
          >
           <p> Holaaa!! Te saluda el equipo de Dr.Teeth
             Si tienes problemas con tu usuario o contraseña
             envianos un correo (proyectodrteeth@hotmail.com)
              y te ayudaremos a solucionar
             tu inconveniente. Gracias </p>
          </v-alert>
          
        </v-flex>
        
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alert: false,
      alertLogin: false,
      pass: false,
       show4: false,
      valid: false,
      rulesEmail: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      email: "",
      password: "",
    };
  },
  
  methods: {
    async Login () {
      if (this.valid) {
        let data = {
          password: this.password,
          user: this.email
        }
        await fetch("https://drteeth.herokuapp.com/Auth", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then( async res => res.json())
            .catch(error => console.error('Error:', error))
            .then(async response => {
              if (response[0]) {
                if (response[0].rol == "0"){
                  this.$store.state.user.email = this.email                
                  this.$store.state.user.rol = response[0].rol
                  localStorage.setItem('email', this.email)
                  localStorage.setItem('rol', response[0].rol)
                  this.$router.push('/').catch(()=>{})  
                } else {
                  this.$store.state.user.email = this.email
                  this.$store.state.user.rol = response[0].rol
                  this.$store.state.user.name = response[0].nombres
                  this.$store.state.user.lastname = response[0].apellidos
                  this.$store.state.user.born = response[0].fechaNacimiento
                  this.$store.state.user.phone = response[0].telefono
                  this.$store.state.user.gender = response[0].genero
                  this.$store.state.user.identify = response[0].documentoIdentidad
                  this.$store.state.user.address = response[0].direccionAtencion
                  this.$store.state.user.register = response[0].numeroRegistro
                  this.$store.state.user.description = response[0].descripcion
                  this.$store.state.user.idOdontologo = response[0].idOdontologo
                  localStorage.setItem('email', this.email)
                  localStorage.setItem('rol', response[0].rol)
                  localStorage.setItem('name', response[0].nombres)
                  localStorage.setItem('lastname', response[0].apellidos)
                  localStorage.setItem('born', response[0].fechaNacimiento)
                  localStorage.setItem('phone', response[0].telefono)
                  localStorage.setItem('gender', response[0].genero)
                  localStorage.setItem('identify', response[0].documentoIdentidad)
                  localStorage.setItem('address', response[0].direccionAtencion)
                  localStorage.setItem('register', response[0].numeroRegistro)
                  localStorage.setItem('description', response[0].descripcion)
                  localStorage.setItem('idOdontologo', response[0].idOdontologo)
                  this.$router.push('/').catch(()=>{})
                }
              } else {
                this.alertLogin = true
                setTimeout(() => {
                  this.alertLogin = false
                }, 3000);
              }
            });
      }
    }, 
  },
  mounted() {
    if (localStorage.email) {
      this.$store.state.user.email = localStorage.email
      this.$store.state.user.rol = localStorage.rol
      this.$store.state.user.name = localStorage.name
      this.$store.state.user.lastname = localStorage.lastname
      this.$store.state.user.born = localStorage.born
      this.$store.state.user.phone = localStorage.phone
      this.$store.state.user.gender = localStorage.gender
      this.$store.state.user.identify = localStorage.identify
      this.$store.state.user.address = localStorage.address
      this.$store.state.user.register = localStorage.register
      this.$store.state.user.description = localStorage.description
      this.$store.state.user.idOdontologo = localStorage.idOdontologo
      this.$router.push('/').catch(()=>{})
    }
  },
};
</script>
<style>
.titleLogin {
  color: #4285f4;
}
.bodyLogin {
  background: linear-gradient(50deg, skyblue, royalblue);
  height: 100%;
}
</style>
