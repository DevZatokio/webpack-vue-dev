<template>
  <div id="app" class="page-black mh-100">
    <nav class="navbar nav-border">
      <ul class="nav justify-content-start">
        <img src="/static/logo-t.png" width="200" height="80" class="nav-item" alt="" />
      </ul>
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </nav>
    <router-view style="padding-top: 83px" />
  </div>
</template>

<script>
export default {
  components: {},
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.isDashboard();
  },
  methods: {
    isDashboard() {
      // redirection https
      if (process.env.NODE_ENV == "production") {
        if (location.protocol != "https:") {
          location.href = "https:" + window.location.href.substring(window.location.protocol.length);
        }
      }
    }
  }
};
</script>

<style src="@/assets/styles/main.scss" lang="scss"></style>
