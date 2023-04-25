<script>
import ToDoStores from '../stores/tasks.js';
import { mapActions, mapState } from 'pinia';
 
export default {
  name: "HomeView",
  data() {
    return {
      newTaskTitle: '',
    }
  },
  computed: [
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
    <div>
      <p v-for="todo in tasksList" :key="todo.id">{{ todo.title }}</p>
        <button @click="_addNewTask({ title: 'New task', userId: ''})">Create Task</button>
  </div>
  </main>
</template>
