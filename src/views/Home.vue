<template>
  <div class="home">
    <div>
      <nav-bar></nav-bar>
      <hero></hero>
      <products></products>
    </div>
    <login></login>
  </div>
</template>

<script>
// @ is an alias to /src

import Login from "@/components/Login.vue";
// import firebase from '../firebase'

export default {
  name: "Home",
  components: {
    Login
  }
};
</script>
