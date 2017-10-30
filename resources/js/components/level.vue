<template lang="pug">
    .level.level--1
        h2 {{ level }}
        .level__description
            | {{ description }}
            h3 Assets
            pre.level__assets
                ul
                    li(v-for="asset in assets") {{ asset }}

            h3 Todo
            .level__tip
                .inner
                    | {{ todo }}

        h2 Code!
        .level__solve
            input.level__editor(type="text" :value="starterMarkup" v-model="code")
            button.level__compile(v-on:click="checkMarkup") Spara

        .level__solution.level__solution--correct.alert.hidden
            .inner
                h2 Bra
                p Du har hjälpt SmåFot att lägga till en stor bild på sin sajt.
                a.button(href="/level/2") Nästa uppgift

        .level__solution.level__solution--wrong.alert.hidden
            .inner
                h2 Fel
                button.js-reset-level Testa igen

        iframe#render.hidden
</template>

<script>
    export default {

        data() {
            return {
                completed: false,
                level: 'Nivå 1',
                description: 'SmåFot vill ha en stor bild i sidhuvudet från förra årets kalas. Den ska få kompisarna att minnas hur roligt det var då och bli peppade på nytt! SmåFot designar en modern och sajt som ser riktigt bra ut på breda skärmar. (Flera av hans Bigfoot-kompisar är gamers och har ultrabreda skärmar.)',
                todo: 'Add a src attribute',
                assets: ['small.jpg', 'large.jpg'],
                starterMarkup: '<img>'
            }
        },

        methods: {
            checkMarkup(event) {

            }
        }

    }
</script>