<script>
import TaskStore from '@/stores/tasks.js';
import UserStore from '@/stores/user.js';
import { mapActions, mapState } from 'pinia';
import CurrentDate from '../components/CurrentDate.vue';
import CurrentTime from '../components/CurrentTime.vue';
 
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
  components: {
    CurrentDate,
    CurrentTime,
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

  <main class="app-container" >
    <div ></div>

    <header class="p-4 mb-3">
      <div class="left-header">
        <h1 class="logo">
          <span class="blue">To</span>
          <span class="yellow">Do</span>
          <span class="pink">List</span>
          <span class="green">-O</span>
        </h1>
        <RouterLink class="sign-out" to="/auth/sign-in">Sign Out</RouterLink>
      </div>
      <div class="timeDate">
        <CurrentDate/>
        <CurrentTime/>
      </div>
    </header>

    <div class="mySpace card">

      <section class="newTaskSection">
        <h2>New task</h2>
              <form class="newTask" @submit.prevent="addNewTitle">
                <input class="form-control col-10" type="text" v-model="newTaskTitle" placeholder="Today i'm going to..." required>
                <button class="add-btn" type="submit"><font-awesome-icon :icon="['fas', 'plus']" /></button>
              </form>
      </section>

      <section class="tasksList">  
          <ul class="">   
            <h2>My list</h2>
            <li v-for="task in tasksList" :key="task.id">
              <div class=line-task>
                <input type="checkbox" v-model="task.is_complete" @click="_completeTask(task.is_complete, task.id)" v-if="!isEditing">
                <span :class="{ completed: task.is_complete }" v-if="!isEditing">{{ task.title }}</span>
                <input class="form-control" type="text" v-model="taskTitleToUpdate" v-if="isEditing" />
                <button class="update-btn" type="button" @click="_handleUpdateTask" v-if="isEditing"><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
              </div>
              <div v-if="!isEditing" class="btns">
                <button class="edit-btn" @click="_handleEditTask(task.id, task.title)"><font-awesome-icon :icon="['fas', 'pen']" /></button>
                <button class="delete-btn" @click="_deleteTask(task.id)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
              </div>
            </li>
          </ul>
      </section> 

    </div>
  </main>
</template>

<style scoped>

@import url('https://fonts.cdnfonts.com/css/coco-gothic');

.line-task {
  display: flex;
}
.newTask {
  display: flex;
  padding: 20px 0 50px;
}

.app-container {
  font-family: 'Coco Gothic', sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mySpace {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

header{
  display: flex;
  justify-content: space-around;
  align-content: center;
  background-color: black;
  border-radius: 10px;
}

.left-header {
  display: flex;
  flex-direction: column;
}

.sign-out {
  text-decoration: none;
  padding-top: 10px;
}
.timeDate {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: sans-serif;
}

.blue {
  background: #7fffd4 50%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.yellow {
  background: yellow 50%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.pink {
  background: #e24bce 50%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.green {
  background: lightgreen 50%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

button {
  padding: 5px;
  border: rgb(162, 160, 160) solid 1px;
  border-radius: 10px;
  margin: 0 5px;
}

.btns {
  margin-left: 20px;;
}
.add-btn {
  background-color: rgb(116, 116, 227);
}
.delete-btn {
  background-color: #e24bce;
}

.edit-btn {
  background-color: aquamarine;
}

.update-btn {
  background-color: yellow;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: rgb(162, 160, 160) solid 1px;  
  position: relative;
  margin-right: 8px;
}

input[type="checkbox"]::before {
  content: '\2714';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #fff;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

input[type="checkbox"]:checked::before {
  opacity: 1;
  color: black;
}

input[type="checkbox"]:checked {
  background-color: lightgreen;
  box-shadow: 0 2px 20px lightgreen;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}

</style>
