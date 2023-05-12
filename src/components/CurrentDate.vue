<template>
    <div>
      <p>{{ currentDate }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentDate: new Date().toLocaleDateString()
      };
    },
    mounted() {
      setInterval(() => {
        this.currentDate = new Date().toLocaleDateString();
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
  }
  </style>