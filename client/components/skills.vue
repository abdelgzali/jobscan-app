<template>
  <section id="skills">
    <ul>
      <li v-for="(skill, index) in skills" :key="index">
        {{ skill }}

        <rating :skillName="skill" />
        <span class="material-icons" @click="handleRemove(index)">
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
  props: ["selectedSkills"],
  // data() {
  //   return {
  //     skills: this.selectedSkills,
  //   };
  // },
  computed: {
    skills() {
      return this.selectedSkills;
    },
  },
  methods: {
    handleRemove(index) {
      this.$emit("removeSkill", index);
    },
  },
};
</script>

<style lang="scss" scoped>
section#skills {
  margin: 1rem 0;

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
</style>
