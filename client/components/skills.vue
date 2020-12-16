<template>
  <section id="skills">
    <ul>
      <li v-for="(skill, index) in skills()" :key="index">
        {{ Object.keys(skill)[0] }}

        <rating :skill="skill" :skillIndex="index" />
        <span class="material-icons" @click="() => handleRemove(index)">
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
  computed: {},
  methods: {
    handleRemove(index) {
      this.$emit("removeSkill", index);
    },
    skills() {
      return this.selectedSkills;
    },
  },
};
</script>

<style lang="scss" scoped>
section#skills {
  width: 100%;
  max-width: 500px;
  margin: 1rem auto;

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
