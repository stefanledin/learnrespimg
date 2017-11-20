import '../scss/app.scss';

import Vue from 'vue/dist/vue.esm';
//import level from './components/level.vue';

new Vue({
    el: '.page',
    /*data: {
        markup: '',
        correctAnswer: false,
        wrongAnswer: false
    },*/
    data: function() {
        let data = window.levelData;
        data = Object.assign({}, {
            correctAnswer: false,
            wrongAnswer: false
        }, data);
        return data;
    },
    methods: {
        checkMarkup() {},
        tryAgain() {}
    },
    components: {}
});
