
const model = {
    keyClicked: false,
    timer: 30,
    timerId: null,

    startGame: function() {
        this.keyClicked = false;
        this.timer = 30;
        document.getElementById('timeLimit').innerText = this.timer;
        this.timerId = setInterval(() => {
            if (this.timer > 0) {
                this.timer--;
                document.getElementById('timeLimit').innerText = this.timer;
            } else {
                clearInterval(this.timerId);
                alert("Game Over! Try Again.");
            }
        }, 1000);
    },

    stopGame: function() {
        clearInterval(this.timerId);
        this.timerId = null;
    },

    keyClickedHandler: function() {
        this.keyClicked = true;
    }
};


const view = {
    updateKeyState: function(keyClicked) {
        if (keyClicked) {
            document.querySelector('.room2Text').innerText = "Du fant nøkkelen!";
            model.stopGame();
        }
    },

    updateTimer: function(timeLeft) {
        document.getElementById('timeLimit').innerText = timeLeft;
    }
};


const controller = {
    init: function() {
        document.getElementById('Key').addEventListener('click', () => {
            if (!model.keyClicked) {
                model.keyClickedHandler();
                view.updateKeyState(model.keyClicked);
            }
        });

        model.startGame();
    }
};


window.onload = () => {
    controller.init();
};
