import '../scss/app.scss';

import Level_1 from './level-1';
import Level_2 from './level-2';

import Vue from 'vue/dist/vue.esm';
import level from './components/level.vue';

new Vue({
    el: '.page',
    components: {
        level
    }
});
