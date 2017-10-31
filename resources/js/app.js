import '../scss/app.scss';

import Vue from 'vue/dist/vue.esm';
import level from './components/level.vue';

new Vue({
    el: '.page',
    components: {
        level
    }
});
