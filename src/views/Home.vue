<template>
  <div class="pl-10 pr-10 text-center font-weight-medium">
    <h3>Quantos litros de água devemos tomar por dia?</h3>
    <p class="text-center font-weight-medium pb-3 pt-3">
      A quantidade adequada está ligada a nossa idade. A média para a maioria
      das pessoas pode ser 35ml de água para cada quilo de peso. Porém, estes
      dados podem variar de caso para caso, podendo depender do gasto diário de
      calorias ou até o estado de saúde que se encontra.
    </p>
    <v-divider class="pb-2 pt-6"></v-divider>
    <br />
    <h3>Informe seu peso</h3>
    <div class="pa-4">
      <label class="pr-2">peso:</label>
      <input v-model="peso" type="number" placeholder="ex.: 80.5" />
    </div>
    <div class="pa-4">
      <button class="pt-4" @click="calcular">Calcular</button>
    </div>
    <div>Sua medida ideal de copos por dia é de: {{ numerodecopos }}</div>
    <div class="text-left pl-15">Historico</div>
    <table class="text-center pl-4 pr-5">
        <tr>
            <td>peso</td>
            <td>numero de copos</td>
        </tr>
        <tr v-for="cop of cops" :key="cop.id">
            <td>{{cop.peso}}</td>
            <td>{{cop.numerodecopos}}</td>
        </tr>
    </table>
  </div>
  
</template>

<script>
import * as fb from "../plugins/firebase";
export default {
  data() {
    return {
      numerodecopos: "",
      uid: "",
      peso: "",
      cops: [],
    };
  },
  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.buscardados();
  },
  methods: {
    calcular() {
      this.peso = this.peso.replace(",", ".");
      this.numerodecopos = ("35" * this.peso) / "250";

      this.armazenarcxop();
    },
    
    async buscardados() {
      this.cops = [];
    const logcopos = await fb.coposCollection.where("uid","==",this.uid).get();
    for (const doc of logcopos.docs){
      this.cops.push ({
        id: doc.id,
        peso: doc.data().peso,
        numerodecopos: doc.data().numerodecopos,
      })
    }
    },
    async armazenarcxop() {
      await fb.coposCollection.add({
        peso: this.peso,
        uid: this.uid,
        numerodecopos: this.numerodecopos,
      });
      this.buscardados ();
      this.peso;
      this.numerodecopos;
    },


  },
};
</script>

<style>
td {
    padding: 15px;
    padding-left: 0;
    padding-left: 25px;}
</style>