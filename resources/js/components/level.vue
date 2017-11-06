<template lang="pug">
    .level
        h2 Nivå {{ level }}
        .level__description
            | {{ description }}
            
            h3 Todo
            .level__tip
                .inner
                    | {{ todo }}
            
            h3 Assets
            pre.level__assets
                ul
                    li(v-for="asset in assets") {{ asset }}


        h2 Code!
        .level__solve
            input.level__editor(type="text" v-model="markup")
            button.level__compile(v-on:click="checkMarkup") Spara

        .level__solution.level__solution--correct.alert(v-show="correctAnswer")
            .inner
                h2 Bra
                p Du har hjälpt SmåFot att lägga till en stor bild på sin sajt.
                a.button(href="/level/2") Nästa uppgift

        .level__solution.level__solution--wrong.alert(v-show="wrongAnswer")
            .inner
                h2 Fel
                button(v-on:click="tryAgain") Testa igen

        iframe#render.hidden
</template>

<script>
    import Level from '../levels/level-1';

    export default {

        mixins: [Level],

        props: ['number'],

        mounted() {
            this.render = document.querySelector('#render');
        },

        data() {
            const defaultLevelData = {
                correctAnswer: false,
                wrongAnswer: false
            };
            return defaultLevelData;
        },

        methods: {
            checkMarkup(event) {
                this.render.contentDocument.documentElement.innerHTML = this.markup;
                this.correctAnswer = this.checkIfAnswerIsCorrect();
                this.wrongAnswer = ! this.correctAnswer;
            },

            tryAgain() {
                this.markup = this.starterMarkup;
                this.correctAnswer = false;
                this.wrongAnswer = false;
            }
        }

    }
</script>