<template>
  <div id="Nav">
    <div class="nav-wrapper">
      <div class="nav-logo">
        <img src="../assets/Logo-Tara-Home.png" alt="logo Taradio" />
      </div>
      <div class="nav-buttons">
        <div class="icon bttn-pill bttn-md bttn-primary" @click="share">
          <img src="../assets/share.svg" alt="logo Taradio" />
        </div>
        <div class="icon bttn-pill bttn-md bttn-primary" @click="showFilter=!showFilter">
          <img src="../assets/equalizer.svg" alt="logo Taradio" />
        </div>
        <div class="icon bttn-pill bttn-md bttn-primary" @click="updateLocation()">
          <img src="../assets/loc.svg" alt="logo Taradio" />
        </div>
        <div class="icon bttn-pill bttn-md bttn-primary" @click="showMenu=!showMenu">
          <img src="../assets/menu.svg" alt="logo Taradio" />
        </div>
      </div>
    </div>
    <div :class=" showMenu? 'menu-wrapper':'menu-wrapper translated'">
      <h3>PRESENTATION</h3>
      <div>
        <p>La CNRA, Soutenir, Développer, Favoriser et Échanger.</p>
        <p>
          Depuis sa création en 1991, conformément à ses statuts, notre confédération
          regroupe, avec le soutien des fédérations, l’ensemble des radios associatives de
          toutes sensibilités, obédiences, confessions ou courants.
          La CNRA n’impose pas de modèle, les radios éligibles aux aides de l’Etat (FSER -
          Fonds de Soutien à l’Expression Radiophonique) peuvent y adhérer dès lors qu’elles
          respectent un fonctionnement démocratique et non commercial. Seules « ne peuvent
          être membres de la CNRA, les radios ou fédérations qui prônent l’exclusion, la haine
          et le racisme ».
        </p>
        <p>
          Avec des dirigeants assumant des responsabilités bénévoles ou salariées dans leurs
          radios, c’est dans la transparence et à l’écoute de la différence que la CNRA a oeuvré
          pour représenter aujourd’hui près de 230 radios représentées au sein de 12 fédérations
          régionales et nationales, implantées dans plus de 80 départements français. C’est
          aussi plus de 25.000 bénévoles et 2.100 emplois salariés.
          La CNRA est aujourd’hui reconnue comme étant un interlocuteur
          incontournable auprès des plus grandes institutions.
        </p>
        <p>
          +25 000 Bénévoles<br/>
          + 02 100 Eois<br/>
          + 230 Radios<br/>
          + 80 Drtements<br/>
          + 12 Fédérations<br/>
        </p>
        <p>
          Nos auditeurs :
          Selon la source Médiamétrie en Novembre et Décembre 2018 :

          - Audience cumulée : 2.1% soit 1 165 000 auditeurs (567 stations)
          - Part d'audience : 1,6% - Durée d'écoute moyenne 1H42
          Cette tendance se confirme d’année en année et nous conforte
          dans le paysage audiovisuel français.

          Parmi les fédérations régionales et nationales adhérentes :<br/>
          ARRA : Assemblée Régionale des Radios Associatives //
           Occitanie – Pyrénées Méditerranée<br/>
          CRAL : Coordination des Radios associatives de Lorraine<br/>
          FRALA : Fédération des Radios Associatives du Limousin en Aquitaine<br/>
          FFRC : Fédération Française des Radios Chrétiennes<br/>
          FRAMA : Fédération Régionale des Radios Associatives Maine Anjou<br/>
          FARA : Fédération Alsacienne des Radios Associatives<br/>
          FRADIF : Fédération des Radios Associatives d’Ile de France<br/>
          FRANC-CP : Fédération Régionale des Radios Associatives
           Non Commerciales Charente-Poitou<br/>
          HAUTS DE FRANCE : Fédération des Radios Associatives du Nord de la France<br/>
          AURA FM : Fédération Régionale des Radios Auvergne Rhône-Alpes<br/>
          FRAD’AUV : Fédération des Radios Associatives d’Auvergne<br/>
          FRAN : Fédération des Radios Associatives de Normandie<br/>
        </p>
        <p>
          Contact :<br/>
          Vous avez besoin de joindre la Confédération Nationale des Radios Associatives,<br/>
          ou vous souhaitez rejoindre le projet Taradio, vous pouvez nous contacter :<br/>
          Courrier :<br/>
          C/O RADIO ALPA<br/>
          MJC Jacques Prévert<br/>
          97 Grande Rue, 72 000 LE MANS<br/>
          Courriel : president@cnra.fr<br/>
        </p>
    </div>
    </div>
    <div :class=" showFilter? 'filter-wrapper wrap':'filter-wrapper wrap faded'">
      <label for=""> Distance (Km) </label>
      <div class="slidecontainer">
        <span>0</span>
        <input
          type="range"
          min="1"
          max="100"
          value="80"
          class="slider form-control"
          id="myRange"
          v-model.number="filters.distance"
          @change="updateFilters(filters)"
          v-on:change="showFilter=false"
        >
        <span>{{filters.distance}}</span>
      </div>
      <div class="wrap">
        <label for=""> Ville </label>
        <input
          class="form-control"
          type="text"
          style="width: 100%;"
          v-model="filters.city"
          @keyup="updateFilters(filters)"
          v-on:keyup.enter="showFilter=false"
        >
      </div>
      <div class="wrap">
        <label for=""> Genre Musical </label>
        <select
          class="form-control"
          style="width: 100%;"
          v-model="filters.genre"
          @keyup="updateFilters(filters)"
          v-on:change="showFilter=false"
        >
          <option v-for="(genre, index) in genres" :key="`${genre}${index}`">{{genre}}</option>
        </select>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    updateLocation: {
      type: Function,
    },
    updateFilters: {
      type: Function,
    },
  },
  data() {
    return {
      showMenu: false,
      showFilter: false,
      filters: {
        distance: 80,
        city: '',
        genre: '',
      },
      genres: ['', 'Blues Soul', 'Blues', 'Soul', 'Groove Funk', 'Classique', 'Opéra', 'Piano', 'Communautaire', 'Bouddhisme', 'Campus Collège', 'Chrétien', 'Communautaire', 'Gay', 'Islam', 'Judaisme', 'Dance DJ', 'Dancefloor', 'DJ Mix', 'Top 50', 'Decades', 'Adulte contemporain', 'Disco', 'Oldies', 'Variétés', 'Vintage', 'Electro', 'Drum and bass', 'Electro Hard rave', 'Electro House', 'Electro Techno', 'Electro Trance', 'Electro varié', 'Hardcore', 'Independant', 'Gothique', 'Indie Alternative', 'Underground', 'Info Eco Sport', 'Economie', 'Informations', 'Meteo', 'Police Scanner', 'Sport', 'Jazz', 'Latino', 'Latino bachata', 'Latino Baladas', 'Latino cumbia', 'Latino Merengue', 'Latino Salsa', 'Latino Soca', 'Latino Tango', 'Latino Tropicale', 'Latino varié', 'Latino Zouk', 'Lounge Zen', 'Easy listening', 'Lounge ambient', 'New age', 'Zen Nature Spirituel', 'Pop', 'Reggae', 'Dubstep', 'Reggae Dancehall', 'Reggaeton Ragga', 'Rock', 'Hard rock', 'Metal', 'Rock', 'Rock alternatif', 'RocknRoll Swing', 'Thematic', 'Acoustic guitare', 'Culturel', 'Electro varié', 'Enfants', 'Gospel', 'Humour', 'Jeux Games', 'Live', 'Love', 'Noel Celebration', 'Progressive', 'Talk', 'Tribute', 'Vocal', 'Urban', 'Breakbeat', 'Rap', 'RnB', 'Urban', 'Various', 'Généraliste', 'Variés Various', 'World', 'Africain', 'Americana', 'Asiatique Asian', 'Autres pays World', 'Brésilien Samba', 'Celtique', 'Chanson Française', 'Europe', 'Flamenco', 'Grec Greek', 'Indien', 'Irlandais Irish', 'Italien', 'Manele', 'Mexicain', 'Oriental', 'Polka Tchéque', 'Russe Russian', 'Turc', 'Western', 'ZabavnaNarodna', 'Country', 'Bluegrass', 'Country', 'Country Blues', 'Country Pop', 'Country Rock'],
    };
  },
  mounted() {
    this.filters.distance = 80;
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator.share({
          title: 'Web Fundamentals',
          text: 'Check out Web Fundamentals — it rocks!',
          url: 'https://developers.google.com/web',
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles.scss";
.slidecontainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    width: 25px;
  }
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: $paleBlue;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: $paleBlue;
  cursor: pointer;
}

#Nav {
  height: 10vh;
  display: flex;
  padding-bottom: 1rem;
  .nav-wrapper {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    .nav-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 50px;
        @media screen and (max-width: 375px ){
          height: 40px;
        }
        @media screen and (max-width: 320px ){
          height: 24px;
        }
      }
    }
    .nav-buttons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 110%;
      .icon {
        border-radius: 40px;
        background: $deepBlue;
        margin: 0 0.2rem;
        padding: 0.7rem;
        display: flex;
        img {
          width: 22px;
          height: 22px;
          @media screen and (max-width: 375px ){
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
  .menu-wrapper{
    padding: 0 1.5rem;
    position: fixed;
    border-radius:20px 0 0 20px;
    right: 0;
    top: calc(10vh + 1.5rem);
    width: calc(100vw - 6.5rem);
    height: calc(90vh - 3rem);
    background: $white;
    transition: 2s ease;
    z-index: 5;
    overflow-x: hidden;
    overflow-y: scroll;
    h3{
      padding: 2rem 0 0 0;
    }
    p, h3{
      color: #333333;
      text-align: left;
      margin-bottom: 1rem;
    }
  }
  .translated{
    transform: translateX(calc(100vw - 3.5rem));
  }
  .filter-wrapper{
    left: 50%;
    padding: 2rem;
    width: calc(100% - 3rem);
    position: fixed;
    top: calc(10vh + 1.5rem);
    border-radius: 20px;
    transition: 2s ease;
    opacity: 1;
    background: $deepBlue;
    z-index: 3;
    max-width: calc(600px);
    transform: translate(-50%, 0);
    .wrap{
      padding: 1rem 0;
      width: 100%;
      select{
        width: 100%;
      }
    }
  }
  .faded{
    opacity: 0;
    display: none;
    z-index: -4;
  }
}
</style>
