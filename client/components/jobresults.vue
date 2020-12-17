<template>
  <ul id="jobresults">
    <li v-for="(job, index) of relevantJobs" :key="index">
      <p>{{ job.job.job_posting_company }}</p>
      <p>{{ job.job.job_posting_title }}</p>
      <p>{{ job.job.skills }}</p>
      <span>{{ job.score }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["relevantJobs"],
};
</script>

<style lang="scss" scoped>
ul#jobresults {
  li {
    padding: 1rem;
    position: relative;

    > span {
      position: absolute;
      top: 0;
      right: 0;
      background-color: $primary-yellow;
      font-size: 22px;
    }
  }
}
</style>