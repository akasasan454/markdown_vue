<template>
  <div id="app">
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Wiki</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <Home v-if="!isLogin"></Home>
        <Editor v-if="isLogin" :user="userData"></Editor>
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
      userData: null
    };
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
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
