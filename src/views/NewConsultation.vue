<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>Consulta Odontológica</h1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex col-12>
        <v-card elevation="24">
          <v-layout wrap>
            <v-flex col-12>
              <h1>NUEVA CONSULTA</h1>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex col-12>
              <v-card class="mx-auto  " max-width="800" elevation="24">
                <v-card-title>
                  <v-icon x-large center style="color: black ;">
                    mdi-account
                  </v-icon>
                  <span class=" title font-weight-light " style="color: black ;"
                    >Datos Paciente</span
                  >
                </v-card-title>
                <v-flex col-12>
                  <v-row>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-text-field
                          dense
                          :rules="[
                            (val) =>
                              (val || '').length > 0 || 'Campo Requerido',
                          ]"
                          filled
                          color="black darken-2"
                          prepend-inner-icon="mdi-account-box-outline"
                          label="NombrePaciente*"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-text-field
                          dense
                          filled
                          color="black darken-2"
                          :rules="[
                            (val) =>
                              (val || '').length > 0 || 'Campo Requerido',
                          ]"
                          prepend-inner-icon="mdi-account-box-outline"
                          label="ApellidosPaciente*"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-row>

                  <v-row>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-select
                          prepend-inner-icon="mdi-credit-card"
                          :rules="[
                            (val) =>
                              (val || '').length > 0 || 'Campo Requerido',
                          ]"
                          :items="['CC', 'TI']"
                          filled
                          color="black darken-2"
                          label="Tipo Documento*"
                          dense
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex col-12>
                        <v-text-field
                          dense
                          filled
                          color="black darken-2"
                          :rules="[
                            (val) =>
                              (val || '').length > 0 || 'Campo Requerido',
                          ]"
                          prepend-inner-icon="mdi-credit-card"
                          label="NumeroDocumento*"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-row>
                </v-flex>
              </v-card>
            </v-flex>
          </v-layout>
          <br />
          <v-layout wrap>
            <v-flex col-12>
              <!-- <h1>ODONTOGRAMA</h1>-->
            </v-flex>
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
                  <v-flex class="pa-0 ma-0 flex">
                    <v-icon
                      :id="nd.d + '_t'"
                      @click="changeColor(nd.d + '_t')"
                      :color="nd.sup"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
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
                      :id="nd.d + '_r'"
                      @click="changeColor(nd.d + '_r')"
                      class="mdi-rotate-90"
                      :color="nd.der"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
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
                      :id="nd.d + '_t'"
                      @click="changeColor(nd.d + '_t')"
                      :color="nd.sup"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
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
                      :id="nd.d + '_r'"
                      @click="changeColor(nd.d + '_r')"
                      class="mdi-rotate-90"
                      :color="nd.der"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
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
                      :id="nd.d + '_t'"
                      @click="changeColor(nd.d + '_t')"
                      :color="nd.sup"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
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
                      :id="nd.d + '_r'"
                      @click="changeColor(nd.d + '_r')"
                      class="mdi-rotate-90"
                      :color="nd.der"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
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
                      :id="nd.d + '_t'"
                      @click="changeColor(nd.d + '_t')"
                      :color="nd.sup"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
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
                      :id="nd.d + '_r'"
                      @click="changeColor(nd.d + '_r')"
                      class="mdi-rotate-90"
                      :color="nd.der"
                      >mdi-cloud</v-icon
                    >
                  </v-flex>
                  <v-flex col-12 class="pa-0 ma-0">
                    <v-icon
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
          </v-layout>

          <br /><br />
          <v-col cols="12">
            <v-textarea
              v-model="diagnostico"
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
              v-model="plandetratamiento"
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

          <div class="text-center col-12">
            <v-btn rounded color="primary" dark>
              Guardar
            </v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["odontograma"],
  data() {
    return {
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
      alertColor: false, // falta implementar una alerta para el color verde!!!!
    };
  },
  methods: {
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
