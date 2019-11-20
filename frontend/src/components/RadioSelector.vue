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
      <router-link
        :to="'/home/'+radio._id"
        tag="div"
        v-for="radio in filteredRadios"
        :key="radio._id"
        class="radio"
      >
        {{ radio.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioSelector',
  props: {
    radios: Array,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    filteredRadios() {
      return this.radios.filter(radio => radio.lat !== 0 && radio.lng !== 0 && radio.streamUrl !== '');
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
        width: 35px;
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
    max-height: calc(65vh - 1rem);
    background: $midBlue;
    border-radius: 20px;
    overflow: scroll;
  }
}
</style>
