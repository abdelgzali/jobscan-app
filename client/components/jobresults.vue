<template>
  <ul id="jobresults" v-if="relevantJobs && relevantJobs.length > 0">
    <p>Job Score:</p>
    <li v-for="(job, index) of relevantJobs" :key="index">
      <span>{{ job.score }}</span>
      <p class="job-title">{{ job.job.job_posting_title }}</p>
      <p class="job-company">{{ job.job.job_posting_company }}</p>
      <p class="job-skills">{{ job.job.skills }}</p>
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
  width: 100%;
  li {
    padding: 1rem;
    position: relative;

    p {
      margin-left: 4rem;

      &.job-title {
        font-size: 18px;
        font-weight: 700;
        color: $primary-blue;
        padding: 0.375rem 0;
      }

      &.job-company {
        font-style: italic;
      }

      &.job-skills {
        font-size: 14px;
        word-wrap: break-word;
      }
    }

    > span {
      position: absolute;
      top: 50%;
      left: 0;
      height: 60px;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(-50%);
      background-color: $primary-yellow;
      font-size: 22px;
      border-radius: 5px;
    }
  }
}
</style>