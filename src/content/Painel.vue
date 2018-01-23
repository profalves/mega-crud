<template>
<div id="painel">
  <app-header></app-header>
  <a class="fixo button is-inverted is-large is-info is-loading" v-show="isLoading">Loading</a>
  <div>
    <h1 class="title">{{title}}</h1>
    <div class="columns">
      <div class="column is-1">
        
        <router-link class=button to="/">Voltar</router-link>
      </div>
      <div class="column is-1">
        <a class="button is-info" @click.prevent="newCarro">Novo Produto</a>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12" id="table">
        <table class="table is-narrow is-bordered is-mobile is-responsive">
              <thead>
                <th>#Id</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Cor</th>
                <th>Preço</th>
                <th>Editar</th>
                <th>Excluir</th>
                <th colspan="2">Serviços</th>
                <th>Imagens</th>

            </thead>
            <tbody>
              <tr v-for="carro in carros">
                <td>{{carro.idCarro}}</td>
                <td><a>{{carro.Modelo}}</a></td>
                <td>{{carro.Marca}}</td>
                <td>{{carro.Cor}}</td>
                <td>{{carro.valorVenda}}</td>
                <td class="is-icon">
                  <a class="button is-info is-inverted" @click.prevent="editarCarro(carro)">
                    <i class="fa fa-edit"></i>
                  </a>
                </td>
                <td class="is-icon">
                  <a class="button is-danger is-inverted" @click.prevent="excluirCarro(carro)">
                    <i class="fa fa-trash"></i>
                  </a>
                </td>
                <td>
                  <a to="/servicos">
                    <i class="fa fa-eye"></i>
                  </a>
                </td>
                <td>
                  <a @click="showModalSvc=true">
                    <i class="fa fa-plus"></i>
                  </a>
                </td>
                <td><a>Galeria</a></td>
              </tr>
            </tbody>
        </table>
      
      <!-- Paginação -- 
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination> -->
      </div>
    </div>
