<template>
  <main id="page-jobs">
    <section id="jobs-skills">
      <autocomplete />
      <skills />
    </section>
    <section id="jobs-results" v-if="userSkillsCount > 0">
      <button @click="rankJobs">Find Jobs</button>
      <jobresults :relevantJobs="relevantJobs" />
    </section>
  </main>
</template>

<script>
import autocomplete from "../components/autocomplete";
import skills from "../components/skills";
import jobresults from "../components/jobresults";

export default {
  components: { autocomplete, skills, jobresults },

  data() {
    return {
      relevantJobs: [],
    };
  },
  computed: {
    jobPosts() {
      return this.$store.state.skills.jobPosts;
    },
    userSkills() {
      return this.$store.state.skills.selectedSkills; // object; keys are skills, values are ratings for those skills
    },
    userSkillsCount() {
      return this.userSkills ? Object.keys(this.userSkills).length : 0;
    },
  },
  async fetch() {
    // nuxt hook for fetching async data server-side
    try {
      const res = await fetch("https://jobscan-api.herokuapp.com/api/jobs"),
        fetchedJobs = await res.json();
      this.$store.commit("skills/updateJobs", fetchedJobs);
      this.$store.commit("skills/loadSkills", fetchedJobs);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    // adds up relevance score for each job post based on userSkills (skill:rating) dictionary
    getJobScores() {
      const jobScores = [];
      this.jobPosts.forEach((job) => {
        const skills = job.skills.split(",");
        let jobScore = 0;

        skills.forEach((skill) => {
          if (this.userSkills[skill])
            jobScore = jobScore + this.userSkills[skill];
        });
        jobScores.push({ score: jobScore, job });
      });
      console.log(jobScores);
      return jobScores; // array of {score,job} objects
    },
    rankJobs() {
      const jobScores = this.getJobScores();
      const sortedJobs = jobScores.sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
      });
      this.relevantJobs = sortedJobs;
    },
  },
};
</script>

<style lang="scss"></style>
