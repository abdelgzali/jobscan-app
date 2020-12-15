<template>
  <ul>
    <li v-for="(item, index) in listItems" :key="index">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ['initialList'],
  data: function () {
    return {
      listItems: this.initialList
    }
  }
};
</script>

<style lang="scss" scoped>
</style>