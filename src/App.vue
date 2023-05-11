<script>
import { mapActions, mapState } from 'pinia';
import TaskStore from '@/stores/tasks ';
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
  <nav class="navbar navbar-expand-lg bg-body-tertiary" >
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ToDoList-O</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Sign Out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
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
