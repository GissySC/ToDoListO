
import { defineStore } from 'pinia';
import supabase from '../supabase/index'

export default defineStore('tasks', {
  state() {
    return {
      tasksList: [],
    }
  },
  actions: {
    async _fetchAllTasks() {
      try {
       const {data, error} = await supabase
        .from('tasks')
        .select();

        if (error) {
          console.error(error)
          throw error;
        }

        console.log(data)

        this.tasksList = data; 
      } catch(err) {
        console.error(err);
      }
    },
    async _addNewTask({ title, userId }) {
      const { data, error} = await supabase
      .from('tasks')
      .insert({ title, user_id: userId })
      .select();

      if (error) {
        console.error(error);
        return;
      }

      console.log('New task --->', data)
      this.tasksList.push(...data)
    },
    async addNewTitle() {
      await this._addNewTask({
        title: this.newTaskTitle,
        userId: this.user.id
      })
      this.newTaskTitle = '';
    }
  }
})
