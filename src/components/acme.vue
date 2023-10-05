<script>
import axios from 'axios'
import successLogin from './successLogin.vue'

export default{
    components: {
        successLogin,
    },
    data(){
        return{
            email:"",
            password:"",
            rememberMe:null,
            showPsw:true,
            responseData:{},
            errorResponse:{},
            showSuccessLogin:false,
            buttonDisable:false,
            loader:false,
            
        }
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
        }
    },    
    methods:{
        ShowPassword(){
            this.showPsw = !this.showPsw;
        },
        logIn(){
            let data={
                email:this.email,
                password:this.password
            }
            let dataTravel={};
            dataTravel.data = data


            let url="https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate"
            axios.post(url,dataTravel).then((response) => {
                this.buttonDisable=true;
                this.loader=true;

                if(response.status===200){
                    if(response.data.result.error){
                        this.buttonDisable=false,
                        this.loader=false,
                        this.errorResponse=response.data.result
                        setTimeout(() => {
                            this.errorResponse = {}
                        }, 5000)
                    }else{
                        this.buttonDisable=false,
                        this.loader=false,
                        this.responseData=response.data.result
                        this.showSuccessLogin=true;
                    }
                }
               
            }).catch(error =>{
                if(error.response.data.error){
                    this.buttonDisable=false,
                    this.loader=false,
                    this.errorResponse={
                        "errorMessage":error.response.data.error.message
                    }
                    setTimeout(() => {
                        this.errorResponse = {}
                    }, 5000);
                }
            });
        },
        logOut(){
            this.showSuccessLogin=false
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
                                <input type="text" v-model="this.email">
                                <span></span>
                                <label>Email</label>
                            </div>
                            <div class="txt_field psw">
                                
                                <input v-if="this.showPsw === false" type="password" v-model="this.password">
                                <input v-else type="text" v-model="this.password" required>
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
                                <h5>Remember me.</h5>
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
                
                <div class="text-container">
                    <h2>Do you already have an account?</h2>
                    <h4>That's awesome! You can log in by clicking on the button below. To skip the next time, you can ask us to remember your login credentials.</h4>
                </div>
                <div class="login-btn">
                    <button :class="this.buttonDisable ?'disable':'login-btn-button'" @click="logIn" :disabled="this.buttonDisable">Log in</button>
                    <div class="loader" v-if="this.loader===true"></div>
                    <Transition name="errorTransition">
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
