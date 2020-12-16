<template>
  <main id="page-jobs">
    <section>
      <autocomplete @selected="handleSelected" />
      <skills
        :selectedSkills="selectedSkills"
        @removeSkill="handleRemoveSkill"
      />
    </section>
  </main>
</template>

<script>
import autocomplete from "../components/autocomplete";
import skills from "../components/skills";

export default {
  components: { autocomplete, skills },

  data() {
    return {
      jobPosts: [
        "tech lead",
        "assistant to the regional tech lead",
        "receptionist",
      ],
      skillsList: [],
      selectedSkills: [],
    };
  },
  async fetch() {
    // nuxt hook for fetching async data server-side
    try {
      const res = await fetch("https://jobscan-api.herokuapp.com/api/jobs"),
        fetchedJobs = await res.json();
      this.$store.commit("skills/loadSkills", fetchedJobs);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    handleSelected(skillsEmitted) {
      // map skills as objects with user rating as value
      this.selectedSkills = skillsEmitted.map((skill) => ({ [skill]: 0 }));
      console.log(this.selectedSkills);
    },
    handleRemoveSkill(skillIndex) {
      this.selectedSkills.splice(skillIndex, 1);
    },
  },
};
</script>

<style lang="scss"></style>
