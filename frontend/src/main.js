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

    const evtListener = window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      installPromptEvent = event;
      // Update the install UI to notify the user app can be installed
      document.querySelector('#install-button').disabled = false;
      /* eslint-disable-next-line no-console */
      console.log('beforeinstallprompt');
    });
    document.addEventListener('click', () => {
      // Update the install UI to remove the install button
      // document.querySelector('#install-button').classList.remove('hidden');
      // Show the modal add to home screen dialog
      installPromptEvent.prompt();
      // Wait for the user to respond to the prompt
      installPromptEvent.userChoice.then(() => {
        // Clear the saved prompt since it can't be used again
        installPromptEvent = null;
        evtListener.removeEventListener();
      });
    });
  },
}).$mount('#app');
