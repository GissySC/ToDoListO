
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
      const { data, error } = await supabase
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
    async _editTitle({ title, id }) {
      const { error } = await supabase
      .from('tasks')
      .update({ title })
      .eq('id', id)

      if(error) {
        console.error(error);
        return;
      }

      this.tasksList = this.tasksList.map((task) => {
        if (task.id === id) {
          return { ...task, title: title }
        } else {
          return task
        }
      })
    },
    async _completeTask(isComplete, id) {
      const { error } = await supabase
        .from('tasks')
        .update({ is_complete: !isComplete })
        .eq('id', id)
    
      if (error) {
        console.error(error)
        return;
      }
    
      const task = this.tasksList.find((task) => task.id === id)
      if (task) {
        task.is_complete = !isComplete
      }
    },
    async _deleteTask(id) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
    
      if (error) {
        console.error(error)
        return
      }
    
      const index = this.tasksList.findIndex((task) => task.id === id)
      if (index > -1) {
        this.tasksList.splice(index, 1)
      }
    }
  }
})
