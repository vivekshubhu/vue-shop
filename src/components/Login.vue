<template>
  <div class="login">
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button v-for="(button, index) in buttons" :key="index" class="mr-4 btn btn-outline-success my-2 my-sm-0 text-capitalize" v-on:click="tabSelected(button)">
              {{ button }}
            </button>
            <!-- <button class="btn btn-outline-success my-2 my-sm-0">Register</button> -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="text-left" v-show="currentTab == 'login'">
              <div class="">
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email" v-model="email" class="form-control" aria-describedby="emailHelp" />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input @keyup.enter.prevent="login" v-model="password" type="password" class="form-control" />
                </div>
              </div>
              <button type="submit" @click.prevent="login" class="btn btn-primary">Login</button>
            </form>
            <form class="text-left" v-show="currentTab == 'register'">
              <div class="">
                <div class="form-group">
                  <label for="password">Your Name</label>
                  <input v-model="name" type="text" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input v-model="password" type="password" class="form-control" />
                </div>
              </div>
              <button @click.prevent="storeData" type="submit" class="btn btn-primary">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb } from "../firebase";
export default {
  name: "login",
  props: {
    msg: String
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      currentTab: "login",
      buttons: ["login", "register"]
    };
  },
  methods: {
    tabSelected(btn) {
      this.currentTab = btn;
    },
    storeData() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $("#login").modal("hide");
          this.$router.replace("admin");
        })
        .catch(error => {
          // Handle Errors here.
          //   var errorCode = error.code;
          //   var errorMessage = error.message;
          //   // ...
          console.log(error);
        });
    },
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $("#login").modal("hide");

          this.$router.replace("/admin");
        })
        .catch(function(error){
          // // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // if (errorCode === 'auth/wrong-password') {
          //     alert('Wrong password.');
          // } else {
          //     alert(errorMessage);
          // }
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
