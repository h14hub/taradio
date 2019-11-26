<template>
  <div id="RadioSelector">
    <div class="radioSelector-wrapper" @click="show = !show">
      <div class="downArrow">
        <img src="../assets/down-arrow.svg" alt="" />
      </div>
      <div class="selector-label">
        Hey! Pour écouter, sélectionne Ta Radio !
      </div>
      <div class="downArrow">
        <img src="../assets/down-arrow.svg" alt="" />
      </div>
    </div>
    <div :class="show ? 'radioSelector-hidden' : 'radioSelector-hidden hide'">
      <div
        v-for="radio in filteredRadios"
        :key="radio._id"
        class="radio"
        @click="goToAndHide(radio._id)"
      >
        <img src="../assets/radio2.png" alt="" style="width:13px;">
        {{ radio.name }}
      </div>
    </div>
  </div>
</template>

<script>
const geocoder = require('google-geocoder');

export default {
  name: 'RadioSelector',
  props: {
    radios: Array,
    location: Object,
    filters: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  updated() {
    if (!this.$route.params.id) {
      /* eslint no-underscore-dangle: 0 */
      this.$router.push(`/home/${this.filteredRadios[0]._id}`);
    }
  },
  asyncComputed: {
    /* eslint-disable no-return-await */
    /* eslint-disable consistent-return */
    /* eslint-disable vue/return-in-computed-property */
    /* eslint-disable vue/no-async-in-computed-properties */
    /* eslint-disable no-else-return */
    async filteredRadios() {
      const filtered = this.radios.filter(radio => radio.lat !== 0 && radio.lng !== 0 && radio.streamUrl !== '' && radio.published);
      let filteredWithDist = [];
      let filteredWithDistAndStyle = [];
      if (this.filters.city) {
        const cityLocation = await this.geocode(this.filters.city);
        filteredWithDist = filtered.filter(radio => this.distance(radio.lat, radio.lng, cityLocation.lat, cityLocation.lng, 'KM') <= this.filters.distance);
      } else {
        filteredWithDist = filtered.filter(radio => this.distance(radio.lat, radio.lng, this.location.lat, this.location.lng, 'KM') <= this.filters.distance);
      }
      if (this.filters.style) {
        filteredWithDistAndStyle = filteredWithDist
          .filter(radio => radio.radioStyle === this.filters.style);
        return (filteredWithDistAndStyle.length === 0) ? filtered : filteredWithDistAndStyle;
      } else {
        return (filteredWithDist.length === 0) ? filtered : filteredWithDist;
      }
    },
  },
  methods: {
    geocode(city) {
      const geo = geocoder({
        key: 'AIzaSyDt3JwIm0WkonkGX5svIgI3f20oonUjwds',
      });
      return new Promise((resolve, reject) => {
        geo.find(city, (err, res) => {
          if (res) {
            if (res[0]) {
              if (res[0].location) {
                resolve(res[0].location);
              }
            }
          } else {
            reject();
          }
        });
      });
    },
    goToAndHide(id) {
      this.show = !this.show;
      this.$router.push(`/home/${id}`);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles.scss";

#RadioSelector {
  height: 15vh;
  .radioSelector-wrapper {
    display: flex;
    height: 100%;
    align-items: center;
    border-radius: 20px;
    background: $midBlue;
    .downArrow {
      padding: 0.7rem;
      img {
        width: 22px;
        @media screen and (max-width: 375px) {
          width: 17px;
        }
      }
    }
    .selector-label {
      flex-grow: 1;
      color: white;
      font-size: 24px;
      @media screen and (max-width: 375px) {
        font-size: 17px;
      }
    }
  }
  .radioSelector-hidden {
    position: absolute;
    top: calc(25vh + calc(2rem + 1.5rem));
    width: calc(100% - 3rem);
    max-height: calc(75vh - 6rem);
    background: $midBlue;
    border-radius: 20px;
    overflow: scroll;
    z-index: 1;
    max-width: 600px;
    padding-top: 1rem;
    .radio{
      padding: 0.3rem;
      text-align: left;
      margin-left: 4rem;
      img{
        margin-right: 1rem;
      }
    }
  }
}
</style>
