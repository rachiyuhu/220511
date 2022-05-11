import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

import "@/datasources/firebase";

import { 
  getAuth, 

  //이메일 로그인
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,

  //구글로그인
  signInWithPopup,
  GoogleAuthProvider,
} 
from "firebase/auth";

const auth = getAuth();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //회원 정보 저장할 곳
    oUser : null,
  },


  getters: {//사용자 정보 값 저장
    //main 페이지에서 사용자 객체 반환
    fnGetUser(state){
      return state.oUser;
    },
    // app.vue에서 사용자 객체값 유무로 app.vue에서 출력할 네비게이션 선택
    fnGetAuthStatus (state){
      return state.oUser != null;
    }
  },
  
  mutations: {
    //커밋으로 들고옴
    fnSetUser(state, payload) {
      state.oUser = payload;
    },
  },


  actions: {//액션에 저장하면 dispatch로 꺼내쓰기
  //비밀번호 기반 계정 만들기 
  //(회원가입 페이지에서 진행 >회원가입시 pEmail,pPassword를 semail,spassword로 받아옴)
    fnRegisterUser ({commit}, payload){
      createUserWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)

      //신규 회원 이메일을 pUserInfo에 저장
      .then((pUserInfo)=>{
        commit("fnSetUser",{
          email:pUserInfo.user.email,
        });
        router.push('/main');
      })
      .catch((err)=>{
        console.log(err.message);
      })
    },

  //이메일 주소와 비밀번호로 사용자 로그인 처리(로그인페이지에서 진행)
  DoLogin ({commit}, payload){
      signInWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)

      .then((pUserInfo)=>{
        commit("fnSetUser", {
          id:pUserInfo.user.uid,
          name : pUserInfo.user.displayName,
          email : pUserInfo.user.email,
          photoURL : pUserInfo.user.photoURL,
        });
        router.push('/main');
      })
      .catch((err)=>{
        console.log(err.message);
      });
    },





    //구글 로그인
    fnDoGoogleLogin_Popup ({ commit }) {
      const oProvider = new GoogleAuthProvider();
      oProvider.addScope("profile");
      oProvider.addScope("email");

      signInWithPopup(auth, oProvider) 
        .then((pUserInfo)=>{
          commit("fnSetUser",{
            id:pUserInfo.user.uid,
            name : pUserInfo.user.displayName,
            email : pUserInfo.user.email,
            photoURL : pUserInfo.user.photoURL,
          });
          router.push('/main');
        })
        .catch((err)=>{
          console.log(err.message);
        })
      },
      
    //로그아웃
    LogOut ({commit}){
      signOut(auth)
      .then(()=>{
        commit("fnSetUser");
        router.push('/');
      })
      .catch((err)=>{
        console.log(err.message);
      })
    },
    
    
    
   
  },
  modules : {},

});
