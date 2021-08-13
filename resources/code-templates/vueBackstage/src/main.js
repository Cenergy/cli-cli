import Vue from 'vue';
import Vuesax from 'vuesax';
import { VueHammer } from 'vue2-hammer';
import App from './App';

// Vuesax Component Framework
import 'material-icons/iconfont/material-icons.css'; // Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax

// Filters
import './filters/filters';

// Theme Configurations
import '../themeConfig';

// Globally Registered Components
import './components/globalComponents';

// Styles: SCSS
import './assets/scss/main.scss';

// Tailwind
import './assets/css/main.css';

// Vue Router
import router from './router';

// Vuex Store
import store from './store/store';

Vue.use(Vuesax);
Vue.use(VueHammer);

// Feather font icon
require('./assets/css/iconfont.css');

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
