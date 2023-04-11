<template>
  <div class="wrapper">
      <!-- <h2>Your page {{ $route.params.user }} is active</h2> -->
      <b-row align-h="between" class="container">
        <b-col class="professionalDetail" cols="4">
          <h4 class="info">{{ $t('title.personal-page.professional-detail') }}</h4>
          <img
            :src="images[userID].url"
            alt="avatar"
            class="avatar"
          />
          <b-row align-h="between">
            <b-col cols="4">
              <p class="info">{{ $t('title.personal-page.about.username') }}</p>
              <p class="info">{{ $t('title.personal-page.about.name') }}</p>
              <p class="info">{{ $t('title.personal-page.about.email') }}</p>
              <p class="info">{{ $t('title.personal-page.about.street') }}</p>
              <p class="info">{{ $t('title.personal-page.about.company') }}</p>
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
          <h4 class="info">{{ $t('title.personal-page.about.label') }}</h4>
          <hr />
          <b-row align-h="between">
            <b-col cols="2">
              <p class="info">{{ $t('title.personal-page.about.username') }}</p>
              <p class="info">{{ $t('title.personal-page.about.name') }}</p>

              <p class="info">{{ $t('title.personal-page.about.website') }}</p>
              <p class="info">{{ $t('title.personal-page.about.phone') }}</p>
              <p class="info">{{ $t('title.personal-page.about.email') }}</p>

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
              <p class="info">{{ $t('title.personal-page.about.city') }}</p>
              <p class="info">{{ $t('title.personal-page.about.street') }}</p>
              <p class="info">{{ $t('title.personal-page.about.suite') }}</p>
              <p class="info">{{ $t('title.personal-page.about.company') }}</p>
              <p class="info">{{ $t('title.personal-page.about.catch') }}</p>
  
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae soluta consectetur ipsam, quidem dolores neque eveniet veniam quae officiis aliquid sapiente omnis earum qui quasi, placeat, voluptate error! Non quo facere dolore tenetur quis adipisci?</p>
    <p>{{ $t('welcome') }}</p>

        </b-col>
      </b-row>
    </div>
  </template>
  
  <script>
import { mapGetters } from 'vuex';
  export default {
    head(){
      return{
        title: `${this.users[this.userID].name}`
      }
    },
    props:{
        users: Array,
        userID: {
          type:Number,
          default:0,
        }
    },
    computed: {
      ...mapGetters(['images'])

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
  