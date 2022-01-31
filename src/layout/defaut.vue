<template>
  <v-app>
    <v-app-bar app color="black" dark elevation="1">
            <router-link to="/"><v-icon> mdi-home </v-icon></router-link>
            <router-link to="/perfil"><v-icon class="pa-3"> mdi-account-box </v-icon></router-link>
            <v-spacer></v-spacer>
            <router-link to="/login"><v-icon>mdi-exit-to-app</v-icon></router-link>

    </v-app-bar>
    <v-main><router-view></router-view></v-main>
    
  </v-app>
</template>

<script>
 export default {
   data () {
     return{
      title:"home", icon:"mdi-home", to:"/"
       
     }
   }

 }
</script>

<style>

</style>
