<script>


export default{
    data(){
        return{
            email:"",
            password:"",
            rememberMe:null,
            showPsw:true,
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
