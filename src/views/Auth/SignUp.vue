<template>
    <h1> Sign Up</h1>
    <form @submit.prevent="handleSignUp">
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" v-validate="'required|email'">
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password"  v-validate="'required|min:6|regex:/(?=.*\d)(?=.*[A-Z])/i'">
        </div>
        <div>
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword"  v-validate="'required|min:6|regex:/(?=.*\d)(?=.*[A-Z])/i'">
        </div>
        <button type="submit">Sign Up</button>
    </form>
    <router-link to="/auth/sign-in">Sign In</router-link>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
    name: 'SignUp',
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
        }
    },
    computed: {
        ...mapState(userStore, ['user']),
    },
    methods: {
        ...mapActions(userStore, ['signUp']),
        handleSignUp() {
            if (this.password !== this.confirmPassword)  {
                return;
            }

            const userData = {
                email: this.email,
                password: this.password,
            };
            this.signUp(userData);
        },
    },
};
</script>