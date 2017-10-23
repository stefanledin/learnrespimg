import Game from './game';

class Level_1 extends Game {
    
    checkMarkup() {
        const img = this.render.contentDocument.querySelector('img');
        if (img) {
            const src = img.getAttribute('src');
            if (src && src === 'large.jpg') return true;
        }
        return false;
    }

}

export default Level_1;