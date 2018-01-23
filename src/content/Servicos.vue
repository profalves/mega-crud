<template>
<div id="servicos">
  <app-header></app-header>
  <a class="fixo button is-inverted is-large is-info is-loading" v-show="isLoading">Loading</a>
  <div>
    <h1 class="title">{{title}}</h1>
    <div class="columns">
      <div class="column is-1">
        <a class="button" v-link="{ path: '/' }">Voltar</a>
      </div>

      <div class="column is-1">
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
                <td v-link="{ path: '/' }">8</td>
                <td><a>{{data}}</a></td>
                <td>{{data}}</td>
                <td>PRATA</td>
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
                      <option v-for="plataforma in plataformas">
                        {{ plataforma.text }}
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
                <input class="input" v-model="selected.titulo">
            </p>  
        </section>
          
        <footer class="modal-card-foot">
          <a class="button is-danger" @click.prevent="showModalTipo=false">Cancelar</a>
          <a class="button is-success" @click.prevent="salvarCompromisso">Salvar</a>
        </footer>
      </div>
    </div>
    
</div>
</template>

<script>
  import axios from 'axios'
  //import myDatepicker from 'vue-datepicker'
  //import {Money} from 'v-money'
  import data from '../dados.js'
  const servico = data.servico
    
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
        selected: {},
        showModalTipo: false,
        showModalSvc: false,
        currentTime: moment().format('L'),
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
      validar() {
        if (this.selected.tipo==null || this.selected.tipo=='') {
          swal(
            'Oopa...',
            'Por favor, preencha o tipo do compromisso!',
            'error'
          )
          this.selected.tipo.focus();
          return false
        }
        if (this.selected.status==null || this.selected.status=='') {
          swal(
            'Por favor, preencha o status!',
            'Ahh vamos lá, vamos fazer o serviço direito!',
            'error'
          )
          this.selected.status.focus();
          return false
        }
        if (this.selected.numPrioridade==null || this.selected.numPrioridade=='') {
          swal(
            'Por favor, preencha a prioridade. É imprescindível!',
            'Se não preencher a prioridade, este compromisso não pode ser tratado da forma adequada',
            'error'
          )
          this.selected.numPrioridade.focus();
          return false
        }
      },
      selectTipo(){
        axios.get(ENDPOINT + 'tipos/obterServicos')
        .then(response => {
          // JSON responses are automatically parsed.
          this.tipos = response.data
          console.log()
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      salvar(){
        axios.post(ENDPOINT + 'tipos/insertServico', {
            idTipoServico: 1,
            Valor: 1.00,
            DataVcto: new Date(),
            DataPgto: new Date(),
            IdUsuario: 1

        })
        .then(response => {
          // JSON responses are automatically parsed.
          this.tipos = response.data
          console.log()
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      onChangePage(page){
        this.page = page
        this.loadCompromissos()
      },
      showLoading(){
        this.isLoading=true;
      },
      hideLoading(){
        this.isLoading=false;
      },
      loadCompromissos(){

        let t = this
        this.showLoading()

        let start = (this.page * this.itensPerPage) - (this.itensPerPage)
        let end = this.page * this.itensPerPage
        let qString = "";

        if (this.search){
          qString = `&q=${this.search}`
        }

        this.$http.get(ENDPOINT + `api/comp/obterComp?${qString}`).then(
         response=>{
           t.compromissos = response.json()
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })

       },
      searchCompromissos(){
        this.loadCompromissos()
      },
      newDetalhes(){
        this.selected={}
        this.showModalForum = true;
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
      editarCompromisso(compromisso){
        this.selected=compromisso
        this.showModalNew = true;
      },
      removerCompromisso(compromisso){
        let self = this;
        swal({   title: `Você tem certeza que deseja apagar o "${compromisso.titulo}"?`,
                 text: `Esta ação é irreversível!`,   
                 type: "warning",   
                 showCancelButton: true,   
                 confirmButtonColor: "#DD6B55",   
                 cancelButtonText: "Cancelar",
                 confirmButtonText: "Sim, pode apagar!", 
                 showLoaderOnConfirm: true,  
                 closeOnCancel: true }).then( 
                 function (value) {
                     if (value === false) {
                         return false; 
                     }
                      else{
                      self.$http.delete(`/compromissos/${compromisso.id}`).then(
                      result=>{
                        swal(
                            'Deletado!',
                            'Este cadastro foi excluido!',
                            'success'
                        )
                      self.loadCompromissos()
                      })
                    }
                 })
      },
      salvarCompromisso(){
        // this.validar()
        if (this.selected.id!=null){  //EDITAR
          this.$http.put(ENDPOINT + `api/comp/obterComp/${this.selected.id}`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModalNew',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadCompromissos()
            )
          }
          else
          { //NOVO
            this.$http.post(ENDPOINT + `api/comp/novoCab`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModalNew',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadCompromissos()
            )
          }
      },
        
      obsCompr(compromisso) {
        swal({
          title: 'Anotações sobre este compromisso',
          type: 'info',
          html: '<p style="font-size:20px">' + `${compromisso.obs}` + '</p>',
          showCloseButton: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Ok!',
        })
      },
    },
    created(){
      let t = this
      t.selectTipo()
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