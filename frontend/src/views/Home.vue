<template>
  <div id="Home" class="page">
    <Nav  :updateLocation="updateLocation" />
    <RadioSelector />
    <Radio />
  </div>
</template>

<script>
// @ is an alias to /src
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
      location: {
        lat: 0,
        lng: 0,
      },
    };
  },
  mounted() {
    this.updateLocation();
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
