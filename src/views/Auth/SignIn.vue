<template>
    <h1>Sign In</h1>
    <form @submit.prevent="handleSignIn">
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" v-validate="'required|email'">
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password"  required>
        </div>
        <button type="submit">Sign In</button>
    </form>
    <RouterLink to="/auth/sign-up">Sign Up</RouterLink>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
    name: 'SignIn',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapState(userStore, ['user']),
    },
    methods: {
        ...mapActions(userStore, ['signIn']),
        handleSignIn() {
            const userData = {
                email: this.email,
                password: this.password,
            };
            this.signIn(userData);
        },
    },
};
</script>