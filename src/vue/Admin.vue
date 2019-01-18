<template lang="html">
  <div>
    <form>
      <textarea name="message" rows="8" cols="80" v-model="message"></textarea>
      <button v-on:click.prevent="postMessage">Publicera</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      message: '',
    }
  },
  methods: {
    postMessage: function() {
      vm.$children[0].message = this.message;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
