<script>
import axios from 'axios'
import successLogin from './successLogin.vue'

export default{
    components: {
        successLogin,
    },
    data(){
        return{
            email: localStorage.getItem("email") ? localStorage.getItem("email"): "",
            password:"",
            rememberMe:false,
            showPsw:false,
            responseData:{},
            errorResponse:{},
            showSuccessLogin:false,
            buttonDisable:false,
            loader:false,
            myTimeout:undefined
        }
    },
    watch:{
        "email"(newValue){
            if(localStorage.getItem("email") && newValue !== localStorage.getItem("email")){
                localStorage.removeItem("email");
                this.rememberMe=false;
            }
        },
    },
    computed:{
        passwordStengthMeter(){
            let counter=0;

            if(/[a-z]/g.test(this.password)){
                counter+=1
            }
            if(/\d/g.test(this.password)){
                counter+=1            
            }
            if(/[A-Z]/g.test(this.password)){
                counter+=1            
            }
            if(/\W/g.test(this.password)){
                counter+=1            
            }
            if(this.password.length>9){
                counter+=1
            }
            return counter;
        },

    },    
    methods:{
        ShowPassword(){
            this.showPsw = !this.showPsw;
        },
        logIn(){
            if(this.rememberMe===true && this.email !== ''){
                localStorage.setItem("email", this.email);
            }else{
                localStorage.removeItem("email");
            }

            let data={
                email:this.email,
                password:this.password
            }
            let dataTravel={};
            dataTravel.data = data
            clearTimeout(this.myTimeout);
            this.errorResponse = {};
            this.loader=true;

            let url="https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate"
            axios.post(url,dataTravel).then((response) => {
                this.buttonDisable=true;
                
                if(response.status===200){
                            
                    if(response.data.result.error){
                        this.buttonDisable=false;
                        this.loader=false;
                        this.errorResponse=response.data.result;
                        clearTimeout(this.myTimeout);
                        this.myTimeout = setTimeout(() => {this.errorResponse = {}}, 5000);
                    }else{
                        this.buttonDisable=false;
                        this.loader=false;
                        this.responseData=response.data.result
                        this.showSuccessLogin=true;
                    }
                }
            }).catch(error =>{
                if(error.response.data.error){
                    this.buttonDisable=false;
                    this.loader=false;
                    this.errorResponse={
                        "errorMessage":"Something went wrong. Please try again later."
                    }
                    clearTimeout(this.myTimeout);
                    this.myTimeout = setTimeout(() => {this.errorResponse = {}}, 5000);
                }
            });
        },
        logOut(){
            this.showSuccessLogin=false;
            this.responseData={};
            this.password="";
            this.email=localStorage.getItem("email") ? localStorage.getItem("email"):'';
        },
    },
}


</script>

<template>
    <div class="base">
        <div class="left-container">
            <Transition name="successLogin">
                <successLogin v-if="this.showSuccessLogin===true" :userData="this.responseData" @logout="logOut"></successLogin>
            </Transition>
            <Transition name="regForm">
                <div class="reg-container" v-if="this.showSuccessLogin===false">
                    <div class="reg-main-text">
                        <h1>Welcome to Acme.</h1>
                        <h6>Create your account by filling the form below.</h6>
                    </div>
                    <div class="form-container">
                        <form method="post">
                            <div class="txt_field">
                                <input type="text" v-model="this.email" required>
                                <span></span>
                                <label>Email</label>
                            </div>
                            <div class="txt_field psw">
                                <input :type="this.showPsw ? 'text' : 'password'" v-model="this.password" required>
                                <span>
                                    <i :class="showPsw ? 'fa-eye-slash':'fa-eye'" @click="ShowPassword"></i>
                                    <div class="password-strength" >
                                        <span class="dot" :class="{perfect: passwordStengthMeter>=4}"></span>
                                        <span class="dot" :class="{good: passwordStengthMeter>=3}"></span>
                                        <span class="dot" :class="{medium: passwordStengthMeter>=2}"></span>
                                        <span class="dot" :class="{low: passwordStengthMeter>=1}"></span>
                                    </div>
                                </span>
                                <label>Password</label>
                            </div>
                            <div class="remember">
                                <input type="checkbox" class="custom-checkbox" id="remember-checkbox" v-model="rememberMe">
                                <label for="remember-checkbox"></label>
                                <label for="remember-checkbox"><h5>Remember me.</h5></label>
                            </div>
                            <div class="btn-container">
                                <button :disabled="true">Sign up</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </Transition>
        </div>
        <div class="right-container">
            <div class="background"></div>
            <div class="logo">
                <i class="acme"></i>
            </div>
            <div class="content">
                <div class="text-container" v-if="this.showSuccessLogin===false">
                    <h2>Do you already have an account?</h2>
                    <h4>That's awesome! You can log in by clicking on the button below. To skip the next time, you can ask us to remember your login credentials.</h4>
                </div>
                <div class="text-container" v-else>
                    <h2>That's awesome!</h2>
                </div>
                <div class="login-btn" v-if="this.showSuccessLogin===false">
                    <button v-if="this.loader===false" :class="this.buttonDisable ?'disable':'login-btn-button'" @click="logIn" :disabled="this.buttonDisable">Log in</button>
                    <div class="loader" v-if="this.loader===true"></div>
                    <Transition :name="this.loader ? 'errorTransitionLoader' : 'errorTransition'">
                        <div class="error" v-if="Object.keys(errorResponse).length>0">
                            <i class="triangle"></i>
                            <ul v-for="(response,key) in errorResponse" :key="key">{{ response }}</ul>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>
