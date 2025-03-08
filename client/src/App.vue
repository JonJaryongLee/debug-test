<script setup>
import { RouterView } from "vue-router";
import AppHeader from "@/components/app/AppHeader.vue";
import AppFooter from "@/components/app/AppFooter.vue";
</script>

<template>
  <div class="root">
    <header class="header">
      <AppHeader />
    </header>
    <main class="main">
      <RouterView />
    </main>
    <footer class="footer">
      <AppFooter />
    </footer>
  </div>
</template>

<style scoped>
.root {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  flex: 1;
}
.main {
  flex: 8;
  border-top: 1px solid black;
}
.footer {
  flex: 1;
  border-top: 1px solid black;
}
</style>
