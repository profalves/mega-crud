<template>
    <div id="app">
        
        
        <div class="conteiner">
            <router-view></router-view>
        </div>

        <footer>
            @Mega Company 2018.
        </footer>    
            
    </div>
</template>
<script>
//import store from './vuex/store'

export default {
  name:'App'
}
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
    h1 {
        font-size: 50px;
    }
    nav.navbar{
        position: absolute;
        z-index: 5;
    }
	.topo {
		box-shadow: 0 0 5px 2px rgba(0,0,0,0.6);
		padding: 10px;
		width: 100%; 
		position: fixed;
		top: 0; 
        left: 0;
		background: #333;
        color: azure;
		text-align: left;
        z-index: 4;
	}
    .tile {
        font-size: 30px;
		padding: 10px;
		position: fixed;
        margin-left: 50px;
		top: 0; 
        left: 0;
		background: #333;
		text-align: center;
        z-index: 5;
        color: azure;
	}
    .conteudo {
        margin: 10px;
    }
    footer {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1rem;
        background-color: lightslategray;
        text-align: center;
        z-index: 5;
        width: 100%;
        color: aliceblue;
    }
    .conteiner{ 
        margin: 80px 30px 80px;
    }
    .center{
        text-align: center;
    }
</style>