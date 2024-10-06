<template>
  <div class="container">
    <PageTitle>Login</PageTitle>
    <b-form @submit.prevent="onLogin">
      <custom-input
        id="Username"
        label="Username:"
        :hasError="$v.form.username.$error"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <template v-slot:feedback>
          Username is required
        </template>
      </custom-input>

      <custom-input
        id="Password"
        label="Password:"
        :hasError="$v.form.password.$error"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <template v-slot:feedback>
          Password is required
        </template>
      </custom-input>

      <CustomButton :fullWidth="true" 
      type="submit"
      variant="primary"> Login </CustomButton>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mockLogin } from "../services/auth.js";
import { Login } from "../services/auth.js";
import CustomInput from "../components/CustomInput.vue";
import PageTitle from "../components/PageTitle.vue";
import CustomButton from "../components/CustomButton.vue";

export default {
  name: "Login",
  components: {
    CustomInput,
    PageTitle,
    CustomButton
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const success = true; // modify this to test the error handling
        // const response = mockLogin(this.form.username, this.form.password, success);
        const response = await Login(this.form.username, this.form.password);
        this.$root.store.login(this.form.username);
        this.$router.push("/").catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      } catch (err) {
        this.form.submitError = err.response ? err.response.data.message : 'Login failed';
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px; 
}
</style>
