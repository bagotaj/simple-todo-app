<template>
  <NavBar />
  <router-view />
</template>

<script>
  import { firebase } from "./composables/firebaseapikey";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import NavBar from './components/NavBar.vue';
  export default {
      name: "App",
      components: { NavBar },
      mounted() {
        const auth = getAuth(firebase);
        onAuthStateChanged(auth, (user) => {
          if (user !== null) {
            this.$store.commit('setOwner', { user: user.displayName });
            this.$store.commit('setDisplay', { dvalue: true });
            this.$router.push("/home");
          } else {
            this.$store.commit('setDisplay', { dvalue: false });
            this.$router.push("/");
          }
        });
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #454545;
}

nav a.router-link-exact-active {
  color: #FF3E24;
}

.normalbtn {
  margin-right: 10px;
}
</style>
