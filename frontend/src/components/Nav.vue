<template>
  <div id="Nav">
    <div class="nav-wrapper">
      <div class="nav-logo">
        <img src="../assets/Logo-Tara-Home.png" alt="logo Taradio" />
      </div>
      <div class="nav-buttons">
        <div class="icon">
          <img src="../assets/share.svg" alt="logo Taradio" />
        </div>
        <div class="icon" @click="showFilter=!showFilter">
          <img src="../assets/equalizer.svg" alt="logo Taradio" />
        </div>
        <div class="icon" @click="updateLocation()">
          <img src="../assets/loc.png" alt="logo Taradio" />
        </div>
        <div class="icon" @click="showMenu=!showMenu">
          <img src="../assets/menu.svg" alt="logo Taradio" />
        </div>
      </div>
    </div>
    <div :class=" showMenu? 'menu-wrapper':'menu-wrapper translated'">
      <h3>PRESENTATION</h3>
      <p>
        La CNRA, Soutenir, Développer, Favoriser et Échanger.

        Depuis sa création en 1991, conformément à ses statuts, notre confédération
        regroupe, avec le soutien des fédérations, l’ensemble des radios associatives de
        toutes sensibilités, obédiences, confessions ou courants.
        La CNRA n’impose pas de modèle, les radios éligibles aux aides de l’Etat (FSER -
        Fonds de Soutien à l’Expression Radiophonique) peuvent y adhérer dès lors qu’elles
        respectent un fonctionnement démocratique et non commercial. Seules « ne peuvent
        être membres de la CNRA, les radios ou fédérations qui prônent l’exclusion, la haine
        et le racisme ».

        Avec des dirigeants assumant des responsabilités bénévoles ou salariées dans leurs
        radios, c’est dans la transparence et à l’écoute de la différence que la CNRA a oeuvré
        pour représenter aujourd’hui près de 230 radios représentées au sein de 12 fédérations
        régionales et nationales, implantées dans plus de 80 départements français. C’est
        aussi plus de 25.000 bénévoles et 2.100 emplois salariés.
        La CNRA est aujourd’hui reconnue comme étant un interlocuteur
        incontournable auprès des plus grandes institutions.

        +25 000 Bénévoles
        + 02 100 Emplois
        + 230 Radios
        + 80 Départements
        + 12 Fédérations


        Nos auditeurs :
        Selon la source Médiamétrie en Novembre et Décembre 2018 :

        - Audience cumulée : 2.1% soit 1 165 000 auditeurs (567 stations)
        - Part d'audience : 1,6% - Durée d'écoute moyenne 1H42
        Cette tendance se confirme d’année en année et nous conforte
        dans le paysage audiovisuel français.

        Parmi les fédérations régionales et nationales adhérentes :
        ARRA : Assemblée Régionale des Radios Associatives // Occitanie – Pyrénées Méditerranée
        CRAL : Coordination des Radios associatives de Lorraine
        FRALA : Fédération des Radios Associatives du Limousin en Aquitaine
        FFRC : Fédération Française des Radios Chrétiennes
        FRAMA : Fédération Régionale des Radios Associatives Maine Anjou
        FARA : Fédération Alsacienne des Radios Associatives
        FRADIF : Fédération des Radios Associatives d’Ile de France
        FRANC-CP : Fédération Régionale des Radios Associatives Non Commerciales Charente-Poitou
        HAUTS DE FRANCE : Fédération des Radios Associatives du Nord de la France
        AURA FM : Fédération Régionale des Radios Auvergne Rhône-Alpes
        FRAD’AUV : Fédération des Radios Associatives d’Auvergne
        FRAN : Fédération des Radios Associatives de Normandie

        Contact :

        Vous avez besoin de joindre la Confédération Nationale des Radios Associatives,
        ou vous souhaitez rejoindre le projet Taradio, vous pouvez nous contacter :
        Courrier :
        C/O RADIO ALPA
        MJC Jacques Prévert
        97 Grande Rue, 72 000 LE MANS
        Courriel : president@cnra.fr
    </p>
    </div>
    <div :class=" showFilter? 'filter-wrapper':'filter-wrapper faded'">
      <input type="number" v-model="filters.distance" @change="updateFilters(filters)"/>
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
        distance: 10000,
      },
    };
  },
  mounted() {
    this.filters.distance = 10000;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles.scss";

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
      .icon {
        border-radius: 20px;
        background: $deepBlue;
        margin: 0 0.2rem;
        img {
          width: 22px;
          height: 22px;
          padding: 0.7rem;
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
    top: calc(10vh + 2.5rem);
    width: calc(100vw - 6.5rem);
    height: calc(90vh - 4rem);
    background: $white;
    transition: 2s ease;
    z-index: 5;
    overflow-x: scroll;
    p, h3{
      color: black;
      text-align: left;
    }
  }
  .translated{
    transform: translateX(calc(100vw - 3.5rem));
  }
  .filter-wrapper{
    padding: 2rem;
    width: calc(100vw - 7rem);
    position: fixed;
    top: calc(10vh + 2.5rem);
    left: 1.5rem;
    height: 300px;
    border-radius: 20px;
    transition: 2s ease;
    opacity: 1;
    background: $deepBlue;
    z-index: 3;
  }
  .faded{
    opacity: 0;
    display: none;
    z-index: -4;
  }
}
</style>
