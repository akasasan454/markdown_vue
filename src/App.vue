<template>
  <div id="app" v-cloak>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Memo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          to="/"
          active-class
          class="font-weight-bold"
          v-if="isLogin"
        >{{ userData.displayName }}</v-btn>
        <v-btn icon class="cyan white--text" v-if="isLogin" @click="logout">
          <v-icon>logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout justify-center>
          <div class="mt-5" v-if="!isLoginChecked">
            <img width="100" height="100" alt="MyMarkdown" src="./assets/loading.gif">
          </div>
        </v-layout>
        <Home v-if="!isLogin && isLoginChecked"></Home>
        <Editor v-if="isLogin && isLoginChecked" :user="userData"></Editor>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Editor from "./components/Editor.vue";

export default {
  name: "app",
  data() {
    return {
      isLogin: false,
      userData: null,
      isLoginChecked: false
    };
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.isLoginChecked = true;
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      }
    });
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
    }
  },
  components: {
    Home: Home,
    Editor: Editor
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
