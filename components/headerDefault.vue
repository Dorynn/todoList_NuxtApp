<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <nuxt-link :to="localePath('/')">
        <b-navbar-brand href="">
          <font-awesome-icon :icon="['fas', 'house']" />
        </b-navbar-brand>
      </nuxt-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <nuxt-link :to="
            
            localePath('/todoPage/taskList')">
            <font-awesome-icon
              :icon="['fas', 'book']"
              style="color: white; font-size: 20px; margin-top: 6px"
            />
          </nuxt-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <nuxt-link :to="localePath('/test')"> TEST </nuxt-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <!-- <nuxt-link to="/todoPage/userProfile"> Sign out </nuxt-link> -->
          <switch-language />
          <b-nav-item-dropdown right>
            <template #button-content> User </template>
            <b-dropdown-item href="">
              <nuxt-link :to="localePath('/todoPage/userProfile/user0')">
                Profile
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item href=""> Sign out </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import switchLanguage from "./switchLanguage.vue";
export default {
  components: { switchLanguage },
  name: "header-default",
};
</script>

<style></style>
