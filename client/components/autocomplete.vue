<template>
  <div class="autocomplete">
    <div :class="showSuggestions ? 'search-container show' : 'search-container'">
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
        <li v-for="(item, index) in suggestions" :key="index" @click="handleClick(index)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["initialList"],
  data: function() {
    return {
      listItems: this.initialList,
      userInput: "",
      suggestions: this.initialList,
      showSuggestions: false,
      selectedItems: [],
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
          if (item.toLowerCase().includes(this.userInput.toLowerCase())) return item;
        });
      } else {
        this.suggestions = this.listItems; // reset suggestions on empty input
      }
    },
    toggleShowSuggestions() {
      this.showSuggestions = !this.showSuggestions;
    },
    handleClick(index) {
      this.showSuggestions = !this.showSuggestions;
      this.selectedItems.push(this.suggestions[index]);
      this.$emit("selected", this.selectedItems);
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
