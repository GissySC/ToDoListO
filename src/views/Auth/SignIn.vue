<template>
    <h1>Vista SignIn</h1>
    <button @click="handleSignIn">SignIn</button>
    <RouterLink to="/auth/sign-up">SignUp</RouterLink>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
    name: 'SignIn',
    computed: {
        ...mapState(userStore, ['user']),
    },
    methods: {
        ...mapActions(userStore, ['signIn']),
        handleSignIn() {
            const userData = {
                email: 'gisselasobenes@gmail.com',
                password: 'lerelere',
            };
            this.signIn(userData.email, userData.password);
        },
    },
};
</script>