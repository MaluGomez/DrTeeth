<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>Pacientes</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-card elevation="24">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="patientsList"
            :search="search"
          >
            <template v-slot:item.opciones="{ item }">
              <v-layout wrap>
                <v-flex class="d-flex justify-center">
                  <v-btn
                color="primary"
                @click="(overlayHC = !overlayHC), selectUser(item)"
                class="mx-2"
              >
                Ver HC
              </v-btn>
              <v-btn
                color="purple"
                @click="(overlayRT = !overlayRT), selectUser(item)"
                class="mx-2"
                >Tratamiento
              </v-btn>
              <v-btn
                color="pink"
                class="mx-2"
                @click="(overlayC = !overlayC), selectUser(item)"
                >Consulta
              </v-btn>
                </v-flex>
              </v-layout>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Este pedaZo de codsigo se ejecuta cuando le da click en el boton Historia Clinica -->
    <v-overlay :value="overlayHC" absolute style="height: 160%;">
      <v-card light style="width: 100%; margin-top: 300px;">
        <v-layout wrap>
          <v-flex col-12>
            <v-flex col-12>
              <h2 style="color: #1E88E5">Datos Personales</h2>
              <v-divider color="#1E88E5" />
            </v-flex>
            <br />
            <v-row>
              <v-layout wrap>
                <v-flex col-12>
                  <v-text-field
                    v-model="nombrePaciente"
                    dense
                    prepend-inner-icon="mdi-account-box-outline"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="NombrePaciente*"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex col-12>
                  <v-text-field
                    v-model="apellidosPaciente"
                    dense
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    prepend-inner-icon="mdi-account-box-outline"
                    label="ApellidosPaciente*"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-row>
            <v-layout wrap>
              <v-flex col-12>
                <v-text-field
                  v-model="dirPaciente"
                  prepend-inner-icon="mdi-sign-direction"
                  :rules="[
                    (val) => (val || '').length > 0 || 'Campo Requerido',
                  ]"
                  color="purple darken-2"
                  label="Dirección*"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-row>
              <v-layout wrap>
                <v-flex col-12>
                  <v-text-field
                    v-model="correoPaciente"
                    prepend-inner-icon="mdi-email"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="Correo Electronico*"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex col-12>
                  <v-text-field
                    v-model="telPaciente"
                    prepend-inner-icon="mdi-cellphone"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="Telefono/Celular*"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-row>
            <v-row>
              <v-flex col-6>
                <v-text-field
                  filled
                  v-model="epsPaciente"
                  :rules="[
                    (val) => (val || '').length > 0 || 'Campo Requerido',
                  ]"
                  color="purple darken-2"
                  label="EPS*"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex col-6>
                <v-select
                  v-model="rhPaciente"
                  filled
                  prepend-inner-icon="mdi-water"
                  :rules="[
                    (val) => (val || '').length > 0 || 'Campo Requerido',
                  ]"
                  :items="['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']"
                  label="Tipo de Sangre*"
                  dense
                ></v-select>
              </v-flex>
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
                          (val) => (val || '').length > 0 || 'Campo Requerido',
                        ]"
                        v-model="fechaNacimiento"
                        label="Picker in dialog"
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
              </v-layout>

              <v-layout wrap>
                <v-flex col-12>
                  <v-radio-group
                  v-model="generoPaciente"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    row
                    label="Genero*"
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
            <v-row>
              <v-flex col-6>
                <v-select
                  v-model="tipoDocPaciente"
                  prepend-inner-icon="mdi-credit-card"
                  :rules="[
                    (val) => (val || '').length > 0 || 'Campo Requerido',
                  ]"
                  :items="['CC', 'TI']"
                  filled
                  label="Tipo Documento*"
                  dense
                ></v-select>
              </v-flex>

              <v-flex col-6>
                <v-text-field
                v-model="numDocPaciente"
                  prepend-inner-icon="mdi-credit-card"
                  :rules="[
                    (val) => (val || '').length > 0 || 'Campo Requerido',
                  ]"
                  color="purple darken-2"
                  label="Número Documento*"
                  required
                ></v-text-field>
              </v-flex>
            </v-row>
            <v-layout wrap>
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
                            v-model="nombreAcudiente"
                            dense
                            prepend-inner-icon="mdi-account-box-outline"
                            color="purple darken-2"
                            label="NombreAcudiente"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout wrap>
                        <v-flex col-12>
                          <v-text-field
                            v-model="apellidosAcudiente"
                            dense
                            color="purple darken-2"
                            prepend-inner-icon="mdi-account-box-outline"
                            label="ApellidosAcudiente"
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
                            v-model="telAcudiente"
                            dense
                            prepend-inner-icon="mdi-cellphone"
                            color="purple darken-2"
                            label="TelefonoAcudiente"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout wrap>
                        <v-flex col-12>
                          <v-text-field
                            v-model="parentescoAcudiente"
                            dense
                            color="purple darken-2"
                            prepend-inner-icon="mdi-account-box-outline"
                            label="Parentesco"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-row>
                  </v-row>
                </v-container>
              </v-flex>
            </v-layout>
            <!--QUE SE DICE-->

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
                        <v-radio-group column label="¿Tratamiento Actual?*" v-model="pregunta1">
                          <v-radio
                            label="Si"
                            color="primary"
                            value="SI"
                          ></v-radio>
                          <v-radio
                            label="No"
                            color="primary"
                            value="NO"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-radio-group column label="¿Toma Medicamentos?*"  v-model="pregunta2">
                          <v-radio
                            label="Si"
                            color="primary"
                            value="SI"
                          ></v-radio>
                          <v-radio
                            label="No"
                            color="primary"
                            value="NO"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                  </v-row>

                  <v-row>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-radio-group column label="¿Alergias?*"  v-model="pregunta3">
                          <v-radio
                            label="Si"
                            color="primary"
                            value="SI"
                          ></v-radio>
                          <v-radio
                            label="No"
                            color="primary"
                            value="NO"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-radio-group column label="¿Presión Arterial?*"  v-model="pregunta4">
                          <v-radio
                            label="Si"
                            color="primary"
                            value="SI"
                          ></v-radio>
                          <v-radio
                            label="No"
                            color="primary"
                            value="NO"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                  </v-row>

                  <v-row>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-radio-group column label="¿Cirugías?*"  v-model="pregunta5">
                          <v-radio
                            label="Si"
                            color="primary"
                            value="SI"
                          ></v-radio>
                          <v-radio
                            label="No"
                            color="primary"
                            value="NO"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-radio-group column label="¿Embarazo?*"  v-model="pregunta6">
                          <v-radio
                            label="Si"
                            color="primary"
                            value="SI"
                          ></v-radio>
                          <v-radio
                            label="No"
                            color="primary"
                            value="NO"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                  </v-row>
                  <v-row>
                    <v-layout wrap>
                      <v-col cols="12">
                        <v-textarea
                         v-model="observacionesAnte"
                          outlined
                          filled
                          color="purple darken-2"
                          name="input-7-4"
                          label="Observaciones"
                        ></v-textarea>
                      </v-col>
                    </v-layout>
                  </v-row>
                </v-flex>
              </v-layout>
            </v-flex>

            <!--NADA-->
          </v-flex>

          <v-flex col-12>
            <v-btn @click="saveHC()" class="mx-2 success">Actualizar</v-btn>
            <v-btn
              @click="(overlayHC = false), (updatedAlert = false)"
              class="mx-2 red"
              >cerrar</v-btn
            >
          </v-flex>
          <v-flex style="width: 100%">
            <v-alert
              dense
              transition="scale-transition"
              text
              type="success"
              v-if="updatedAlert"
            >
              Los cambios se guardaron satisfactoriamente.
            </v-alert>
          </v-flex>
        </v-layout>
      </v-card>
    </v-overlay>

    <!-- Fin del codigo que se ejecuta para Historia Clinica -->
    <!-- Este pedaso de codsigo se ejecuta cuando le da click en el boton Realizar Tratamiento -->
    <v-overlay :value="overlayRT" absolute>
      <v-card light style="width: 100%">
        <v-layout wrap>
          <v-flex col-12>
            <v-textarea
              v-model="motivoConsulta"
              name="input-7-1"
              label="Motivo de Consulta"
              counter=""
            ></v-textarea>
            <v-textarea
              v-model="odontogramaAnt"
              label="Odontograma de Paciente"
              disabled
            ></v-textarea>
            <v-textarea
              v-model="observaciones"
              label="Observaciones"
            ></v-textarea>
          </v-flex>
          <v-flex col-12>
            <v-btn @click="saveTR()" class="mx-2 success">Guardar</v-btn>
            <v-btn
              @click="(overlayRT = false), (updatedAlert = false)"
              class="mx-2 red"
              >cerrar</v-btn
            >
          </v-flex>
          <v-flex style="width: 100%">
            <v-alert
              dense
              transition="scale-transition"
              text
              type="success"
              v-if="updatedAlert"
            >
              Los cambios se guardaron satisfactoriamente.
            </v-alert>
          </v-flex>
        </v-layout>
      </v-card>
    </v-overlay>
    <!-- Fin del codigo que se ejecuta para Realizar Tratamiento -->

    <!-- inicio codigo para consulta nueva-->
    <v-overlay :value="overlayC" absolute class="d-flex justify-start absolute" style="width: 160%; height: 130%">
      <v-card light style="margin-left: 100px; margin-top: 120px">
        <v-layout wrap>
          <v-flex col-12 class="pa-0">
            <v-flex class="text-center" col-12>
              <v-btn class="mx-2 red" @click="selColor = 'red'">CARIE</v-btn>
              <v-btn class="mx-2 yellow" @click="selColor = 'yellow'"
                >OBTURACIÓN</v-btn
              >
              <v-btn class="mx-2 green" @click="selColor = 'green'"
                >EXTRACCIÓN</v-btn
              >
              <v-btn class="mx-2 orange" @click="selColor = 'orange'"
                >PROTESIS</v-btn
              >
              <!--{{selColor}}-->
            </v-flex>
            <v-layout>
              <v-flex
                class="text-center"
                v-for="nd in dienteSup"
                :key="nd.d"
                flex
              >
                <v-layout wrap>
                  <v-flex col-12 class="pa-0 ma-0 flex">
                    <h5>{{ nd.d }}</h5>
                  </v-flex>
                  <v-flex class="pa-0 ma-0 flex" >
                    <v-icon
                      style="margin-bottom: -8px"
                      :id="nd.d + '_t'"
                      @click="changeColor(nd.d + '_t')"
                      :color="nd.sup"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
                      style="margin: -5px"
                      :id="nd.d + '_l'"
                      @click="changeColor(nd.d + '_l')"
                      class="mdi-rotate-270"
                      :color="nd.izq"
                      >mdi-cloud</v-icon
                    >
                    <v-icon
                      :id="nd.d + '_m'"
                      @click="changeColor(nd.d + '_m')"
                      :color="nd.med"
                      >mdi-checkbox-blank</v-icon
                    >
                    <v-icon
                    style="margin: -5px"
                      :id="nd.d + '_r'"
                      @click="changeColor(nd.d + '_r')"
                      class="mdi-rotate-90"
                      :color="nd.der"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
                      style="margin-top: -10px"
                      :id="nd.d + '_b'"
                      @click="changeColor(nd.d + '_b')"
                      class="mdi-rotate-180"
                      :color="nd.inf"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                </v-layout>
                <!--
          <v-layout>
            <v-flex offset-xs12 class="top: -100%">
              <v-divider v-if="index == 7" vertical></v-divider>
            </v-flex>
          </v-layout> 
          -->
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex
                class="text-center"
                v-for="nd in dientesLecheSup"
                :key="nd.d"
              >
                <v-layout wrap>
                  <v-flex col-12 class="pa-0 ma-0 flex">
                    <h5>{{ nd.d }}</h5>
                  </v-flex>
                  <v-flex class="pa-0 ma-0 flex">
                    <v-icon
                      style="margin-bottom: -8px"
                      :id="nd.d + '_t'"
                      @click="changeColor(nd.d + '_t')"
                      :color="nd.sup"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
                      style="margin: -5px"
                      :id="nd.d + '_l'"
                      @click="changeColor(nd.d + '_l')"
                      class="mdi-rotate-270"
                      :color="nd.izq"
                      >mdi-cloud</v-icon
                    >
                    <v-icon
                      :id="nd.d + '_m'"
                      @click="changeColor(nd.d + '_m')"
                      :color="nd.med"
                      >mdi-checkbox-blank</v-icon
                    >
                    <v-icon
                      style="margin: -5px"
                      :id="nd.d + '_r'"
                      @click="changeColor(nd.d + '_r')"
                      class="mdi-rotate-90"
                      :color="nd.der"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
                    style="margin-top: -10px"
                      :id="nd.d + '_b'"
                      @click="changeColor(nd.d + '_b')"
                      class="mdi-rotate-180"
                      :color="nd.inf"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-layout wrap style="width: 100%">
              <v-flex col-12>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex
                class="text-center"
                v-for="nd in dientesLecheInf"
                :key="nd.d"
              >
                <v-layout wrap>
                  <v-flex col-12 class="pa-0 ma-0 flex">
                    <h5>{{ nd.d }}</h5>
                  </v-flex>
                  <v-flex class="pa-0 ma-0 flex">
                    <v-icon
                      style="margin-bottom: -8px"
                      :id="nd.d + '_t'"
                      @click="changeColor(nd.d + '_t')"
                      :color="nd.sup"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
                      style="margin: -5px"
                      :id="nd.d + '_l'"
                      @click="changeColor(nd.d + '_l')"
                      class="mdi-rotate-270"
                      :color="nd.izq"
                      >mdi-cloud</v-icon
                    >
                    <v-icon
                      :id="nd.d + '_m'"
                      @click="changeColor(nd.d + '_m')"
                      :color="nd.med"
                      >mdi-checkbox-blank</v-icon
                    >
                    <v-icon
                      style="margin: -5px"
                      :id="nd.d + '_r'"
                      @click="changeColor(nd.d + '_r')"
                      class="mdi-rotate-90"
                      :color="nd.der"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
                      style="margin-top: -10px"
                      :id="nd.d + '_b'"
                      @click="changeColor(nd.d + '_b')"
                      class="mdi-rotate-180"
                      :color="nd.inf"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex class="text-center" v-for="nd in dienteInf" :key="nd.d">
                <v-layout wrap>
                  <v-flex col-12 class="pa-0 ma-0 flex">
                    <h5>{{ nd.d }}</h5>
                  </v-flex>
                  <v-flex class="pa-0 ma-0 flex">
                    <v-icon
                      style="margin-bottom: -8px"
                      :id="nd.d + '_t'"
                      @click="changeColor(nd.d + '_t')"
                      :color="nd.sup"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
                      style="margin: -5px"
                      :id="nd.d + '_l'"
                      @click="changeColor(nd.d + '_l')"
                      class="mdi-rotate-270"
                      :color="nd.izq"
                      >mdi-cloud</v-icon
                    >
                    <v-icon
                      :id="nd.d + '_m'"
                      @click="changeColor(nd.d + '_m')"
                      :color="nd.med"
                      >mdi-checkbox-blank</v-icon
                    >
                    <v-icon
                      style="margin: -5px"
                      :id="nd.d + '_r'"
                      @click="changeColor(nd.d + '_r')"
                      class="mdi-rotate-90"
                      :color="nd.der"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
                      style="margin-top: -10px"
                      :id="nd.d + '_b'"
                      @click="changeColor(nd.d + '_b')"
                      class="mdi-rotate-180"
                      :color="nd.inf"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <br /><br />
            <v-col cols="12">
              <v-textarea
                v-model="diagnostic"
                label="DIAGNOSTICO DEL PACIENTE"
                outlined
                prepend-inner-icon="mdi-comment"
                counter
                filled
                maxlength="120"
                full-width
                single-line
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="plantratamiento"
                label="PLAN DE TRATAMIENTO"
                outlined
                prepend-inner-icon="mdi-comment"
                counter
                filled
                maxlength="120"
                full-width
                single-line
              ></v-textarea>
            </v-col>
          </v-flex>

          <v-flex col-12>
            <v-btn @click="saveC()" class="mx-2 success">Guardar</v-btn>
            <v-btn
              @click="(overlayC = false), (updatedAlert = false)"
              class="mx-2 red"
              >cerrar</v-btn
            >
          </v-flex>
          <v-flex style="width: 100%">
            <v-alert
              dense
              transition="scale-transition"
              text
              type="success"
              v-if="updatedAlert"
            >
              Los cambios se guardaron satisfactoriamente.
            </v-alert>
          </v-flex>
        </v-layout>
      </v-card>
    </v-overlay>

    <!--fin codigo consulta nueva-->
  </div>
