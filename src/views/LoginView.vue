<template>
    <div>
      <div class="alert-box alert-center" role="alert" v-if="errorMessage">
          {{ errorMessage }}
          <button type="button" class="redButton" aria-label="Close" @click="setErrorMessage">Bezár</button>
      </div>
      <div class="margin-top-80" id="loginForm">
          <h1>Belépés</h1>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email cím</label>
              <input
                type="email"
                class="form-control"
                name="email"
                autocomplete="email"
                v-model="inputEmail1"
                placeholder="email@email.com"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                Nem osztjuk meg az email címed harmadik féllel
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Jelszó</label>
              <input type="password" class="form-control" name="password" autocomplete="password"
            placeholder="password123" v-model="inputPassword1" />
            </div>
            <div class="mb-3">
              <button type="submit" class="margin-top20 marginRight10" id="submitButton">
                Belépés
              </button>
              <button type="button" class="margin-top20 marginRight10 stopped" id="switch-register" @click="moveToRegister">
                Regisztráció
              </button>
            </div>
          </form>
      </div>
    </div>
  </template>
  
  <script>
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
    import { firebase } from '../composables/firebaseapikey'
  
      export default {
        data() {
            return {
                inputUsername: "",
                inputEmail1: "",
                inputPassword1: "",
                errorMessage: null,
            };
        },
        methods: {
            login() {
                const auth = getAuth(firebase);
                signInWithEmailAndPassword(auth, this.inputEmail1, this.inputPassword1)
                    .then(() => {
                    let user = auth.currentUser;
            
                    this.$store.commit('setDisplay', { dvalue: true });
                    this.$store.commit('setOwner', { user: user.displayName });
                    this.$router.push("/home");
                })
                    .catch((error) => {
                    this.errorMessage = error.message;
                    console.log(error.message);
                });
            },
            moveToRegister() {
              let person = prompt("Please enter your name", "Harry Potter");
              if (person != null) {
                alert("Hello " + person + "! How are you today?")
                }
                // this.$router.push("/register");
            },
            setErrorMessage() {
                this.errorMessage = null;
            }
        }
  }
  </script>

  <style>
    .margin-top-80 {
      margin-top: 80px;
    }
    .form-text {
      margin: 25px 0 15px;
      font-size: 0.6em;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: normal;
    }
    .alert-center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 80px auto 0 auto;
    }
    .alert-box {
      max-width: 420px;
      background: #FF9090;
      border: 0;
      padding: 10px 20px;
      color: white;
      border-radius: 10px;
    }
    .redButton {
      background: #FF3E24;
    }
  </style>