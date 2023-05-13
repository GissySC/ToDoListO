<template>
    <div class="container">
        <div class="row">
            <div class="col container-form">
                    <h1>Sign In</h1>
                    <form class="row g-3 needs-validation bg-dark text-light" @submit.prevent="handleSignIn" novalidation>
                        <div>
                            <label for="email" class="form-label">Email</label>
                            <input type="email"  class="form-control" id="email" v-model="email" v-validate="'required|email'">
                        </div>
                        <div>
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password"  required>
                        </div>
                        <div class="buttons">
                            <button class="btn btn-1 fw-bold" type="submit">Sign In</button><button type="button" class="btn btn-2"><RouterLink class="sign-up" to="/auth/sign-up">Sign Up</RouterLink></button>
                        </div>
                        
                    </form>                
            </div>
        </div>
    </div>
    
</template>

<style scoped>

h1 {
    margin-bottom: 30px;
}

.buttons {
    display: flex;
}

.btn-1 {
    color: black;
    background-color: aquamarine;
}

.btn-2 {
    background-color: #e24bce;
    margin-left: 10px;
}

.sign-up {
    text-decoration: none;
    color: black;
}

.container-form{
    padding: 40px;
}

form {
    padding: 20px;
    border-radius: 10px;
}
</style>

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