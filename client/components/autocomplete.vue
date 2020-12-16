<template>
  <div class="autocomplete">
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
        <li v-for="(item, index) in suggestions" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["initialList"],
  data: function () {
    return {
      listItems: this.initialList,
      userInput: "",
      suggestions: this.initialList,
      showSuggestions: false,
    };
  },
  methods: {
    handleSearch() {
      this.searchList();
      this.userInput.length > 0 && this.suggestions.length > 0
        ? (this.showSuggestions = true)
        : (this.showSuggestions = false);
    },
    // filters through listitems, returns items that include user input
    searchList() {
      if (this.userInput.length > 0) {
        this.suggestions = this.listItems.filter((item) => {
          if (item.toLowerCase().includes(this.userInput.toLowerCase()))
            return item;
        });
      } else {
        this.suggestions = this.listItems; // reset suggestions on empty input
      }
    },
    toggleShowSuggestions() {
      this.showSuggestions = !this.showSuggestions;
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

    input.search-bar {
      flex: 1 0 auto;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    > button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      transition: border-radius 250ms;
    }

    ul.search-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid #ddd;
      width: 100%;
    }

    &.show {
      > button {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 0;
      }
    }
  }
}
</style>