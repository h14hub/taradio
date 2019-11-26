<template>
  <div id="Radio">
    <div class="radio_wrapper">
      <div :class=" radio.logoUrl? 'radio_img no_background' : 'radio_img'">
        <img :src="radio.logoUrl" alt="">
      </div>
      <div class="radio_container first">
        <img src="../assets/ear.svg" alt="">
        <div class="text_wrapper">
          <p>
            <strong>{{radio.frequency || '104.4' }}</strong>
          </p>
          <p>{{ radio.slogan || 'la radio la plus fun :)' }}</p>
        </div>
      </div>
      <div class="radio_container second">
        <img src="../assets/radio2.png" alt="">
        <div class="text_wrapper">
          <p>
            <i>{{`${now.getHours()}:${now.getMinutes()}`}}</i>
          </p>
        </div>
        <img  v-show="muted" @click="mute()" src="../assets/mute.svg" alt="">
        <img  v-show="!muted" @click="mute()" src="../assets/volume.svg" alt="">
        <img  v-show="!playing" @click="play()" src="../assets/play-button.svg" alt="">
        <img  v-show="playing" @click="play()" src="../assets/video-pause-button.svg" alt="">
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
      id: '',
      playing: false,
      muted: false,
      now: new Date(),
    };
  },
  created() {
    setInterval(() => { this.now = new Date(); }, 1000);
  },
  mounted() {
    this.$watch('radio.streamUrl', () => {
      this.$refs.player.load();
    });
  },
  updated() {
    if (this.$route.params.id !== this.id) {
      this.id = this.$route.params.id;
      this.play();
    }
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
.hidden{
  display: none;
}
#Radio{
  height: calc(75vh - calc(1rem + 2rem));
  .radio_wrapper{
    padding-top: 2rem;
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
      background: $deepBlue;
      background-image: url('../assets/Fond-Placeholder.gif');
      background-size: cover;
      background-position: center;
      min-height: calc(60% - 4rem);
      height: calc(60% - 4rem);
      display: flex;
      justify-content: center;
      align-items: center;
      &.no_background{
        background-image: unset;
      }
      img{
        width: 35%;
        height: 35%;
        border-radius: 20px;
      }
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
        display: flex;
        flex-direction: column;
        align-items: self-start;
        i{
          position: relative;
          top: 4px;
        }
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
