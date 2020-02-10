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
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state
            md-label="No users found"
            :md-description="`No radio found for this '${search}'
             query. Try a different search term or create a new user.`">
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Status" md-sort-by="published">
              <img src="../../assets/radio_blk.svg" alt="" style="width:13px;">
              {{ item.published ? 'ON' : 'OFF'  }}
            </md-table-cell>
            <md-table-cell md-label="Name" md-sort-by="name">
              {{ item.name }}
            </md-table-cell>
            <md-table-cell md-label="City" md-sort-by="city">
              {{ item.city }}
            </md-table-cell>
            <md-table-cell md-label="SiteUrl" md-sort-by="siteUrl">
              {{ item.siteUrl }}
            </md-table-cell>
            <md-table-cell md-label="StreamUrl" md-sort-by="streamUrl">
              {{ item.streamUrl }}
            </md-table-cell>
            <md-table-cell md-label="Genre" md-sort-by="genre">
               {{ item.genre ? item.genre : '-'  }}
            </md-table-cell><md-table-cell md-label="Actions" md-sort-by="action">
              <router-link tag="div" :to="`/admin/radios/${item._id}/edit`">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </router-link>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AdminHeader from './Header.vue';

const toLower = text => text.toString().toLowerCase();

const searchByAllField = (items, term) => {
  if (term) {
    // eslint-disable-next-line
    return items.filter(item => (toLower(item.name).includes(toLower(term)) || toLower(item.city).includes(toLower(term)) || toLower(item.siteUrl).includes(toLower(term)) || toLower(item.streamUrl).includes(toLower(term))));
  }
  return items;
};

export default {
  components: { AdminHeader },
  data() {
    return {
      search: null,
      searched: [],
      filter: '',
      radios: [],
      filteredRadios: [],
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
      axios.get(process.env.VUE_APP_API_URI + '/radios').then((response) => {
        self.radios = response.data;
        self.filteredRadios = response.data;
        self.searched = response.data;
      });
    },
    searchOnTable() {
      this.searched = searchByAllField(this.radios, this.search);
    },
    filterRadios() {
      if (this.filter === '') {
        this.filteredRadios = this.radios;
      } else {
        this.filteredRadios = this.radios.filter((r) => {
          // eslint-disable-next-line
          let truthArray = [];
          Object.keys(r).forEach((k) => { truthArray.push(toString(r[k]).includes(this.filter)); });
          return truthArray.some(e => e);
        });
      }
    },
    deleteRadio(id) {
      const self = this;
      axios.delete(process.env.VUE_APP_API_URI + '/radios/' + id).then(() => {
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
