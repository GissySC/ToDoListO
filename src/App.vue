<script>
import { mapActions, mapState } from 'pinia';
import TaskStore from '@/stores/tasks';
import UserStore from '@/stores/user';


export default {
  name: "App",
  computed: {
    ...mapState(UserStore, ['user']),
  },
  methods: {
    ...mapActions(TaskStore, ['_fetchAllTasks']),
    ...mapActions(UserStore, ['fetchUser']),
    _checkUserExists() {
      console.log(this.user)
      if (this.user) {
        this.$router.push({ path: '/' });
      } else {
        this.$router.push({ path: '/auth/sign-in'});
      }
    }
  },
  async created() {
    try {
      await this.fetchUser();
      this._checkUserExists()
    } catch (e) {
      console.error(e);
      this._checkUserExists()
    }
  },
  watch: {
    user() {
      this._checkUserExists()
    },
  },
}
</script>

<template>
  <div class="bg-container">
    <RouterView />
    <font-awesome-icon icon="fa-solid fa-user-secret" />
  </div>
</template>

<style>

html, body {
  height: 100vh;
}

.bg-container {
  background-color: #fff;
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(60deg, #7fffd4, yellow, lightgreen, #e24bce);
  background-size: 600% 600%;
  animation: bgAnimatedGradient 10s infinite linear;
}

@keyframes bgAnimatedGradient{
  0% {
    background-position: 0 85%;
  }
  50% {
    background-position: 100% 20%;
  }
  100% {
    background-position: 0 85%;
  }

}
</style>
