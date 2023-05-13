<template>
    <div class="container">
        <div class="row">
            <div class="col container-form">
                <h1> Sign Up</h1>
                <form class="row g-3 needs-validation bg-dark text-light" @submit.prevent="handleSignUp">
                    <div>
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" v-model="email" v-validate="'required|email'">
                    </div>
                    <div>
                        <label for="password" class="form-label">Password:</label>
                        <input type="password" class="form-control" id="password" v-model="password"  v-validate="'required|min:6|regex:/(?=.*\d)(?=.*[A-Z])/i'">
                    </div>
                    <div>
                        <label for="confirmPassword" class="form-label">Confirm Password:</label>
                        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"  v-validate="'required|min:6|regex:/(?=.*\d)(?=.*[A-Z])/i'">
                    </div>
                    <div class="buttons">
                        <button class="btn btn-1 fw-bold" type="submit">Sign Up</button><button class="btn btn-2"><router-link class="sign-in" to="/auth/sign-in">Sign In</router-link></button>
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

.sign-in {
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