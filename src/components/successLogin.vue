<script>
export default{
    props:{
        userData:{},
    },
    data(){
        return{
          
        }
    },
    methods:{
        logout(){
            this.$emit("logout");
        }
    }
}
</script>

<template>
    <div class="reg-container">
        <div class="reg-main-text">
            <h1>Welcome {{ userData.name }}</h1>
            <h6>Here your test datas:</h6>
        </div>
        <div class="successList">
            <ul v-for="(response,key,index) in userData" :key="index">{{ key }}: {{response }}</ul>
        </div>
        <button class="logOutbtn" @click="logout">Log out</button>
    </div>
</template>

<style scoped>
.reg-container{
    background-color: rgb(167, 255, 138);
    position: relative;
}
.reg-main-text h1, h6{
    color:#504e4e
}
.logOutbtn{
    position: absolute;
    right:150px;
    top:70%;
    margin: 25px auto;
    padding: 12px 30px;
    border-radius: 5px;
    border: none;
    color: white;
    background-color: rgba(74,144,226,1);
    cursor: pointer;
}
.logOutbtn:hover{
  background-color: rgb(64, 123, 190);
  transition: .3s;
}
.successList{
    align-items: center;
    display: table;
    width:100%;
    margin:0 auto;
    font-size: medium;
}

.successList ul:hover{
    background-color: #05c62c67;
    transition: 1s;
    transform: scale(1);
}
</style>