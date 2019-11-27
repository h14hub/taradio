<template>
  <div id="List">
    <AdminHeader/>
    <div class="" style="max-width:unset;">
      <div class="admin-content">
        <h2>Liste des radios membres
          <router-link tag="div"
            to="/admin/radios/create"
            class="btn btn-add btn bttn-pill bttn-md">
            Ajouter une nouvelle radio
          </router-link>
        </h2>
        <div class="row row-header" style="display:flex;width:100%;align-items: center;">
          <div class="col-md-1">Status</div>
          <div class="col-md-2">Nom de la radio</div>
          <div class="col-md-2">Ville</div>
          <div class="col-md-2">URL du site</div>
          <div class="col-md-2">URL du stream</div>
          <div class="col-md-2">Genre</div>
          <div class="col-md-1"></div>
        </div>
        <router-link
          tag="div"
          v-for="radio in radios"
          :key="radio._id"
          class="radio_admin container"
          :to="`/admin/radios/${radio._id}/edit`">
          <div class="row" style="display:flex;width:100%;align-items: center;">
            <div class="col-md-1 published">
              <img src="../../assets/radio_blk.svg" alt="" style="width:13px;">
              <div>
                {{ radio.published ? 'ON' : 'OFF'  }}
              </div>
            </div>
            <div class="col-md-2">{{ radio.name  }}</div>
            <div class="col-md-2">{{ radio.city  }}</div>
            <div class="col-md-2">{{ radio.siteUrl  }}</div>
            <div class="col-md-2">{{ radio.streamUrl  }}</div>
            <div class="col-md-2">{{ radio.genre  }}</div>
            <div class="col-md-1 actions">
              <router-link tag="div" :to="`/admin/radios/${radio._id}/edit`">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </router-link>
              <!-- <div @click="deleteRadio(radio._id)">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </div> -->
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import AdminHeader from './Header.vue';

export default {
  components: { AdminHeader },
  data() {
    return {
      radios: [],
    };
  },
  created() {
    if (!this.$parent.user.name || !this.$parent.user.password) {
      this.$router.replace('/admin');
    }
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
@import '../../assets/styles.scss';
.admin-content{
  margin: 1rem;
  padding: 2rem;
  border-radius: 20px;
  background: white;
  position: relative;
  top: -5vh;
}
#List{
  position: relative;
  top: -1.5rem;
  left: -1.5rem;
  width: 100vw;
  min-height: 100vh;
  background: #EEEEEE;
  color: $paleBlue;
  .admin-content{
    h2{
      text-align: left;
      margin-bottom: 1.5rem;
      color: $midBlue;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .btn-add{
      background: $midBlue;
      color: white;
      padding: 1.4rem;
    }
    .row-header{
      color: #BBBBBB;
    }
    .radio_admin {
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 20px;
      min-height: 90px;
      &:nth-child(2n){
        background: #DDDDDD;
      }
      .row{
        div{
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .published{
          display: flex;
          justify-content: space-evenly;
        }
      }
      .actions{
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 0.3rem;
        div{
          padding: 0.3rem;
        }
      }
    }
  }
}
</style>
