import Game from './game';

class Level_2 extends Game {
    
    checkMarkup() {
        const img = this.render.contentDocument.querySelector('img');
        if (img) {
            const src = img.getAttribute('src');
            if (src && src === 'small.jpg') return true;
        }
        return false;
    }

}

export default Level_2;