const countToDate = new Date().setHours(new Date().getHours() + 480);
let previousTime = -1;

setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = Math.floor((countToDate - currentDate) / 1000);

    if (timeBetweenDates !== previousTime) {
        updateTurnCards(timeBetweenDates);
        previousTime = timeBetweenDates;
    }
}, 250);

function updateTurnCards(time) {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time / 3600) % 24);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = Math.floor(time % 60);

    turnCard('.days', days);
    turnCard('.hours', hours);
    turnCard('.minutes', minutes);
    turnCard('.seconds', seconds);
}

function turnCard(selector, time) {
    time = String(time).padStart(2, '0');
    const turnCard = document.querySelector(`${selector} > .turn-card`);
    const currentValue = turnCard.querySelector('.top').innerText;

    if (time === currentValue) return;

    const topTurn = createTurnElement('top-turn', currentValue);
    const bottomTurn = createTurnElement('bottom-turn', time);

    const topHalf = turnCard.querySelector('.top');
    const bottomHalf = turnCard.querySelector('.bottom');

    topHalf.innerText = '';
    bottomHalf.innerText = '';
    turnCard.appendChild(topTurn);
    turnCard.appendChild(bottomTurn);

    setTimeout(() => {
        topTurn.style.animation = 'turn-top 0.5s ease-in forwards';
        bottomTurn.style.animation = 'turn-bottom 0.5s ease-out 0.5s';
    }, 30);

    setTimeout(() => {
        topHalf.innerText = time;
        topTurn.remove();
    }, 500);

    setTimeout(() => {
        bottomHalf.innerText = time;
        bottomTurn.remove();
    }, 1000);
}

function createTurnElement(className, text) {
    const element = document.createElement('div');
    element.classList.add(className);
    element.innerText = text;
    return element;
}
