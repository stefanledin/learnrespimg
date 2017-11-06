export default {
    data() {
        return {
            level: 1,
            description: 'SmåFot vill ha en stor bild i sidhuvudet från förra årets kalas. Den ska få kompisarna att minnas hur roligt det var då och bli peppade på nytt! SmåFot designar en modern och sajt som ser riktigt bra ut på breda skärmar. (Flera av hans Bigfoot-kompisar är gamers och har ultrabreda skärmar.)',
            todo: 'Add a src attribute',
            assets: ['large.jpg'],
            markup: '<img>',
            starterMarkup: '<img>',
            nextURL: '/level/2'
        };
    },

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