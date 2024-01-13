<template>
<div>
  <router-view></router-view>
  <Toast :position="'bottom-right'" />
</div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
</style>
