import '../scss/app.scss';

import Vue from 'vue/dist/vue.esm';
//import level from './components/level.vue';

const answers = {
    methods: {
        level1() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img) {
                const src = img.getAttribute('src');
                if (src && src === 'large.jpg') {
                    return true;
                }
            }
            return false;
        },
        level2() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            return (img.getAttribute('src') === 'small.jpg');
        }
    }
};

if (window.levelData) {
    const app = new Vue({
        el: '.page',
        mixins: [answers],
        /*data: {
            markup: '',
            correctAnswer: false,
            wrongAnswer: false
        },*/
        data: function() {
            let data = window.levelData;
            data = Object.assign({}, {
                markup: data.starterMarkup,
                correctAnswer: false,
                wrongAnswer: false
            }, data);
            return data;
        },
        methods: {
            checkMarkup() {
                this.$el.querySelector('#render').contentDocument.documentElement.innerHTML = this.markup;
                this.correctAnswer = this['level'+this.level]();           
                this.wrongAnswer = !this.correctAnswer;
            },
            tryAgain() {
                this.markup = this.starterMarkup;
                this.correctAnswer = false;
                this.wrongAnswer = false;
            }
        },
        components: {}
    });
}
