<template>
  <div id="Home" class="page">
    <Nav :updateLocation="updateLocation" />
    <RadioSelector :radios="radios"/>
    <Radio />
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
    };
  },
  mounted() {
    this.updateLocation();
    this.getRadios().then(() => {
    });
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
    getRadios() {
      const self = this;
      axios.get('http://localhost:3000/radios').then((response) => {
        self.radios = response.data;
      });
    },
    distance(lat1, lon1, lat2, lon2, unit) {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1)
        * Math.sin(radlat2)
        + Math.cos(radlat1)
        * Math.cos(radlat2)
        * Math.cos(radtheta);

      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') { dist *= 1.609344; }
      if (unit === 'N') { dist *= 0.8684; }
      return ((lat1 === lat2) && (lon1 === lon2)) ? 0 : dist;
    },
  },
};
</script>
