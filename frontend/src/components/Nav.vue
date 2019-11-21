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
      <p>Le CNRA ........................................
        ...........................................................
        ...........................................................
        ...........................................................
        ...........................................................</p>
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
    p, h3{
      color: black;
      text-align: left;
    }
  }
  .translated{
    transform: translateX(calc(100vw - 3.5rem));
  }
  .filter-wrapper{
    width: calc(100vw - 3rem);
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
