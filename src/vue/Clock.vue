<template>
  <p>{{time}}</p>
</template>

<style scoped>

</style>

<script>
export default {
  data: function() {
    return {
      time: ''
    }
  },
  created: function() {
    setInterval(() => {
      let formatNumber = t => t >= 10 ? t : "0" + t
      var now = new Date();
      var h = now.getHours()
      var m = now.getMinutes()
      var s = now.getSeconds()
      m = formatNumber(m)
      s = formatNumber(s)
      this.time =  h + ':' + m + ':' + s
    }, 1000)
  }
}

</script>
