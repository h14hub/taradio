<template>
  <div id="App">
    <transition name="fade" mode="in-out">
      <router-view :updateUser="updateUser"/>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},
    };
  },
  methods: {
    updateUser(u) {
      this.user = u;
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Chivo:300,400,700,900&display=swap");
@import "./assets/styles.scss";
body {
  margin: 0;
  padding: 0;
}
#App {
  font-family: "Chivo", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: $paleBlue;
  height: calc(100vh - 3rem);
  padding: 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  // display: flex;
  // justify-content: center;
  margin: auto;
  height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}

fieldset {
  border: none;
}
input {
  font-size: 19px;
  font-style: italic;
}
h1 {
  font-size: 25px;
  font-weight: 500;
}
p {
  margin: 0;
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 400;
}
.page {
  max-width: calc(100vw - 3rem);
  max-height: calc(100vh - 3rem);
  overflow: hidden;
}
.page-wrapper{
  max-width: 600px;
  margin: auto;
}

.hide {
  display: none;
}

.slogan {
  font-size: 24px;
}
.field-switch{
  .field-wrap{
    justify-content: center;
    align-items: center;
  }
}
.btn{
  padding: 0.5rem 1.5rem;
  border-radius: 15px;
}
.panel-body{
  max-width: 500px;
  margin: auto;
}
</style>
