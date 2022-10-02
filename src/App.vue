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
  @import 'assets/scss/modules/_icons.scss';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body {
    margin: 0;
  }
  nav {
    padding: 60px 20px 40px 20px;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    background: #f4f4f4;
  }

  nav a {
    font-weight: bold;
    color: #454545;
    text-decoration: none;
  }

  nav a:hover {
    font-weight: normal;
  }

  nav a.router-link-exact-active {
    color: #FF3E24;
  }

  .normalbtn {
    margin-right: 10px;
  }
</style>
