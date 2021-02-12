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
            :loading="loading"
          >
            <template v-slot:item.opciones="{ item }">
              <v-layout wrap>
                <v-flex class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    @click="
                      (overlayHC = !overlayHC), selectUser(item), getInfo()
                    "
                    class="mx-2"
                  >
                    Ver HC
                  </v-btn>
                  <v-btn
                    color="purple"
                    @click="(overlayRT = !overlayRT), selectUser(item)"
                    class="mx-2"
                    v-if="item.idOdontograma"
                    >Tratamiento
                  </v-btn>
                  <v-btn
                    color="pink"
                    class="mx-2"
                    @click="(overlayC = !overlayC), selectUser(item)"
                    v-if="!item.idOdontograma"
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
                  disabled
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
                        label="Fecha Nacimiento"
                        disabled
                        
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
                    <v-radio label="F" color="#F7B1F4" value="F"></v-radio>
                    <v-radio label="M" color="primary" value="M"></v-radio>
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
                  :items="['CC', 'TI/RegistroCivil']"
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
                  disabled
                ></v-text-field>
              </v-flex>
            </v-row>
            <v-layout wrap v-if="selUser.tipDoc == 'TI/RegistroCivil'">
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                        <v-radio-group
                          column
                          label="¿Tratamiento Actual?*"
                          v-model="pregunta1"
                          disabled
                        >
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
                        <v-radio-group
                          column
                          label="¿Toma Medicamentos?*"
                          v-model="pregunta2"
                          disabled
                        >
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
                        <v-radio-group
                          column
                          label="¿Alergias?*"
                          v-model="pregunta3"
                          disabled
                        >
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
                        <v-radio-group
                          column
                          label="¿Presión Arterial?*"
                          v-model="pregunta4"
                          disabled
                        >
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
                        <v-radio-group
                          column
                          label="¿Cirugías?*"
                          v-model="pregunta5"
                          disabled
                        >
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
                        <v-radio-group
                          column
                          label="¿Embarazo?*"
                          v-model="pregunta6"
                          disabled
                        >
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
                          disabled
                        ></v-textarea>
                      </v-col>
                    </v-layout>
                  </v-row>
                  <br /><br />
                </v-flex>
              </v-layout>
            </v-flex>
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
    <v-overlay
      :value="overlayRT"
      absolute
      class="d-flex justify-start absolute"
      style="width: 160%; height: 130%"
    >
      <v-card light style="margin-left: 100px; margin-top: 120px; top: 190px; ">
        <v-layout wrap>
          <v-flex col-12>
            <Odontrograma
              :dienteSupProp="selUser.dienteSup"
              :dienteInfProp="selUser.dienteInf"
              :dientesLecheSupProp="selUser.dientesLecheSup"
              :dientesLecheInfProp="selUser.dientesLecheInf"
              :odt="true"
              @updateOdontograma="updateOdontograma"
            />
                <v-flex col-12>
                  <!--TABLA PARA EL HISTORICO -->
                  <v-card
                    elevation="10"
                    style="width: 90%; position: relative; bottom: -20px; left: 70px; "
                  >
                    <v-flex col-12>
                      <v-text-field
                        v-model="search1"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-flex>
                    <v-data-table
                      :headers="headersHist"
                      :search="search1"
                      :items="selUser.historico"
                      item-key="idHistorico"
                      class="elevation-1"
                    >
                    </v-data-table>
                  </v-card>
                </v-flex>
                <!--FIN TABLA PARA EL HISTORICO -->
            <v-flex col-12 >
            <v-textarea
              v-model="observaciones"
              label="Observaciones"
              filled
              style="width: 100%; position: relative; top: 20px"
            ></v-textarea>
           </v-flex>
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
    <v-overlay
      :value="overlayC"
      absolute
      class="d-flex justify-start absolute"
      style="width: 160%; height: 130%"
    >
      <v-card light style="margin-left: 100px; margin-top: 120px">
        <Odontrograma :odt="false" @updateOdontograma="updateOdontograma" />
        <v-layout wrap>
          <v-flex>
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
import Odontrograma from "../components/Odontrograma";
export default {
  components: { Odontrograma },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    search: "",
    search1: "",
    //searchHis:"",
    selectHis: [],
    overlayHC: false,
    overlayC: false,
    updatedAlert: false,
    overlayRT: false,
    motivoConsulta: "",
    odontogramaAnt: "",
    diagnostico: "",
    plantratamiento: "",
    observaciones: "",
    nombrePaciente: "",
    apellidosPaciente: "",
    dirPaciente: "",
    correoPaciente: "",
    telPaciente: "",
    epsPaciente: "",
    rhPaciente: "",
    generoPaciente: "",
    fechaNacimiento: "",
    tipoDocPaciente: "",
    numDocPaciente: "",
    nombreAcudiente: "",
    apellidosAcudiente: "",
    telAcudiente: "",
    parentescoAcudiente: "",
    modal: false,
    pregunta1: "",
    pregunta2: "",
    pregunta3: "",
    pregunta4: "",
    pregunta5: "",
    pregunta6: "",
    observacionesAnte: "",
    selUser: {},
    headersHist: [
      { text: "Diente", value: "diente" },
      { text: "Nombre", value: "name" },
      { text: "Tratamiento", value: "tratamiento" },
      { text: "Fecha", value: "fechahistorico" }
    ],
    historic: [],
    headers: [
      //{ text: "#", filterable: false, align: "center", value: "id" },
      { text: "Nombre", align: "center", value: "name" },
      { text: "Apellidos", align: "center", value: "lastname" },
      { text: "Dirección", align: "center", value: "address" },
      { text: "Documento", align: "center", value: "cc" },
      { text: "Opciones", align: "center", value: "opciones" },
    ],
    patientsList: [],
    selColor: "vacio",
    loading: false,
  }),

  methods: {
    selectUser(user) {
      this.selUser = user;
      this.plantratamiento = user.plantrat;
      this.nombrePaciente = user.name;
      this.apellidosPaciente = user.lastname;
      this.dirPaciente = user.address;
      this.correoPaciente = user.email;
      this.telPaciente = user.phone;
      this.epsPaciente = user.eps;
      this.numDocPaciente = user.cc;
      this.tipoDocPaciente = user.tipDoc;
      this.rhPaciente = user.rhP;
      this.generoPaciente = user.gender;
      this.fechaNacimiento = user.hb;
      this.motivoConsulta = user.plantratamiento;
      this.observaciones = user.plantratamiento;
      this.pregunta1 = user.pregunta1;
    },
    //GUARDAR TRATAMIENTO (INSERTAR Y ACTUALIZAR)
    async saveTR() {
      let data = {
        idOdontograma: this.selUser.idOdontograma,
        dienteSup: this.selUser.dienteSup,
        dienteInf: this.selUser.dienteInf,
        dientesLecheSup: this.selUser.dientesLecheSup,
        dientesLecheInf: this.selUser.dientesLecheInf,
        diagnostico: this.observaciones,
        planTratamiento: this.motivoConsulta,
      };
      await fetch("http://localhost:3304/Odontograma", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].dienteSup = this.selUser.dienteSup;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].dienteInf = this.selUser.dienteInf;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].dientesLecheSup = this.selUser.dientesLecheSup;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].dientesLecheInf = this.selUser.dientesLecheInf;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].diagnostico = this.observaciones;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].plantratamiento = this.motivoConsulta;
          this.updatedAlert = true;
        });
      
      let hist = {
        idHistorico: this.selUser.idHistorico,
        historico: this.selUser.historico,
      };
      await fetch("http://localhost:3304/historico", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(hist),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
        });
    },
    updateOdontograma(
      dienteSup,
      dienteInf,
      dientesLecheSup,
      dientesLecheInf,
      historico
    ) {
      this.selUser.dienteSup = dienteSup;
      this.selUser.dienteInf = dienteInf;
      this.selUser.dientesLecheSup = dientesLecheSup;
      this.selUser.dientesLecheInf = dientesLecheInf;
      this.selUser.historico.push(historico);
    },
    async saveC() {
      let data = {
        dienteSup: this.selUser.dienteSup,
        dienteInf: this.selUser.dienteInf,
        dientesLecheSup: this.selUser.dientesLecheSup,
        dientesLecheInf: this.selUser.dientesLecheInf,
        diagnostico: this.diagnostico,
        planTratamiento: this.plantratamiento,
        idPaciente: this.selUser.id,
      };
      await fetch("http://localhost:3304/Odontograma", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then(async () => {
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].dienteSup = this.selUser.dienteSup;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].dienteInf = this.selUser.dienteInf;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].dientesLecheSup = this.selUser.dientesLecheSup;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].dientesLecheInf = this.selUser.dientesLecheInf;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].diagnostico = this.diagnostico;
          this.patientsList[
            this.patientsList.indexOf(this.selUser)
          ].plantratamiento = this.plantratamiento;
          await fetch("http://localhost:3304/Odontograma/" + this.selUser.id)
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.length > 0) {
                this.patientsList[
                  this.patientsList.indexOf(this.selUser)
                ].idOdontograma = response[0].idOdontograma;
                this.patientsList[
                  this.patientsList.indexOf(this.selUser)
                ].dienteSup = response[0].dienteSup;
                this.patientsList[
                  this.patientsList.indexOf(this.selUser)
                ].dienteInf = response[0].dienteInf;
                this.patientsList[
                  this.patientsList.indexOf(this.selUser)
                ].dientesLecheSup = response[0].dienteLecheSup;
                this.patientsList[
                  this.patientsList.indexOf(this.selUser)
                ].dientesLecheInf = response[0].dienteLecheInf;
                this.patientsList[
                  this.patientsList.indexOf(this.selUser)
                ].diagnostico = response[0].diagnostico;
                this.patientsList[
                  this.patientsList.indexOf(this.selUser)
                ].plantratamiento = response[0].planTratamiento;
              }
            });
        });

      let datahistorico = {
        historico: this.selUser.historico,
        idPaciente: this.selUser.id,
      };
      await fetch("http://localhost:3304/historico", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(datahistorico),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then(async (response) => {});
      this.updatedAlert = true;
    },
    async saveHC() {
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

      let data = {
        nombres: this.nombrePaciente,
        apellidos: this.apellidosPaciente,
        numeroIdentificacion: this.numDocPaciente,
        tipoIdentificacion: this.tipoDocPaciente,
        fechaNacimiento: this.fechaNacimiento,
        direccion: this.dirPaciente,
        genero: this.generoPaciente,
        rh: this.rhPaciente,
        telefono: this.telPaciente,
        email: this.email,
        eps: this.epsPaciente,
        idPaciente: this.selUser.id,
      };

      await fetch("http://localhost:3304/Paciente", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (!response.error) {
            this.updatedAlert = true;
          } else {
          }
        });
    },
    async getInfo() {
      if (this.selUser.tipDoc == "TI/RegistroCivil") {
        await fetch("http://localhost:3304/Acudiente/" + this.selUser.id, {})
          .then((res) => res.json())
          .catch((error) => console.error("Error:", error))
          .then((response) => {
            this.nombreAcudiente = response[0].nombres;
            this.apellidosAcudiente = response[0].apellidos;
            this.telAcudiente = response[0].telefono;
            this.parentescoAcudiente = response[0].parentesco;
          });
      }
      await fetch("http://localhost:3304/Antecedente/" + this.selUser.id, {})
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          this.pregunta1 = response[0].pregunta1;
          this.pregunta2 = response[0].pregunta2;
          this.pregunta3 = response[0].pregunta3;
          this.pregunta4 = response[0].pregunta4;
          this.pregunta5 = response[0].pregunta5;
          this.pregunta6 = response[0].pregunta6;
          this.observacionesAnte = response[0].observacion;
        });
    },
  },
  async mounted() {
    this.loading = true;
    await fetch(
      "http://localhost:3304/Paciente/Odontologo/" +
        this.$store.state.user.idOdontologo
    )
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then(async (response) => {
        response.forEach(async (element) => {
          let itemTemp = {};
          itemTemp.id = element.idPaciente;
          itemTemp.name = element.nombres;
          itemTemp.lastname = element.apellidos;
          itemTemp.cc = element.numeroIdentificacion;
          itemTemp.tipDoc = element.tipoIdentificacion;
          itemTemp.hb = element.fechaNacimiento;
          itemTemp.address = element.direccion;
          itemTemp.gender = element.genero;
          itemTemp.rhP = element.rh;
          itemTemp.phone = element.telefono;
          itemTemp.email = element.email;
          itemTemp.eps = element.eps;
          await fetch("http://localhost:3304/Odontograma/" + element.idPaciente)
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.length > 0) {
                itemTemp.idOdontograma = response[0].idOdontograma;
                itemTemp.dienteSup = response[0].dienteSup;
                itemTemp.dienteInf = response[0].dienteInf;
                itemTemp.dientesLecheSup = response[0].dienteLecheSup;
                itemTemp.dientesLecheInf = response[0].dienteLecheInf;
                itemTemp.diagnostico = response[0].diagnostico;
                itemTemp.plantratamiento = response[0].planTratamiento;
              }
            });
          await fetch("http://localhost:3304/historico/" + element.idPaciente)
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.length > 0) {
                itemTemp.historico = JSON.parse(response[0].historia);
                itemTemp.idHistorico = response[0].idhistorico;
              } else {
                itemTemp.historico = [];
              }
            });
          this.patientsList.push(itemTemp);
          this.loading = false;
        });
      });
  },
};
</script>
<style>
.v-overlay__content {
  width: 60%;
}
</style>
