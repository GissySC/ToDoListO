import { defineStore } from "pinia";
import supabase from '../supabase/index';

export default defineStore('userStore', {
    state: () => ({
        user: undefined,
    }),

    actions: {
        async fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            
            this.user = user;
            if (!user) throw new Error('User not exists');
            console.log(user)
            
        },
        async signUp(email, password) {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            if (user) this.user = user;
        },
        async signIn(email, password) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error;
            this.user = data;
        },
        async signOut() {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
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