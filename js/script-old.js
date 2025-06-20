let theConsole = document.getElementById("console");
function consoleLog(string) {
    theConsole.innerHTML += string + "<br>";
    theConsole.scrollTop = theConsole.scrollHeight;
}
function consoleClear() {
    theConsole.innerHTML = '';
}

const validPainter = ['air', 'wall'];

let cursor = 'move';
let painter = 'air';
let mover = '';
let view = 'mj';

let typer = document.getElementById("typer");
typer.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let string = typer.value.split(' ');
        string[0] = string[0].toLowerCase();
        switch (string[0]) {
            case 'lt':
                genLand();
                summon('Rekkou', 'pers', 'red', 4, 4);
                break;
            case 'help':
                let help = document.createElement('a');
                help.href = './help.txt';
                help.download = 'help.txt';
                help.click();
                break;
            case 'save':
                let save = document.createElement('a');
                save.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById('land').innerHTML);
                if (string.length < 2) {
                    save.download = "mySave.xml";
                } else {
                    save.download = string[1] + '.xml';
                }
                save.click();
                break;
            case 'clear':
            case 'clr':
                consoleClear();
                break;
            case 'genland':
            case 'gl':
                if (string.length >= 3) {
                    genLand(parseInt(string[1]), parseInt(string[2]));
                } else {
                    genLand();
                }
                break;
            case 'cursor':
            case 'c':
                cursor = string[1];
                consoleLog('cursor on "' + cursor + '"');
                break;
            case 'paint':
            case 'p':
                if (cursor != 'paint') {
                    cursor = 'paint';
                    consoleLog('cursor on "' + cursor + '"');
                }
                if (validPainter.includes(string[1])) {
                    painter = string[1];
                    consoleLog('painter on "' + painter + '"');
                }
                break;
            case 'summon':
            case 'sum':
                switch (string.length) {
                    case 1:
                        summon('Rekkou', 'pers', 'red');
                        break;
                    case 2:
                        summon(string[1]);
                        break;
                    case 3:
                        summon(string[1], string[2]);
                        break;
                    case 4:
                    case 5:
                        summon(string[1], string[2], string[3]);
                        break;
                    default:
                        summon(string[1], string[2], string[3], string[4], string[5], string[6]);
                }
                break;
            case 'kill':
                if (string.length == 2) {
                    document.getElementById('c-' + string[1]).remove();
                    actuVision();
                    consoleLog('"' + string[1] + '" was kill');
                }
                break
            case 'changeaff':
                changeAff(string[1], string[2]);
                break;
            case 'changerange':
                document.getElementById('c-' + string[1]).setAttribute('visionrange', string[2]);
                actuVision();
                break;
            case 'changeview':
            case 'cv':
                view = string[1];
                consoleLog('view on "' + view + '"');
                actuVision();
                break;
            default:
                if (typer.value.includes('D') || typer.value.includes('d')) {
                    roll(typer.value.replace('D', 'd'));
                } else {
                    consoleLog('for help, type "help"')
                }
        }
        typer.value = '';
    }
});

function roll(string) {
    let listRoll = string.replace(' ', '').split('/');
    for (let roll of listRoll) {
        roll = roll.split('d');
        listRes = [];
        for (let i = 0; i < parseInt(roll[0]); i++) {
            listRes.push(Math.floor(Math.random() * parseInt(roll[1])) + 1);
        }
        res = "";
        tot = 0;
        for (let i in listRes) {
            if (i != 0) res += " + ";
            res += listRes[i];
            tot += listRes[i];
        }
        consoleLog(res + " = " + tot);
    }
}

function loadFile(file) {
    let fr = new FileReader();
    fr.onload = () => document.getElementById('land').innerHTML = fr.result;
    fr.readAsText(document.getElementById('loader').files[0]);
}

function genLand(x = 10, y = 10) {
    document.getElementById('land').innerHTML = '';
    for (let i = 0; i < y; i++) {
        let ligne = document.createElement('div');
        ligne.id = "l-" + i;
        ligne.className = 'ligne';
        for (let j = 0; j < x; j++) {
            let outterPos = document.createElement('div');
            outterPos.className = 'outterPos';
            let pos = document.createElement('div');
            pos.id = 'p-' + i + '-' + j;
            pos.className = 'pos air';
            pos.setAttribute('onclick', 'clickPos(' + i + ',' + j + ')');
            outterPos.appendChild(pos);
            ligne.appendChild(outterPos);
        }
        document.getElementById('land').appendChild(ligne);
    }
    consoleLog('land generated with size ' + x + ' / ' + y);
}

function clickPos(x, y) {
    switch (cursor) {
        case 'paint':
            paint(x, y);
            break;
        case 'move':
            move(x, y);
            break;
    }
}

function paint(x, y) {
    document.getElementById('p-' + x + '-' + y).className = 'pos ' + painter;
}

function summon(name, type = "monster", color = "white", x = 0, y = 0) {
    if (document.getElementById('p-' + x + '-' + y).children.length > 0) {
        consoleLog('"' + document.getElementById('p-' + x + '-' + y).children[0].id.split('c-')[1] + '" already at ' + x + '-' + y);
        return;
    }
    let cara = document.createElement('div');
    cara.id = 'c-' + name;
    cara.className = 'cara ' + type;
    cara.innerHTML = '<p class="innerCara">' + name.split('')[0] + '</p>';
    cara.setAttribute('positionx', x);
    cara.setAttribute('positiony', y);
    cara.style.backgroundColor = color;
    if (type == 'pers') {
        cara.setAttribute('visionrange', 3);
    }
    document.getElementById('p-' + x + '-' + y).appendChild(cara);
    consoleLog('create ' + type + ' "' + name + '" at ' + x + '-' + y);
    actuVision();
}

