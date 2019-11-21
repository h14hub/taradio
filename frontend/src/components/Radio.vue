<template>
  <div id="Radio">
    <div class="radio_wrapper">
      <div class="radio_img">

      </div>
      <div class="radio_container first">
        <img src="../assets/ear.svg" alt="">
        <div class="text_wrapper">
          <p>
            <strong>{{radio.frequency }}</strong>
          </p>
          <p>{{ radio.slogan }}</p>
        </div>
      </div>
      <div class="radio_container second">
        <img src="../assets/speaker.svg" alt="">
        <div class="text_wrapper">
          <p>
            <i>{{ }}</i>
          </p>
        </div>
        <img @click="mute()" src="../assets/speaker.svg" alt="">
        <img @click="play()" src="../assets/play-button.svg" alt="">
      </div>
    </div>
    <audio id="audio" ref="player" controls autoplay hidden>
        <source v-bind:src="radio.streamUrl">
        Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>

export default {
  name: 'Radio',
  props: {
    radio: Object,
  },
  data() {
    return {
      playing: false,
      muted: false,
    };
  },
  mounted() {
    this.$watch('radio.streamUrl', () => {
      this.$refs.player.load();
    });
  },
  updated() {
    this.play();
  },
  methods: {
    play() {
      this.playing = !this.playing;
      if (this.playing) {
        this.$refs.player.play();
      } else {
        this.$refs.player.pause();
      }
    },
    mute() {
      this.muted = !this.muted;
      if (this.muted) {
        this.$refs.player.muted = true;
      } else {
        this.$refs.player.muted = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/styles.scss';

#Radio{
  height: calc(75vh - calc(1rem + 3rem));
  .radio_wrapper{
    padding-top: 3rem;
    height: calc(100% - 3rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
      width: 100%;
      border-radius: 20px;
    }
    .radio_img{
      background: $midBlue;
      min-height: calc(60% - 4rem);
      height: calc(60% - 4rem);
    }
    .radio_container{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
      background: $midBlue;
      min-height: 20%;
      height: 20%;
      img{
        width: 30px;
        margin: 0.6rem;
        @media screen and (max-width: 375px ){
          width: 17px;
        }
      }
      .text_wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &.first{
        .text_wrapper{
          flex-grow: 1;
        }
      }
      &.second{
        .text_wrapper{
          flex-grow: 1;
        }
      }
    }
  }
}
</style>
