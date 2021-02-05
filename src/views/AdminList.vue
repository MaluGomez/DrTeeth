<template>
  <div>
    <v-layout wrap pa-5>
      <v-flex col-12>
        <h1>Administradores</h1>
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
          <v-data-table :headers="headers" :items="adminList" :search="search">
            
            <template v-slot:item.opciones="{ item }">
              <!--<v-btn color="primary mx-2" @click="overlayE = !overlayE">
                Eliminar
              </v-btn>-->
              <v-btn
                color="green mx-2"
                @click="(overlayVer = !overlayVer), selectUser(item)"
              >
                Ver
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-overlay :value="overlayVer" absolute>
      <v-card light style="width: 100%">
        <v-layout wrap>
          <v-flex col-12>
            <v-text-field
              label="Nombre"
              v-model="nameAdmin"
              name="input-7-1"
              placeholder="Placeholder"
              counter=""
            ></v-text-field>
            <v-text-field
              label="Apellidos"
              v-model="lastNameAdmin"
              name="input-7-1"
              placeholder="Placeholder"
              counter=""
            ></v-text-field>
            <v-text-field
              label="Correo Electrónico"
              v-model="email"
              name="input-7-1"
              placeholder="Placeholder"
              counter=""
            ></v-text-field>
            <v-text-field
              label="Telefono/Celular"
              v-model="phone"
              name="input-7-1"
              placeholder="Placeholder"
              counter=""
            ></v-text-field>
          </v-flex>
          <v-flex col-12>
            <v-btn @click="saveAdmin()" class="mx-2 success">Actualizar</v-btn>
            <v-btn
              @click="(overlayVer = false), (updatedAlert = false)"
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
  data() {
    return {
      search: "",
      updatedAlert: false,
      overlayVer: false,
      nameAdmin: "",
      lastNameAdmin: "",
      email: "",
      phone: "",
      selUser: {},
      headers: [
        //{ text: "#", filterable: false, align: "center", value: "id" },
        { text: "Nombre", align: "center", value: "nameA" },
        { text: "Apellidos", align: "center", value: "lastNameA" },
        { text: "Opciones", align: "center", value: "opciones" },
      ],
      adminList: [
        ],
    };
  },

  mounted () {
    fetch ("http://localhost:3304/Administrador")
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
        .then(response => {
          response.forEach(element => {
            let itemTemp = {}
            itemTemp.id = element.idAdministrador
            itemTemp.nameA = element.nombres
            itemTemp.lastNameA = element.apellidos
            itemTemp.phoneA = element.telefono
            itemTemp.emailA = element.email
            itemTemp.userName = element.nombres
            this.adminList.push(itemTemp)
          });
        });
  },

  
  methods: {
    selectUser(user) {
      this.selUser = user;
      this.nameAdmin = user.nameA;
      this.lastNameAdmin = user.lastNameA;
      this.phone = user.phoneA;
      this.email = user.emailA;
    },
    async saveAdmin() {

      this.adminList[this.adminList.indexOf(this.selUser)].nameA = this.nameAdmin;
      this.adminList[this.adminList.indexOf(this.selUser)].lastNameA = this.lastNameAdmin;
      this.adminList[this.adminList.indexOf(this.selUser)].phoneA = this.phone;
      this.adminList[this.adminList.indexOf(this.selUser)].emailA = this.email;
      this.updatedAlert = true;
      let data = {
        nombres: this.selUser.nameA,
        apellidos: this.selUser.lastNameA,
        email: this.selUser.emailA,
        telefono: this.selUser.phoneA,
        idAdministrador: this.selUser.id
      }
      await fetch("http://localhost:3304/Administrador", {
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
