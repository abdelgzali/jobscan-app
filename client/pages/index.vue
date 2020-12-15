<template>
  <main id="page-jobs">
    <section>
      <autocomplete :initialList="skillsList" />
    </section>
  </main>
</template>

<script>
import autocomplete from "../components/autocomplete.vue";
export default {
  components: { autocomplete },

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
  async fetch() { // nuxt hook for fetching async data server-side
    try {
      const res = await fetch('https://jobscan-api.herokuapp.com/api/jobs'),
       fetchedJobs = await res.json();
      this.jobPosts = await fetchedJobs;
      this.getSkills(this.jobPosts);
    } catch(err) {
      console.log(err);

    }
  },
  methods: {
    getSkills(jobPosts) {
      const skillsArr = [];
      // flatten array of skills
      // ['a,b,c','x,y,z'] ---> ['a','b','c','x','y','z']
      jobPosts.forEach((jobPost) => {
        skillsArr.push(...jobPost.skills.split(','))
      });
      // map skills, overwrite duplicates
      // takes an array pair of key/value,
      // keys represent a unique set of skills (case insensitive); value maintains case integrity for each unique skill
      // this ensures each string is unique, maintains case, while avoiding case sensitive duplicates
      const skillsMap = new Map(skillsArr.map(skill => [skill.toLowerCase(), skill]));
      this.skillsList = [...skillsMap.values()];
      console.log(this.skillsList);
    }
  },
};
</script>

<style lang="scss">
</style>
