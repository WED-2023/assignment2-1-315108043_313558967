<template>
  <div class="container">
    <!-- <PageTitle class="title">Main Page</PageTitle> -->
    
    <PageTitle v-if="$root.store.username">Welcome {{ $root.store.username }}</PageTitle>
    <PageTitle v-else>Welcome Guest</PageTitle>

    <div class="columns">
      <!-- Left Column -->
      <div class="left-column">
        <RecipePreviewList 
        ref="randomList"
        :fetch-function="updateRandomList"
        :key="rerenderKey"
        :familyRecipe="false"
        >
        Explore these recipes</RecipePreviewList>
        <button @click="updateRandomList" class="btnRandom">Random New Recipes</button>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        
        <component 
          :is="rightColumnComponent" 
          :title="rightColumnTitle"
          ref="family"
          :fetchFunction="updateFamily" 
          :familyRecipe="true"
          :class="{'login-border': rightColumnComponent === 'LoginPage'}"
        />
        <!-- <RecipePreview v-if="root.store.username" :fetchFunction="mockGet3LastWatchedRecipes"></RecipePreview> -->
        <ReasonsToLogin v-if="!$root.store.username" />
      </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div> -->
  </div>
</div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import PageTitle from "../components/PageTitle.vue";
import LoginPage from "../pages/LoginPage.vue";
import ReasonsToLogin from "../components/ReasonsToLogin.vue";
import RecipePreview from "../components/RecipePreview.vue";

export default {
  components: {
    RecipePreviewList,
    PageTitle,
    LoginPage,
    ReasonsToLogin
  },
  data() {
    return {
      rerenderKey: 0  // Add a reactive property to force re-rendering
    };
  },
  methods:{
    async updateRandomList(){
        this.$refs.randomList.updateRandom()
    },
    
    async updateFamily(){
      this.$refs.family.mockGetFamilyRecipes()
    }


  },
  
  computed: {
    rightColumnComponent() {
      return this.$root.store.username ? 'RecipePreviewList' : 'LoginPage';
    },
    rightColumnFetchFunction() {
      return this.$root.store.username ? this.mockGet3LastWatchedRecipes : null;
    },
    rightColumnFamilyRecipe(){
      return this.$root.store.username ? false : null;
    },
    rightColumnTitle() {
      return this.$root.store.username ? 'Last watched recipes' : '';
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.columns {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.left-column, .right-column {
  flex: 1;
  margin: 20px;
}

.left-column {
  max-width: 50%;
}

.right-column {
  max-width: 50%;
}

.left-column h2, .right-column h2 {
  text-align: center;
}

.login-border {
  border: 1px solid #ccc;
  padding: 20px;
}

.btnRandom{
  width: 100%;
  background-color: #8ba9f3;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.btnRandom:hover{
  font-size: 1.1em;
  font-weight: bold;
  background-color: #8ba9f3;
}
</style>
