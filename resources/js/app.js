import '../scss/app.scss';

import Level_1 from './level-1';
import Level_2 from './level-2';

import Vue from 'vue/dist/vue.esm.js';

Vue.component('plask', require('./components/plask.vue'));
/*Vue.component('plask', {
    template: '<h2>Plask</h2>'
});*/

new Vue({
    el: '.page'
});
