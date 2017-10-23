class Game {
    
    constructor() {
        this.editor = document.querySelector('input.level__editor');
        this.button = document.querySelector('button.level__compile');
        this.render = document.querySelector('iframe#render');
        this.correct = document.querySelector('.level__solution--correct');
        this.wrong = document.querySelector('.level__solution--wrong');
        this.bindEvents();
    }

    bindEvents() {
        this.button.addEventListener('click', this.answerQuestion.bind(this));
    }

    answerQuestion(event) {
        event.preventDefault();
        this.addMarkup();
        if (this.checkMarkup()) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

    addMarkup() {
        this.render.contentDocument.documentElement.innerHTML = this.editor.value;
    }

    correctAnswer() {
        this.correct.classList.remove('hidden');
    }

    wrongAnswer() {
        this.wrong.classList.remove('hidden');
        this.wrong.querySelector('button').addEventListener('click', this.resetLevel.bind(this));
    }

    resetLevel(event) {
        event.preventDefault();
        this.wrong.classList.add('hidden');
        this.editor.value = this.editor.getAttribute('data-start-value');
        this.render.contentDocument.innerHTML = '';
    }

}

export default Game;