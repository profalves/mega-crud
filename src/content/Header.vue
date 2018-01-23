<template>
    <div id="app">
        
        <div class="topo">
            <span style="font-size:30px;
                         cursor:pointer;
                         text-align:left" 
                  @click="openNav()">&#9776;
            </span>    
        </div>
        
        <div class="tile">Menu</div>
        
        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
          <router-link :to="{path: '/'}"><i class="fa fa-flag linkIcon"></i>Inicio</router-link>
          <router-link :to="{path: '/painel'}"><i class="fa fa-comment linkIcon"></i>Anuncios</router-link>
          <router-link :to="{path: '/servicos'}"><i class="fa fa-wrench linkIcon"></i>Serviços</router-link>
          <router-link :to="{path: '/login'}"><i class="fa fa-sign-out linkIcon"></i>Sair</router-link>
          
          <div class="version">Mega Company</div>
        </div>
        
        
    </div>
</template>

<script>
  export default {
    data() {
      return {
        message:'Header',
      }
    },
    methods: {
        verificarUsuario(){
            let u = localStorage.getItem('idUser')
            if(!u) return this.$router.go({path: '/login'})
        },
        openNav() {
         document.getElementById("mySidenav").style.width = "250px";
        },
        closeNav() {
         document.getElementById("mySidenav").style.width = "0";
        }
    },
    created(){
        //this.verificarUsuario()
    }
  }
</script>

<style>
    .sidenav {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;
        background-color: #333;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
    }
    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }
    .sidenav a:hover {
        color: #f1f1f1;
    }
    .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 150px;
    }
    
    .sidenav .version {
        margin: 20px 30px;
    }
    
    @media screen and (max-height: 450px) {
      .sidenav {padding-top: 15px;}
      .sidenav a {font-size: 18px;}
    }
    
    .linkIcon{
        margin:7px 10px 0 0;
    }
    h2{
        margin: 20px;
        font-size: 32px;
    }
    
</style>