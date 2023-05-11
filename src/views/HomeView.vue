<script>
import TaskStore from '@/stores/tasks.js';
import UserStore from '@/stores/user.js';
import { mapActions, mapState } from 'pinia';
 
export default {
  name: "HomeView",
  data() {
    return {
      newTaskTitle: '',
      taskTitleToUpdate: '',
      taskIdToEdit: '',
      isEditing: false,
    }
  },
  computed: {
    ...mapState(TaskStore, ['tasksList']),
    ...mapState(UserStore, ['user'])
  },
  methods: {
    ...mapActions(TaskStore, ['_addNewTask', '_editTitle', '_completeTask', '_deleteTask', '_fetchAllTasks']),
    async addNewTitle() {
      if (this.newTaskTitle.trim()) {
        if (this.user) {
          await this._addNewTask({ 
            title: this.newTaskTitle.trim(), 
            userId: this.user.id 
          });
          this.newTaskTitle = '';
        } else {
          console.error('User not authenticated');
        }
      }
    },
    _handleEditTask(taskId, taskTitle) {
      this.taskTitleToUpdate = taskTitle;
      this.taskIdToEdit = taskId;
      this.isEditing = true;
    },
    async _handleUpdateTask() {
      await this._editTitle({ title: this.taskTitleToUpdate, id: this.taskIdToEdit });

      this.taskTitleToUpdate = '';
      this.taskIdToEdit = '';
      this.isEditing = false;
    },
  },
  async created() {
    await this._fetchAllTasks();
  }
}
</script> 

<template>
  <div>

    <RouterLink to="/auth/sign-in">Sign Out</RouterLink>

    <main>
      <h1>My list</h1>
      <div>
        <form class="newTask" @submit.prevent="addNewTitle">
          <input type="text" v-model="newTaskTitle" placeholder="New Task" required>
          <button type="submit">Add task</button>
        </form>

        <ul class="tasksList">
          <li v-for="task in tasksList" :key="task.id">
            <div>
              <input type="checkbox" v-model="task.is_complete" @click="_completeTask(task.is_complete, task.id)" v-if="!isEditing">
              <span :class="{ completed: task.is_complete }" v-if="!isEditing">{{ task.title }}</span>
              <input type="text" v-model="taskTitleToUpdate" v-if="isEditing" />
              <button type="button" @click="_handleUpdateTask" v-if="isEditing">Update task</button>
            </div>
            <div v-if="!isEditing">
              <button @click="_handleEditTask(task.id, task.title)">Edit</button>
              <button @click="_deleteTask(task.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </main>

  </div>
</template>
