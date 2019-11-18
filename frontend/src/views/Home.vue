<template>
  <div id="Home" class="page">
    <Nav/>
    <Header/>
    <Radios/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue';
import Header from '@/components/Header.vue';
import Radios from '@/components/Radios.vue';

export default {
  name: 'Home',
  components: {
    Nav,
    Header,
    Radios,
  },
};
</script>
