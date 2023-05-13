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