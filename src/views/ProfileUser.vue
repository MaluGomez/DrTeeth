<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>Datos de Usuario</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-card elevation="24">
          <v-layout wrap>
            <v-flex col-12>
              <h1>DATOS PERSONALES</h1>
              <v-divider></v-divider>
            </v-flex>
            <v-flex col-12>
              <v-layout ma-2 white>
                <v-flex col-4 ping>
                  <h3 style="margin-bottom: 8px">
                    <v-avatar size="40" :color="colorsAvatar[Math.floor(Math.random() * colorsAvatar.length)]">
                      <span class="white--text headline">{{user.avatar}}</span>
                    </v-avatar>
                    {{user.name}}
                  </h3>
                  <h4 v-text="user.born"></h4>
                  <h3>Descripción</h3>
                  <v-divider style="border: solid 1px; color: #1E88E5; margin-bottom: 10px"/>
                  <p><v-icon>mdi-format-quote-open</v-icon> {{user.description}} <v-icon>mdi-format-quote-close</v-icon></p>
                </v-flex>
                <v-divider inset vertical/>
                <v-flex col-8 white>
                  <v-layout wrap>
                    <!-- INFORMACION DE CONTACTO -->
                    <v-flex col-12>
                     <v-layout wrap>
                       <v-flex col-12 pa-0>
                         <h2 style="color: #1E88E5">Información de contacto</h2>
                         <v-divider color="#1E88E5"/>
                       </v-flex>
                       <v-flex col-12 pa-0>
                         <v-chip color="#1E88E5" class="ma-3" outlined>
                           <v-icon left>mdi-phone-classic</v-icon>
                           Telefono: {{user.tel}}
                         </v-chip>
                         <v-chip color="#1E88E5" class="ma-3" outlined>
                           <v-icon left>mdi-cellphone</v-icon>
                           Celular: {{user.phone}}
                         </v-chip>
                         <v-chip color="#1E88E5" class="ma-3" outlined>
                           <v-icon left>mdi-gmail</v-icon>
                           Correo: {{user.email}}
                         </v-chip>
                       </v-flex>
                     </v-layout>
                    </v-flex>
                    <!-- INFORMACION PERSONAL!!! -->
                    <v-flex col-12>
                     <v-layout wrap>
                       <v-flex col-12 pa-0>
                         <h2 style="color: #1E88E5">Información personal</h2>
                         <v-divider color="#1E88E5"/>
                       </v-flex>
                       <v-flex col-12 pa-0>
                         <v-chip color="#1E88E5" class="ma-3" outlined>
                           <v-icon left>mdi-account</v-icon>
                           Nombre: {{user.name}} {{user.lastname}}
                         </v-chip>
                         <v-chip color="#1E88E5" class="ma-3" outlined>
                           <v-icon left>mdi-gender-male-female</v-icon>
                           Genero: {{user.gender}}
                         </v-chip>
                         <v-chip color="#1E88E5" class="ma-3" outlined>
                           <v-icon left>mdi-certificate</v-icon>
                           CC: {{user.identify}}
                         </v-chip>
                       </v-flex>
                     </v-layout>
                    </v-flex>
                    <!-- INFORMACION PROFESIONAL -->
                    <v-flex col-12>
                     <v-layout wrap>
                       <v-flex col-12 pa-0>
                         <h2 style="color: #1E88E5">Información Profesional</h2>
                         <v-divider color="#1E88E5"/>
                       </v-flex>
                       <v-flex col-12 pa-0>
                         <v-chip color="#1E88E5" class="ma-3" outlined>
                           <v-icon left>mdi-gender-male-female</v-icon>
                           Dirección: {{user.address}}
                         </v-chip>
                         <v-chip color="#1E88E5" class="ma-3" outlined>
                           <v-icon left>mdi-account</v-icon>
                            Numero de registro profesional: {{user.register}}
                         </v-chip>
                       </v-flex>
                     </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex col-12>

            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {},
      colorsAvatar: ['red', 'blue', 'pink', 'yellow', 'orange', 'purple', 'green', 'teal', 'cyan']
    }
  },
  methods: {
    dateFormat() {
      let dateMes = this.user.born.split('/')
      switch (dateMes[1]) {
        case '01':
          this.user.born = 'Enero-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '02':
          this.user.born = 'Febrero-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '03':
          this.user.born = 'Marzo-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '04':
          this.user.born = 'Abril-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '05':
          this.user.born = 'Mayo-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '06':
          this.user.born = 'Junio-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '07':
          this.user.born = 'Julio-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '08':
          this.user.born = 'Agosto-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '09':
          this.user.born = 'Septiembre-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '10':
          this.user.born = 'Octubre-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '11':
          this.user.born = 'Noviembre-' + dateMes[0] + '-' + dateMes[2]
          break;
        case '12':
          this.user.born = 'Diciembre-' + dateMes[0] + '-' + dateMes[2]
          break;
        default:
          break;
      }
    }
  },
  mounted () {
    this.user = this.$store.state.user
    this.user.avatar = this.user.name.split(" ")[0][0] + this.user.name.split(" ")[1][0]
    this.dateFormat()
  }
}
</script>
