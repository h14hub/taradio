<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>
import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';
import axios from 'axios';
import 'vue-form-generator/dist/vfg.css';

Vue.use(VueFormGenerator);

export default {
  data() {
    return {
      model: {
        name: '',
        frequency: 0,
        city: '',
        streetNumber: 0,
        streetName: '',
        zipCode: 0,
        lng: 0,
        lat: 0,
        radioType: '',
        diffusionType: '',
        slogan: '',
        created_at: '',
        updated_at: '',
        streamUrl: '',
        logoUrl: '',
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
            inputType: 'number',
            label: 'FRÉQUENCE',
            model: 'frequency',
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
            inputType: 'number',
            label: 'NUMÉRO DE LA RUE',
            model: 'streetNumber',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'NOM DE LA RUE',
            model: 'streetName',
            required: true,
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'CODE POSTAL',
            model: 'zipCode',
            required: true,
          },
          // {
          //   type: 'input',
          //   inputType: 'text',
          //   label: 'COORDONNÉE LONGITUDE',
          //   model: 'lng',
          // },
          // {
          //   type: 'input',
          //   inputType: 'text',
          //   label: 'COORDONNÉE LATTITUDE',
          //   model: 'lat',
          // },
          {
            type: 'input',
            inputType: 'text',
            label: 'TYPE DE RADIO',
            model: 'radioType',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'TYPE DE DIFFUSION',
            model: 'diffusionType',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'SLOGAN',
            model: 'slogan',
            required: true,
          },
          // {
          //   type: 'input',
          //   inputType: 'text',
          //   label: 'DATE DE CRÉATION',
          //   model: 'created_at',
          // },
          // {
          //   type: 'input',
          //   inputType: 'text',
          //   label: 'DATE DE MISE A JOUR',
          //   model: 'updated_at',
          // },
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
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },
  methods: {
    createRadio() {
      axios.post('localhost:3000/radios', this.data.model);
    },
  },
};
</script>
