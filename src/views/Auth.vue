<template>
  <div class="auth">
    <form @submit.prevent="signup">
        <h1>Sign up</h1>
        <label for="userName">UserName</label>
        <div><input id="userName" type="text" v-model="userName" required autofocus></div>

        <label for="firstName">FirstName</label>
        <div><input id="firstName" type="text" v-model="firstName" required></div>
            
        <label for="lastName">LastName</label>
        <div><input id="lastName" type="text" v-model="lastName" required></div>
            
        <label for="email">Email</label>
        <div><input id="email" type="email" v-model="email" required></div>
            
        <label for="password">Password</label>
        <div><input id="password" type="password" v-model="password" required></div>
            
        <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
    data () {
        return {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signup: function () {
            let data = {
                userName: this.userName,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('SignupUser', data)
        }
    }
}
</script>