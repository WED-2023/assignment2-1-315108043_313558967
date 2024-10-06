<template>
  <div class="container">
    <!-- Search bar container -->
    <div class="search-bar-container">
      <div class="search-bar">
        <!-- Search input -->
        <input
          ref="searchInput"
          type="text"
          v-model="searchQuery"
          placeholder="Enter your search query..."
          class="form-control"
          @input="suggestLastSearch"
          @keyup.enter="updateResultsList"
        />
        <button @click="updateResultsList" class="btn btn-primary btnSearch">Search</button>
      </div>

      <!-- Search button and sort by dropdown -->
      <div class="search-controls">
        <div class="sort-by-container">
          <label for="sortBy" class="sort-by-label">Sort By:</label>
          <select v-model="sortBy" id="sortBy" class="sort-by-select" @change="handleSort">
            <option value="default">Default</option>
            <option value="popularity">Popularity (Likes)</option>
            <option value="preparationTime">Preparation Time</option>
          </select>
        </div>

        <!-- Toggle filters button -->
        <button @click="toggleFilters" class="btn btn-secondary btnSearch">
          {{ showFilters ? 'Hide Filters' : 'Select Filters' }}
        </button>

        <!-- Max results dropdown -->
        <div class="max-results-container">
          <label for="maxResults">Max Results to Show:</label>
          <select v-model="maxResultsToShow" id="maxResults" class="form-control">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Filters container -->
    <div class="filters" v-show="showFilters">
      <!-- Cuisine filter -->
      <div class="filter-column">
        <div class="filter">
          <label>Cuisine:</label>
          <div v-for="cuisine in cuisines" :key="cuisine">
            <button
              type="button"
              class="filter-button"
              :class="{ 'selected': selectedCuisines.includes(cuisine) }"
              @click="toggleCuisine(cuisine)"
            >
              {{ cuisine }}
            </button>
          </div>
        </div>
      </div>

      <!-- Diet filter -->
      <div class="filter-column">
        <div class="filter">
          <label>Diet:</label>
          <div v-for="diet in diets" :key="diet">
            <button
              type="button"
              class="filter-button"
              :class="{ 'selected': selectedDiets.includes(diet) }"
              @click="toggleDiet(diet)"
            >
              {{ diet }}
            </button>
          </div>
        </div>
      </div>

      <!-- Intolerance filter -->
      <div class="filter-column">
        <div class="filter">
          <label>Intolerance:</label>
          <div v-for="intolerance in intolerances" :key="intolerance">
            <button
              type="button"
              class="filter-button"
              :class="{ 'selected': selectedIntolerances.includes(intolerance) }"
              @click="toggleIntolerance(intolerance)"
            >
              {{ intolerance }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected filters display -->
    <div v-if="selectedFilters.length > 0" class="selected-filters">
      <p>Selected Filters:</p>
      <ul>
        <li v-for="filter in selectedFilters" :key="filter">{{ filter }}</li>
      </ul>
    </div>

    <!-- Result info -->
    <div class="result-info">
      <div class="suggestion" v-if="$root.store.username && lastSearch">
        Last searched: <span class="suggestion-link" @click="copySuggestion">{{ lastSearch }}</span>
      </div>
    </div>

    <!-- Search results container -->
    <div class="search-results-container">
      <div class="search-results-title" v-if="searchResults.length > 0">
        <h2>Search Results</h2>
      </div>

      <!-- No items found message
      <div class="no-results-message" v-if="searchResults.length === 0">
        <h2>No items found</h2>
      </div> -->

      <!-- No items found message -->
      <div class="no-results-message" v-if="searchPerformed && searchResults.length === 0">
        <h2>No items found</h2>
      </div>
      <!-- Recipe previews -->
      <div class="recipe-preview-container">
        <RecipePreviewList 
        ref="results"
        :fetch-function="updateResultsList"
        :key="rerenderKey"
        :familyRecipe="false"
        >
        Found recipes</RecipePreviewList>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "bootstrap";
import CustomButton from "../components/CustomButton.vue";
import PageTitle from "../components/PageTitle.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { getSearchResults } from "../services/recipes";

export default {
  name: "Search",
  components: {
    PageTitle,
    RecipePreviewList,
    CustomButton
  },
  data() {
    return {
      searchQuery: "", // Holds the value of the search input
      lastSearch: "", // Holds the last search value
      searchResults: [], // Holds the full set of search results
      maxResultsToShow: 5, // Maximum number of search results to display
      selectedCuisines: [], // Holds the selected cuisines
      selectedDiets: [], // Holds the selected diets
      selectedIntolerances: [], // Holds the selected intolerances
      showFilters: false, // Controls the visibility of the filter options
      sortBy: "default", // Default sort by popularity (likes)
      cuisines: ["Italian", "Chinese", "Indian", "French", "Mexican"], // Example cuisines
      diets: ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"], // Example diets
      intolerances: ["Dairy", "Egg", "Gluten", "Peanut", "Shellfish"], // Example intolerances
      searchPerformed: false, // Indicates whether a search has been performed
    };
  },
  created() {
    // Fetch last search value when component is created
    this.lastSearch = localStorage.getItem("lastSearch") || "";
  },
  computed: {
    limitedSortedSearchResults() {
      return this.sortedSearchResults.slice(0, this.maxResultsToShow);
    },
    selectedFilters() {
      // Computed property to gather selected filters
      let filters = [];
      filters = filters.concat(
        this.selectedCuisines,
        this.selectedDiets,
        this.selectedIntolerances
      );
      return filters;
    },
    sortedSearchResults() {
      // Computed property to return searchResults sorted based on sortBy criteria
      if (this.sortBy === "popularity") {
        return this.searchResults
          .slice()
          .sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      } else if (this.sortBy === "preparationTime") {
        return this.searchResults
          .slice()
          .sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      } else {
        // Default case (should not happen)
        return this.searchResults;
      }
    },
  },
  methods: {
    updateResultsList(){
        this.$refs.results.updateResults(this.searchQuery,this.selectedCuisines,this.selectedDiets,this.intolerances,this.maxResultsToShow);
    },
    handleSearch() {
    // Set searchPerformed to true when the search is initiated
    this.searchPerformed = true;

    // Check if the search query is empty and there are no selected filters
    if (!this.searchQuery.trim()) {
      // If both search query and filters are empty, clear the search results and return early
      this.searchResults = [];
      return;
    }

    // Perform search functionality here using this.searchQuery and filters
    console.log("Search query:", this.searchQuery);
    console.log("Selected Cuisines:", this.selectedCuisines);
    console.log("Selected Diets:", this.selectedDiets);
    console.log("Selected Intolerances:", this.selectedIntolerances);

    // Store the last search query in localStorage
    localStorage.setItem("lastSearch", this.searchQuery);

    // Update lastSearch to reflect the current search query
    this.lastSearch = this.searchQuery;

    this.$refs.results.updateResults(this.searchQuery,this.selectedCuisines,this.selectedDiets,this.selectedIntolerances,this.maxResultsToShow);
  },
    suggestLastSearch() {
      // Suggest the last search value as the user types
      if (this.$root.store.username) {
        this.lastSearch = localStorage.getItem("lastSearch") || "";
      } else {
        this.lastSearch = "";
      }
    },
    copySuggestion() {
      // Copy the last search suggestion to the input field
      this.searchQuery = this.lastSearch;

      // Focus the input field after copying the suggestion
      this.$refs.searchInput.focus();
    },
    scrollToTop() {
      // Scroll to the top of the search results container
      const resultsContainer = this.$el.querySelector(".search-results-container");
      if (resultsContainer) {
        resultsContainer.scrollTop = 0;
      }
    },
    toggleFilters() {
      // Toggle the visibility of the filters
      this.showFilters = !this.showFilters;
    },
    toggleCuisine(cuisine) {
      // Toggle selected state for cuisine
      if (this.selectedCuisines.includes(cuisine)) {
        this.selectedCuisines = this.selectedCuisines.filter((c) => c !== cuisine);
      } else {
        this.selectedCuisines.push(cuisine);
      }
    },
    toggleDiet(diet) {
      // Toggle selected state for diet
      if (this.selectedDiets.includes(diet)) {
        this.selectedDiets = this.selectedDiets.filter((d) => d !== diet);
      } else {
        this.selectedDiets.push(diet);
      }
    },
    toggleIntolerance(intolerance) {
      // Toggle selected state for intolerance
      if (this.selectedIntolerances.includes(intolerance)) {
        this.selectedIntolerances = this.selectedIntolerances.filter(
          (i) => i !== intolerance
        );
      } else {
        this.selectedIntolerances.push(intolerance);
      }
    },
    handleSort() {
      // Method to handle sorting change
      // Refresh search results to apply new sorting
      // For example, fetch new data based on current search query and filters
      // Since this is mock data, we just log the sorting change
      console.log("Sorting by:", this.sortBy);
      // In a real application, you would typically update `this.searchResults` based on the sort criteria.
    },
  },
};
</script>

<style scoped>
.btn {
  display: block;
  color: white;
  background-color: #154ad0;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  font-size: clamp(10px, 3vw, 15px);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ensures the container fills the viewport height */
  padding: 20px; /* Add padding for better spacing */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.search-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  display: flex;
  margin-bottom: 10px; /* Space between input and button */
}

.search-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.form-control {
  flex: 1;
}

.btn-primary {
  margin-left: 10px; /* Space between input and button */
}

.max-results-container {
  display: flex;
  align-items: center;
  /* margin-bottom: 20px; */
}

.max-results-container label {
  margin-right: 10px;
}

.filters {
  display: flex; /* Display filters in a row */
  justify-content: flex-end; /* Align filters to the right */
  width: 100%;
  margin-left: 200px;
  max-width: 800px; /* Maximum width for the filters container */
  margin-bottom: 20px;
}

.filter-column {
  flex: 1; /* Each column takes equal space */
  padding: 10px; /* Add padding inside each column */
}

.filter {
  margin-bottom: 10px;
}

.filter label {
  display: block; /* Ensure labels are block elements for proper spacing */
  margin-bottom: 5px;
}

.filter-button {
  margin-top: 7px;
  background-color: #e8eefd;
  border: 1px solid #103aa2;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  color: #0c2974;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.filter-button.selected {
  background-color: #007bff;
  color: #e8eefd;
  border-color: #007bff;
  font-weight: bold; 
  border-width: 2px;
}

.filter-button:hover {
  font-weight: bold;
  background-color: #8ba9f3;
}

.btnSearch:hover {
  font-weight: bold;
  background-color: #8ba9f3;
}

.result-info {
  margin-bottom: 20px; /* Add more space below the suggestion */
  text-align: center; /* Center the text */
}

.search-results-container {
  width: 100%; /* Full width */
  max-width: 1000px; /* Maximum width for the search results container */
  display: flex;
  flex-direction: column; /* Stack title and results vertically */
  align-items: center; /* Center horizontally */
}

.search-results-title {
  width: 100%; /* Full width for title */
  text-align: center; /* Center align title */
  margin-bottom: 10px; /* Space between title and results */
}

.search-results {
  width: 100%; /* Full width for results */
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 500px; /* Set a fixed max height */
  overflow-y: auto;
  margin-top: 5px;
}

.no-results-message {
  text-align: center; /* Center the text */
  margin: 20px 0; /* Add some margin for spacing */
}

.recipe-preview-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.recipe-preview {
  width: 35%; /* Adjust width and margin for better spacing */
  margin: 20px; /* Adjust margin as needed */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.recipe-preview:hover {
  transform: translateY(-5px);
}

.suggestion-link {
  text-decoration: underline; /* Underline the text */
  cursor: pointer; /* Change cursor to indicate it's clickable */
  color: blue; /* Optionally change the color of the underlined text */
}

.suggestion-link:hover {
  /* Optional: Remove underline on hover */
  text-decoration: none;
  /* Optional: Change color on hover */
  color: darkblue;
}

.sort-by-container {
  display: flex;
  align-items: center;
  margin-left: 10px; /* Add space between search button and sort dropdown */
}

.sort-by-label {
  margin-right: 10px;
}

.sort-by-select {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.sort-by-select:hover {
  border-color: #007bff;
}
</style>
