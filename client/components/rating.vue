<template>
  <div class="rating-container">
    <div class="feedback">
      <div :class="disableRating ? 'rating input-disabled' : 'rating'">
        <template v-for="n in 5">
          <input
            type="radio"
            :name="`rating-${skill}-${6 - n}`"
            :id="`rating-${skill}-${6 - n}`"
            @click="updateRating(skill, 6 - n)"
            :checked="isChecked(6 - n)"
          />
          <label :for="`rating-${skill}-${6 - n}`"></label>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["skill"],
  data() {
    return {
      disableRating: false,
    };
  },
  computed: {
    skillRating() {
      return this.skill
        ? this.$store.state.skills.selectedSkills[this.skill]
        : 0;
    },
  },
  methods: {
    updateRating(skill, rating) {
      this.$store.commit("skills/setSelectedSkill", { skill, rating });
      this.disableRating = !this.disableRating;
    },
    isChecked(starIndex) {
      return this.skillRating >= starIndex ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
div.rating-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  margin-left: auto;

  .feedback {
    max-width: 360px;
    width: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;

    .rating {
      display: flex;
      width: 100%;
      justify-content: center;
      overflow: hidden;
      flex-direction: row-reverse;
      position: relative;

      > input {
        display: none;
      }

      > label {
        cursor: pointer;
        width: 40px;
        height: 40px;
        margin-top: auto;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 76%;
        transition: 0.3s;
      }
      > input:checked ~ label,
      > input:checked ~ label ~ label {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23fcd93a' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
      }

      > input:not(:checked) ~ label:hover,
      > input:not(:checked) ~ label:hover ~ label {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23d8b11e' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
      }
    }
  }
}

@media screen and (max-width: 479px) {
  div.rating-container {
    padding: 0 1rem;
    div.feedback {
      div.rating {
        > label {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
