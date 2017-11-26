import '../scss/app.scss';

import Vue from 'vue/dist/vue.esm';

const answers = {
    methods: {
        level0() {
            const input = this.$el.querySelector('#render').contentDocument.querySelector('input');
            if (input.hasAttribute('type')) {
                return (input.getAttribute('type') === 'email');
            }
            return false;
        },
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
        el: '.level',

        mixins: [answers],

        data: function() {
            let data = window.levelData;
            data = Object.assign({}, {
                markup: data.starterMarkup,
                correctAnswer: false,
                wrongAnswer: false
            }, data);
            return data;
        },

        watch: {
            markup: function(value) {
                // Fix för iOS citationstecken
                this.markup = value.replace('”', '"');
            }
       },

        methods: {
            checkMarkup() {
                document.body.classList.add('has-modal');
                this.$el.querySelector('#render').contentDocument.documentElement.innerHTML = this.markup;
                this.correctAnswer = this['level'+this.level]();           
                this.wrongAnswer = !this.correctAnswer;
            },
            tryAgain() {
                document.body.classList.remove('has-modal');
                this.markup = this.starterMarkup;
                this.correctAnswer = false;
                this.wrongAnswer = false;
            }
        }

    });
}
