<template>
  <div>
    <v-navigation-drawer app color="#D8D8D8">
      <v-img
      src="@/assets/img/LogoTitle.png"
      style="heigth: 150px; width: 250px; margin-top: 10px; cursor: pointer"
      @click="$router.push('/').catch(()=>{})"
      />

      <!-- Este es el menu para rol de Odontologo -->
      <v-list v-if="$store.state.user.rol == '0'">
        <v-list-item link @click="$router.push('/perfil').catch(()=>{})">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Perfil
          </v-list-item-content>
        </v-list-item>

        <!-- Este es u ngrupo para listar los items -->
        <v-list-group
        prepend-icon="mdi-account-multiple"
        :value="false"
        >
        <!-- se necesita un template para crear un activador, debe tener :value -->
        <template v-slot:activator>
          <v-list-item-title>Pacientes</v-list-item-title>
        </template>
        <!-- estos son los items que quiero listar -->
        <v-list-item link @click="$router.push('/pacientes').catch(()=>{})">
           <v-list-item-content >
             Lista de Pacientes
           </v-list-item-content>
        </v-list-item>
        <!--<v-list-item link @click="$router.push('/nuevaconsulta').catch(()=>{})">
           <v-list-item-content>
             Nueva Consulta
           </v-list-item-content>
        </v-list-item>-->
        <v-list-item link @click="$router.push('/nuevopaciente').catch(()=>{})">
           <v-list-item-content>
            Nuevo Paciente
           </v-list-item-content>
        </v-list-item>
        </v-list-group>
        <!-- Fin del group -->

        <!-- Este es u ngrupo para listar los items -->
        <v-list-group
        prepend-icon="mdi-book-open"
        :value="false"
        >
        <!-- se necesita un template para crear un activador, debe tener :value -->
        <template v-slot:activator>
          <v-list-item-title>Agenda</v-list-item-title>
        </template>
        <!-- estos son los items que quiero listar -->
        <v-list-item link @click="$router.push('/nuevacita').catch(()=>{})" >
           <v-list-item-content>
             Nueva Cita
           </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/listacitas').catch(()=>{})">
           <v-list-item-content>
            Lista de Citas
           </v-list-item-content>
        </v-list-item>
        
        </v-list-group>
        <v-list-item link @click="Logout()">
          Salir
          <v-list-item-content>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-content>
        </v-list-item>
        <!-- Fin del group -->

      </v-list>
      <!-- FIN DEL ROL DE ODONTOLOGO -->

      <!-- Este es el menu para rol de Admin -->
      <v-list v-if="$store.state.user.rol == '1'">
        <!-- Este es u ngrupo para listar los items -->
        <v-list-group
        prepend-icon="mdi-account-multiple"
        :value="false"
        >
        <!-- se necesita un template para crear un activador, debe tener :value -->
        <template v-slot:activator>
          <v-list-item-title>Admin</v-list-item-title>
        </template>
        <!-- estos son los items que quiero listar -->
        <v-list-item link @click="$router.push('/listaadmin').catch(()=>{})" >
           <v-list-item-content >
             Lista de Administradores
           </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/nuevoadmin').catch(()=>{})" >
           <v-list-item-content>
             Nuevo Administrador
           </v-list-item-content>
        </v-list-item>
        </v-list-group>
        <!-- Fin del group -->

                   <!-- Este es u ngrupo para listar los items -->
        <v-list-group
        prepend-icon="mdi-account-multiple"
        :value="false"
        >
        <!-- se necesita un template para crear un activador, debe tener :value -->
        <template v-slot:activator>
          <v-list-item-title>Odontologos</v-list-item-title>
        </template>
        <!-- estos son los items que quiero listar -->
        <v-list-item link @click="$router.push('/listaodontologos').catch(()=>{})" >
           <v-list-item-content >
             Lista de Odontologos
           </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/nuevoodontologo').catch(()=>{})" >
           <v-list-item-content>
             Nuevo Odontologo
           </v-list-item-content>
        </v-list-item>
        
        </v-list-group>
        <!-- Fin del group -->
        
        <v-list-item link @click="Logout()">
          Salir
          <v-list-item-content>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    Logout () {
      this.$store.state.user = {}
      this.$router.push('/Login').catch(()=>{})
    }
  },
}
</script>
