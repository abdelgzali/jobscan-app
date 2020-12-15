<template>
  <div class="autocomplete">
    <div class="search-container">
      <input
        type="text"
        class="search-bar"
        placeholder="search skills (ex: PHP, React...)"
        v-model="userInput"
        @keyup="handleSearch"
      />
      <button @click="toggleShowSuggestions">show</button>
    </div>
    <ul v-if="showSuggestions">
      <li v-for="(item, index) in suggestions" :key="index">
        {{ item }}
      </li>
    </ul>
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

    > button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>