export default {

    mounted() {
        this.render = document.querySelector('#render');
    },

    data() {
        return {
            correctAnswer: false,
            wrongAnswer: false,
            level: 'Nivå 1',
            description: 'SmåFot vill ha en stor bild i sidhuvudet från förra årets kalas. Den ska få kompisarna att minnas hur roligt det var då och bli peppade på nytt! SmåFot designar en modern och sajt som ser riktigt bra ut på breda skärmar. (Flera av hans Bigfoot-kompisar är gamers och har ultrabreda skärmar.)',
            todo: 'Add a src attribute',
            assets: ['small.jpg', 'large.jpg'],
            markup: '<img>',
            starterMarkup: '<img>'
        }
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