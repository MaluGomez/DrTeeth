<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>NUEVO PACIENTE</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-card elevation="24">
          <v-layout wrap>
            <v-flex col-12>
              <h1>Historia Clinica Odontológica</h1>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <v-flex col-6>
            <v-layout ma-2 white>
              <v-flex col-12>
                <v-layout wrap>
                  <v-flex col-12 pa-0>
                    <h2 style="color: #1E88E5">Datos Personales</h2>
                    <v-divider color="#1E88E5" />
                    <br />
                    <v-container fluid>
                      <v-row>
                        <v-row>
                          <v-layout wrap>
                            <v-flex col-12>
                              <v-text-field
                                dense
                                prepend-inner-icon="mdi-account-box-outline"
                                :rules="[
                                  (val) =>
                                    (val || '').length > 0 || 'Campo Requerido',
                                ]"
                                color="purple darken-2"
                                label="NombrePaciente*"
                                v-model="nombre"
                                required
                              ></v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-layout wrap>
                            <v-flex col-12>
                              <v-text-field
                                dense
                                :rules="[
                                  (val) =>
                                    (val || '').length > 0 || 'Campo Requerido',
                                ]"
                                color="purple darken-2"
                                prepend-inner-icon="mdi-account-box-outline"
                                label="ApellidosPaciente*"
                                v-model="apellido"
                                required
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-row>
                        <v-row>
                          <v-layout wrap>
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
                                    :rules="[
                                      (val) =>
                                        (val || '').length > 0 ||
                                        'Campo Requerido',
                                    ]"
                                    v-model="date"
                                    label="Fecha Nacimiento*"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="modal = false"
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
                          </v-layout>

                          <v-layout wrap>
                            <v-flex col-12>
                              <v-radio-group
                                :rules="[
                                  (val) =>
                                    (val || '').length > 0 || 'Campo Requerido',
                                ]"
                                row
                                label="Genero*"
                                v-model="genero"
                              >
                                <v-radio
                                  label="F"
                                  color="#F7B1F4"
                                  value="F"
                                ></v-radio>
                                <v-radio
                                  label="M"
                                  color="primary"
                                  value="M"
                                ></v-radio>
                              </v-radio-group>
                            </v-flex>
                          </v-layout>
                        </v-row>
                        <v-layout wrap>
                          <v-flex col-12>
                            <v-text-field
                              prepend-inner-icon="mdi-sign-direction"
                              :rules="[
                                (val) =>
                                  (val || '').length > 0 || 'Campo Requerido',
                              ]"
                              color="purple darken-2"
                              label="Dirección*"
                              v-model="direccion"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-row>
                          <v-layout wrap>
                            <v-flex col-12>
                              <v-text-field
                                prepend-inner-icon="mdi-email"
                                :rules="[
                                  v => /.+@.+/.test(v) || 'Ingrese un correo valido'
                                ]"
                                color="purple darken-2"
                                label="Correo Electronico"
                                v-model="email"
                                required
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout wrap>
                            <v-flex col-12>
                              <v-text-field
                                prepend-inner-icon="mdi-cellphone"
                                :rules="[
                                  (val) =>
                                    (val || '').length > 0 || 'Campo Requerido',
                                ]"
                                color="purple darken-2"
                                label="Telefono/Celular*"
                                v-model="telefono"
                                required
                                type="number"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-row>

                        <v-row>
                          <v-flex col-6>
                            <v-select
                              prepend-inner-icon="mdi-credit-card"
                              :rules="[
                                (val) =>
                                  (val || '').length > 0 || 'Campo Requerido',
                              ]"
                              :items="['CC', 'TI/RegistroCivil']"
                              filled
                              label="Tipo Documento*"
                              v-model="tipoDoc"
                              dense
                            ></v-select>
                          </v-flex>

                          <v-flex col-6>
                            <v-text-field
                              prepend-inner-icon="mdi-credit-card"
                              :rules="[
                                (val) =>
                                  (val || '').length > 0 || 'Campo Requerido',
                              ]"
                              color="purple darken-2"
                              label="Número Documento*"
                              v-model="numDoc"
                              required
                              type="number"
                            ></v-text-field>
                          </v-flex>
                        </v-row>
                        <v-row>
                          <v-flex col-6>
                            <v-select
                              prepend-inner-icon="mdi-water"
                              :rules="[
                                (val) =>
                                  (val || '').length > 0 || 'Campo Requerido',
                              ]"
                              :items="[
                                'O+',
                                'O-',
                                'A+',
                                'A-',
                                'B+',
                                'B-',
                                'AB+',
                                'AB-',
                              ]"
                              filled
                              label="Tipo de Sangre*"
                              v-model="rh"
                              dense
                            ></v-select>
                          </v-flex>

                          <v-flex col-6>
                            <v-text-field
                              :rules="[
                                (val) =>
                                  (val || '').length > 0 || 'Campo Requerido',
                              ]"
                              color="purple darken-2"
                              label="EPS*"
                              v-model="eps"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-row>
                        <br />
                        <br />
                        <br />
                        <br />
                        <v-layout wrap v-if="tipoDoc == 'TI/RegistroCivil'">
                          <v-flex col-12 pa-0>
                            <h2 style="color: #1E88E5">
                              Información Acudiente
                            </h2>
                            <v-divider color="#1E88E5" />
                            <br />
                            <br />
                            <v-container fluid>
                              <v-row>
                                <v-row>
                                  <v-layout wrap>
                                    <v-flex col-12>
                                      <v-text-field
                                        dense
                                        prepend-inner-icon="mdi-account-box-outline"
                                        color="purple darken-2"
                                        label="NombreAcudiente"
                                        v-model="nomAcu"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>

                                  <v-layout wrap>
                                    <v-flex col-12>
                                      <v-text-field
                                        dense
                                        color="purple darken-2"
                                        prepend-inner-icon="mdi-account-box-outline"
                                        label="ApellidosAcudiente*"
                                        v-model="apelliodAcu"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                </v-row>
                                <br />
                                <br />
                                <br />
                                <v-row>
                                  <v-layout wrap>
                                    <v-flex col-12>
                                      <v-text-field
                                        dense
                                        prepend-inner-icon="mdi-cellphone"
                                        color="purple darken-2"
                                        label="TelefonoAcudiente"
                                        v-model="telAcu"
                                        required
                                        type="number"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>

                                  <v-layout wrap>
                                    <v-flex col-12>
                                      <v-text-field
                                        dense
                                        color="purple darken-2"
                                        prepend-inner-icon="mdi-account-box-outline"
                                        label="Parentesco"
                                        v-model="parentesco"
                                        required
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                </v-row>
                              </v-row>
                            </v-container>
                          </v-flex>
                        </v-layout>
                      </v-row>
                    </v-container>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-divider inset vertical />
              <v-flex col-12>
                <v-layout wrap>
                  <v-flex col-12 pa-0>
                    <v-container fluid>
                      <v-row>
                        <v-flex>
                          <v-layout wrap>
                            <v-flex col-12>
                              <h2 style="color: #1E88E5">
                                Antecedentes Personales
                              </h2>
                              <v-divider color="#1E88E5" />
                              <v-row>
                                <v-layout wrap>
                                  <v-flex col-12>
                                    <v-radio-group
                                      column
                                      label="¿Tratamiento Actual?*"
                                      v-model="pregunta1"
                                    >
                                      <v-radio
                                        label="Si"
                                        color="primary"
                                        value="primary"
                                      ></v-radio>
                                      <v-radio
                                        label="No"
                                        color="primary"
                                        value="secondary"
                                      ></v-radio>
                                    </v-radio-group>
                                  </v-flex>
                                </v-layout>
                                <v-layout wrap>
                                  <v-flex col-12>
                                    <v-radio-group
                                      column
                                      label="¿Toma Medicamentos?*"
                                      v-model="pregunta2"
                                    >
                                      <v-radio
                                        label="Si"
                                        color="primary"
                                        value="primary"
                                      ></v-radio>
                                      <v-radio
                                        label="No"
                                        color="primary"
                                        value="secondary"
                                      ></v-radio>
                                    </v-radio-group>
                                  </v-flex>
                                </v-layout>
                              </v-row>

                              <v-row>
                                <v-layout wrap>
                                  <v-flex col-12>
                                    <v-radio-group column label="¿Alergias?*" v-model="pregunta3">
                                      <v-radio
                                        label="Si"
                                        color="primary"
                                        value="primary"
                                      ></v-radio>
                                      <v-radio
                                        label="No"
                                        color="primary"
                                        value="secondary"
                                      ></v-radio>
                                    </v-radio-group>
                                  </v-flex>
                                </v-layout>
                                <v-layout wrap>
                                  <v-flex col-12>
                                    <v-radio-group
                                      column
                                      label="¿Presión Arterial?*"
                                      v-model="pregunta4"
                                    >
                                      <v-radio
                                        label="Si"
                                        color="primary"
                                        value="primary"
                                      ></v-radio>
                                      <v-radio
                                        label="No"
                                        color="primary"
                                        value="secondary"
                                      ></v-radio>
                                    </v-radio-group>
                                  </v-flex>
                                </v-layout>
                              </v-row>

                              <v-row>
                                <v-layout wrap>
                                  <v-flex col-12>
                                    <v-radio-group column label="¿Cirugías?*" v-model="pregunta5">
                                      <v-radio
                                        label="Si"
                                        color="primary"
                                        value="primary"
                                      ></v-radio>
                                      <v-radio
                                        label="No"
                                        color="primary"
                                        value="secondary"
                                      ></v-radio>
                                    </v-radio-group>
                                  </v-flex>
                                </v-layout>
                                <v-layout wrap>
                                  <v-flex col-12>
                                    <v-radio-group column label="¿Embarazo?*" v-model="pregunta6">
                                      <v-radio
                                        label="Si"
                                        color="primary"
                                        value="primary"
                                      ></v-radio>
                                      <v-radio
                                        label="No"
                                        color="primary"
                                        value="secondary"
                                      ></v-radio>
                                    </v-radio-group>
                                  </v-flex>
                                </v-layout>
                              </v-row>
                              <v-row>
                                <v-layout wrap>
                                  <v-col cols="12">
                                    <v-textarea
                                      outlined
                                      filled
                                      color="purple darken-2"
                                      name="input-7-4"
                                      label="Observaciones"
                                      v-model="observaciones"
                                    ></v-textarea>
                                  </v-col>
                                </v-layout>
                              </v-row>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-row>
                    </v-container>
                  </v-flex>
                  <v-layout wrap>
                  <v-flex col-12>
                    <v-flex col-12 text-right>
                      <v-btn
                        
                        color="blue-grey"
                        class="mx-2 success"
                        @click="savePa()"
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
                        El nuevo paciente se ha guardado satisfactoriamente.
                      </v-alert>
                    </v-flex>
                    <v-flex col-12>
                      <v-alert type="error" dense transition="scale-transition" text v-if="alertError">
                        Revise los datos digitados, todos los campos deben estar llenos.
                      </v-alert>
                    </v-flex>
                  </v-flex>
                </v-layout>
                </v-layout>
              </v-flex>
            </v-layout>
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
    menu2: false,
    updatedAlert: false,
    errorAlert: false,
    nombre: "",
    apellido: "",
    tipoDoc:"",
    date:"",
    direccion:"",
    email:"",
    numDoc:"",
    genero:"",
    telefono:"",
    rh:"",
    eps:"",
    nomAcu:"",
    apelliodAcu:"",
    telAcu:"",
    parentesco:"",
    nomOdon:"",
    apellidoOdon:"",
    nomAsistente:"",
    nomAsistente:"",
    pregunta1: "",
    pregunta2: "",
    pregunta3: "",
    pregunta4: "",
    pregunta5: "",
    pregunta6: "",
    observaciones: ""
  }),
  

    methods: {
    async savePa() {
      let idPaciente = ""
      let currentPatient = {
        nombres: this.nombre,
        apellidos: this.apellido,
        tipoIdentificacion: this.tipoDoc,
        numeroIdentificacion: this.numDoc,
        direccion: this.direccion,
        email: this.email,
        genero: this.genero,
        telefono: this.telefono,
        rh: this.rh,
        fechaNacimiento: this.date,
        eps: this.eps,
        idOdontologo: this.$store.state.user.idOdontologo
      };
      await fetch("http://localhost:3304/Paciente", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(currentPatient)
        })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(async response => {
            idPaciente = response.insertId
            let data = {
              pregunta1: this.pregunta1,
              pregunta2: this.pregunta2,
              pregunta3: this.pregunta3,
              pregunta4: this.pregunta4,
              pregunta5: this.pregunta5,
              pregunta6: this.pregunta6,
              observaciones: this.observaciones,
              idPaciente: response.insertId
            }
            await fetch("http://localhost:3304/Antecedente", {
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
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {

            });
        });
      if (this.tipoDoc == "TI") {
        let data = {
          nombres: this.nomAcu,
          apellidos: this.apelliodAcu,
          telefono: this.telAcu,
          parentesco: this.parentesco,
          idPaciente: idPaciente
        }
        await fetch("http://localhost:3304/Acudiente", {
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
        })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(async response => {
          })
      } else {
      }
      this.updatedAlert = true;
    },
  },
};
</script>
