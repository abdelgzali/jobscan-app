<template>
  <main id="page-jobs">
    <section id="jobs-skills">
      <autocomplete />
      <p>Select up to 10 skills; click arrow to explore skills</p>
      <skills />
    </section>
    <section id="jobs-content" v-if="userSkillsCount > 0">
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
    // returns object for ease of mapping
    // keys of object are skills toLowercase, values are objects with case sensitive skillname and user rating
    // {php: {skill:'PHP', rating: '5'}}
    userSkills() {
      return this.$store.state.skills.selectedSkills;
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
        const skills = job.skills.split(","); // split job posts skills string into array
        let jobScore = 0;

        skills.forEach((skill) => {
          if (this.userSkills[skill.toLowerCase()])
            // check if key exists in object
            jobScore = jobScore + this.userSkills[skill.toLowerCase()].rating; // add skill rating to relevance score
        });
        jobScores.push({ score: jobScore, job });
      });
      console.log(jobScores);
      return jobScores; // array of {score,job} objects
    },
    // sorts jobs by relevance scores
    rankJobs() {
      const jobScores = this.getJobScores(); // get array of jobs/score objects
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

<style lang="scss">
main#page-jobs {
  section#jobs-skills {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    > p {
      margin-top: 0.375rem;
      font-size: 12px;
    }
  }
  section#jobs-content {
    width: 100%;
    max-width: 600px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    > button {
      margin: 1rem auto;
      padding: 1rem 2rem;
      font-size: 20px;
    }
  }
}

@media screen and (max-width: 479px) {
  main#page-jobs {
    padding: 1rem;
  }
}
</style>
