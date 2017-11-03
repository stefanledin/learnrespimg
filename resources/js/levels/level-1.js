export default {
    data() {
        return {plask: 'heej heej'};
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