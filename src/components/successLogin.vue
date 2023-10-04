<script>
export default{
    props:{
        userData:{},
    },
    data(){
        return{
            buttonDisable:false
        }
    },
    methods:{
        logout(){
            this.$emit("logout");
        },
        buttonDisabled(){
            this.buttonDisable=true,
            setTimeout(() => {
                this.buttonDisable = false
            }, 5000)
        }
    }
}
</script>

<template>
    <div class="reg-container">
        <div class="reg-main-text">
            <h1>Welcome {{ userData.name }}!</h1>
            <h6>Here is your profile data:</h6>
        </div>
        <div class="successTable">
            <table>
                <tbody>
                    <tr v-for="(response,key,index) in userData" :key="index">
                        <td :style="{fontWeight:'bold'}">{{ key }}:</td>
                        <td>{{response }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="logOutbtn" @click="logout"  :disabled="this.buttonDisable">Log out</button>
    </div>
</template>

<style scoped>
.reg-container{
    background-color: rgba(74, 144, 226,1);
    position: relative;
}
.reg-main-text h1, h6{
    color:white
}
.logOutbtn{
    position: absolute;
    right:150px;
    top:70%;
    margin: 25px auto;
    padding: 12px 30px;
    border-radius: 5px;
    border: white 2px solid;
    color: rgba(74,144,226,1);
    background-color: white;
    cursor: pointer;
}
.logOutbtn:hover{
  background-color: rgb(224,224,224,1);
  transition: .3s;
}

.successTable{
    width: 100%;
    min-height: 110px;
    height: fit-content;
    color:white;
    margin:0 auto;


}

.successTable table{
    margin:0 auto;
    text-align: left;
    
}

.successTable table tr td{
    padding:0px 10px;
}
</style>