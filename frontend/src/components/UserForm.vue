<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass"/>
        <form id="user-form" @submit="page == 'register' ? register($event) : update($event)">
            <div class="input-container">
                <label for="name">Nome:</label>
                <input type="text" id="name" name="name" v-model="name" placeholder="Digite seu nome">
            </div>
            <div class="input-container">
                <label for="email">E-mail:</label>
                <input type="text" id="email" name="email" v-model="email" placeholder="Digite seu E-mail">
            </div>
            <div class="input-container">
                <label for="passwordç">Senha:</label>
                <input type="password" id="password" name="password" v-model="password" placeholder="Digite seua senha">
            </div>
            <div class="input-container">
                <label for="confirmPassword">Confirme sua senha:</label>
                <input type="confirmPassword" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" placeholder="Confirme sua senha">
            </div>
            <InputSubmit :text="btnText" />
        </form>
    </div>
</template>

<script>

import InputSubmit from "./form/InputSubmit.vue";
import Message from "./Message.vue";

export default {
    name: "UserForm",
    data(){
        return {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            msg: "",
            msgClass: ""
        }
    },
    props: ["user", "page", "btnText"],
    components: {
        InputSubmit,
        Message
    },
    methods: {
        async register(e){
            e.preventDefault();

            console.log("Funcionou !");
        }
    }
}
</script>

<style scoped>
    #user-form {
        max-width: 400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        text-align: left;
    }

    .input-container label {
        margin-bottom: 10px;
        color: #555;
    }

    .input-container input{
        padding: 10px;
        border: 1px solid #E8E8E8;
    }
</style>