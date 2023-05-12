<template>
    <div>
      <p>{{ currentTime }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: ''
      };
    },
    methods: {
      updateTime() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        this.currentTime = `${hours}:${minutes}:${seconds}`;
      }
    },
    mounted() {
      this.updateTime();
      setInterval(() => {
        this.updateTime();
      }, 1000);
    }
  };
  </script>
  
  <style scoped>
  p {
    font-size: 24px;
    font-weight: bold;
    position: fixed;
    right: 20px;
    top: 100px;
  }
  </style>