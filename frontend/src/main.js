import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(AsyncComputed);

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    let installPromptEvent;
    function installPromptFunct(event) {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      installPromptEvent = event;
      /* eslint-disable no-console */
      console.log('beforeinstallprompt');
    }
    function clickFunction() {
      // Update the install UI to remove the install button
      // document.querySelector('#install-button').classList.remove('hidden');
      // Show the modal add to home screen dialog
      if (installPromptEvent) {
        installPromptEvent.prompt();
        // Wait for the user to respond to the prompt
        installPromptEvent.userChoice.then(() => {
          // Clear the saved prompt since it can't be used again
          console.log('clicked');
          installPromptEvent = null;
          window.removeEventListener('beforeinstallprompt', installPromptFunct);
          document.removeEventListener('click', clickFunction);
        });
      }
    }
    window.addEventListener('beforeinstallprompt', installPromptFunct);

    document.addEventListener('click', clickFunction);
  },
}).$mount('#app');
