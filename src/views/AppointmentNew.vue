<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>NUEVA CITA</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-card elevation="24">
          <v-layout wrap>
            <v-flex col-12>
              <h1>Cita Odontológica</h1>
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
                      label="NombrePaciente*"
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
                      dense
                    ></v-select>
                  </v-flex>

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
                      label="ApellidosPaciente*"
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
                      required
                    ></v-text-field>
                  </v-flex>

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
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex col-12>
                    <v-flex col-12 text-right>
                      <v-btn
                        
                        color="blue-grey"
                        class="mx-2 success"
                        @click="saveCita()"
                      >
                        Agendar
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
                        La cita se ha agendado satisfactoriamente.
                      </v-alert>
                    </v-flex>
                  </v-flex>
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
