<template>
  <div id="app">
    <nav class="nav is-primary">
      <div class="nav-left">
        <div class="nav-item">
          SOCKET PONG
        </div>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import './style.css'
export default {
  name: 'app'
}
</script>

<style>
  nav.nav {
    background: #00d1b2;
    color: white;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
</style>
