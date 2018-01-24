<template>
<div id="main">
    <a class="fixo button is-link is-inverted is-large is-loading" v-show="isLoading">Loading</a>
    <div class="topo">
        <span style="font-size:30px;
                     cursor:pointer;
                     text-align:left;
                     padding: 50px">
        </span>
    </div>
    
    <div v-for="(box, index) in anuncios" :key="index">
        <div class="box">
            <a class="button is-primary is-inverted title"
               @click="mgr(box)">{{box.modelo}}
            </a>
            <div class="columns">
                <div class="column dados">
                    <strong>Ano:</strong> {{box.ano}}
                    <strong>KM:</strong> {{box.km}}
                    <strong>Portas:</strong> {{box.qtdPortas}}
                </div>
                <div class="column valor">
                    {{box.valorVenda | formatMoney}}
                </div>
            </div>
        </div>
        <br>
    </div>
    
</div> 
</template>
<script>
import axios from 'axios'
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');
    
const ENDPOINT = 'http://www.companymega.com.br/api/'

export default{
  name: 'Inicio',
  data () { 
    return {
      title: 'Peugeot',
      anuncios: 'Bem vindo',
      carros: [],
      isLoading: false
    }
  },
  methods: {
    obterCarros(){
      this.isLoading = true
      axios.get(ENDPOINT + 'carros/obteranuncios')
      .then((response) => {
        console.log(response)
        this.anuncios = response.data.data
        this.isLoading = false
      })
      .catch((err) => { 
        console.error(err);
        this.isLoading = false
      });
    },
    mgr(box){
        //console.log(box.idCarro)
        sessionStorage.setItem('idCarro', box.idCarro)
        
    }
  },
  mounted(){
    this.obterCarros()
  }
}
</script>

<style scoped>
    h3 {
        font-size: 45px;
        margin-bottom: 20px;
    }
    .dados{
        margin-left: 20px;
    }
    .valor{
        color: darkblue;
        font-weight: bold;
        text-align: right;
    }
    
</style>