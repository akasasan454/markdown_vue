<template>
  <div id="home">
    <v-container>
      <v-layout justify-center>
        <h1 class="mt-3">{{ msg }}</h1>
      </v-layout>
      <v-layout justify-center>
        <v-btn class="mt-4 text-transform-none" @click="googleLogin">Googleアカウントでログイン</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "Welcome"
    };
  },
  methods: {
    googleLogin: function() {
      firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
};
</script>

<style lang="scss" scoped>
.text-transform-none {
  text-transform: none;
}
</style>
