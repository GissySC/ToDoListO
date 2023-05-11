import { defineStore } from "pinia";
import supabase from '../supabase/index';

export default defineStore('userStore', {
    state: () => ({
        authenticated: false,
        user: null,
    }),

    actions: {
        async fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            
            console.log(user)
            this.user = user;
            if (!user) throw new Error('User not exists');
        },
        async signUp( { email, password }) {
            const { data: { user }, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            if (user) this.user = user;
        },
        async signIn({ email, password }) {
            const { data: { user }, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error;

            this.authenticated = true;
            this.user = user;
        },
        async signOut() {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            this.authenticated = false;
            this.user = null;
        },
    },

    persist: {
        enabled: true,
        strategies: [
            {

            }
        ]
    }
})