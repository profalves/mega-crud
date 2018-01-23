<template>
<div id="servicos">
  <app-header></app-header>
  <a class="fixo button is-inverted is-large is-info is-loading" v-show="isLoading">Loading</a>
  <div>
    <h1 class="title">{{title}}</h1>
    <div class="columns is-mobile is-2-tablet is-1-desktop">
      <div class="column is-6-mobile">
        <router-link class="button" to="/">Voltar</router-link>
      </div>

      <div class="column is-6-mobile is-2-tablet is-1-desktop">
        <a class="button is-info" @click.prevent="showModalSvc=true">Novo Serviço</a>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12" id="table">
        <table class="table is-narrow is-bordered is-mobile is-responsive">
              <thead>
                <th>Tipo</th>
                <th>Vencimento</th>
                <th>Pagamento</th>
                <th>Valor</th>
                <th>Excluir</th>

            </thead>
            <tbody>
              <tr>
                <td></td>
                <td><a></a></td>
                <td></td>
                <td></td>
                <td class="is-icon">
                  <a class="button is-danger is-inverted" @click.prevent="removerCompromisso(compromisso)">
                    <i class="fa fa-trash"></i>
                  </a>
                </td>
              </tr>
            </tbody>
        </table>
      
      <!-- Paginação -- 
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination> -->
      </div>
    </div>
  </div>
    
    <!--MODALS-->
    
    <!-- serviços -->
    <div id="modal_compromisso" class="modal" :class="{'is-active':showModalSvc}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Serviços</p>
          <button class="delete" @click.prevent="showModalSvc=false"></button>
        </header>
        <section class="modal-card-body">
            
          <div class="columns"> 
            <div class="column">
              <label class="label">Tipo de Serviço</label>
              <div class="select">
                  <select v-model="servico.idTipoServico">
                      <option v-for="servico in servicos" :value="servico.idTipoServico">
                        {{ servico.nome }}
                      </option>
                  </select>
              </div>
                
            </div>
              
            <div class="column is-4">
              <label class="label"></label>
              <button class="button is-info" id="buttonf" @click="showModalTipo=true">Adicionar Tipo</button>
            </div>
              
          </div>
          
            
          <div class="columns">
              <div class="column">
                  <label class="label">Valor</label>
                  <p class="control">
                    <input class="input"
                           v-model="servico.valor" />
                  </p>
              </div>
              <div class="column">
                  <label class="label">Vencimento</label>
                  <div class="select">
                      <!--<date-picker :date="startTime" :option="option" :limit="limit"></date-picker>-->
                  </div>
              </div>
              <div class="column">
                  <label class="label">Pagamento</label>
                  <div class="select">
                      <!--<date-picker :date="endtime" :option="option" :limit="limit"></date-picker>-->
                  </div>
              </div>
          
          </div>
          
        </section>
        
        <footer class="modal-card-foot">
          <a class="button is-primary" @click.prevent="">Salvar</a>
          <a class="button" @click.prevent="showModalSvc=false">Cancelar e Retornar</a>
        </footer>
      </div>
    </div>
    
    <!--adicionar -->
    <div id="modal_compromisso" class="modal" :class="{'is-active':showModalTipo}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Adicionar Tipo:</p>
          <button class="delete" @click.prevent="showModalTipo=false"></button>
        </header>
        <section class="modal-card-body">
            <p class="control">
                <input class="input" v-model="tipo">
            </p>  
        </section>
          
        <footer class="modal-card-foot">
          <a class="button is-danger" @click.prevent="showModalTipo=false">Cancelar</a>
          <a class="button is-success" @click.prevent="salvarTipo">Salvar</a>
        </footer>
      </div>
    </div>
    
</div>
</template>