</div>
    
    <!-- novo cadastro -->
    <div id="modal_compromisso" class="modal" :class="{'is-active':showModalNew}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Novo Cadastro:</p>
          <button class="delete" @click.prevent="showModalNew=false"></button>
        </header>
        <section class="modal-card-body">
            
          <div class="columns">
              <div class="column">
                  <label class="label">Modelo</label>
                  <p class="control">
                    <input class="input" v-model="carro.Modelo">
                  </p>
              </div>
          
          </div>
            
          <div class="columns"> 
            <div class="column">
              <label class="label">Cor</label>
              <div class="select">
                  <select v-model="carro.IdCor">
                      <option v-for="cor in cores" :value="cor.idCor">
                        {{ cor.nome }}
                      </option>
                  </select>
              </div>
                
            </div>
              
            <div class="column is-4">
              <label class="label"></label>
              <button class="button is-info" id="buttonf" @click="newCor">Adicionar Cor</button>
            </div>
              
          </div>
          
          <div class="columns"> 
            <div class="column">
              <label class="label">Marca</label>
              <div class="select">
                  <select v-model="carro.IdMarca">
                      <option v-for="marca in marcas" :value="marca.idMarca">
                        {{ marca.nome }}
                      </option>
                  </select>
              </div>
                
            </div>
              
            <div class="column is-4">
              <label class="label"></label>
              <button class="button is-info" id="buttonf" @click="newMarca">Adicionar Marca</button>
            </div>
              
          </div>
          
            
          <div class="columns">
              <div class="column">
                  <label class="label">Qtd portas</label>
                  <p class="control">
                    <input class="input" v-model="carro.QtdPortas">
                  </p>
              </div>
              <div class="column">
                  <label class="label">KM</label>
                  <p class="control">
                    <input class="input" v-model="carro.KM">
                  </p>
              </div>
              <div class="column">
                  <label class="label">Ano</label>
                  <p class="control">
                    <input class="input" v-model="carro.Ano">
                  </p>
              </div>
          
          </div>
          
          <div class="columns">
            <div class="column">
              <label class="label">Tipo Combustível</label>
              <div class="select">
                  <select v-model="carro.IdTipoCombustivel">
                      <option v-for="c in combs" :value="c.idTipoCombustivel">
                        {{ c.nome }}
                      </option>
                  </select>
              </div>
            </div>
            <div class="column">
              <label class="label">Tipo Direção</label>
              <div class="select">
                  <select v-model="carro.IdTipoDirecao">
                      <option v-for="d in dirs" :value="d.idTipoDirecao">
                        {{ d.nome }}
                      </option>
                  </select>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
                <label class="label">Vidros Elétricos</label>
            </div>
            <div class="column">
              <div class="field">
                  <div class="control">
                    <label class="radio">
                      <input type="radio" value="true" v-model="carro.Vidro">
                      Sim
                    </label>
                    <label class="radio">
                      <input type="radio" value="false" v-model="carro.Vidro">
                      Não
                    </label>
                  </div>
              </div>
              </div>
          </div>
          <div class="columns">
            <div class="column">
                <label class="label">Ar condicionado</label>
            </div>
            <div class="column">
              <div class="field">
                  <div class="control">
                    <label class="radio">
                      <input type="radio" value="true" v-model="carro.Ar">
                      Sim
                    </label>
                    <label class="radio">
                      <input type="radio" value="false" v-model="carro.Ar">
                      Não
                    </label>
                  </div>
              </div>
              </div>
          </div>
          <div class="columns">
              <div class="column">
                  <label class="label">Valor custo</label>
                  <p class="control">
                    <input class="input" v-model="carro.valorCusto">
                  </p>
              </div>
              <div class="column">
                  <label class="label">Valor venda</label>
                  <p class="control">
                    <input class="input" v-model="carro.ValorVenda">
                  </p>
              </div>
          </div>
        </section>
        
        <footer class="modal-card-foot">
          <a class="button is-info" @click.prevent="salvarCarro">Salvar</a>
          <a class="button" @click.prevent="showModalNew=false">Cancelar e Retornar</a>
        </footer>
      </div>
    </div>
    
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
                      <option v-for="serv in servs" :value="serv.idTipoServico">
                        {{ serv.nome }}
                      </option>
                  </select>
              </div>
                
            </div>
              
            <div class="column is-4">
              <label class="label"></label>
              <button class="button is-info" id="buttonf" @click="newCor">Adicionar Tipo</button>
            </div>
              
          </div>
          
            
          <div class="columns">
              <div class="column">
                  <label class="label">Valor</label>
                  <p class="control">
                    <input class="input" v-model="servico.valor">
                  </p>
              </div>
              <div class="column">
                  <label class="label">Vencimento</label>
                  <p class="control">
                    <input class="input" v-model="servico.dataVcto">
                  </p>
              </div>
              <div class="column">
                  <label class="label">Pagamento</label>
                  <p class="control">
                    <input class="input" v-model="servico.dataPgto">
                  </p>
              </div>
          
          </div>
          
        </section>
        
        <footer class="modal-card-foot">
          <a class="button is-primary" @click.prevent="salvarCompromisso">Salvar</a>
          <a class="button" @click.prevent="showModalNew=false">Cancelar e Retornar</a>
        </footer>
      </div>
    </div>
    
    <!--adicionar cor-->
    <div id="modal_compromisso" class="modal" :class="{'is-active':showModalCor}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Adicionar cor:</p>
          <button class="delete" @click.prevent="showModalCor=false"></button>
        </header>
        <section class="modal-card-body">
            <p class="control">
                <input class="input" v-model="cor">
            </p>  
        </section>
          
        <footer class="modal-card-foot">
          <a class="button is-danger" @click.prevent="showModalCor=false">Cancelar</a>
          <a class="button is-success" @click.prevent="salvarCompromisso">Salvar</a>
        </footer>
      </div>
    </div>
    
    <!--adicionar marca-->
    <div id="modal_compromisso" class="modal" :class="{'is-active':showModalMarca}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Adicionar Marca:</p>
          <button class="delete" @click.prevent="showModalMarca=false"></button>
        </header>
        <section class="modal-card-body">
            <p class="control">
                <input class="input" v-model="marca">
            </p>  
        </section>
          
        <footer class="modal-card-foot">
          <a class="button is-danger" @click.prevent="showModalCor=false">Cancelar</a>
          <a class="button is-success" @click.prevent="salvarCompromisso">Salvar</a>
        </footer>
      </div>
    </div>
    
