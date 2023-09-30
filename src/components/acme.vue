<script>
import { setBlockTracking } from 'vue';

export default{
    data(){
        return{
            email:"",
            password:"",
            rememberMe:null,
            showPsw:true,
            colors:["grey", "grey", "grey", "grey"],

        }
    },
    watch:{
        password:{
            handler(newValue){
                if(this.password === ""){
                    this.colors=["grey", "grey", "grey", "grey"];
                }

                if(newValue.length>0 && newValue.length < 3){
                    this.colors=["grey", "grey", "grey", "#CD4146"]
                }else{
                    if(/[a-z]/g.test(newValue) && /[A-Z]/g.test(newValue) && /[\d]/g.test(newValue) && /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g.test(newValue)){
                        this.colors = ["lightgreen", "#0A96A3", "#F9C466", "#CD4146"];
                    } else if (/[a-z]/g.test(newValue) && /[A-Z]/g.test(newValue) && /[\d]/g.test(newValue)){
                        this.colors = ["grey", "#0A96A3", "#F9C466", "#CD4146"];
                    } else if (/[a-z]/g.test(newValue) || /\d/g.test(newValue)){
                        this.colors = ["grey", "grey", "grey", "#CD4146"];
                    }
                }
            }
            
        }
    },
    computed:{
        passwordShowOrHide(){
            if(this.showPsw === false){
                return 'fa-eye';
            }else{
                return 'fa-eye-slash'
            }
        },
    },    
    methods:{
        ShowPassword(){
            this.showPsw = !this.showPsw;
        }
    },
}


</script>

<template>
    <div class="base">
        <div class="left-container">
            <div class="reg-container">
                <div class="reg-main-text">
                    <h1>Welcome to Acme.</h1>
                    <h6>Create your account by filling the form below.</h6>
                </div>
                <div class="form-container">
                    <form method="post">
                        <div class="txt_field">
                            <input type="text" v-model="email" required>
                            <span></span>
                            <label>Email</label>
                        </div>
                        <div class="txt_field psw">
                            <input v-if="this.showPsw === false" type="password" v-model="this.password" required>
                            <input v-else type="text" v-model="password" required>
                            <span>
                                <i :class="{'fa-eye': !showPsw, 'fa-eye-slash':showPsw}" @click="ShowPassword"></i>
                                <div class="password-strength" >
                                    <span class="dot" v-for="(color,index) in colors" :key="index" :style="{backgroundColor:color}"></span>
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
                            <button>Sign up</button> 
                        </div>
                    </form>
                </div>
            </div>
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
                    <button @click="">Log in</button>
                </div>
            </div>
            
           
            
            
        </div>
    </div>
</template>
