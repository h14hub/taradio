<template>
  <div id="Splash" class="">
    <img src="../assets/Logo-Tara-Load.png" alt="logo Taradio" />
  </div>
</template>

<script>

export default {
  name: 'Splash',
  mounted() {
    setTimeout(() => {
      this.$router.push('/home');
    }, 3000);
  },
};
</script>

<style lang="scss">
#Splash{
  position: relative;
  top:-1.5rem;
  left:-1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-image: url('../assets/Bg-paterne.png');
  background-size: cover;
  img{
    width: 100%;
    max-width: 300px;
  }
}
</style>
