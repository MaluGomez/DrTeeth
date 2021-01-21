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
        <v-layout wrap>
          <v-flex col-12>
             <v-btn text small color="primary" @click="$router.push('/AgendarCita').catch(()=>{})">Agendar Cita</v-btn>
          </v-flex>
        </v-layout>
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
              :type="pass ? 'text' : 'password'"
              :rules="[
                (value) => !!value || 'Required.',
                (value) => value.length >= 3 || 'Min 8 characters',
              ]"
              outlined
              rounded
              dense
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
              Iniciar Sesión <v-icon>mdi-login</v-icon></v-btn
            >
            
          </v-form>
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
             envianos un correo y te ayudaremos a solucionar
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
      pass: false,
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
        console.log(data)
        const response = await fetch("http://localhost:3304/Auth", {
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
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
              console.log(response[0])
              if (response[0]) {
                this.$store.state.user.email = this.email
                this.$store.state.user.rol = "1"
                this.$router.push('/').catch(()=>{})
              } else {
                console.log(response)
              }
            });
        
        /**
         * ACA DEBERIA HACER LA CONSULTA A LA BASE DE DATOS O AL BACK PARA VER SI TODO COINCIDE Y PUEDE PASAR.
         */
        /*if (this.email == 'malu@ag.com') {
          this.$store.state.user.email = this.email
          this.$store.state.user.rol = "1"
          this.$router.push('/').catch(()=>{})
        } else if (this.email == 'shongo@ag.com') {
          this.$store.state.user.email = this.email
          this.$store.state.user.name = "Jhon Edinson"
          this.$store.state.user.lastname = "Castañeda Oviedo"
          this.$store.state.user.born = "01/01/1998"
          this.$store.state.user.phone = "3004256523"
          this.$store.state.user.tel = "635926"
          this.$store.state.user.gender = "Masculino"
          this.$store.state.user.identify = "1025634856"
          this.$store.state.user.address = "Hotel Campestre Español Condado de Pavas"
          this.$store.state.user.register = "00000000001"
          this.$store.state.user.description = "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
          this.$store.state.user.rol = "2"
          this.$router.push('/').catch(()=>{})
        } else {
          console.log('No coincide')
        }*/
      }
    },
    
  },
  mounted () {
    this.$store.state.user = {}
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
