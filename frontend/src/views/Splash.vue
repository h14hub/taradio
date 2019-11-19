<template>
  <div id="Splash" class="page">
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-position: center;
  background-image: url('../assets/Bg-paterne.png');
  background-size: cover;
  img{
    width: 100%;
    max-width: 300px;
  }
}
</style>
