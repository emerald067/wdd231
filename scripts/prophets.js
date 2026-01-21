const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets); // temporary testing of data response
    displayProphets(data.prophets);
}

function displayProphets(prophets) {
    prophets.forEach(prophet => {

        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let potrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        potrait.setAttribute('src', prophet.imageurl);
        potrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day President`);
        potrait.setAttribute('loading', 'lazy');
        potrait.setAttribute('width', '340');
        potrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(potrait);
        cards.appendChild(card);

        cards.appendChild(card);
    });
}
getProphetData();