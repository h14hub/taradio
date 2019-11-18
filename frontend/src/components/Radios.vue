<template>
  <div id="Radios">
    <RadioSelector/>
  </div>
</template>

<script>
import RadioSelector from '@/components/RadioSelector.vue';

export default {
  name: 'Radios',
  components: { RadioSelector },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/styles.scss';

#Radios{
  height: 60vh;
  background: yellow;
}
</style>
