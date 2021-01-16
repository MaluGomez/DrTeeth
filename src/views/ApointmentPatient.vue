<template>
  <div class="d-sm-flex bodyLogin align-center">
    <v-container
      sm
      style="height: 700px; width: 500px"
      class="d-flex text-center"
      secondary
      dark
    >
      <v-layout white>
        <v-layout wrap>
          
        </v-layout>
        <v-flex col-12 align-self-center style="padding: 50px">
          <div class="d-flex justify-center">
           
          </div>
          <br />
          <h3 class="titleLogin pb-5">AGENDA TU CITA ODONTOLOGICA</h3>
          <v-form col-12>
            <v-text-field
            label="Nombre"
            filled
            dense
          ></v-text-field>
          <v-text-field
            label="Apellidos"
            filled
            dense
          ></v-text-field>
          <v-select
                  
                  prepend-inner-icon="mdi-credit-card"
                  :rules="[
                    (val) => (val || '').length > 0 || 'Campo Requerido',
                  ]"
                  :items="['CC', 'TI']"
                  filled
                  label="Tipo Documento*"
                  dense
                ></v-select>
          <v-text-field
            label="Numero Documento"
            filled
            dense
          ></v-text-field>
          <v-select
                  
                  prepend-inner-icon="mdi-credit-card"
                  :rules="[
                    (val) => (val || '').length > 0 || 'Campo Requerido',
                  ]"
                  :items="[]"
                  filled
                  label="Odontologos Disponibles"
                  dense
                ></v-select>

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
                            (val) =>
                              (val || '').length > 0 || 'Campo Requerido',
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
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>

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
                            (val) =>
                              (val || '').length > 0 || 'Campo Requerido',
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
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(time)"
                          >OK</v-btn
                        >
                      </v-time-picker>
                    </v-dialog>



            <v-btn
              class="mb-5"
              color="#235988"
              rounded
              outlined
              title
              @click="saveCita()"
                           
            >
              Agendar Cita<v-icon>mdi-login</v-icon></v-btn
            >
            
          </v-form>
          
         </v-flex>
         <v-flex col-12>
                      <v-alert
                        dense
                        filled
                        transition="scale-transition"
                        text
                        color="white"
                        type="success"
                        v-if="updatedAlert"
                      >
                        La cita se ha agendado satisfactoriamente.
                      </v-alert>
                    </v-flex>
      </v-layout>
    </v-container>
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
    updatedAlert: false,
  }),
  methods: {
    saveCita() {
      let currentCita = {};

      this.updatedAlert = true;
    },
  },
};
</script>
<style>
.titleLogin {
  color: #4285f4;
}
.bodyLogin {
  background: linear-gradient(50deg, skyblue, royalblue);
  height: 100%;
}
</style>

