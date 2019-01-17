<template>
  <div v-if="isLoggedIn">
    {{song}} by <span v-for="artist in artists">{{artist.name}} </span>
    <img v-bind:src="songImg" alt="">
  </div>
  <div v-else="isLoggedIn">
    <a href="/login">Logga in i spotify</a>
  </div>
</template>

<style scoped>

</style>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      isLoggedIn: false,
      song: '',
      artists: [],
      songImg: ''
    }
  },
  created: function () {
    this.auth()
  },
  methods: {
    getSong: function () {
      axios.get('/song')
        .then((response) => {
          this.song = response.data.item.name
          this.songImg = response.data.item.album.images[1].url
          this.artists = response.data.item.album.artists

          console.log(response.data);
          let timeLeft = !response.data.is_playing ?
          10000 : response.data.item.duration_ms - response.data.progress_ms
          setTimeout(this.getSong, timeLeft)
      })
    },
    auth: function () {
      axios.get('/isauth')
      .then((response) => {
        if(response.data.isauth) {
          this.isLoggedIn = true
          this.getSong()
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
