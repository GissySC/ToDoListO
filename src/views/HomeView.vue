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
    ...mapActions(TaskStore, ['_addNewTask']),
    async addNewTitle() {
      await this._addNewTask({
        title: this.newTaskTitle,
        userId: this.user_id,
      });
      this.newTaskTitle = '';
    },
  },
  watch: {
    tasksList() {
      console.log('taskList updated');
    },
  },
}
</script> 

<template>
  <main>
    <RouterLink to="/auth/sign-in">Sign Out</RouterLink>
    <h1>Home View</h1>
    <div>
      <p v-for="todo in tasksList" :key="todo.id">{{ todo.title }}</p>
      <form @submit.prevent="_addNewTask()">
        <input type="text" v-model="newTaskTitle" placeholder="New Task" v-on:keyup.enter="_addNewTask()" required>
        <button type="submit">Add task</button>
      </form>
    </div>
  </main>
</template>
