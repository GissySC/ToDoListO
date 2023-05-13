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
    font-size: 20px;
    z-index: 2;
    color: aliceblue;
  }

  @media (min-device-width : 320px) and (max-device-width : 480px) {
    p {
        font-size: 15px;
    }
  }
  
  </style>