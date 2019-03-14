<template>
  <div>
    <div class="text-singup mb-8">
      <h2 class="">
        Join us for free
      </h2>
    </div>
    <div class="form-signup">
      <div class="w-full max-w-xs">
        <form
          class="max-w-md mb-4"
          @submit.prevent="doRegister">
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="name">
              Name
            </label>
            <input
              v-validate="'required|min:2'"
              id="name"
              v-model="form.name"
              :class="['form-input', { 'has-error': errors.has('name') }]"
              name="name"
              type="text"
              placeholder="name">
            <p
              v-if="errors.has('name')"
              class="form-error-text"
              v-text="errors.first('name')" />
          </div>
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="username">
              Username
            </label>
            <input
              v-validate="'required|min:2'"
              id="username"
              v-model="form.username"
              :class="['form-input', { 'has-error': errors.has('username') }]"
              name="username"
              type="text"
              placeholder="username">
            <p
              v-if="errors.has('username')"
              class="form-error-text"
              v-text="errors.first('username')" />
          </div>
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="email">
              Email
            </label>
            <input
              v-validate="'required|email'"
              id="email"
              v-model="form.email"
              :class="['form-input', { 'has-error': errors.has('email') }]"
              name="email"
              type="email"
              placeholder="email">
            <p
              v-if="errors.has('email')"
              class="form-error-text"
              v-text="errors.first('email')" />
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
              Register
            </button>

            <div class="mt-4">
              Already have account? <nuxt-link to="/auth/login">Login here</nuxt-link>
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
        name: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    doRegister() {
      this.$validator.validate().then(result => {
        if (result) {
          this.$axios
            .$post('/auth/register', this.form)
            .then(res => {
              if (res) {
                this.$auth
                  .loginWith('local', {
                    data: this.form
                  })
                  .then(() => {
                    this.$router.replace({ path: '/' })
                  })
              }
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
