<template>
  <nav v-if="$store.state.display">
    <div class="navMenu">
      <div>
        <router-link class="marginRight10" to="/home">Home</router-link>
        <router-link class="marginRight10" :to="{ name: 'about'}">Az appról</router-link>
        <router-link :to="{ name: 'todos'}">Teendők</router-link>
      </div>
      <button
        type="button"
        class=""
        value="logout"
        @click="logout"
        >
        Kilépés
      </button>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { firebase } from '../composables/firebaseapikey';

export default {
  methods: {
    logout() {
      const auth = getAuth(firebase);
      signOut(auth).then(() => {
      // Sign-out successful.
      this.$store.commit('setDisplay', { dvalue: false });
      this.$router.push("/");
      console.log('Successful sign-out');
      }).catch((error) => {
          this.errorMessage = error.message;
          console.log(error.message);
          });
      },
  }
}
</script>

<style>
  .navMenu {
    min-width: 420px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>