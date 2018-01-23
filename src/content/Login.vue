<template>
<div class="conteudo" id="principal">
    <div class="box" id="login">
        <center>
            <figure class="image is-128x128">
              <img src="http://iconshow.me/media/images/ui/ios7-icons/png/512/contact.png">
            </figure>  
        </center>
        <form @submit.prevent="Login()">
            <label class="label">Usuário</label>
            <input class="input" 
                   type="text" 
                   name="usuario" 
                   v-model="usuario" 
                   id="user"
                   @click="message=''"
                   > 

            <label class="label">Senha</label>
            <input class="input" 
                   type="password" 
                   name="senha" 
                   v-model="senha" 
                   id="senha"
                   @click="message=''"
                   ><br><br>
            
            <!--<label class="checkbox" id="conectado">
              <input type="checkbox" v-model="manter">
              Mantenha-me conectado
            </label>-->
            
            <center>
                <button v-if="isLoading" class="button is-primary is-loading">Loading</button>
                <button class="button is-primary" @click="Login()" v-else>Login</button>
            </center>
        </form>
    </div>
    
    <center>
      <div class="erroLogin">{{message}}</div>
    </center>
</div>


</template>

<script>

const ENDPOINT = 'http://www.companymega.com.br/api/'

export default {
    name: 'login',
    data () {
      return {
        usuario: '',
        senha: '',
        users: [],
        message: '',
        isLoading: false,
        manter: false
        
      }
    },
    methods: {
      Login(){
          if(this.usuario === 'admin' && this.senha == 1){
              this.$router.push({ path: '/'})
              //localStorage.setItem('idUser', 1)
          }
          else{
              this.message = 'Usuário ou senha incorretos'
          }
      },
      criaCookie() {
         var expira = new Date();
         expira.setTime(expira.getTime() + 172800000); //expira dentro de 48h
         document.cookie = 'usuario=' + this.usuario+ ';expires=' + expira.toUTCString();
      },
      limparSessao(){
        var user = localStorage.getItem('userId')
        if(user!==null){
            localStorage.clear();
        }
         
      },
      manterConectado(){
        var user = localStorage.getItem('userId')
        if(user!==null){
            var c = localStorage.getItem('conectado')
            if(c == 'true'){
                this.usuario = localStorage.getItem('name')
                this.senha = localStorage.getItem('token')
                this.Login()
            }
        }
      }
      
    },
    created(){
        let t = this
        //t.limparSessao()
        localStorage.removeItem('idUser')
    }
    
}
</script>

<style scoped>
    
    @media (min-width: 300px) {
      #login {
            margin-top: -15%;
        }
    }
    @media (min-width: 400px) {
      #login {
            margin: 10% 10%;
        }
    }
    @media (min-width: 700px) {
      #login {
            margin: 5% 25%;
        }
    }
    @media (min-width: 1380px ) {
      #login {
            width: 500px;
            position: absolute;
            top: 30%;
            left: 35%;
            margin-top: -130px;
            margin-left: -35px;
        }
    }
    button{
        width: 100px;
    }
    
    #user{
        margin-bottom: 20px;
    }
    #conectado{
        margin-bottom: 40px;
    }
    .erroLogin{
        color: red;
        font-weight: bold;
    }
</style>