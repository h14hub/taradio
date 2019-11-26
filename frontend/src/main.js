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
    let evtListener = window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      installPromptEvent = event;/* eslint-disable-next-line no-console */
      console.log('beforeinstallprompt');
    });
    document.addEventListener('click', () => {
      // Update the install UI to remove the install button
      // document.querySelector('#install-button').classList.remove('hidden');
      // Show the modal add to home screen dialog
      if (evtListener && installPromptEvent) {
        installPromptEvent.prompt();
        // Wait for the user to respond to the prompt
        installPromptEvent.userChoice.then(() => {
          // Clear the saved prompt since it can't be used again
          installPromptEvent = null;
          evtListener = null;
          window.removeEventListener('beforeinstallprompt');
        });
      }
    });
  },
}).$mount('#app');
