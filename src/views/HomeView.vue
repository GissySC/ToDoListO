<script>
import ToDoStores from '../stores/tasks.js';
import { mapActions, mapState } from 'pinia';
 
export default {
  name: "HomeView",
  components: [
    ...mapState(ToDoStores, ['tasksList']) 
  ],
  methods: {
    ...mapActions(ToDoStores, ['_fetchAllTasks'])
  },
  created() {
    console.log('Created HomeView')
    this._fetchAllTasks()
  }
}
</script>

<template>
  <main>
    <h1>Home View</h1>
    <p v-for="todo in tasksList" :key="todo.id">{{ todo.title }}</p>
  </main>
</template>
