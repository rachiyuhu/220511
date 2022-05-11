<template>
    <div>
        <h1>메인 페이지입니다</h1>
        <img v-if="fnGetUser.photoURL" :src="fnGetUser.photoURL" alt="">
        <h3>{{fnGetUser.name}}</h3>
        <p>{{fnGetUser.email}}</p>
    </div>
</template>

<script>
export default {
    computed : {
        fnGetUser(){
            let oUserInfo = this.$store.getters.fnGetUser
            //console.log(this.$store.getters.fnGetUser) true로 뜸
            return oUserInfo
        }
    }
    
}
</script>