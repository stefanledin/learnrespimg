<template lang="pug">
    .level.level--1
        h2 {{ level }}
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
    import Game from './_game';

    export default {

        mixins: [Game],

        methods: {

            checkIfAnswerIsCorrect() {
                const img = this.render.contentDocument.querySelector('img');
                if (img) {
                    const src = img.getAttribute('src');
                    if (src && src === 'large.jpg') {
                        return true;
                    }
                }
                return false;
            }

        }

    }
</script>