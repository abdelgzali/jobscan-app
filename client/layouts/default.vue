<template>
  <div>
    <navbar />
    <Nuxt class="main-wrapper" />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  components: { Navbar },
};
</script>

<style lang="scss">
.main-wrapper {
  padding: 2rem;
}
</style>
