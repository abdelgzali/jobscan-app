<template>
  <main id="page-jobs">
    <section>
      <dropdown :initialList="skillsList" />
    </section>
  </main>
</template>

<script>
import dropdown from "../components/dropdown.vue";
export default {
  components: { dropdown },

  data() {
    return {
      jobPosts: [
        "tech lead",
        "assistant to the regional tech lead",
        "receptionist",
      ],
      skillsList: []
    };
  },
  async fetch() {
    try {
      const res = await fetch('https://jobscan-api.herokuapp.com/api/jobs'),
       fetchedJobs = await res.json();
      this.jobPosts = await fetchedJobs;
      this.getSkills(this.jobPosts);
      //console.log(fetchedJobs);
    } catch(err) {
      console.log(err);

    }
  },
  methods: {
    getSkills(jobPosts) {
      this.skillsList = jobPosts.map((jobPost) => jobPost.skills);
    }
  },
};
</script>

<style lang="scss">
</style>
