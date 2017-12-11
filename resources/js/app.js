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
                if (src && src === 'birthday.jpg') {
                    return true;
                }
            }
            return false;
        },
        level2() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            return (img.getAttribute('src') === 'birthday_small.jpg');
        },
        level3() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img.getAttribute('src') === 'birthday_small.jpg') {
                if (img.hasAttribute('srcset')) {
                    return (img.getAttribute('srcset') === 'birthday_large.jpg');
                }
            }
            return false;
        },
        level4() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img.getAttribute('src') === 'birthday_small.jpg') {
                const srcset = img.getAttribute('srcset');
                if (srcset.replace(/\s/g, '') === 'birthday_small.jpg,birthday_large.jpg') {
                    return true;
                }
            } 
            return false;
        },
        level5() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (!img.hasAttribute('srcset')) return false;
            
            const srcset = img.getAttribute('srcset');
            if (srcset.replace(/\s/g, '') === 'birthday_small.jpg375w,birthday_large.jpg1024w') {
                return true; 
            }
            return false;
        },
        level6() {
            if (!this.level5()) return false;
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img.hasAttribute('sizes')) {
                return (img.getAttribute('sizes') === '375px');
            }
            return false;
        },
        level7() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img.hasAttribute('sizes')) {
                const sizes = img.getAttribute('sizes');
                return (sizes.replace(/\s/g, '') === '(min-width:768px)1024px,375px');
            }
            return false;
        },
        level8() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img.hasAttribute('sizes')) {
                const sizes = img.getAttribute('sizes');
                return (sizes.replace(/\s/g, '') === '(max-width:768px)375px,1024px');
            }
            return false;
        },
        level9() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img.hasAttribute('srcset')) {
                const srcset = img.getAttribute('srcset');
                if (srcset.replace(/\s/g, '') !== 'birthday_small.jpg375w,birthday_medium.jpg768w,birthday_large.jpg1024w') {
                    return false;
                }
            }
            if (img.hasAttribute('sizes')) {
                const sizes = img.getAttribute('sizes');
                return (sizes.replace(/\s/g, '') === '(min-width:1024px)1024px,(min-width:667px)768px,375px');
            }
            return false;
        },
        level10() {
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img.hasAttribute('srcset')) {
                const srcset = img.getAttribute('srcset');
                return (srcset.replace(/\s/g, '') === 'balloon.png150w,balloon_2x.png300w');
            }
            return false;
        },
        level11() {
            if (!this.level10()) return false;
            const img = this.$el.querySelector('#render').contentDocument.querySelector('img');
            if (img.hasAttribute('sizes')) {
                return (img.getAttribute('sizes') === '150px');
            }
            return false;
        },
        level12() {
            const render = this.$el.querySelector('#render'); 
            const picture = render.contentDocument.querySelector('picture');
            const source = render.contentDocument.querySelector('source');
            const img = render.contentDocument.querySelector('img');
            if (!img || img.getAttribute('src') !== 'cake.png') return false;
            console.log('img finns');
            if (!picture) return false;
            console.log('picture finns');
            if (!source) return false;
            console.log('source finns');

            if (source.getAttribute('type') === 'image/svg+xml') {
                console.log('type är rätt...')
                if (source.getAttribute('srcset') === 'cake.svg') {
                    return true;
                }
            }
            
            return false;
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
                this.$el.querySelector('#render').contentDocument.documentElement.innerHTML = this.markup;
                this.correctAnswer = this['level'+this.level]();           
                this.wrongAnswer = !this.correctAnswer;
                document.body.classList.add('has-modal');
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
