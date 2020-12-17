<template>
  <section id="skills">
    <ul>
      <li v-for="(skill, name) in skills" :key="name">
        {{ skill.skill }}

        <rating :skill="skill.skill" :skillName="name" />
        <span class="material-icons" @click="() => handleRemove(name)">
          close
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
import rating from "../components/rating";
export default {
  components: { rating },
  computed: {
    skills() {
      return this.$store.state.skills.selectedSkills;
    },
  },
  methods: {
    handleRemove(name) {
      console.log(name);
      this.$store.commit("skills/unsetSelectedSkill", name);
    },
  },
};
</script>

<style lang="scss" scoped>
section#skills {
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;

  ul {
    li {
      border: 2px solid $primary-yellow;
      padding: 0.675rem 1rem;
      margin-bottom: 0.375rem;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > span.material-icons {
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 479px) {
  section#skills {
    margin: 1rem auto;
  }
}
</style>