</template>
<script>
export default {
  props: ["odontograma"],

  data: () => ({
    date: new Date().toISOString().substr(0, 10),

      search: "",
      overlayHC: false,
      overlayC: false,
      updatedAlert: false,
      overlayRT: false,
      motivoConsulta: "",
      odontogramaAnt: "",
      diagnostic: "",
      plantratamiento: "",
      observaciones: "",
      nombrePaciente: "",
      apellidosPaciente: "",
      dirPaciente: "",
      correoPaciente: "",
      telPaciente: "",
      epsPaciente: "",
      rhPaciente:"",
      generoPaciente:"",
      fechaNacimiento:"",
      tipoDocPaciente:"",
      numDocPaciente:"",
      nombreAcudiente:"",
      apellidosAcudiente:"",
      telAcudiente:"",
      parentescoAcudiente:"",
      modal:false,
      pregunta1:"",
      pregunta2:"",
      pregunta3:"",
      pregunta4:"",
      pregunta5:"",
      pregunta6:"",
      observacionesAnte:"",
      selUser: {},
      headers: [
        { text: "#", filterable: false, align: "center", value: "id" },
        { text: "Nombre", align: "center", value: "name" },
        { text: "Apellidos", align: "center", value: "lastname" },
        { text: "Dirección", align: "center", value: "address" },
        { text: "CC", align: "center", value: "cc" },
        { text: "Opciones", align: "center", value: "opciones" },
      ],

      selColor: "vacio",
      dientesLecheSup: [
        // Estos son los superiores Izquierdos //
        {
          d: "55",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "54",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "53",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "52",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "51",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        // Estos son los superiores Derecho //
        {
          d: "61",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "62",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "63",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "64",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "65",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
      ],
      dientesLecheInf: [
        // Estos son los inferiores Izqauierdos //
        {
          d: "85",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "84",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "83",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "82",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "81",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        // Estos son los inferiores Derechos //
        {
          d: "71",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "72",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "73",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "74",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "75",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
      ],
      dienteSup: [
        // Estos son los superiores Izquierdos //
        {
          d: "18",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "17",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "16",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "15",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "14",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "13",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "12",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "11",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        // Estos son los superiores Derechos //
        {
          d: "21",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "22",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "23",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "24",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "25",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "26",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "27",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "28",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
      ],
      dienteInf: [
        // Estos son los inferiores Izqauierdos //
        {
          d: "48",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "47",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "46",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "45",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "44",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "43",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "42",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "41",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        // Estos son los inferiores Derechos //
        {
          d: "31",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "32",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "33",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "34",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "35",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "36",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "37",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
        {
          d: "38",
          sup: "grey",
          inf: "grey",
          izq: "grey",
          der: "grey",
          med: "grey",
        },
      ],
      colorPrimerBoton: "red",
      colorSegundoBoton: "yellow",
      colorTercerBoton: "green",
      colorCuartoBoton: "orange",
      alertColor: false,

      patientsList: [
        {
          id: "1",
          name: "Andres Felipe",
          lastname: " Herrera Jeréz",
          address: "Barrio peligroso x2!!!",
          email: "andres@ag.com",
          phone: "3685675675",
          eps: "nueva eps",
          cc: "12312321421",
          rhP:"O+",
          gender:"M",
          hb:"1998-18-02",
          tipDoc:"CC",
          nameAcudient:"",
          lastNameAcudient:"",
          telAcudient:"",
          parentAcudient:"",
          question1:"SI",       
         question2:"NO", 
         question3:"NO", 
          question4:"NO", 
          question5:"NO", 
          question6:"NO", 
          observacionesA:"Nada", 
          tratamiento: {
            mt: "muy gay",
            odt: "aqui se lista el odontograma de Andres",
            obs: "no se quiere comprar el rust",
          },
          consulta: {
            odt1: "New odt Andres",
            diagnostico: "",
            plantrat: "",
          },
        },
        {
          id: "2",
          name: "Fabian Andres",
          lastname: "Barreto",
          address: "barrio Fino, de pupis!",
          email: "fabi@ag.com",
          phone: "34234654531231",
          rhP:"O+",
          gender:"M",
          eps: "nueva eps",
          cc: "098765432",
          rhP:"O-",
          gender:"M",
          hb:"1998-21-04",
          tipDoc:"CC",
          nameAcudient:"",
          lastNameAcudient:"",
          telAcudient:"",
          parentAcudient:"",
          question1:"SI",       
         question2:"NO", 
         question3:"NO", 
          question4:"NO", 
          question5:"NO", 
          question6:"NO", 
          observacionesA:"Nadax2",

          tratamiento: {
            mt: "muy pupi",
            odt: "aqui se lista el odontograma de Fabian",
            obs: "picada de loca",
          },
          consulta: {
            odt1: "New odt Fabi",
            diagnostico: "",
            plantrat: "",
          },
        },
        {
          id: "3",
          name: "Wilmer Alberto ",
          lastname: "Monoga",
          address: "Barrio peligroso!!!",
          email: "casper@ag.com",
          phone: "34231231",
          eps: "nueva eps",
          cc: "165655",
          rhP:"A+",
          gender:"M",
          hb:"1999-16-07",
          tipDoc:"CC",
          question1:"SI",       
         question2:"NO", 
         question3:"NO", 
          question4:"NO", 
          question5:"NO", 
          question6:"NO", 
          observacionesA:"Nada",
          nameAcudient:"BEBELEAN",
          lastNameAcudient:"IO NO SHE",
          telAcudient:"NO TIENE PAILA",
          parentAcudient:"SIN FAMILY",

          tratamiento: {
            mt: " muy casper el",
            odt: "aqui se lista el odontograma de Wilmer",
            obs: "nunca se ve en el grupo",
          },
          consulta: {
            odt1: "New odt Wilmer",
            diagnostico: "",
            plantrat: "",
          },
        },
        {
          id: "4",
          name: "Andres",
          lastname: "Angarita",
          address: "Barrio re-Peligroso!!!",
          email: "angaporros@ag.com",
          phone: "34231231",
          eps: "NO TIENE",
          cc: "1221421",
          rhP:"O+",
          gender:"M",
          hb:"1998-15-08",
          tipDoc:"CC",
          nameAcudient:"",
          lastNameAcudient:"",
          telAcudient:"",
          parentAcudient:"",
          question1:"SI",       
         question2:"NO", 
         question3:"NO", 
          question4:"NO", 
          question5:"NO", 
          question6:"NO", 
          observacionesA:"Nada",

          tratamiento: {
            mt: "mucho porro diario",
            odt: "aqui se lista el odontograma de Angarita",
            obs: "mucha plata en ecopetrol xd",
          },
          consulta: {
            odt1: "New odt Angaporros",
            diagnostico: "",
            plantrat: "",
          },
        },
        {
          id: "5",
          name: "Maria Lucia",
          lastname: "Gomez Rodriguez",
          address: "Por alla no se puede ir!!!",
          email: "malu@asdasd",
          phone: "3155727704",
          eps: "sura",
          cc: "321421",
          rhP:"O+",
          gender:"F",
          hb:"1999-23-01",
          tipDoc:"CC",
          nameAcudient:"",
          lastNameAcudient:"",
          telAcudient:"",
          parentAcudient:"",
          question1:"NO",       
         question2:"NO", 
         question3:"NO", 
          question4:"NO", 
          question5:"NO", 
          question6:"NO", 
          observacionesA:"Nada",

          tratamiento: {
            mt: " es malu...",
            odt: "aqui se lista el odontograma de Malu",
            obs: "no hace el proyecto a tiempo!!!!",
          },
          consulta: {
            odt1: "New odt Maluks",
            diagnostico: "",
            plantrat: "",
          },
        },
        {
          id: "6",
          name: "Jhon edinson ",
          lastname: "Castañeda Oviedo",
          address: "La puta mrd!!!",
          email: "jhon@asdasd",
          phone: "34231231",
          eps: "nueva eps",
          cc: "675566721",
          rhP:"O+",
          gender:"M",
          hb:"1998-01-01",
          tipDoc:"CC",
          nameAcudient:"",
          lastNameAcudient:"",
          telAcudient:"",
          parentAcudient:"",
          question1:"SI",       
         question2:"NO", 
         question3:"NO", 
          question4:"NO", 
          question5:"NO", 
          question6:"NO", 
          observacionesA:"Nada",

          tratamiento: {
            mt: "yon soy yon",
            odt: "aqui se lista el odontograma de yon",
            obs: "tiene covid :v",
          },
          consulta: {
            odt1: "New odt Shongo",
            diagnostico: "",
            plantrat: "",
          },
        },
      ],
    }),
  

  methods: {
    selectUser(user) {
      this.selUser = user;
      this.odontogramaAnt = user.tratamiento.odt;
      this.motivoConsulta = user.tratamiento.mt;
      this.observaciones = user.tratamiento.obs;
      this.nuevoodt = user.consulta.odt1;
      this.diagnostic = user.consulta.diagnostico;
      this.plantratamiento = user.consulta.plantrat;
      this.nombrePaciente = user.name;
      this.apellidosPaciente = user.lastname;
      this.dirPaciente = user.address;
      this.correoPaciente = user.email;
      this.telPaciente = user.phone;
      this.epsPaciente = user.eps;
      this.numDocPaciente = user.cc;
      this.nombreAcudiente = user.nameAcudient;
      this.apellidosAcudiente = user.lastNameAcudient;
      this.telAcudiente = user.telAcudient;
      this.parentescoAcudiente = user.parentAcudient;
      this.tipoDocPaciente = user.tipDoc;
      this.rhPaciente = user.rhP;
      this.generoPaciente = user.gender;
      this.fechaNacimiento = user.hb;
      this.pregunta1 = user.question1;
      this.pregunta2 = user.question2;
      this.pregunta3 = user.question3;
      this.pregunta4 = user.question4;
      this.pregunta5 = user.question5;
      this.pregunta6 = user.question6;      
      this.observacionesAnte = user.observacionesA;
       
    },
    saveTR() {
      let currentTr = {
        mt: this.motivoConsulta,
        odt: this.selUser.tratamiento.odt,
        obs: this.observaciones,
         
      };
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].tratamiento = currentTr;
      this.updatedAlert = true;
    },

    saveC() {
      let currentC = {
        odt1: this.nuevoodt,
        diagnostico: this.diagnostic,
        plantratamiento: this.plantrat,
      };
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].consulta = currentC;
      this.updatedAlert = true;
    },
    saveHC() {
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].name = this.nombrePaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].lastname = this.apellidosPaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].address = this.dirPaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].email = this.correoPaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].phone = this.telPaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].eps = this.epsPaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].cc = this.numDocPaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].nameAcudient = this.nombreAcudiente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].lastNameAcudient = this.apellidosAcudiente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].telAcudient = this.telAcudiente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].parentAcudient = this.parentescoAcudiente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].rhP = this.rhPaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].gender = this.generoPaciente;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].hb = this.fechaNacimiento;
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].tipDoc = this.tipoDocPaciente;      
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].question1 = this.pregunta1;      
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].question2 = this.pregunta2;      
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].question3 = this.pregunta3;      
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].question4 = this.pregunta4;      
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].question5 = this.pregunta5;      
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].question6 = this.pregunta6;      
      this.patientsList[
        this.patientsList.indexOf(this.selUser)
      ].observacionesA = this.observacionesAnte;


      this.updatedAlert = true;
    },

    changeColor(id) {
      console.log(document.getElementById(id).style.color);
      if (this.selColor == this.colorPrimerBoton) {
        if (document.getElementById(id).style.color != this.colorTercerBoton) {
          document.getElementById(id).style.color = this.colorPrimerBoton;
          if (
            this.dientesLecheSup.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dientesLecheSup.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorPrimerBoton)
                : "";
              tempArray.push(item);
            });
            this.dientesLecheSup = tempArray;
          } else if (
            this.dientesLecheInf.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dientesLecheInf.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorPrimerBoton)
                : "";
              tempArray.push(item);
            });
            this.dientesLecheInf = tempArray;
          } else if (
            this.dienteSup.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dienteSup.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorPrimerBoton)
                : "";
              tempArray.push(item);
            });
            this.dienteSup = tempArray;
          } else {
            let tempArray = [];
            this.dienteInf.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorPrimerBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorPrimerBoton)
                : "";
              tempArray.push(item);
            });
            this.dienteInf = tempArray;
          }
        }
      } else if (this.selColor == this.colorSegundoBoton) {
        if (document.getElementById(id).style.color != this.colorTercerBoton) {
          document.getElementById(id).style.color = this.colorSegundoBoton;
          if (
            this.dientesLecheSup.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dientesLecheSup.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorSegundoBoton)
                : "";
              tempArray.push(item);
            });
            this.dientesLecheSup = tempArray;
          } else if (
            this.dientesLecheInf.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dientesLecheInf.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorSegundoBoton)
                : "";
              tempArray.push(item);
            });
            this.dientesLecheInf = tempArray;
          } else if (
            this.dienteSup.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dienteSup.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorSegundoBoton)
                : "";
              tempArray.push(item);
            });
            this.dienteSup = tempArray;
          } else {
            let tempArray = [];
            this.dienteInf.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorSegundoBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorSegundoBoton)
                : "";
              tempArray.push(item);
            });
            this.dienteInf = tempArray;
          }
        }
      } else if (this.selColor == this.colorCuartoBoton) {
        if (document.getElementById(id).style.color != this.colorTercerBoton) {
          document.getElementById(id).style.color = this.colorCuartoBoton;
          if (
            this.dientesLecheSup.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dientesLecheSup.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorCuartoBoton)
                : "";
              tempArray.push(item);
            });
            this.dientesLecheSup = tempArray;
          } else if (
            this.dientesLecheInf.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dientesLecheInf.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorCuartoBoton)
                : "";
              tempArray.push(item);
            });
            this.dientesLecheInf = tempArray;
          } else if (
            this.dienteSup.find(
              (elemento) => elemento.d == id.substring(0, id.length - 2)
            )
          ) {
            let tempArray = [];
            this.dienteSup.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorCuartoBoton)
                : "";
              tempArray.push(item);
            });
            this.dienteSup = tempArray;
          } else {
            let tempArray = [];
            this.dienteInf.forEach((item) => {
              id.charAt(id.length - 1) == "t" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.sup = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "b" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.inf = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "l" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.izq = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "r" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.der = this.colorCuartoBoton)
                : "";
              id.charAt(id.length - 1) == "m" &&
              item.d == id.substring(0, id.length - 2)
                ? (item.med = this.colorCuartoBoton)
                : "";
              tempArray.push(item);
            });
            this.dienteInf = tempArray;
          }
        }
      } else if (this.selColor == this.colorTercerBoton) {
        document.getElementById(
          id.substring(0, id.length - 1) + "t"
        ).style.color = this.colorTercerBoton;
        document.getElementById(
          id.substring(0, id.length - 1) + "l"
        ).style.color = this.colorTercerBoton;
        document.getElementById(
          id.substring(0, id.length - 1) + "r"
        ).style.color = this.colorTercerBoton;
        document.getElementById(
          id.substring(0, id.length - 1) + "m"
        ).style.color = this.colorTercerBoton;
        document.getElementById(
          id.substring(0, id.length - 1) + "b"
        ).style.color = this.colorTercerBoton;
        if (
          this.dientesLecheSup.find(
            (elemento) => elemento.d == id.substring(0, id.length - 2)
          )
        ) {
          let tempArray = [];
          this.dientesLecheSup.forEach((item) => {
            item.d == id.substring(0, id.length - 2)
              ? (item.sup = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.inf = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.izq = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.der = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.med = this.colorTercerBoton)
              : "";
            tempArray.push(item);
          });
          this.dientesLecheSup = tempArray;
        } else if (
          this.dientesLecheInf.find(
            (elemento) => elemento.d == id.substring(0, id.length - 2)
          )
        ) {
          let tempArray = [];
          this.dientesLecheInf.forEach((item) => {
            item.d == id.substring(0, id.length - 2)
              ? (item.sup = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.inf = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.izq = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.der = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.med = this.colorTercerBoton)
              : "";
            tempArray.push(item);
          });
          this.dientesLecheInf = tempArray;
        } else if (
          this.dienteSup.find(
            (elemento) => elemento.d == id.substring(0, id.length - 2)
          )
        ) {
          let tempArray = [];
          this.dienteSup.forEach((item) => {
            item.d == id.substring(0, id.length - 2)
              ? (item.sup = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.inf = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.izq = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.der = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.med = this.colorTercerBoton)
              : "";
            tempArray.push(item);
          });
          this.dienteSup = tempArray;
        } else {
          let tempArray = [];
          this.dienteInf.forEach((item) => {
            item.d == id.substring(0, id.length - 2)
              ? (item.sup = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.inf = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.izq = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.der = this.colorTercerBoton)
              : "";
            item.d == id.substring(0, id.length - 2)
              ? (item.med = this.colorTercerBoton)
              : "";
            tempArray.push(item);
          });
          this.dienteInf = tempArray;
        }
      } else {
        this.alertColor = true;
      }
      /*
      console.log(this.dienteSup)
      console.log(this.dienteInf)
      console.log(this.dientesLecheSup)
      console.log(this.dientesLecheInf)
      */
    },
  },
  mounted() {
    if (this.odontograma) {
      {
        this.dientesLecheSup = this.odontograma.dientesLecheSup;
        this.dientesLecheInf = this.odontograma.dientesLecheInf;
        this.dienteSup = this.odontograma.dienteSup;
        this.dienteInf = this.odontograma.dienteInf;
      }
    }
  },
};
</script>
<style>
.v-overlay__content {
  width: 60%;
}
</style>
