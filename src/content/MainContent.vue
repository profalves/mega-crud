<template>
<div id="main">
    <app-header></app-header>

    <div class="box">
        <a class="button is-primary is-inverted"><div class="title">{{title}}</div></a>
        <div class="columns">
            <div class="column dados">
                <strong>Ano:</strong> 2011
                <strong>KM:</strong> 172000
                <strong>Portas:</strong> 4
            </div>
            <div class="column valor">
                R$ 30.000,00
            </div>
        </div>
        
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
      message: 'Bem vindo',
      carros: []
    }
  },
  methods: {
    obterCarros(){
      axios.get(ENDPOINT + 'carros/obtercarro')
      .then((response) => {
        console.log(response)
        this.message = response.data.data
      })
      .catch((err) => { 
        console.error(err); 
      });
    },
    
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
        margin-left: 10px;
    }
    .valor{
        color: darkblue;
        font-weight: bold;
        text-align: right;
    }
    
</style>