<template>
  <div class="wrapper">
      <h2>Your page {{ $route.params.user }} is active</h2>
      <b-row align-h="between" class="container">
        <b-col class="professionalDetail" cols="4">
          <h4 class="info">Professional Detail</h4>
          <img
            :src="image[userID].url"
            alt="avatar"
            class="avatar"
          />
          <b-row align-h="between">
            <b-col cols="4">
              <p class="info">Username</p>
              <p class="info">Name</p>
              <p class="info">Email</p>
              <p class="info">Location</p>
              <p class="info">Company</p>
            </b-col>
            <b-col cols="8">
              <p class="infContent">{{ users[userID].username }}</p>
              <p class="infContent">{{ users[userID].name }}</p>
              <p class="infContent">{{ users[userID].email }}</p>
              <p class="infContent">{{ users[userID].address.street }}</p>
              <p class="infContent">{{ users[userID].company.name }}</p>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="aboutMe" cols="7">
          <h4 class="info">About me</h4>
          <hr />
          <b-row align-h="between">
            <b-col cols="2">
              <p class="info">Username</p>
              <p class="info">Name</p>
              <p class="info">Website</p>
              <p class="info">Phone</p>
              <p class="info">E-mail</p>
              <a href="">{{users[userID].email}}</a>
              
            </b-col>
            <b-col cols="4">
              <p class="infContent">{{ users[userID].username }}</p>
              <p class="infContent">{{ users[userID].name }}</p>
              <p class="infContent">
                <a href="">{{ users[userID].website }}</a>
              </p>
              <p class="infContent">{{ users[userID].phone }}</p>
            </b-col>
            <b-col cols="3">
              <p class="info">City</p>
              <p class="info">Street</p>
              <p class="info">suite</p>
              <p class="info">Company Name</p>
              <p class="info">Catch Phrase</p>
  
            </b-col>
            <b-col cols="3">
              <p class="infContent">{{ users[userID].address.city }}</p>
              <p class="infContent">{{ users[userID].address.street }}</p>
              <p class="infContent">{{ users[userID].address.suite }}</p>
              <p class="infContent">{{ users[userID].company.name }}</p>
              <p class="infContent">{{ users[userID].company.catchPhrase }}</p>
            </b-col>
          </b-row>
          <h4 class="info">I'm web developer</h4>
          <hr>
          <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae soluta consectetur ipsam, quidem dolores neque eveniet veniam quae officiis aliquid sapiente omnis earum qui quasi, placeat, voluptate error! Non quo facere dolore tenetur quis adipisci?</p> -->
          <!-- <p>{{ descUser[userID] }}</p> -->
          <p>{{ image[userID].title }}</p>
        </b-col>
      </b-row>
    </div>
  </template>
  
  <script>
import {mapState} from 'vuex';
import { mapGetters } from 'vuex';
  export default {
    head(){
      return{
        title: `${this.users[this.userID].name}`
      }
    },
    props:{
        users:Array,
        userID: {
          type:Number,
          default:0,
        }
    },
    async fetch({$axios, store}){
      let image = await $axios.$get('https://jsonplaceholder.typicode.com/photos');
      store.commit('setImage', image);
        // await store.dispatch('loadDescUser');
    },
    // async fetch({store}){

    // },
    computed: {
      ...mapState({
        image: 'images'
      }),
      // ...mapGetters(['descUser'])

    }

  };
  </script>
  
  <style lang="scss" scroped>
  .wrapper {
    .container {
      margin: auto;
      display: flex;
      padding: 0;
      position: relative;
      top: 100px; 
      .professionalDetail,
      .aboutMe {
        background-color: white;
      }
      .professionalDetail {
        word-wrap: break-word;
        .avatar {
          width: 100%;
        }
      }
    }
  }
  </style>
  