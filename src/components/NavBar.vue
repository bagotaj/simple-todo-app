<template>
  <nav v-if="display">
    <router-link to="/home">Home</router-link> |
    <router-link :to="{ name: 'about'}">Az appról</router-link> |
    <router-link :to="{ name: 'todos'}">Teendők</router-link> |
    <button
      type="button"
      class="normalbtn"
      value="logout"
      @click="logout"
      >
      Kilépés
      </button>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { firebase } from '../composables/firebaseapikey';

export default {
  methods: {
    display() {
      console.log(this.$store.state.display)
      return this.$store.state.display
    },
    logout() {
      const auth = getAuth(firebase);
      signOut(auth).then(() => {
      // Sign-out successful.
      this.$store.commit('setDisplay');
      this.$router.push("/");
      console.log('Successful sign-out')
      }).catch((error) => {
          this.errorMessage = error.message;
          console.log(error.message);
          });
      },
  }
}
</script>

<style>

</style>