<template>
  <div class="panel-body">
    <div v-for="radio in radios" :key="radio._id" class="radio_admin">
      <div>
        {{ radio.name }}
      </div>
      <div class="actions">
        <router-link tag="div" :to="`/admin/radios/${radio._id}/edit`">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </router-link>
        <div @click="deleteRadio(radio._id)">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      radios: [],
    };
  },
  mounted() {
    this.getRadios();
  },
  methods: {
    getRadios() {
      const self = this;
      axios.get('https://taradio.herokuapp.com/radios').then((response) => {
        self.radios = response.data;
      });
    },
    deleteRadio(id) {
      const self = this;
      axios.delete(`https://taradio.herokuapp.com/radios/${id}`).then(() => {
        self.getRadios();
      });
    },
  },
};
</script>

<style lang="scss">
.radio_admin {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .actions{
       display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.3rem;
      div{
        padding: 0.3rem;
      }
    }
}
</style>
