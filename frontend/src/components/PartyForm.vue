<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="party-form" enctype="multipart/form-data" @submit="page === 'newparty' ? 
        createParty($event) : updateParty($event)">
            <input type="hidden" id="id" name="id" v-model="id">
            <input type="hidden" id="user_id" name="user_id" v-model="user_id">
            <div class="input-container">
                <label for="title">Titúlo do evento:</label>
                <input type="text" name="title" id="title" v-model="title" placeholder="Digite o titúlo do evento">
            </div>
            <div class="input-container">
                <label for="description">Descrição do evento:</label>
                <textarea type="text" name="description" id="description" v-model="description" 
                placeholder="O que vai acontecer no evento"></textarea>
            </div>
            <div class="input-container">
                <label for="party_date">Data do evento:</label>
                <input type="date" name="party_date" id="party_date" v-model="party_date">
            </div>

            <div class="input-container">
                <label for="photos">Imagens:</label>
                <input type="file" multiple="multiple" id="photos" name="photos" ref="file" @change="onChange">
            </div>

            <div v-if="page === 'editParty' && showMiniImages" class="mini-images">
                <p>Imagens Atuais:</p>
                <img v-for="(photo, index) in photos" :src="`${photo}`" :key="index">
            </div>

            <div class="input-container checkbox-container">
                <label for="privacy">Evento privado ?</label>
                <input type="checkbox" name="privacy" id="privacy" v-model="privacy">
            </div>
            <InputSubmit :text="btnText" />
        </form>
    </div>
</template>

<script>

import Message from './Message.vue';
import InputSubmit from './form/InputSubmit.vue';

export default {
    name: "PartyForm",
    props: ["party", "page", "btnText"],
    components:{
        Message, InputSubmit
    },

    data(){
        return {
            id: this.party._id || null,
            title: this.party.title || null,
            description: this.party.description || null,
            party_date: this.party.partyDate || null,
            photos: this.party.photos || [],
            privacy: this.party.privacy || false,
            user_id: this.party.userId || null,
            msg: null,
            msgClass: null,
            showMiniImages: true
        }
    },

    methods: {
        async createParty(e){
            e.preventDefault();

            const formDate = new FormData();

            formDate.append('title', this.title);
            formDate.append('description', this.description);
            formDate.append('party_date', this.party_date);
            formDate.append('privacy', this.privacy);

        if(this.photos.length > 0) {
            for (const i of Object.keys(this.photos)) {
                formDate.append('photos', this.photos[i])
            }
        }

            const token = this.$store.getters.token;

            await fetch("http://localhost:3000/api/party", {
                method: "POST",
                headers: {"auth-token": token},
                body: formDate
            })
            .then((resp) => resp.json())
            .then((data) => {
                if(data.error){
                    this.msg = data.error;
                    this.msgClass = "error"
                } else {
                    this.msg = data.msg;
                    this.msgClass = "sucess";
                }
                
                setTimeout(() => {
                    this.msg = null;
                    if(!data.error) {
                        this.$router.push('dashboard');
                    }
            }, 2000)
            
            })
            .catch((error) => {
                console.log(error);
            })
        },
        
        onChange(e) {
            this.photos = e.target.files;
            this.showMiniImages = false;
        
        },

        async updateParty(e){
            e.preventDefault();

            const formDate = new FormData();

            formDate.append('id', this.id);
            formDate.append('title', this.title);
            formDate.append('description', this.description);
            formDate.append('party_date', this.party_date);
            formDate.append('privacy', this.privacy);
            formDate.append('user_id', this.user_id);

        if(this.photos.length > 0) {
            for (const i of Object.keys(this.photos)) {
                formDate.append('photos', this.photos[i])
            }
        }

            const token = this.$store.getters.token;

            await fetch("http://localhost:3000/api/party", {
                method: "PATCH",
                headers: {"auth-token": token},
                body: formDate
            })
            .then((resp) => resp.json())
            .then((data) => {

                console.log(data.party)
                if(data.error){
                    this.msg = data.error;
                    this.msgClass = "error"
                } else {
                    this.msg = data.msg;
                    this.msgClass = "sucess";
                }
                
                setTimeout(() => {
                    this.msg = null;

            }, 2000)
            
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
    #party-form {
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

    .input-container input,
    .input-container textarea {
        padding: 10px;
        border: 1px solid #E8E8E8;
    }

    .checkbox-container {
        flex-direction: row;
    }

    .checkbox-container input {
        margin-left: 12px;
        margin-top: 3px;
    }

    .mini-images {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0px;
    }

    .mini-images p {
        width: 100%;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: left;
    }

    .mini-images img {
        height: 50px;
        margin-right: 15px;
        margin-bottom: 15px;
    }
</style>