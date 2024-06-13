<template>
  <div class="container">
    <!-- <PageTitle class="title">Main Page</PageTitle> -->
    
    <PageTitle v-if="$root.store.username">Welcome {{ $root.store.username }}</PageTitle>
    <PageTitle v-else>Welcome Guest</PageTitle>

    <div class="columns">
      <!-- Left Column -->
      <div class="left-column">
        <RecipePreviewList>Explore these recipes</RecipePreviewList>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        
        <component 
          :is="rightColumnComponent" 
          :title="rightColumnTitle"
          :class="{'login-border': rightColumnComponent === 'LoginPage'}"
        />

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

export default {
  components: {
    RecipePreviewList,
    PageTitle,
    LoginPage,
    ReasonsToLogin // Include ReasonsToLogin component in components list
  },
  computed: {
    rightColumnComponent() {
      return this.$root.store.username ? 'RecipePreviewList' : 'LoginPage';
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
</style>
