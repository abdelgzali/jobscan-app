<template>
  <div
    :class="
      selectedSkillsCount < 10 ? 'autocomplete' : 'autocomplete input-disabled'
    "
  >
    <div
      :class="showSuggestions ? 'search-container show' : 'search-container'"
    >
      <input
        type="text"
        class="search-bar"
        placeholder="search skills (ex: PHP, React...)"
        v-model="userInput"
        @keyup="handleSearch"
      />
      <button @click="toggleShowSuggestions">
        <span class="material-icons"> keyboard_arrow_down </span>
      </button>
      <ul v-if="showSuggestions" class="search-suggestions">
        <li
          v-for="(item, index) in suggestions"
          :key="index"
          @click="handleClick(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userInput: "",
      showSuggestions: false,
      selectedItems: [],
    };
  },
  computed: {
    suggestions() {
      return this.userInput
        ? this.$store.state.skills.skills.filter((item) => {
            if (item.toLowerCase().includes(this.userInput.toLowerCase()))
              return item;
          })
        : this.$store.state.skills.skills;
    },
    selectedSkillsCount() {
      return Object.keys(this.$store.state.skills.selectedSkills).length;
    },
  },
  methods: {
    handleSearch() {
      this.userInput.length > 0 && this.suggestions.length > 0
        ? (this.showSuggestions = true)
        : (this.showSuggestions = false);
    },
    toggleShowSuggestions() {
      this.showSuggestions = !this.showSuggestions;
    },
    handleClick(skill) {
      this.showSuggestions = !this.showSuggestions;
      this.$store.commit("skills/setSelectedSkill", { skill, rating: 0 });
    },
  },
};
</script>

<style lang="scss" scoped>
div.autocomplete {
  div.search-container {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    z-index: 5;

    input.search-bar,
    > button {
      transition: border-radius 250ms;
    }

    input.search-bar {
      flex: 1 0 auto;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    > button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      > span.material-icons {
        transition: transform 250ms;
      }
    }

    ul.search-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid #ddd;
      width: 100%;
      background-color: #fff;

      li {
        cursor: pointer;
        padding: 0.675rem 1rem;

        &:hover {
          background-color: #ddd;
        }
      }
    }

    &.show {
      input.search-bar {
        border-bottom-left-radius: 0px;
      }
      > button {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 0;

        > span.material-icons {
          transform: rotate(-180deg);
        }
      }
    }
  }
}
</style>
