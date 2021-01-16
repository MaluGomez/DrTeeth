<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>ADMINISTRADOR</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-card elevation="24">
          <v-layout wrap>
            <v-flex col-12>
              <h1>Agregar Administrador</h1>
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
                      label="Nombre*"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex col-12>
                    <v-text-field
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
                  <v-flex col-12>
                    <v-text-field
                      filled
                      prepend-inner-icon="mdi-account-box"
                      :rules="[
                        (val) => (val || '').length > 0 || 'Campo Requerido',
                      ]"
                      color="purple darken-2"
                      label="NombreUsuario*"
                      required
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
                      label="Apellidos*"
                      required
                    ></v-text-field>
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
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex col-12>
                    <v-text-field
                      filled
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Contraseña"
                      hint="Pon al menos 8 caracteres"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout wrap>
                  <v-flex col-12>
                    <v-flex col-12 text-right>
                      <v-btn
                        
                        color="blue-grey"
                        class="mx-2 success"
                        @click="saveAdmin()"
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
                        Se agregó el Admin satisfactoriamente.
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
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    modal2: false,
    time: null,
    updatedAlert: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: "Password",
    rules: {
      required: (value) => !!value || "Campo Requerido.",
      min: (v) => v.length >= 8 || "Minimo 8 caracteres",
    },
  }),
  methods: {
    saveAdmin() {
      let currentTr = {};

      this.updatedAlert = true;
    },
  },
};
</script>
