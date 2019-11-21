<template>
  <div id="Home" class="page">
    <Nav :updateLocation="updateLocation" :updateFilters="updateFilters" />
    <RadioSelector :radios="radios" :location="location" :filters="filters"/>
    <Radio :radio="radio"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

import Nav from '@/components/Nav.vue';
import RadioSelector from '@/components/RadioSelector.vue';
import Radio from '@/components/Radio.vue';


export default {
  name: 'Home',
  components: {
    Nav,
    RadioSelector,
    Radio,
  },
  data() {
    return {
      radios: [],
      location: {
        lat: 0,
        lng: 0,
      },
      filters: {
        distance: 1000,
      },
    };
  },
  mounted() {
    this.updateLocation();
    this.getRadios();
  },
  computed: {
    radio() {
      let resp = {};
      if (this.$route.params.id) {
        if (this.radios.filter(r => r._id === this.$route.params.id)[0]) {
          /* eslint no-underscore-dangle: 0 */
          /* eslint prefer-destructuring:0 */
          resp = this.radios.filter(r => r._id === this.$route.params.id)[0];
        }
      }
      return resp;
    },
  },
  methods: {
    updateLocation() {
      const self = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            self.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          },
        );
      }
    },
    updateFilters(data) {
      this.filters = data;
    },
    getRadios() {
      const self = this;
      axios.get('http://localhost:3000/radios').then((response) => {
        self.radios = response.data;
      });
    },
  },
};
</script>
