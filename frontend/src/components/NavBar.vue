<template>
<div id="nav">
    <router-link to="/" id="logo-container">
        <img src="/img/partytimelogo.png" alt="Party Time">
    </router-link>
    <h2 id="nav-title">Paty Time</h2>
    <div id="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">Entrar</router-link>
        <router-link to="/register">Cadastrar</router-link>
    </div>
</div>
</template>

<script>

export default {
    name: "NavBar"
}
</script>


<style scoped>
    #nav {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        border-bottom: 1px solid #EEE;
    }

    #nav a {
        text-decoration: none;
        margin-right: 15px;
    }

    #nav img {
        width: 35px;
    }

    #nav-title {
        font-size: 3rem;
        font-weight: 300;
    }

    #logo-container, #nav-links{
        width: 400px;
    }

    #nav-links {
        display: flex;
        justify-content: flex-end;
    }

    button{
        background-color: #FFF;
        border: none;
        font-size: 16px;
        cursor: pointer;
    }

    bottom:hover{
        color: #C1B696;
    }
</style>