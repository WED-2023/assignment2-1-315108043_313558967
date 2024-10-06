<template>
  <div class="container">
    <PageTitle>Register</PageTitle>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <!-- Username Field -->
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

      <!-- First Name Field -->
      <custom-input
        id="input-group-firstName"
        label="First Name:"
        :hasError="$v.form.firstName.$error"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>

        <template v-slot:feedback>
          <span v-if="!$v.form.firstName.required">First Name is required</span>
          <span v-else-if="!$v.form.firstName.alpha">First Name should only contain alphabetic characters</span>
        </template>
      </custom-input>

      <!-- Last Name Field -->
      <custom-input
        id="input-group-lastName"
        label="Last Name:"
        :hasError="$v.form.lastName.$error"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>

        <template v-slot:feedback>
          <span v-if="!$v.form.lastName.required">Last Name is required</span>
          <span v-else-if="!$v.form.lastName.alpha">Last Name should only contain alphabetic characters</span>
        </template>
      </custom-input>

      <!-- Email Field -->
      <custom-input
        id="input-group-email"
        label="Email:"
        :hasError="$v.form.email.$error"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>

        <template v-slot:feedback>
          <span v-if="!$v.form.email.required">Email is required</span>
          <span v-else-if="!$v.form.email.email">Email is not valid</span>
        </template>
      </custom-input>

      <!-- Profile Picture URL Field -->
      <custom-input
        id="input-group-profilePic"
        label="Profile Picture URL:"
        :hasError="$v.form.profilePic.$error"
      >
        <b-form-input
          id="profilePic"
          v-model="$v.form.profilePic.$model"
          type="url"
          :state="validateState('profilePic')"
        ></b-form-input>

        <template v-slot:feedback>
          <span v-if="!$v.form.profilePic.required">Profile Picture URL is required</span>
          <span v-else-if="!$v.form.profilePic.url">Profile Picture URL is not valid</span>
        </template>
      </custom-input>

      <!-- Country Field -->
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
      </custom-input>

      <!-- Password Field -->
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

      <!-- Confirm Password Field -->
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

      <!-- Form Buttons -->
      <div class="button-container">
        <b-button type="reset" variant="danger" class="reset-button">Reset</b-button>
        <CustomButton :fullWidth="true" type="submit" variant="primary">Register</CustomButton>
      </div>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Register failed: {{ form.submitError }}
    </b-alert>
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
  email,
  url
} from "vuelidate/lib/validators";
import { mockRegister } from "../services/auth.js";
import { Register } from "../services/auth.js";

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
        email: "",
        profilePic: "",
        country: null,
        password: "",
        confirmedPassword: "",
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
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      email: {
        required,
        email
      },
      profilePic: {
        required,
        url
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
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
  try {
    const userDetails = {
      username: this.form.username,
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      email: this.form.email,
      profilePic: this.form.profilePic,
      password: this.form.password
    };

    // Call the Register function with all user details
    const response = await Register(
      userDetails.username,
      userDetails.password,
      userDetails.firstName,
      userDetails.lastName,
      userDetails.email,
      userDetails.profilePic
    );
    this.$router.push("/Login");
  } catch (err) {
    this.form.submitError = err.response.data.message;
  }
},
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        profilePic: "",
        country: null,
        password: "",
        confirmedPassword: ""
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