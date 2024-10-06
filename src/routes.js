
const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("./pages/MainPage"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/favoriteRecipes",
    name: "favoriteRecipes",
    component: () => import("./pages/FavoriteRecipesPage"),
  },
  {
    path: "/myRecipes",
    name: "myRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/familyRecipes",
    name: "familyRecipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/createRecipe",
    name: "createRecipe",
    component: () => import("./pages/CreateRecipePage"),
  }, 
  {
    path: "*",
    name: "notFound",
    component: () => import("./pages/NotFoundPage"),
  },
];

export default routes;
