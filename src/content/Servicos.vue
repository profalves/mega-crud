﻿<template>
<div id="servicos">
  <app-header></app-header>
  <a class="fixo button is-large is-danger is-loading" v-show="isLoading">Loading</a>
  <div>
    <h1 class="title">{{title}}</h1>
    <div class="columns">
      <div class="column is-6-mobile is-2-tablet is-1-desktop">
        <router-link class="button" to="/painel">Voltar</router-link>
      </div>

      <div class="column is-6-mobile is-2-tablet is-1-desktop">
        <a class="button is-info" @click.prevent="newService">Novo Serviço</a>
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
              <tr v-for="servico in servicos">
                <td>{{servico.tipoServico}}</td>
                <td>{{servico.dataVcto | formatDate}}</td>
                <td>{{servico.dataPgto | formatDate}}</td>
                <td>{{servico.valor |formatMoney}}</td>
                <td class="is-icon">
                  <a class="button is-danger is-inverted" @click.prevent="excluirServico(servico)">
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
                  <select v-model="servico.idServicoTipo">
                      <option v-for="servico in tipos" :value="servico.idServicoTipo">
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
                           type="number"
                           v-model="servico.valor" />
                  </p>
              </div>
              <div class="column">
                  <label class="label">Vencimento</label>
                  <div style="z-index: 5">
                      
                    <input
                        v-model="dataVcto"
                        type="text"
                        class="input"
                        placeholder="dd/mm/yyyy"
                        @keyup="maskDV"
                        @blur="toUTC(dataVcto)"
                        maxlength="10"
                    >                      
                  </div>
              </div>
              <div class="column">
                  <label class="label">Pagamento</label>
                  <div>
                    <input
                        v-model="dataPgto"
                        type="text"
                        class="input"
                        placeholder="dd/mm/yyyy"
                        @keyup="maskDP"
                        @blur="toUTC2(dataPgto)"
                        maxlength="10"
                    >   
                  </div>
              </div>
          
          </div>
          
            
        </section>
        
        <footer class="modal-card-foot">
          <a class="button is-primary" @click.prevent="salvarServico">Salvar</a>
          <a class="button" @click.prevent="showModalSvc=false">Cancelar e Retornar</a>
        </footer>
      </div>
    </div>
    
    <!--adicionar tipo-->
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
  import Datepicker from 'vuejs-datepicker';
  //import {Money} from 'v-money'
  import s from '../dados.js'
  const servico = s.servico
  const ENDPOINT = s.api
  
  import moment from 'moment'
  require("moment/min/locales.min");
  moment.locale('pt-br');
    
  function convertData(value){
    let c = value
    let d = c.substring(0,2)
    let m = c.substring(3,5)
    let y = c.substring(6,10)
    let data = new Date(y + '-' + m + '-' + d + 'T00:00:00').toISOString()
    
    return data
  
  }

  export default {
    name: 'Servicos',
    data () {
      return {
        isLoading: false,
        title: 'Serviços',
        search: sessionStorage.getItem('idCarro'),
        servicos: [],
        servico,
        showModalTipo: false,
        showModalSvc: false,
        currentTime: moment().format('L'),
        tipo: '',
        tipos: [],
        errors: [],
        dataVcto: '',
        dataPgto: '',
          
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
    components: {
        'datepicker': Datepicker,
        //Money
    },
    methods: {
      maskDate(value){
        let v = value;
        if (v.match(/^\d{2}$/) !== null) {
            value = v + '/';
        } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
            value = v + '/';
        }
      },
      maskDV(){
        let v = this.dataVcto;
        if (v.match(/^\d{2}$/) !== null) {
            this.dataVcto = v + '/';
        } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
            this.dataVcto = v + '/';
        }
      },
      maskDP(){
        let v = this.dataPgto;
        if (v.match(/^\d{2}$/) !== null) {
            this.dataPgto = v + '/';
        } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
            this.dataPgto = v + '/';
        }
      },
      toUTC(value){
        let data = convertData(value)
        this.servico.dataVcto = data
        this.servico.dataPgto = data
      },
      toUTC2(value){
        let data = convertData(value)
        this.servico.dataPgto = data
      },
      obterServicos(){
        axios.get(ENDPOINT + 'carros/obterServicos?IdCarro=' + sessionStorage.getItem('idCarro'))
        .then((response) => {
            console.log(response)
            this.servicos = response.data.data
        })
        .catch((err) => { 
            console.error(err); 
        });
      },
      tipoServicos(){
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
        this.servico.idCarro = sessionStorage.getItem('idCarro')
        if(this.dataPgto === ''){
            this.servico.dataPgto = this.servico.dataVcto
        }
          
        axios.post(ENDPOINT + 'carros/insertServico', this.servico)
        .then((response) => {
            console.log('SALVAR SERVIÇO', response)
            this.showModalSvc = false
            this.obterServicos()
        })
        .catch((err) => {
            this.showModalSvc = false
            console.error(err);
        });
      },
      salvarTipo(){
        axios.post(ENDPOINT + 'tipos/insertServico', {
            nome: this.tipo,
            idUsuario: sessionStorage.getItem('idUser')
        })
        .then((response) => {
            console.log('SALVAR TIPO', response)
            this.showModalTipo = false
            this.tipoServicos()
        })
        .catch((err) => {
            this.showModalTipo = false
            console.error(err);
        });
      },
      excluirServico(servico){
        let self = this;
          swal({ title: `Você tem certeza que deseja apagar este serviço?`,
             text: `Esta ação é irreversível!`,   
             type: "warning",   
             showCancelButton: true,   
             confirmButtonColor: "#DD6B55",   
             cancelButtonText: "Cancelar",
             confirmButtonText: "Sim, pode apagar!", 
             showLoaderOnConfirm: true,  
             closeOnCancel: true })
             .then((value) => {
                 if(!value) {
                  return false; 
                 }
                 else{
                  self.isLoading = true
                  axios.get(ENDPOINT + 'carros/excluirServ?IdServico=' + servico.idServico)
                    .then((response) => {
                        self.isLoading = false
                        console.log(response)
                        this.obterServicos()
                    })
                    .catch((err) => {
                        self.isLoading = false
                        console.error(err);
                    });
                }
             })
          
      },

      newService(){
        this.servico = {}
        this.dataPgto = ''
        this.dataVcto = ''
        this.showModalSvc = true
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
      t.tipoServicos()
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
div.vdp-datepicker__calendar{
    z-index: 5
    
}
.mdInput {
    /*margin-top: 10px;
    width: 90%;*/
    background:transparent;
    outline:none;
    border: 0px;
    /*border-bottom-color: #D3DAE0;*/
}
.card-conteiner{
    width: 100%;
    margin: 0 20px;
}
.fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
</style>