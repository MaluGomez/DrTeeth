<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>ADMINISTRADOR</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-card elevation="24">
          <v-layout wrap>
            <v-flex col-12>
              <h1>Agregar Administrador</h1>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <v-flex col-6>
            <v-form v-model="valid">
            <v-layout ma-2 white>
              <v-flex col-12>
                <v-layout wrap>
                  <v-flex col-12>
                    <v-text-field
                      dense
                      filled
                      prepend-inner-icon="mdi-account-box-outline"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      color="purple darken-2"
                      label="Nombre*"
                      v-model="nombre"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex col-12>
                    <v-text-field
                      filled
                      prepend-inner-icon="mdi-gmail"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                         v => /.+@.+/.test(v) || 'Ingrese un correo valido'
                      ]"
                      color="purple darken-2"
                      label="CorreoElectrónico*"
                      v-model="email"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex col-12>
                    <v-text-field
                      filled
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.password, (val) => (val || '').length > 0 || 'Campo Requerido']"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Contraseña"
                      hint="Min. 8 caracteres con al menos una letra mayúscula, un número y un carácter especial"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-flex>

                </v-layout>
              </v-flex>

              <v-flex col-12>
                <v-layout wrap>
                  <v-flex col-12>
                    <v-text-field
                      dense
                      filled
                      prepend-inner-icon="mdi-account-box-outline"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      color="purple darken-2"
                      label="Apellidos*"
                      v-model="apellido"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex col-12>
                    <v-text-field
                      filled
                      prepend-inner-icon="mdi-cellphone"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      color="purple darken-2"
                      label="Telefono/Celular*"
                      v-model="telefono"
                      required
                      type="number"
                    ></v-text-field>
                  </v-flex>

                  
                </v-layout>

                <v-layout wrap>
                  <v-flex col-12>
                    <v-flex col-12 text-right>
                      <v-btn
                        color="blue-grey"
                        class="mx-2 success"
                        @click="saveAdmin()"
                        :disabled="!valid"
                      >
                        Agregar
                        <v-icon right dark>mdi-account-plus</v-icon>
                      </v-btn>
                    </v-flex>
                    
                    <v-flex col-12>
                      <v-alert
                        dense
                        transition="scale-transition"
                        text
                        type="success"
                        v-if="updatedAlert"
                      >
                        Se agregó el Administrador satisfactoriamente.
                      </v-alert>
                    </v-flex>
                    <v-flex col-12>
                      <v-alert type="error" dense transition="scale-transition" text v-if="alertError">
                        Revise los datos digitados, todos los campos deben estar llenos.
                      </v-alert>
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            </v-form>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    modal2: false,
    time: null,
    updatedAlert: false,
    alertError:false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    nombreUse: "",
    valid: false,
    rules: {
        password: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 caracteres con al menos una letra mayúscula, un número y un carácter especial."
          );
        }
    }
           
  }),
  methods: {
    async saveAdmin() {
    if(this.valid){
        let currentTr = {
        idAdministrador: 0,
        nombres: this.nombre,
        apellidos: this.apellido,
        email: this.email,
        telefono: this.telefono,
        contrasena: this.password
      };
      const response = await fetch("http://localhost:3304/Administrador", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(currentTr)
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
              
            });
      this.updatedAlert = true;
              setTimeout(() => {
                this.updatedAlert = false;
              }, 3000);
    }
    },
  },
};
</script>
