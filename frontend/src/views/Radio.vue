<template>
  <div id="Radio" class="page">
    <Nav/>
    <Header/>
    <RadioSubComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue';
import Header from '@/components/Header.vue';
import RadioSubComponent from '@/components/Radio.vue';

export default {
  name: 'Radio',
  components: {
    Nav,
    Header,
    RadioSubComponent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/styles.scss';

#Radio{
  height: 60vh;
  background: palevioletred;
}
</style>
