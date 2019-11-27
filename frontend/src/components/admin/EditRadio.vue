<template>
  <div id="Edit">
    <AdminHeader/>
    <div class="admin-content">
      <vue-form-generator
        class="vue-form"
        :schema="schema"
        :model="model"
        :options="formOptions"/>
      <input type="file" id="file-input">
      <p id="status">Please select a file</p>
      <button
        class="btn bttn-pill bttn-md"
        @click="editRadio()"> Mettre a jour la Radio </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';
import axios from 'axios';
import 'vue-form-generator/dist/vfg.css';

import AdminHeader from './Header.vue';

Vue.use(VueFormGenerator);

export default {
  components: { AdminHeader },
  data() {
    return {
      model: {
        name: '',
        federation: '',
        associationName: '',
        siret: '',
        address: '',
        zipCode: '',
        city: '',
        siteUrl: '',
        published: true,
        logoUrl: '',
        streamUrl: '',
        diffusionArea: '',
        presidentFullName: '',
        email: '',
        administrativePhone: '',
        phone: '',
        lat: '',
        lng: '',
        slogan: '',
        frequency: '',
        radioType: '',
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'NOM DE LA RADIO',
            model: 'name',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'SLOGAN',
            model: 'slogan',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'URL DU SITE WEB',
            model: 'siteUrl',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'URL DE STREAM',
            model: 'streamUrl',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'LOGO DE LA RADIO',
            model: 'logoUrl',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'ADRESSE',
            model: 'address',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'CODE POSTAL',
            model: 'zipCode',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'VILLE',
            model: 'city',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'NOM DE L\'ASSOCIATION',
            model: 'associationName',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'FEDERATION',
            model: 'federation',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'FRÉQUENCE',
            model: 'frequency',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'SIRET',
            model: 'siret',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'NOM DU PRESIDENT',
            model: 'presidentFullName',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'EMAIL',
            model: 'email',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'TELEPHONE ADMINISTRATIF',
            model: 'administrativePhone',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'TELEPHONE',
            model: 'phone',
          },
          {
            type: 'select',
            label: 'TYPE DE RADIO',
            values: ['Blues Soul', 'Blues', 'Soul', 'Groove Funk', 'Classique', 'Opéra', 'Piano', 'Communautaire', 'Bouddhisme', 'Campus Collège', 'Chrétien', 'Communautaire', 'Gay', 'Islam', 'Judaisme', 'Dance DJ', 'Dancefloor', 'DJ Mix', 'Top 50', 'Decades', 'Adulte contemporain', 'Disco', 'Oldies', 'Variétés', 'Vintage', 'Electro', 'Drum and bass', 'Electro Hard rave', 'Electro House', 'Electro Techno', 'Electro Trance', 'Electro varié', 'Hardcore', 'Independant', 'Gothique', 'Indie Alternative', 'Underground', 'Info Eco Sport', 'Economie', 'Informations', 'Meteo', 'Police Scanner', 'Sport', 'Jazz', 'Latino', 'Latino bachata', 'Latino Baladas', 'Latino cumbia', 'Latino Merengue', 'Latino Salsa', 'Latino Soca', 'Latino Tango', 'Latino Tropicale', 'Latino varié', 'Latino Zouk', 'Lounge Zen', 'Easy listening', 'Lounge ambient', 'New age', 'Zen Nature Spirituel', 'Pop', 'Reggae', 'Dubstep', 'Reggae Dancehall', 'Reggaeton Ragga', 'Rock', 'Hard rock', 'Metal', 'Rock', 'Rock alternatif', 'RocknRoll Swing', 'Thematic', 'Acoustic guitare', 'Culturel', 'Electro varié', 'Enfants', 'Gospel', 'Humour', 'Jeux Games', 'Live', 'Love', 'Noel Celebration', 'Progressive', 'Talk', 'Tribute', 'Vocal', 'Urban', 'Breakbeat', 'Rap', 'RnB', 'Urban', 'Various', 'Généraliste', 'Variés Various', 'World', 'Africain', 'Americana', 'Asiatique Asian', 'Autres pays World', 'Brésilien Samba', 'Celtique', 'Chanson Française', 'Europe', 'Flamenco', 'Grec Greek', 'Indien', 'Irlandais Irish', 'Italien', 'Manele', 'Mexicain', 'Oriental', 'Polka Tchéque', 'Russe Russian', 'Turc', 'Western', 'ZabavnaNarodna', 'Country', 'Bluegrass', 'Country', 'Country Blues', 'Country Pop', 'Country Rock'],
            model: 'radioType',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'ZONE DIFFUSION',
            model: 'diffusionArea',
          },
          {
            type: 'switch',
            label: 'STATUT PUBLICATION',
            model: 'published',
            multi: true,
            readonly: false,
            featured: false,
            disabled: false,
            default: true,
            textOn: 'Publié',
            textOff: 'Non Publié',
          },
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },
  created() {
    if (!this.$parent.user.name || !this.$parent.user.password) {
      this.$router.replace('/admin');
    }
  },
  mounted() {
    const self = this;

    document.getElementById('file-input').onchange = () => {
      const { files } = document.getElementById('file-input');
      const file = files[0];
      if (file == null) {
        return alert('No file selected.');
      }
      self.getSignedRequest(file);
    };
    /* eslint no-underscore-dangle: 0 */
    /* eslint no-alert: 0 */
    /* eslint consistent-return: 0 */
    axios.get(`https://taradio.herokuapp.com/radios/${this.$route.params.id}`).then((response) => {
      self.model = response.data;
    });
  },
  methods: {
    editRadio() {
      const self = this;
      /* eslint no-underscore-dangle: 0 */
      axios.put(`https://taradio.herokuapp.com/radios/${this.model._id}`, this.model).then(() => {
        self.$router.push('/admin/radios');
      });
    },
    getSignedRequest(file) {
      const self = this;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://taradio.herokuapp.com/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            self.uploadFile(file, response.signedRequest, response.url);
          }
        }
      };
      xhr.send();
    },
    uploadFile(file, signedRequest, url) {
      const self = this;
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            self.model.logoUrl = url;
          }
        }
      };
      xhr.send(file);
    },
  },
};
</script>
<style lang="scss">
#Edit{
  position: relative;
  top: -1.5rem;
  left: -1.5rem;
  width: 100vw;
  min-height: 100vh;
  .btn{
    background: #262f61;
    color: white;
    padding: 1rem 2rem;
  }
}
.vue-form{
  max-width: 500px;
  color: #333333;
  margin: auto;
}
</style>
