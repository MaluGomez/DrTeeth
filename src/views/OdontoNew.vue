<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>ODONTOLOGO</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-form v-model="valid">
        <v-card elevation="24">
          <v-layout wrap>
            <v-flex col-12>
              <h1>Agregar Odontólogo</h1>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <v-flex col-6>
            
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
                      label="NombreOdontólogo*"
                      v-model="nombre"
                      required
                      
                    ></v-text-field>
                  </v-flex>

                  <v-flex col-12>
                    <v-select
                      prepend-inner-icon="mdi-credit-card"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      :items="['CC', 'TI']"
                      filled
                      label="Tipo Documento*"
                      v-model="tipoDoc"
                      dense
                    ></v-select>
                  </v-flex>

                  <v-flex col-12>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          filled
                          :rules="[
                            (val) =>
                              (val || '').length > 0 || 'Campo Requerido',
                          ]"
                          v-model="date" 
                          label="FechaNacimiento*"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(date)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex col-12>
                    <v-text-field
                      dense
                      filled
                      prepend-inner-icon="mdi-directions"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      color="purple darken-2"
                      label="DirecciónConsultorio*"
                      v-model="dirAten"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex col-12>
                    <v-text-field
                      filled
                      prepend-inner-icon="mdi-gmail"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido', v => /.+@.+/.test(v) || 'Ingrese un correo valido'
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
                      :rules="[rules.password,  (val) => (val || '').length > 0 || 'Campo Requerido']"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="ContraseñaOdontólogo"
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
                      label="ApellidosOdontologo*"
                      v-model="apellido"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex col-12>
                    <v-text-field
                      filled
                      prepend-inner-icon="mdi-credit-card"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      color="purple darken-2"
                      label="Número Documento*"
                      v-model="numDoc"
                      required
                      type="number"
                    ></v-text-field>
                  </v-flex>

                  <v-flex col-12>
                    <v-radio-group
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      row
                      label="Genero*"
                      v-model="genero"
                    >
                      <v-radio
                        label="Femenino"
                        color="#F7B1F4"
                        value="F"
                      ></v-radio>
                      <v-radio
                        label="Masculino"
                        color="primary"
                        value="M"    
                      ></v-radio>
                    </v-radio-group>
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
                  <v-flex col-12>
                    <v-text-field
                      filled
                      prepend-inner-icon="mdi-credit-card"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      color="purple darken-2"
                      label="NúmeroRegistroProfesional*"
                      v-model="numRegistro"
                      required
                      type="number"
                    ></v-text-field>
                  </v-flex>

                  
                </v-layout>
              </v-flex>
            </v-layout>
            
          </v-flex>
          <v-layout wrap>
            <v-flex col-12>
              <v-textarea
                outlined
                filled
                :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                 prepend-inner-icon="mdi-book-open"
                style="width:80%; display: block; margin-left: auto; margin-right: auto; "                
                name="input-7-4"
                color="black"
                label="Descripción Corta del Odontologo*"
                v-model="descripcion"
              ></v-textarea>
              
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex col-12>
              <v-flex col-12 text-right>
                <v-btn
                  color="blue-grey"
                  class="mx-2 success"
                  @click="saveOdonto()"
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
                  Se agregó el odontologo satisfactoriamente.
                </v-alert>
              </v-flex>
              <v-flex col-12>
                      <v-alert type="error" dense transition="scale-transition" text v-if="alertError">
                        Revise los datos digitados. 
                      </v-alert>
                    </v-flex>
                  
            </v-flex>
          </v-layout>
        </v-card>
        </v-form>
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
    alertError: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: "",
    nombre: "",
    apellido: "",
    tipoDoc:"",
    date:"",
    dirAten:"",
    email:"",
    numDoc:"",
    genero:"",
    telefono:"",
    nombreUsu:"",
    numRegistro:"",
    descripcion:"",
    valid: false,
    rules: {
        password: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 caracteres con al menos una letra mayúscula, un número y un carácter especial."
          );
        }
    },
  }),
  
  methods: {
    async saveOdonto() {
      if(this.valid){
        let currentOdonto = {
        idOdontologo: 0,
        nombres: this.nombre,
        apellidos: this.apellido,
        tipoDoc: this.tipoDoc,
        documentoIdentidad: this.numDoc,
        direccionAtencion: this.dirAten,
        email: this.email,
        genero: this.genero,
        telefono: this.telefono,
        contrasena: this.password,
        fechaNacimiento: this.date,
        numeroRegistro: this.numRegistro,
        descripcion: this.descripcion
      };
      const response = await fetch("https://drteeth.herokuapp.com/Odontologo", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(currentOdonto)
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
              this.alertError = true;
              setTimeout(() => {
                this.alertError = false;
              }, 3000);
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
