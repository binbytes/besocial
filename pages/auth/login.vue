<template>
  <div>
    <div class="text-singup mb-8">
      <h2 class="">
        Login into your account
      </h2>
    </div>
    <div class="form-signup-dig">
      <div class="w-full max-w-xs">
        <form
          class="max-w-md mb-4"
          @submit.prevent="doLogin">
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="username">
              Username / Email
            </label>
            <input
              v-validate="'required'"
              id="username"
              v-model="form.username"
              :class="['form-input', { 'has-error': errors.has('username') }]"
              name="username"
              type="text"
              placeholder="Username / Email">
            <p
              v-if="errors.has('username')"
              class="form-error-text"
              v-text="errors.first('username')" />
          </div>
          <div class="mb-6">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="password">
              Password
            </label>
            <input
              v-validate="'required|min:6'"
              id="password"
              v-model="form.password"
              :class="['form-input', { 'has-error': errors.has('password') }]"
              name="password"
              type="password"
              placeholder="******************">
            <p
              v-if="errors.has('password')"
              class="form-error-text"
              v-text="errors.first('password')" />
          </div>
          <div>
            <button
              class="btn-primary"
              type="submit">
              Sign In
            </button>

            <div class="mt-4">
              Don't have account? <nuxt-link to="/auth/register">Register here</nuxt-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin() {
      this.$validator.validate().then(result => {
        if (result) {
          this.$auth
            .loginWith('local', {
              data: this.form
            })
            .then(() => {
              this.$router.replace({ path: '/' })
            })
            .catch(err => {
              this.$setValidationErrors(err)
            })
        }
      })
    }
  }
}
</script>
