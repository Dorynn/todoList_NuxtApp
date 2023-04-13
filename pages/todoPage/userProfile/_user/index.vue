<template>
  <div>
    <p v-if="users.length==0">Loading...</p>
    <div class="wrapper" v-else>
      <h2>Your page {{ $route.params.user }} is active</h2>
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
          <h4 class="info">{{ $t('title.personal-page.task-statistics.label') }}</h4>
          <hr>
          <p>{{$t('title.personal-page.task-statistics.completedTask')}}: {{ completedTask }}</p>
          <p>{{$t('title.personal-page.task-statistics.inprogressTask')}}: {{ inprogressTask }}</p>
          <p>{{$t('title.personal-page.task-statistics.newTask')}}: {{ newTask }}</p>
          <p>{{$t('title.personal-page.task-statistics.totalTask')}}: {{items.length }}</p>

        </b-col>
      </b-row>
    </div>
  </div>  
</template>
  
  <script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
  export default {
    head(){
      return{
        title: `${this.users[this.userID].name}`
      }
    },
    props:{
        userID: {
          type:Number,
          default:0,
        }
    },
    computed: {
      ...mapGetters(['images', 'users', 'completedTask', 'inprogressTask', 'newTask', 'items']),

    },
    methods:{
      ...mapActions(['getImages', 'getUserInfo', 'getTodos']),
    },
    created(){
      this.getUserInfo();
      this.getImages();
      this.getTodos();
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
  