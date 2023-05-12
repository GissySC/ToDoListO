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

 <RouterView />

</template>

<style scoped>


header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
