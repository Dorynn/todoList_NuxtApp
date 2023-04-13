<template>
  <div>
    <p v-if="images.length==0">Loading...</p>
    <div v-else>

    <nuxt-child :userID="userID" />
    <div class="otherUser">
      <h4>{{ $t('title.personal-page.other-user') }}</h4>
      <div class="listUser">
        <img
        :src="images[Math.floor(Math.random() * 9) + userID].url"
          alt=""
          class="user id1"
          @click="showProfile"
        />
        <img
        :src="images[Math.floor(Math.random() * 9) + userID].url"
          alt=""
          class="user id2"
          @click="showProfile"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  head() {
    return {
      titleTemplate: "User Profile - %s",
    };
  },
  data() {
    return {
      userID: 0,
    };
  },
  computed:{
    ...mapGetters(["images", "users"])
  },
  methods: {
    showProfile() {
      console.log('image...',this.images)
      this.userID = Math.floor(Math.random() * 9);
      this.$router.push(`/todoPage/userProfile/user${this.userID}`);
      console.log("active");
    },
    ...mapActions(["getImages", "getUserInfo"]),
  },
  created(){
    this.getImages();
    this.getUserInfo();
  },
  mounted(){
  }
};
</script>

<style lang="scss">
.otherUser {
  position: relative;
  top: 170px;
  left: 260px;
  .user {
    width: 45px;
    height: 45px;
    border-radius: 100px;
    cursor: pointer;
  }
}
</style>
