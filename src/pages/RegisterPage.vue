<template>
  <div class="container">
    <PageTitle>Register</PageTitle>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <custom-input
        id="input-group-username"
        label="Username:"
        :hasError="$v.form.username.$error"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>

        <template v-slot:feedback>
            <span v-if="!$v.form.username.required">Username is required</span>
            <span v-else-if="!$v.form.username.length">Username length should be between 3-8 characters long</span>
            <span v-else-if="!$v.form.username.alpha">Username alpha</span>
        </template>
      </custom-input>

      <custom-input
        id="input-group-country"
        label="Country:"
        :hasError="$v.form.country.$error"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>

        <template v-slot:feedback>
          Country is required
        </template>
        <!-- <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback> -->
      </custom-input>

      <custom-input
        id="input-group-Password"
        label="Password:"
        :hasError="$v.form.password.$error"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>

        <template v-slot:feedback>
            <span v-if="!$v.form.password.required">Password is required</span>
            <span v-else-if="$v.form.password.$error" text-variant="info">
              Your password should be <strong>strong</strong>. <br />
              For that, your password should be also:
            </span>
            <span v-if="$v.form.password.required && !$v.form.password.length">
              Have length between 5-10 characters long
            </span>
        </template>
      </custom-input>

      <custom-input
        id="input-group-confirmedPassword"
        label="Confirm Password:"
        :hasError="$v.form.confirmedPassword.$error"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>

        <template v-slot:feedback>
          <span v-if="!$v.form.confirmedPassword.required">Password confirmation is required</span>
          <span v-else-if="!$v.form.confirmedPassword.sameAsPassword">
            The confirmed password is not equal to the original password
          </span>
        </template>
      </custom-input>
      <div class="button-container">
      <b-button type="reset" variant="danger" class="reset-button">Reset</b-button>
      <CustomButton :fullWidth="true" 
      type="submit"
      variant="primary"> Register</CustomButton>
      </div>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from "../assets/countries";
import CustomInput from "../components/CustomInput.vue";
import PageTitle from "../components/PageTitle.vue";
import CustomButton from "../components/CustomButton.vue";

import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
import { mockRegister } from "../services/auth.js";
export default {
  name: "Register",
  components: {
    CustomInput,
    PageTitle,
    CustomButton
  },
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {

        // const response = await this.axios.post(
        //   // "https://test-for-3-2.herokuapp.com/user/Register",
        //   this.$root.store.server_domain + "/Register",

        //   {
        //     username: this.form.username,
        //     password: this.form.password
        //   }
        // );

        const userDetails = {
          username: this.form.username,
          password: this.form.password
        };

        const response = mockRegister(userDetails);

        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}

.button-container {
  display: flex;
  justify-content: space-between; 
  align-items: flex-end;
}

.reset-button {
  margin-right: 10px;
  color: white;
  font-weight: bold;
}
</style>
