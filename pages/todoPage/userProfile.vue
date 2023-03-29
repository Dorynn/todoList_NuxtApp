<template>
  <div>
    <nuxt-child :users="users" :userID="userID"/>
    <div class="otherUser">
      <h4>Other user</h4>
      <div class="listUser">
        <img src="../../assets/image/coffee.jpg" alt="" class="user id1" @click="showProfile">
        <img src="../../assets/image/coffee.jpg" alt="" class="user id2" @click="showProfile">
      </div>
    </div>
  </div>
</template>

<script>
export default {
    async fetch() {
    this.users = await this.$axios.$get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log("okeee");
  },
  data() {
    return {
      users: [],
      userID:4,
    };
  },
  methods:{
    showProfile(){
      this.userID=Math.floor(Math.random() * 9);
      this.$router.push(`/todoPage/userProfile/user${this.userID}`)
      console.log('active')
    }
  }
}
</script>

<style lang="scss">
    .otherUser{
      position: relative;
      top: 170px;
      left: 260px;
      .user{
        width: 45px;
        height: 45px;
        border-radius: 100px;
        cursor: pointer;
      }
    }
</style>