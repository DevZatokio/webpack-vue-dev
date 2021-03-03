<template>
  <div id="app">
    <h1>Hola mundo</h1>
    <router-view style="padding-top: 83px"/>
  </div>
</template>

<script>


export default {
  components: {

  },
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.isDashboard();
  },
  methods: {
    isDashboard() {


      if (process.env.NODE_ENV == "production") {
        if (location.protocol != "https:") {
          location.href = "https:" + window.location.href.substring(window.location.protocol.length);
        }
      }
    }
  }
};
</script>

