<template>
    <div class="main-content">
        <header>
            <h1>Togethernet Dashboard</h1>
        </header>
        <clock></clock>
        <spotify></spotify>
    </div>
</template>


<style scoped>
  
</style>

<script>
    import Clock from './Clock.vue'
    import Spotify from './Spotify.vue'

    export default {
        data: function () {
          return {

          }
        },
        components: {
          Clock,
          Spotify
        }
    }
</script>
