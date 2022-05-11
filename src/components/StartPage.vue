<template>
    <div>
        <h1>시작 페이지</h1>

        <a @click="fnDoGoogleLogin_Popup">구글 로그인</a> 
        <br><br>
        <a href="/login">이메일 로그인</a>
    </div>
</template>

<script>
export default {
    methods : {
        fnDoGoogleLogin_Popup(){
            this.$store.dispatch("fnDoGoogleLogin_Popup");
        }

    }
}
</script>

<style>
a {
    text-decoration: none;
}
</style>