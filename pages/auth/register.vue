<template>
  <div>
    <div class="text-singup mb-8">
      <h2 class="">
        Join us for free
      </h2>
    </div>
    <div class="form-signup-dig">
      <div class="w-full max-w-xs">
        <form
          class="max-w-md mb-4 form-input"
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
              name="name"
              class="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="name">
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
              name="email"
              class="shadow appearance-none border border rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="email">
          </div>
          <div class="mb-6">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="password">
              Password
            </label>
            <input
              v-validate="'required|min:3'"
              id="password"
              name="password"
              class="shadow appearance-none border border rounded w-full h-12 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************">
          </div>
          <div>
            <button
              class="bg-teal hover:bg-teal-dark text-white font-bold w-full h-12 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        email: '',
        password: ''
      }
    }
  },
  methods: {
    doRegister() {
      this.$axios
        .$post('/auth/register', this.form)
        .then(() => {
          this.$router.push('/auth/login')
        })
        .catch(err => {
          this.$setValidationErrors(err)
        })
    }
  }
}
</script>
