<template>
  <div>
    <div class="text-singup mb-8">
      <h2 class="">
        Login into your account
      </h2>
    </div>
    <div class="form-signup-dig">
      <div class="w-full max-w-xs">
        <form class="max-w-md mb-4 form-input">
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="password">
              Email
            </label>
            <input
              id="password"
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
              id="password"
              class="shadow appearance-none border border rounded w-full h-12 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************">
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue hover:bg-blue-dark text-white font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline"
              type="button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    doLogin() {
      //
    }
  }
}
</script>
