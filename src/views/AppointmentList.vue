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
            <template v-slot:item.opciones>
              <v-btn color="primary mx-2">
              Cita Realizada
              </v-btn> 
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>


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
    time:"",
   

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

  mounted () {
    console.log("Montando todo!")
    fetch ("http://localhost:3304/Cita")
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
        .then(response => {
          response.forEach(element => {
            let itemTemp = {}
            itemTemp.id = element.idCita
            itemTemp.nombrePaciente = element.nombrePaciente
            itemTemp.time = element.hora
            this.appointmentList.push(itemTemp)
          });
        });
  },
  /**mounted () {
    console.log("Montando todo!")
    fetch ("http://localhost:3304/Cita/Odontologo/:idOdontologo")
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
        .then(response => {
          response.forEach(element => {
            let itemTemp = {}
            itemTemp.id = element.idCita
            itemTemp.nombrePaciente = element.nombrePaciente
            itemTemp.time = element.hora
            this.appointmentList.push(itemTemp)
          });
        });
  },*/

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
