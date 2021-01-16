<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>CITAS</h1>
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
            :items="appointmentList"
            :search="search"
          >
            <template v-slot:item.opciones="{ item }">
              <v-btn color="primary mx-2" @click="(overlayPos = !overlayPos),selectUser(item)">
                Posponer
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>

    <v-overlay :value="overlayPos" absolute>
      <v-card light style="width: 100%">
        <v-layout wrap>
          <v-flex col-12>
            <v-layout wrap>
              <v-flex col-12>
            <v-text-field
            filled
            prepend-inner-icon="mdi-account-box-outline"
            style="width:80%; display: block; margin-left: auto; margin-right: auto; " 
              label="Nombre"
              v-model="nombrePaciente"
              name="input-7-1"
              placeholder="Placeholder"
              counter=""
            ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex col-12>
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    filled
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    v-model="time"
                    label="Hora*"
                    prepend-icon="mdi-timer"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-time-picker v-if="modal2" v-model="time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal2 = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.dialog.save(time)"
                    >OK</v-btn
                  >
                </v-time-picker>
              </v-dialog>
            </v-flex>

            <!--FECHA-->

            <v-flex col-12>
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
                    filled
                    :rules="[
                      (val) => (val || '').length > 0 || 'Campo Requerido',
                    ]"
                    v-model="date"
                    label="Fecha*"
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
          </v-flex>
          <v-flex col-12>
            <v-btn @click="savePos()" class="mx-2 success">Guardar</v-btn>
            <v-btn
              @click="(overlayPos = false), (updatedAlert = false)"
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
  </div>
</template>

<script>
export default {
  data: () => ({
    date: null,
    menu: false,
    modal: false,
    modal2: false,
    time: null,
    search: "",
    overlayPos: false,
    nombrePaciente:"",
    updatedAlert: false,

    selUser: {},
    headers: [
      { text: "#", filterable: false, align: "center", value: "id" },
      { text: "Nombre", align: "center", value: "name" },
      { text: "Fecha", align: "center", value: "dateC" },
      { text: "Hora", align: "center", value: "time" },
      { text: "CC", align: "center", value: "cc" },
      { text: "Opciones", align: "center", value: "opciones" },
    ],
    appointmentList: [
      {
        id: "1",
        name: "Andres Felipe ",
        dateC: "2021-13-01",
        time: "01:20",
        cc: "12312321421",
      },
      {
        id: "2",
        name: "Maria Lucia",
        dateC: "2021-14-01",
        time: "03:20",
        cc: "12456721421",
      },
      {
        id: "3",
        name: "Juan Camilo",
        dateC: "2021-13-01",
        time: "02:20",
        cc: "12312320987",
      },
    ],
  }),

  methods: {
    selectUser(user) {
      this.selUser = user;
      this.nombrePaciente = user.name;
      this.time = user.time;
      
 
    },
    savePos() {
      this.appointmentList[this.appointmentList.indexOf(this.selUser)].name = this.nombrePaciente;
      this.appointmentList[this.appointmentList.indexOf(this.selUser)].time = this.time;
      this.appointmentList[this.appointmentList.indexOf(this.selUser)].dateC = this.date
      this.updatedAlert = true;
    },
  },
};
</script>
<style>
.v-overlay__content {
  width: 60%;
}
</style>
