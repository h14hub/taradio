<template>
<div id="Auth">
  <div class="wrapper">
    <div class="logo">
      <img src="../../assets/Logo-Tara-Home.png" alt="logo Taradio" />
    </div>
    <div class="panel-body">
      <form :action="signIn()">
        <div>
          <input
          class="form-control"
          type="text" placeholder="Nom d'utilisateur" v-model="user.name">
        </div>
        <div>
          <input
          class="form-control"
          type="password" placeholder="Mot de passe" v-model="user.password">
        </div>
        <div @click="signIn()" class='btn'>Se Connecter</div>
      </form>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      if (this.user.name === 'taradio' && this.user.password === 'strongPassword') {
        this.$attrs.updateUser(this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.$router.replace('/admin/radios');
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../assets/styles.scss';

#Auth{
  position: relative;
  top: -1.5rem;
  left: -1.5rem;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: $deepBlue;
  .logo{
    margin-bottom: 1.5rem;
  }
  .panel-body{
    border-radius: 20px;
    padding: 2rem;
    background: white;
    input{
      margin: 0.5rem 0;
      // height: 30px;  
      border-radius: 3px;
      border-style: solid;
      border-width: 1px;
      padding: 0.3rem;
    }
    .btn{
      padding: 0.9rem 1.5rem;
      margin-top: 0.5rem;
      background: $deepBlue;
      color: white;
    }
  }
}
</style>
