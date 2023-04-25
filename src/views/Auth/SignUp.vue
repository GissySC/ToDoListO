<template>
    <h1> Vista SignUp</h1>
    <button @click="handleSignUp">SignUp</button>
    <router-link to="/auth/sign-in">SignIn</router-link>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
    name: 'SignUp',
    computed: {
        ...mapState(userStore, ['user']),
    },
    methods: {
        ...mapActions(userStore, ['signUp']),
        handleSignUp() {
            const userData = {
                email: 'gisselasobenes@gmail.com',
                password: 'lerelere',
            };
            this.signUp(userData.email, userData.password);
        },
    },
};
</script>