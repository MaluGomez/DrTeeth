<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>Odontologos</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-card elevation="24">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-account-search"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="odontoList" :search="search">
            <template v-slot:item.opciones="{ item }">
              <v-btn
                color="purple mx-2"
                @click="(overlayV = !overlayV), selectUser(item)"
              >
                Ver
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-overlay :value="overlayV" absolute>
      <v-card light style="width: 100%">
        <v-layout wrap>
          <v-flex col-12>
            <!--QUE SE DICE-->
            <v-layout wrap>
              <v-row>
                <v-flex col-6>
                  <v-text-field
                    v-model="nameOdonto"
                    dense
                    filled
                    prepend-inner-icon="mdi-account-box-outline"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="NombreOdontólogo*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex col-6>
                  <v-text-field
                    v-model="LastnameOdonto"
                    dense
                    filled
                    prepend-inner-icon="mdi-account-box-outline"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="ApellidosOdontologo*"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex col-6>
                  <v-text-field
                    v-model="direccionAtencion"
                    dense
                    filled
                    prepend-inner-icon="mdi-directions"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="DirecciónConsultorio*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex col-6>
                  <v-text-field
                    v-model="celOdonto"
                    filled
                    prepend-inner-icon="mdi-cellphone"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="Telefono/Celular*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex col-6>
                  <v-text-field
                    v-model="mailOdonto"
                    filled
                    prepend-inner-icon="mdi-gmail"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="CorreoElectrónico*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex col-6>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        disabled
                        v-model="date"
                        label="Fecha Nacimiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false"
                        >Cancel</v-btn
                      >
                      <v-btn text color="primary" @click="$refs.menu.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex col-6>
                  <v-select
                    v-model="tipDoc"
                    prepend-inner-icon="mdi-credit-card"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    :items="['CC', 'TI']"
                    filled
                    label="Tipo Documento*"
                    dense
                    disabled
                  ></v-select>
                </v-flex>
                <v-flex col-6>
                  <v-text-field
                    v-model="numDoc"
                    filled
                    disabled
                    prepend-inner-icon="mdi-credit-card"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="Número Documento*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex col-6>
                  <v-text-field
                    v-model="numReg"
                    filled
                    prepend-inner-icon="mdi-credit-card"
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    color="purple darken-2"
                    label="NúmeroRegistroProfesional*"
                    required
                    disabled
                  ></v-text-field>
                </v-flex>
                <v-flex col-6>
                  <v-textarea
                    v-model="descOd"
                    outlined
                    filled
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    prepend-inner-icon="mdi-book-open"
                    name="input-7-4"
                    color="black"
                    label="Descripción Corta del Odontologo*"
                  ></v-textarea>
                </v-flex>
              </v-row>
            </v-layout>
            <!--NADA-->
          </v-flex>

          <v-flex col-12>
            <v-btn @click="saveOdonto()" class="mx-2 success">Actualizar</v-btn>
            <v-btn
              @click="(overlayV = false), (updatedAlert = false)"
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
          <v-flex col-12 align-self-center>
          <v-alert
            :value="badAlert"
            color="red"
            dark
            border="top"
            icon="mdi-warning"
            transition="scale-transition"
          >
           <p> Algo Salió Mal </p>
          </v-alert>
          </v-flex>
        </v-layout>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    search: "",
    overlayE: false,
    overlayV: false,
    updatedAlert: false,
    badAlert: false,
    nameOdonto: "",
    LastnameOdonto: "",
    modal: "",
    gender: "",
    direccionAtencion: "",
    celOdonto: "",
    mailOdonto: "",
    numReg: "",
    date:"",
    tipDoc:"",
    numDoc:"",
    descOd:"",
    headers: [
      //{ text: "#", filterable: false, align: "center", value: "id" },
      { text: "Nombre", align: "center", value: "name" },
      { text: "Apellidos", align: "center", value: "lastname" },
      { text: "Telefono/Celular", align: "center", value: "cel" },
      { text: "Registro Profesional", align: "center", value: "registerP" },
      { text: "Correo", align: "center", value: "mail" },
      { text: "Opciones", align: "center", value: "opciones" },
    ],
    odontoList: [
     
    ],
  }),
    mounted () {
    fetch ("http://localhost:3304/Odontologo")
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
        .then(response => {
          response.forEach(element => {
            let itemTemp = {}
            itemTemp.id = element.idOdontologo
            itemTemp.name = element.nombres
            itemTemp.lastname = element.apellidos
            itemTemp.tipoDoc = element.tipoDoc
            itemTemp.numDoc = element.documentoIdentidad
            itemTemp.fechaNac = element.fechaNacimiento
            itemTemp.registerP = element.numeroRegistro
            itemTemp.genero = element.genero
            itemTemp.direccionAtencion = element.direccionAtencion
            itemTemp.cel = element.telefono
            itemTemp.mail = element.email
            itemTemp.description = element.descripcion
            this.odontoList.push(itemTemp)
          });
        });
  },
  methods: {
    selectUser(user) {
      this.selUser = user;
      this.nameOdonto = user.name;
      this.LastnameOdonto = user.lastname;
      this.TipoDocodonto = user.tipoDoc;
      this.numDocodonto = user.numDoc;
      this.modal = user.fechaNac;
      this.gender = user.genero;
      this.direccionAtencion = user.direccionAtencion;
      this.celOdonto = user.cel;
      this.mailOdonto = user.mail;
      this.registerOdonto = user.registerP;
      this.date=user.fechaNac;
      this.tipDoc=user.tipoDoc;
      this.numDoc=user.numDoc;
      this.numReg=user.registerP;
      this.descOd=user.description;
    },
    async saveOdonto() {
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].name = this.nameOdonto;
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].lastname = this.LastnameOdonto;
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].direccionAtencion = this.direccionAtencion;
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].mail = this.mailOdonto;
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].cel = this.celOdonto;
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].fechaNac = this.date;
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].tipoDoc = this.tipDoc;
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].numDoc = this.numDoc;
      
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].registerP = this.numReg;
      
      this.odontoList[
        this.odontoList.indexOf(this.selUser)
      ].description = this.descOd;


      let data = {
        nombres: this.selUser.name,
        apellidos: this.selUser.lastname,
        direccionAtencion: this.selUser.direccionAtencion,
        telefono: this.selUser.cel,
        email: this.selUser.mail,
        numeroRegistro: this.selUser.registerP,
        genero: this.selUser.genero,
        fechaNacimiento: this.selUser.fechaNac,
        documentoIdentidad: this.selUser.numDoc,
        idAdministrador: this.selUser.id,
        descripcion: this.selUser.description,
        idOdontologo: this.selUser.id
      }
      await fetch("http://localhost:3304/Odontologo", {
        method: 'PUT',
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
          if (!response.error) {
            this.updatedAlert = true;
          } else {
            this.badAlert = true;
          }
        })
    },
  },
};
</script>
<style>
.v-overlay__content {
  width: 60%;
}
</style>
