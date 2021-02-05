<template>
  <div>
    <v-layout wrap>
      <v-flex col-12>
        <h1>ODONTOGRAMA</h1>
      </v-flex>
      <v-flex class="text-center" col-12>
        <v-btn class="mx-2 red" @click="selColor='red'">CARIES</v-btn>
        <v-btn class="mx-2 yellow" @click="selColor='yellow'">OBTURACIÓN</v-btn>
        <v-btn class="mx-2 green" @click="selColor='green'">EXTRACCIÓN</v-btn>
        <v-btn class="mx-2 orange" @click="selColor='orange'">PROTESIS</v-btn>
      </v-flex>
      <v-layout>
        <v-flex class="text-center" v-for="nd in dienteSup" :key="nd.d" flex>
          <v-layout wrap>
            <v-flex col-12 class="pa-0 ma-0 flex">
              <h5>{{nd.d}}</h5>
            </v-flex>
            <v-flex class="pa-0 ma-0 flex">
              <v-icon style="margin-bottom: -8px" :id="nd.d + '_t'" @click="changeColor(nd.d + '_t')" :color="nd.sup">mdi-cloud</v-icon>
            </v-flex>
            <v-flex col-12 class="pa-0 ma-0">
              <v-icon style="margin: -5px" :id="nd.d + '_l'" @click="changeColor(nd.d + '_l')" class="mdi-rotate-270" :color="nd.izq">mdi-cloud</v-icon>
              <v-icon :id="nd.d + '_m'" @click="changeColor(nd.d + '_m')" :color="nd.med">mdi-checkbox-blank</v-icon>
              <v-icon style="margin: -5px" :id="nd.d + '_r'" @click="changeColor(nd.d + '_r')" class="mdi-rotate-90" :color="nd.der">mdi-cloud</v-icon>
            </v-flex>
            <v-flex col-12 class="pa-0 ma-0">
              <v-icon style="margin-top: -10px" :id="nd.d + '_b'" @click="changeColor(nd.d + '_b')" class="mdi-rotate-180" :color="nd.inf">mdi-cloud</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex class="text-center" v-for="nd in dientesLecheSup" :key="nd.d">
          <v-layout wrap>
            <v-flex col-12 class="pa-0 ma-0 flex">
              <h5>{{nd.d}}</h5>
            </v-flex>
            <v-flex class="pa-0 ma-0 flex">
              <v-icon style="margin-bottom: -8px" :id="nd.d + '_t'" @click="changeColor(nd.d + '_t')" :color="nd.sup">mdi-cloud</v-icon>
            </v-flex>
            <v-flex col-12 class="pa-0 ma-0">
              <v-icon style="margin: -5px" :id="nd.d + '_l'" @click="changeColor(nd.d + '_l')" class="mdi-rotate-270" :color="nd.izq">mdi-cloud</v-icon>
              <v-icon :id="nd.d + '_m'" @click="changeColor(nd.d + '_m')" :color="nd.med">mdi-checkbox-blank</v-icon>
              <v-icon style="margin: -5px" :id="nd.d + '_r'" @click="changeColor(nd.d + '_r')" class="mdi-rotate-90" :color="nd.der">mdi-cloud</v-icon>
            </v-flex>
            <v-flex col-12 class="pa-0 ma-0">
              <v-icon style="margin-top: -10px" :id="nd.d + '_b'" @click="changeColor(nd.d + '_b')" class="mdi-rotate-180" :color="nd.inf">mdi-cloud</v-icon>
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
        <v-flex class="text-center" v-for="nd in dientesLecheInf" :key="nd.d">
          <v-layout wrap>
            <v-flex col-12 class="pa-0 ma-0 flex">
              <h5>{{nd.d}}</h5>
            </v-flex>
            <v-flex class="pa-0 ma-0 flex">
              <v-icon style="margin-bottom: -8px" :id="nd.d + '_t'" @click="changeColor(nd.d + '_t')" :color="nd.sup">mdi-cloud</v-icon>
            </v-flex>
            <v-flex col-12 class="pa-0 ma-0">
              <v-icon style="margin: -5px" :id="nd.d + '_l'" @click="changeColor(nd.d + '_l')" class="mdi-rotate-270" :color="nd.izq">mdi-cloud</v-icon>
              <v-icon :id="nd.d + '_m'" @click="changeColor(nd.d + '_m')" :color="nd.med">mdi-checkbox-blank</v-icon>
              <v-icon style="margin: -5px" :id="nd.d + '_r'" @click="changeColor(nd.d + '_r')" class="mdi-rotate-90" :color="nd.der">mdi-cloud</v-icon>
            </v-flex>
            <v-flex col-12 class="pa-0 ma-0">
              <v-icon style="margin-top: -10px" :id="nd.d + '_b'" @click="changeColor(nd.d + '_b')" class="mdi-rotate-180" :color="nd.inf">mdi-cloud</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex class="text-center" v-for="nd in dienteInf" :key="nd.d">
          <v-layout wrap>
            <v-flex col-12 class="pa-0 ma-0 flex">
              <h5>{{nd.d}}</h5>
            </v-flex>
            <v-flex class="pa-0 ma-0 flex">
              <v-icon style="margin-bottom: -8px" :id="nd.d + '_t'" @click="changeColor(nd.d + '_t')" :color="nd.sup">mdi-cloud</v-icon>
            </v-flex>
            <v-flex col-12 class="pa-0 ma-0">
              <v-icon  style="margin: -5px" :id="nd.d + '_l'" @click="changeColor(nd.d + '_l')" class="mdi-rotate-270" :color="nd.izq">mdi-cloud</v-icon>
              <v-icon :id="nd.d + '_m'" @click="changeColor(nd.d + '_m')" :color="nd.med">mdi-checkbox-blank</v-icon>
              <v-icon style="margin: -5px" :id="nd.d + '_r'" @click="changeColor(nd.d + '_r')" class="mdi-rotate-90" :color="nd.der">mdi-cloud</v-icon>
            </v-flex>
            <v-flex col-12 class="pa-0 ma-0">
              <v-icon style="margin-top: -10px" :id="nd.d + '_b'" @click="changeColor(nd.d + '_b')" class="mdi-rotate-180" :color="nd.inf">mdi-cloud</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: [ 'dienteSupProp', 'dienteInfProp', 'dientesLecheSupProp', 'dientesLecheInfProp', 'odt'],
  data() {
    return {
      selColor: 'vacio',
      dientesLecheSup: [
        // Estos son los superiores Izquierdos //
        {d: '55', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '54', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '53', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '52', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '51', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        // Estos son los superiores Derecho //
        {d: '61', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '62', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '63', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '64', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '65', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'}
      ],
      dientesLecheInf: [
        // Estos son los inferiores Izqauierdos //
        {d: '85', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '84', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '83', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '82', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '81', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        // Estos son los inferiores Derechos //
        {d: '71', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '72', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '73', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '74', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '75', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'}
      ],
      dienteSup: [
        // Estos son los superiores Izquierdos //
        {d: '18', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '17', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '16', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '15', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '14', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '13', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '12', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '11', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        // Estos son los superiores Derechos //
        {d: '21', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '22', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '23', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '24', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '25', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '26', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '27', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '28', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'}
        ],
      dienteInf: [
        // Estos son los inferiores Izqauierdos //
        {d: '48', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '47', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '46', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '45', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '44', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '43', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '42', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '41', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        // Estos son los inferiores Derechos //
        {d: '31', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '32', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '33', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '34', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '35', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '36', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '37', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'},
        {d: '38', sup: 'grey', inf: 'grey', izq: 'grey', der: 'grey', med: 'grey'}
        ],
      colorPrimerBoton: 'red',
      colorSegundoBoton: 'yellow',
      colorTercerBoton: 'green',
      colorCuartoBoton: 'orange',
      alertColor: false // falta implementar una alerta para el color verde!!!!
    }
  },
  methods: {
    changeColor(id) {
      if (this.selColor == this.colorPrimerBoton) {
        if (document.getElementById(id).style.color != this.colorTercerBoton) {
          document.getElementById(id).style.color = this.colorPrimerBoton;
          if (this.dientesLecheSup.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dientesLecheSup.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? item.sup = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? item.inf = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? item.izq = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? item.der = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? item.med = this.colorPrimerBoton : ''
              tempArray.push(item)
            })
            this.dientesLecheSup = tempArray
          } else if (this.dientesLecheInf.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dientesLecheInf.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? item.sup = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? item.inf = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? item.izq = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? item.der = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? item.med = this.colorPrimerBoton : ''
              tempArray.push(item)
            })
            this.dientesLecheInf = tempArray
          } else if (this.dienteSup.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dienteSup.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? item.sup = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? item.inf = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? item.izq = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? item.der = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? item.med = this.colorPrimerBoton : ''
              tempArray.push(item)
            })
            this.dienteSup = tempArray
          } else {
            let tempArray = []
            this.dienteInf.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? item.sup = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? item.inf = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? item.izq = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? item.der = this.colorPrimerBoton : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? item.med = this.colorPrimerBoton : ''
              tempArray.push(item)
            })
            this.dienteInf = tempArray
          }
        }
      } else if (this.selColor == this.colorSegundoBoton) {
        if (document.getElementById(id).style.color != this.colorTercerBoton) {
          document.getElementById(id).style.color = this.colorSegundoBoton;
          if (this.dientesLecheSup.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dientesLecheSup.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? item.sup = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? item.inf = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? item.izq = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? item.der = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? item.med = this.colorSegundoBoton : ''
              tempArray.push(item)
            })
            this.dientesLecheSup = tempArray
          } else if (this.dientesLecheInf.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dientesLecheInf.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? item.sup = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? item.inf = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? item.izq = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? item.der = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? item.med = this.colorSegundoBoton : ''
              tempArray.push(item)
            })
            this.dientesLecheInf = tempArray
          } else if (this.dienteSup.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dienteSup.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? item.sup = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? item.inf = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? item.izq = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? item.der = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? item.med = this.colorSegundoBoton : ''
              tempArray.push(item)
            })
            this.dienteSup = tempArray
          } else {
            let tempArray = []
            this.dienteInf.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? item.sup = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? item.inf = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? item.izq = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? item.der = this.colorSegundoBoton : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? item.med = this.colorSegundoBoton : ''
              tempArray.push(item)
            })
            this.dienteInf = tempArray
          }
        }
      } else if (this.selColor == this.colorCuartoBoton) {
        if (document.getElementById(id).style.color != this.colorTercerBoton) {
          if (document.getElementById(id).style.color == this.colorCuartoBoton) {
            document.getElementById(id).style.color = 'grey';
          } else {
            document.getElementById(id).style.color = this.colorCuartoBoton;
          }
          if (this.dientesLecheSup.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dientesLecheSup.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.sup = 'grey' : item.sup = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.inf = 'grey' : item.inf = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.izq = 'grey' : item.izq = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.der = 'grey' : item.der = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.med = 'grey' : item.med = this.colorCuartoBoton) : ''
              tempArray.push(item)
            })
            this.dientesLecheSup = tempArray
          } else if (this.dientesLecheInf.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dientesLecheInf.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.sup = 'grey' : item.sup = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.inf = 'grey' : item.inf = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.izq = 'grey' : item.izq = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.der = 'grey' : item.der = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.med = 'grey' : item.med = this.colorCuartoBoton) : ''
              tempArray.push(item)
            })
            this.dientesLecheInf = tempArray
          } else if (this.dienteSup.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dienteSup.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.sup = 'grey' : item.sup = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.inf = 'grey' : item.inf = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.izq = 'grey' : item.izq = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.der = 'grey' : item.der = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.med = 'grey' : item.med = this.colorCuartoBoton) : ''
              tempArray.push(item)
            })
            this.dienteSup = tempArray
          } else {
            let tempArray = []
            this.dienteInf.forEach(item => {
              id.charAt(id.length-1) == 't' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.sup = 'grey' : item.sup = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'b' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.inf = 'grey' : item.inf = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'l' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.izq = 'grey' : item.izq = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'r' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.der = 'grey' : item.der = this.colorCuartoBoton) : ''
              id.charAt(id.length-1) == 'm' && item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorCuartoBoton ? item.med = 'grey' : item.med = this.colorCuartoBoton) : ''
              tempArray.push(item)
            })
            this.dienteInf = tempArray
          }
        }
      } else if (this.selColor == this.colorTercerBoton) {
        if (document.getElementById(id).style.color == this.colorTercerBoton) {
          document.getElementById(id.substring(0,id.length -1)+'t').style.color = 'grey';
          document.getElementById(id.substring(0,id.length -1)+'l').style.color = 'grey';
          document.getElementById(id.substring(0,id.length -1)+'r').style.color = 'grey';
          document.getElementById(id.substring(0,id.length -1)+'m').style.color = 'grey';
          document.getElementById(id.substring(0,id.length -1)+'b').style.color = 'grey';
        } else {
          document.getElementById(id.substring(0,id.length -1)+'t').style.color = this.colorTercerBoton;
          document.getElementById(id.substring(0,id.length -1)+'l').style.color = this.colorTercerBoton;
          document.getElementById(id.substring(0,id.length -1)+'r').style.color = this.colorTercerBoton;
          document.getElementById(id.substring(0,id.length -1)+'m').style.color = this.colorTercerBoton;
          document.getElementById(id.substring(0,id.length -1)+'b').style.color = this.colorTercerBoton;
        }
        if (this.dientesLecheSup.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dientesLecheSup.forEach(item => {
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.sup = 'grey' : item.sup = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.inf = 'grey' : item.inf = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.izq = 'grey' : item.izq = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.der = 'grey' : item.der = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.med = 'grey' : item.med = this.colorTercerBoton) : ''
              tempArray.push(item)
            })
            this.dientesLecheSup = tempArray
          } else if (this.dientesLecheInf.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dientesLecheInf.forEach(item => {
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.sup = 'grey' : item.sup = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.inf = 'grey' : item.inf = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.izq = 'grey' : item.izq = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.der = 'grey' : item.der = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.med = 'grey' : item.med = this.colorTercerBoton) : ''
              tempArray.push(item)
            })
            this.dientesLecheInf = tempArray
          } else if (this.dienteSup.find(elemento => elemento.d == id.substring(0,id.length -2))) {
            let tempArray = []
            this.dienteSup.forEach(item => {
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.sup = 'grey' : item.sup = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.inf = 'grey' : item.inf = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.izq = 'grey' : item.izq = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.der = 'grey' : item.der = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.med = 'grey' : item.med = this.colorTercerBoton) : ''
              tempArray.push(item)
            })
            this.dienteSup = tempArray
          } else {
            let tempArray = []
            this.dienteInf.forEach(item => {
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.sup = 'grey' : item.sup = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.inf = 'grey' : item.inf = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.izq = 'grey' : item.izq = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.der = 'grey' : item.der = this.colorTercerBoton) : ''
              item.d == id.substring(0,id.length -2) ? ( document.getElementById(id).style.color != this.colorTercerBoton ? item.med = 'grey' : item.med = this.colorTercerBoton) : ''
              tempArray.push(item)
            })
            this.dienteInf = tempArray
          }
      } else {
        this.alertColor = true
      }
      this.$emit('updateOdontograma', this.dienteSup, this.dienteInf, this.dientesLecheSup, this.dientesLecheInf)
    }
  },
  mounted() {
      if (this.odt) {
        this.dienteSup = typeof this.dienteSupProp === 'object' ? this.dienteSupProp : JSON.parse(this.dienteSupProp)
        this.dienteInf = typeof this.dienteInfProp === 'object' ? this.dienteInfProp : JSON.parse(this.dienteInfProp) 
        this.dientesLecheSup = typeof this.dientesLecheSupProp === 'object' ? this.dientesLecheSupProp : JSON.parse(this.dientesLecheSupProp)
        this.dientesLecheInf = typeof this.dientesLecheInfProp === 'object' ? this.dientesLecheInfProp : JSON.parse(this.dientesLecheInfProp)
      }
  },
}
</script>
