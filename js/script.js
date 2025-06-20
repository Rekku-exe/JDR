const allies = [];
const enemies = [];

function addAlly() {
    const ally = new Player('ally');
    allies.push(ally);
    const ul_allies = document.querySelector('div.entity_ally ul');
    ul_allies.insertBefore(ally.toDom(), ul_allies.childNodes[ul_allies.childElementCount]);
}

function removeAlly(index) {
    allies.splice(index);
}

function addEnemy() {
    const enemy = new Player('enemy');
    enemies.push(enemy);
    const ul_enemies = document.querySelector('div.entity_enemy ul');
    ul_enemies.insertBefore(enemy.toDom(), ul_enemies.childNodes[ul_enemies.childElementCount]);
}

function removeEnemy(index) {
    enemies.splice(index);
}

function editAlly(index, data) {
    allies[index].name = data.name;
    allies[index].hp = data.hp;
    allies[index].hpMax = data.hpMax;
    allies[index].armor = data.armor;
    allies[index].armorMax = data.armorMax;
    allies[index].mana = data.mana;
    allies[index].manaMax = data.manaMax;
    allies[index].color = data.color;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rollResolver(string) {
    const elements = string.split(' ');
    let calc = '';
    let details = '';
    elements.forEach(element => {
        if (element.includes('d')) {
            const diceParts = element.split('d');
            details += `[${element}](`;
            if (diceParts[0] == '') diceParts[0] = 1;
            for (let i = 0; i<diceParts[0]; i++) {
                const r = randInt(1, diceParts[1]);
                calc += r + '+';
                details += r + ' ';
            }
            details = details.slice(0, details.length-1);
            calc = calc.slice(0, calc.length-1);
            details += ') ';
        } else {
            details += element + ' ';
            calc += element;
        }
    });
    return details + '= ' + eval(calc.replace(/[^-()\d/*+.]/g, ''));
}

function roll(string) {
    const res = rollResolver(string);
    console.log(res);
}

function rollForm() {
    const dices = Array.from(document.querySelectorAll('div.utilities_multiple_dice input')).map(element => 'd' + element.value);
    roll(dices.join(' + '))
}

function addDice() {
    const dice = document.createElement('input');
    dice.classList = ['dice'];
    dice.type = 'number';
    dice.value = '4';
    const dices = document.querySelector('div.utilities_multiple_dice');
    dices.insertBefore(dice, dices.childNodes[dices.childElementCount]);
}