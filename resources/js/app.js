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
            if (!picture) return false;
            if (!source) return false;

            if (source.getAttribute('type') === 'image/svg+xml') {
                if (source.getAttribute('srcset') === 'cake.svg') {
                    return true;
                }
            }
            
            return false;
        },
        level13() {
            const img = render.contentDocument.querySelector('img');
            if (!img || img.getAttribute('src') !== 'cake.png') return false;
            const picture = render.contentDocument.querySelector('picture');

            if (!picture) return false;
            const source = render.contentDocument.querySelectorAll('source');
            if (source.length !== 2) return false;
            const correctPngSrcset = 'cake.png1x,cake_2x.png2x';
            const correctSvgSrcset = 'cake.svg';
            for (let i = 0; i < source.length; i++) {
                if (source[i].hasAttribute('srcset')) {
                    if (source[i].getAttribute('srcset').replace(/\s/g, '') !== (correctPngSrcset || correctSvgSrcset)) {
                        continue;
                    }
                }
            }

            return true;
        },
        level14() {
            const picture = render.contentDocument.querySelector('picture');
            if (!picture) return false;
            const img = render.contentDocument.querySelector('img');
            if (!img) return false;
            if (img.hasAttribute('src')) {
                if (img.getAttribute('src') !== 'birthday_small.jpg') {
                    return false;
                }
            } else {
                return false;
            }
            const source = render.contentDocument.querySelectorAll('source');
            if (source.length !== 2) return false;
            if (source[0].getAttribute('srcset') !== 'birthday_large.jpg') return false;
            if (source[0].getAttribute('media').replace(/\s/g, '') !== '(min-width:1024px)') return false;
            
            if (source[1].getAttribute('srcset') !== 'birthday_medium.jpg') return false;
            if (source[1].getAttribute('media').replace(/\s/g, '') !== '(min-width:667px)') return false;

            return true;
        },
        level15() {
            const img = render.contentDocument.querySelector('img');
            if (!img) return false;
            if (img.getAttribute('src') !== 'coffee_small.jpg') return false;
            if (!img.hasAttribute('srcset')) return false;
            if (!img.hasAttribute('sizes')) return false;
            if (!img.getAttribute('sizes').replace(/\s/, '') === '(min-width:600px)320px,(min-width:320px)600px,320px') return false;
            if (!img.getAttribute('srcset').replace(/\s/, '') === 'coffee_small.jpg320w,coffee_medium.jpg600w,coffee_small_2x.jpg640w,coffee_medium_2x.jpg1200w') return false;
            return true;
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