<script>
  import axios from 'axios'
  //import myDatepicker from 'vue-datepicker'
  //import {Money} from 'v-money'
  import s from '../dados.js'
  const servico = s.servico
    
  let moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('pt-br');

  const ENDPOINT = 'http://www.companymega.com.br/api/'

  export default {
    name: 'Servicos',
    data () {
      return {
        isLoading: false,
        title: 'Serviços',
        servicos: [],
        servico,
        showModalTipo: false,
        showModalSvc: false,
        currentTime: moment().format('L'),
        tipo: '',
        tipos: [],
        errors: [],
        
          
        // datapicker
        startTime: {
            time: ''
        },
        endtime: {
            time: ''
        },
        option: {
            type: 'day',
            week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
            month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            format: 'YYYY-MM-DD' + moment().format('THH:mm'),
            placeholder: 'Insira a data',
            inputStyle: {
              'display': 'inline-block',
              'padding': '5px',
              'line-height': '18px',
              'font-size': '16px',
              'border': '2px solid #fff',
              'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
              'border-radius': '2px',
              'color': '#5F5F5F',
              'margin-bottom': '5px',
              'width': '180px'
        },
        color: {
          header: '#000',
          headerText: '#fff'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
        },
        timeoption: {
          type: 'time',
          week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
          month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          format: 'YYYY-MM-DDTHH:mm'
        },
        multiOption: {
          type: 'multi-day',
          week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
          month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          format: 'YYYY-MM-DDTHH:mm'
        },
        limit: [
            {
              type: '', // preencher com 'weekday' para impor limite no calendário e ocultar dom/sab
              available: [1, 2, 3, 4, 5, 6] //define o limite de dias uteis - [6] inclui o sábado no calendário  
            },
            { // sem uso no momento
              type: 'fromto',
              from: '',
              to: ''
            }
        ],
          
        //v-money
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: ' #',
          precision: 2,
          masked: false
        }
      }
    },
    /*components: {
        'date-picker': myDatepicker,
        //Money
    },*/
    methods: {  
      obterCarros(){
        axios.get(ENDPOINT + 'carros/obterCarro')
        .then((response) => {
            console.log(response)
            this.carros = response.data.data
        })
        .catch((err) => { 
            console.error(err); 
        });
      },
      obterMarcas(){
        axios.get(ENDPOINT + 'tipos/obterMarcas')
        .then((response) => {
            console.log(response)
            this.marcas = response.data.data
        })
        .catch((err) => { 
            console.error(err); 
        });
      },
      obterCores(){
        axios.get(ENDPOINT + 'tipos/obterCores')
        .then((response) => {
            console.log(response)
            this.cores = response.data.data
        })
        .catch((err) => { 
            console.error(err); 
        });
      },
      obterDirecao(){
        axios.get(ENDPOINT + 'tipos/obterDirecao')
        .then((response) => {
            console.log(response)
            this.dirs = response.data.data
        })
        .catch((err) => { 
            console.error(err); 
        });
      },
      obterCombustivel(){
        axios.get(ENDPOINT + 'tipos/obterCombustivel')
        .then((response) => {
            console.log(response)
            this.combs = response.data.data
        })
        .catch((err) => { 
            console.error(err); 
        });
      },
      obterServicos(){
        axios.get(ENDPOINT + 'tipos/obterServicos')
        .then((response) => {
            console.log(response)
            this.tipos = response.data.data
        })
        .catch((err) => { 
            console.error(err); 
        });
      },
      salvarServico(){
        axios(ENDPOINT + 'tipos/insertServico', this.servico)
        .then((response) => {
            console.log(response)
            this.showModalNew = false
        })
        .catch((err) => {
            this.showModalNew = false
            console.error(err);
        });
      },
      salvarTipo(){
        axios.post(ENDPOINT + 'tipos/insertServico', {
            nome: this.tipo,
            IdUsuario: 1
        })
        .then((response) => {
            console.log(response)
            this.showModalNew = false
        })
        .catch((err) => {
            this.showModalNew = false
            console.error(err);
        });
      },
      
      newCarro(){
        this.selected={}
        this.showModalNew = true;
      },
      newCor(){
        this.showModalCor = true;
      },
      newMarca(){
        this.showModalMarca = true;
      },
      
    },
    created(){
      let t = this
      t.obterServicos()
    },
  }
</script>
<style scoped>
.select{
  width: 100%
}

select{
  width: 100%
}

#buttonf{
  width: 100%;
  margin-top: 20px;
}
    
ul {
  padding: 0;
}

table {
    width: 100%;
}
@media (max-height: 540px) {
  #table {
    margin-top: 10px;
    max-width: 100%;
    max-height: 300px;
    overflow: scroll;
    }
}
@media (min-height: 550px ) {
  #table {
    margin-top: 10px;
    max-width: 100%;
    max-height: 420px;
    overflow: scroll;
    }
}
@media (min-height: 730px) {
  #table {
    margin-top: 10px;
    max-width: 100%;
    max-height: 590px;
    overflow: scroll;
    }
}
#table {
    margin-top: 10px;
    max-width: 100%;
    max-height: auto;
    line-height: 200%;
    overflow: scroll;
}
table {
    /*border-collapse: collapse;
    border: 1px solid #666;*/
    width: 100%;
    overflow: scroll;
}
tr:nth-child(even) {
    background-color: darkgrey;
}
th, td {
    padding: 0.1em 1em;
}
td {
    cursor: pointer;
}
header{
    font-size: 40px;
}

.user {
  height: 30px;
  line-height: 30px;
  padding: 10px;
  border-top: 1px solid #eee;
  overflow: hidden;
  transition: all .25s ease;
}

.user:last-child {
  border-bottom: 1px solid #eee;
}

.v-enter, .v-leave-active {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-top-width: 0;
  border-bottom-width: 0;
}
.fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
</style>