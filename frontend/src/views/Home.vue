<template>
  <div id="Home" class="page">
    <div class="page-wrapper">
      <Nav :updateLocation="updateLocation" :updateFilters="updateFilters" />
      <RadioSelector :radios="radios" :location="location" :filters="filters"/>
      <Radio :radio="radio"/>
    </div>
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
      API_URI: process.env.VUE_APP_API_URI,
      radios: [],
      location: {
        lat: 0,
        lng: 0,
      },
      filters: {
        distance: 80,
        city: '',
        genre: '',
      },
      genres: ['Blues Soul', 'Blues', 'Soul', 'Groove Funk', 'Classique', 'Opéra', 'Piano', 'Communautaire', 'Bouddhisme', 'Campus Collège', 'Chrétien', 'Communautaire', 'Gay', 'Islam', 'Judaisme', 'Dance DJ', 'Dancefloor', 'DJ Mix', 'Top 50', 'Decades', 'Adulte contemporain', 'Disco', 'Oldies', 'Variétés', 'Vintage', 'Electro', 'Drum and bass', 'Electro Hard rave', 'Electro House', 'Electro Techno', 'Electro Trance', 'Electro varié', 'Hardcore', 'Independant', 'Gothique', 'Indie Alternative', 'Underground', 'Info Eco Sport', 'Economie', 'Informations', 'Meteo', 'Police Scanner', 'Sport', 'Jazz', 'Latino', 'Latino bachata', 'Latino Baladas', 'Latino cumbia', 'Latino Merengue', 'Latino Salsa', 'Latino Soca', 'Latino Tango', 'Latino Tropicale', 'Latino varié', 'Latino Zouk', 'Lounge Zen', 'Easy listening', 'Lounge ambient', 'New age', 'Zen Nature Spirituel', 'Pop', 'Reggae', 'Dubstep', 'Reggae Dancehall', 'Reggaeton Ragga', 'Rock', 'Hard rock', 'Metal', 'Rock', 'Rock alternatif', 'RocknRoll Swing', 'Thematic', 'Acoustic guitare', 'Culturel', 'Electro varié', 'Enfants', 'Gospel', 'Humour', 'Jeux Games', 'Live', 'Love', 'Noel Celebration', 'Progressive', 'Talk', 'Tribute', 'Vocal', 'Urban', 'Breakbeat', 'Rap', 'RnB', 'Urban', 'Various', 'Généraliste', 'Variés Various', 'World', 'Africain', 'Americana', 'Asiatique Asian', 'Autres pays World', 'Brésilien Samba', 'Celtique', 'Chanson Française', 'Europe', 'Flamenco', 'Grec Greek', 'Indien', 'Irlandais Irish', 'Italien', 'Manele', 'Mexicain', 'Oriental', 'Polka Tchéque', 'Russe Russian', 'Turc', 'Western', 'ZabavnaNarodna', 'Country', 'Bluegrass', 'Country', 'Country Blues', 'Country Pop', 'Country Rock'],
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
            /* eslint-disable no-console */
            console.log(position);
            self.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            self.filters = {
              ...self.filters,
              city: '',
              genre: '',
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
      axios.get(process.env.VUE_APP_API_URI + '/radios').then((response) => {
        self.radios = response.data;
      });
    },
  },
};
</script>
