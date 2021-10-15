<template>
  <div>
    <NavBar />
    <router-view class="container" />
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    NavBar,
    Footer
  }
}


</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica;
    color: #444;
  }

  .container{
    min-height: 300px;
  } carteirinha

  a {
    transition: .5s;
  }
</style>
