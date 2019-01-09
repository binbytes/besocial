import Vue from 'vue'
import VeeValidate from 'vee-validate'

const ErrorHandler = {
  install(vue) {
    vue.prototype.$setValidationErrors = errorResponse => {
      // only allow this function to be run if the validator exists

      if (!this.hasOwnProperty('$validator')) {
        return
      }

      // clear errors
      this.$validator.errors.clear()

      // check if errors exist
      if (!errorResponse.hasOwnProperty('errors')) {
        return
      }

      let errorFields = Object.keys(errorResponse.errors)

      // insert laravel errors
      for (let i = 0; i < errorFields.length; i++) {
        let field = errorFields[i]

        let errorString = errorResponse.errors[field].join(', ')
        this.$validator.errors.add({ field: field, msg: errorString })
      }
    }
  }
}

Vue.use(VeeValidate)
Vue.use(ErrorHandler)
