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
              <v-btn color="primary mx-2" @click="deleteCita(item)">
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
    appointmentList: [],
  }),

  mounted () {
    fetch ("https://drteeth.herokuapp.com/Cita/Odontologo/" + this.$store.state.user.idOdontologo)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
        .then(response => {
          
          response.forEach(element => {
            let itemTemp = {}
            itemTemp.id = element.idCita
            itemTemp.name = element.nombrePaciente
            itemTemp.dateC = element.fecha.substring(0,10)
            itemTemp.time = element.hora
            itemTemp.cc = element.numDoc
            this.appointmentList.push(itemTemp)
          });
        });
  },

  methods: {
    selectUser(user) {
      this.selUser = user;
    },
    savePos() {
      this.appointmentList[this.appointmentList.indexOf(this.selUser)].name = this.nombrePaciente;
      this.appointmentList[this.appointmentList.indexOf(this.selUser)].time = this.time;
      this.appointmentList[this.appointmentList.indexOf(this.selUser)].dateC = this.date
      this.updatedAlert = true;
    },
    async deleteCita(user) {
      this.selectUser(user)
      
      await fetch ("https://drteeth.herokuapp.com/Cita/" + this.selUser.id, {method: 'DELETE'})
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if (!response.error) {
              this.appointmentList.splice(this.appointmentList.indexOf(this.selUser), 1);
          } else {

          }
      });
    }
  },
};
</script>
<style>
.v-overlay__content {
  width: 60%;
}
</style>
