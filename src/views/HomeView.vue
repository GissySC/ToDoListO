<script>
import TaskStore from '@/stores/tasks.js';
import UserStore from '@/stores/user.js';
import { mapActions, mapState } from 'pinia';
 
export default {
  name: "HomeView",
  data() {
    return {
      newTaskTitle: '',
    }
  },
  computed: {
    ...mapState(TaskStore, ['tasksList']),
    ...mapState(UserStore, ['user'])
  },
  methods: {
    ...mapActions(TaskStore, ['_addNewTask'])
  }
}
</script> 

<template>
  <main>
    <h1>Home View</h1>
    <div>
      <p v-for="todo in tasksList" :key="todo.id">{{ todo.title }}</p>
        <button @click="_addNewTask({ title: 'New task', userId: '103ee4ff-5bd4-4d51-bfb6-572ba2f1d6b9'})">Create Task</button>
  </div>
  </main>
</template>
