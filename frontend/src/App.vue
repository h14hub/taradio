<template>
  <div id="App">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Chivo:300,400,700,900&display=swap');
@import './assets/styles.scss';

body{
  margin: 0;
  padding: 0;
}
#App {
  font-family: 'Chivo', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textGrey;
}

input{
  font-size: 19px;
  font-style: italic;
}
h1{
  font-size: 25px;
  font-weight: 500;
}
p{
  font-size: 24px;
}

.btn{
  border-radius: 20px;
}
.slogan{
  font-size: 24px;
}
</style>