</div>
</template>

<script>
  import axios from 'axios'
  let moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('pt-br');
    
  import data from '../dados.js'
  const carro = data.Carro
  const servico = data.servico

  const ENDPOINT = 'http://www.companymega.com.br/api/'

  export default {
    name: 'Painel-Veiculos',
    data () {
      return {
        isLoading: false,
        title: 'Manutenção de Anúncios',
        carro,
        servico,
        carros: [],
        marcas: [],
        cores: [],
        dirs: [],
        combs: [],
        servs: [],
        showModalNew: false,
        showModalCor: false,
        showModalMarca: false,
        showModalSvc: false,
        currentTime: moment().format('L'),
        marca: '',
        cor: '',
        idUsuario: parseInt(localStorage.getItem('idUser')),
      }
    },
    methods: {
      //listar
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
            this.servs = response.data.data
        })
        .catch((err) => { 
            console.error(err); 
        });
      },
      //Ações  
      salvarCarro(){
        axios.post(ENDPOINT + 'carros/insert',
            {
                Modelo: 'Corsa',
                IdPessoaDono: 1,
                IdCor: 3,
                IdMarca: 1,
                QtdPortas: 4,
                KM: 0,
                Ano: '',
                IdTipoCombustivel: 1,
                IdTipoDirecao: 2,
                Vidro: true,
                Ar: true,
                valorCusto: 1.00,
                ValorVenda: 30000.00,
                IdUsuario: 1,
                Excluido: false,
            }
        )
        .then((response) => {
            console.log(response)
            this.showModalNew = false
        })
        .catch((err) => {
            this.showModalNew = false
            console.error(err);
        });
      },
      editarCarro(carro){
          this.carro = carro
          this.showModalNew = true
      },
      update(){
        this.showLoading()
        axios.post(ENDPOINT + 'carros/update', this.carro)
        .then((response) => {
            console.log(response)
            this.hideLoading()
        })
        .catch((err) => {
            this.hideLoading()
            console.error(err);
        });
      },
      excluirCarro(carro){
        axios.get(ENDPOINT + 'carros/excluir?IdCarro=' + carro.idCarro)
        .then((response) => {
            console.log(response)
            this.showModalNew = false
        })
        .catch((err) => {
            this.showModalNew = false
            console.error(err);
        });

          
      },
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
      showLoading(){
        this.isLoading=true;
      },
      hideLoading(){
        this.isLoading=false;
      },
      loadCarros(){
        this.showLoading()
        this.$http.get(ENDPOINT + `carros/obterCarro`).then(
         response=>{
           this.carros = response.data.data
         },
         error=>{
           console.log(error)
         }).finally(function () {
          this.hideLoading();
        })

      },
      newCarro(){
        this.showModalNew = true;
      },
      newCor(){
        this.showModalCor = true;
      },
      newMarca(){
        this.showModalMarca = true;
      },
      removerCompromisso(carro){
        let self = this;
        swal({   title: `Você tem certeza que deseja apagar?`,
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
      t.obterCarros()
      t.obterMarcas()
      t.obterCores()
      t.obterDirecao()
      t.obterCombustivel()
      t.obterServicos()
      t.loadCarros()
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