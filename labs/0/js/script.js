// Button Class
class Button {
    constructor(label, color) {
        this.label = label;
        this.color = color;
        this.element = document.createElement('button');
        this.element.textContent = this.label;
        this.element.style.backgroundColor = this.color;
        this.element.style.color = 'white';
    }

    hideLabel() {
        this.element.textContent = '';
    }

    showLabel() {
        this.element.textContent = this.label;
    }

    setPosition(x, y) {
        this.element.style.position = 'absolute';
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    enableClick(callback) {
        this.element.addEventListener('click', callback);
    }
}

// Button Manager Class
class ButtonManager {
    constructor(container) {
        this.container = container;
        this.buttons = [];
    }

    clearButtons() {
        this.container.innerHTML = '';
        this.buttons = [];
    }
    hideAllButtonLabels() {
        this.buttons.forEach(button => button.hideLabel());
    }    
    showAllButtonLabels() {
        this.buttons.forEach(button => button.showLabel());
    }    
    createButtons(count) {
        this.clearButtons();
        for (let i = 1; i <= count; i++) {
            const color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
            const button = new Button(i, color);
            this.buttons.push(button);
            this.container.appendChild(button.element);
        }
    }

    moveButtonsRandomly() {
        const buttonWidth = 160;
        const buttonHeight = 80; 
        const extra = 2.5;

        this.buttons.forEach(button => {
            const x = Math.random() * (window.innerWidth - buttonWidth * extra);
            const y = Math.random() * (window.innerHeight - buttonHeight * extra);
            button.setPosition(x, y);
        });
    }

    enableButtonClicks() {
        let currentIndex = 0;
        this.buttons.forEach(button => {
            button.enableClick(() => {
                if (currentIndex === button.label - 1) {
                    button.showLabel();
                    currentIndex++;
                    if (currentIndex === this.buttons.length) {
                        document.getElementById('game-message').textContent = MESSAGES.successExcellentMemory;
                    }
                } else {
                    document.getElementById('game-message').textContent = MESSAGES.errorWrongOrder;
                    this.showAllButtonLabels();
                    currentIndex = 0; 
                }
            });
        });
    }
}

// UI Class: Manages user interface interactions 
class UI {
    constructor() {
        this.labelPrompt = document.getElementById('num-buttons-label')
        this.input = document.getElementById('num-buttons');
        this.errorMessage = document.getElementById('game-message');
        this.container = document.getElementById('buttons-container');
        this.createButton = document.getElementById('create-buttons');
        this.labelPrompt.textContent = MESSAGES.prompt;
        this.createButton.textContent = MESSAGES.start;
    }

    init(buttonManager) {
        this.createButton.addEventListener('click', () => {
            const value = parseInt(this.input.value, 10);
            this.errorMessage.textContent = '';

            if (isNaN(value) || value < 3 || value > 7) {
                this.errorMessage.textContent = MESSAGES.errorInvalidInput;
                return;
            }

            buttonManager.createButtons(value);

            setTimeout(() => {
                for (let i = 0; i < value; i++) {
                    setTimeout(() => {
                        buttonManager.moveButtonsRandomly();
                    }, i * 2000);
                }
            
                setTimeout(() => {
                    buttonManager.hideAllButtonLabels();
                    buttonManager.enableButtonClicks();
                }, value * 2000);
            }, value * 1000);
            
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const buttonManager = new ButtonManager(ui.container);
    ui.init(buttonManager);
});
