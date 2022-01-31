<template>
  <v-container fluid text-center>
      <v-row>
          <v-col class="text-center pt-15">
              <h1 class="h1">login</h1>
          </v-col>
        </v-row>
        <v-row class="mx-auto elevation 3 pa-15 text-center ">
            <v-col class="pl-15 pr-15">
                <v-form>
                    <v-text-field label="Email" v-model="user.email"></v-text-field>
                    <v-text-field label="Senha" 
                    v-model="user.password"
                    :type="show ?'text' : 'password'"
                    :append-icon=" show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"></v-text-field>
                    <v-btn @click="login">Login</v-btn>
                    
                </v-form>
            </v-col>
            
        </v-row>
        <div v-show="errorLogin" timeout="2000" class="text-center"><h3>
                Usuário e senha invalida
                </h3>
            </div>
        <v-dialog   v-model="novaConta" persistent max-width="300">
            <v-card>
        <v-card-title>Conta não encontrada.</v-card-title>
        <v-card-text>
          A conta não foi localizada. Deseja criar um nova conta com os dados
          informados?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" dark text @click="criarNovaConta">Sim</v-btn>
          <v-btn color="black" dark text @click="novaConta = false"
            >Não</v-btn
          >
        </v-card-actions>
      </v-card>
        </v-dialog>
  </v-container>
</template>

<script>
import * as fb from'../plugins/firebase'
export default {
    data () {
        return {
             user:{},
             show: false,
             errorLogin: false,
             novaConta: false
        }
    
    },
    methods: {
       async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true;
            break;
          case "auth/invalid-email":
            this.errorLogin = true;
            break;
          case "auth/user-not-found":
            this.novaConta = true;
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
   async criarNovaConta () {
        this.novaConta = false
         await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    } 
}
}
</script>

<style>

</style>