function move(x, y) {
    let pos = document.getElementById('p-' + x + '-' + y);
    if (pos.children.length != 0) {
        mover = pos.children[0].id.split('c-')[1];
        consoleLog('mover on "' + mover + '"');
    } else if (mover != '') {
        if (document.getElementById('p-' + x + '-' + y).className.includes('wall')) return;
        let cara = document.getElementById('c-' + mover);
        pos.appendChild(cara);
        cara.setAttribute('positionx', x);
        cara.setAttribute('positiony', y);
    }
    actuVision();
}

function changeAff(name, aff) {
    document.getElementById('c-' + name).children[0].innerHTML = aff;
}

function actuVision() {
    if (view == 'mj') {
        for (i of document.getElementsByClassName('pos')) {
            i.style.opacity = '100%';
        }
    } else {
        for (i of document.getElementsByClassName('pos')) {
            i.style.opacity = '0%';
        }
        updatePosColors()
        /*listPers = document.getElementsByClassName('pers');
        for (i of listPers) {
            seeHere(i.getAttribute('positionx'), i.getAttribute('positiony'), i.getAttribute('visionrange'));
        }*/
    }
}

function seeHere(x, y, nb) {
    if (document.getElementById('p-' + x + '-' + y) == null || document.getElementById('p-' + x + '-' + y).style.opacity == '100%') return;
    document.getElementById('p-' + x + '-' + y).style.opacity = '100%';
    if (document.getElementById('p-' + x + '-' + y).className.includes('wall')) return;
    if (nb > 0) {
        let x1 = parseInt(x) + 1;
        let y1 = parseInt(y) + 1;
        seeHere(x - 1, y, nb - 1);
        seeHere(x1, y, nb - 1);
        seeHere(x, y - 1, nb - 1);
        seeHere(x, y1, nb - 1);
    }
}

function getCoordinatesFromId(id) {
    var parts = id.split('-');
    return [parseInt(parts[2]) + 0.5, parseInt(parts[1]) + 0.5];
}

function updatePosColors() {
    for (pers of document.getElementsByClassName('pers')) {
        let listPos = [document.getElementById('p-' + pers.getAttribute('positionx') + '-' + pers.getAttribute('positiony'))];
        let persX = parseInt(pers.getAttribute('positionx'))
        let persY = parseInt(pers.getAttribute('positiony'));
        let persRange = parseInt(pers.getAttribute('visionrange'))
        for (let x=persX-persRange; x<=persX+persRange; x++) {
            for (let y=persY-persRange; y<=persY+persRange; y++) {
                if (document.getElementById('p-' + x + '-' + y) && Math.sqrt((x - persX)**2 + (y - persY)**2) <= persRange) {
                    listPos.push(document.getElementById('p-' + x + '-' + y));
                }
            }
        }

        listPos.forEach(pos => {
            pos.style.opacity = '100%';
            var posCo = getCoordinatesFromId(pos.id);
            var playerCo = [persX + 0.5, persY + 0.5];
            var walls = getWalls();
    
            // Créer un segment du joueur à la position actuelle
            var segment = [playerCo, posCo];
    
            // Vérifier l'intersection avec les murs
            if(!walls.some(wall => isIntersect(segment, wall))) {
                pos.style.opacity = '100%';
            }
        });
    }
}

function getWalls() {
    var wallElements = document.querySelectorAll('.wall');
    var coObs = Array.from(wallElements).map(div => getCoordinatesFromId(div.id));
    var variance = 0.0000001;
    var obstacles = coObs.map(ob => [
        [ob[0] + variance, ob[1] + variance],
        [ob[0] + 1 - variance, ob[1] + 1 - variance]
    ]);
    return obstacles
}

function isIntersect(segment, rect) {
    let [[x1, y1], [x2, y2]] = segment;
    let [[rx1, ry1], [rx2, ry2]] = rect;

    if ((x1 < rx1 && x2 < rx1) || (y1 < ry1 && y2 < ry1) || (x1 > rx2 && x2 > rx2) || (y1 > ry2 && y2 > ry2)) {
        return false;
    }

    let m = x2 !== x1 ? (y2 - y1) / (x2 - x1) : Infinity;
    let c = y1 - m * x1;

    function intersect(x) {
        return m !== Infinity ? m * x + c : y1;
    }

    function intersectY(y) {
        return m !== 0 ? (y - c) / m : x1;
    }

    // Cas spécial pour un segment horizontal ou vertical
    if (m === 0) {
        return (y1 >= ry1 && y1 <= ry2 && Math.max(x1, x2) >= rx1 && Math.min(x1, x2) <= rx2);
    }
    if (m === Infinity || m === -Infinity) {
        return (x1 >= rx1 && x1 <= rx2 && Math.max(y1, y2) >= ry1 && Math.min(y1, y2) <= ry2);
    }

    let sides = [
        [rx1, intersect(rx1)],
        [rx2, intersect(rx2)],
        [intersectY(ry1), ry1],
        [intersectY(ry2), ry2]
    ];

    for (let [ix, iy] of sides) {
        if (rx1 <= ix && ix <= rx2 && ry1 <= iy && iy <= ry2 && Math.min(x1, x2) <= ix && ix <= Math.max(x1, x2) && Math.min(y1, y2) <= iy && iy <= Math.max(y1, y2)) {
            return true;
        }
    }

    return false;
}