const board = document.getElementById('game-board');
const boardSize = 12;
let isPlayerTurn = true;
let currentStage = 1;

// ჩაშენებული ხმის ეფექტები (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    if (type === 'move') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(140, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.start(); osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'hit') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(90, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        osc.start(); osc.stop(audioCtx.currentTime + 0.12);
    } else if (type === 'crit') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        osc.start(); osc.stop(audioCtx.currentTime + 0.25);
    }
}

// რუკის ბარიერები
const obstacles = [{x:3,y:3}, {x:3,y:4}, {x:4,y:3}, {x:7,y:8}, {x:8,y:8}, {x:5,y:5}, {x:6,y:5}];

// ჩვენი გმირები რეალისტური სტატისტიკით (HP, აბჯარი, დარტყმის დისტანცია)
let playerUnits = [
    { id: 0, name: 'Saber', class: 'warrior', x: 1, y: 2, hp: 140, maxHp: 140, damage: 36, armor: 14, range: 1, speed: 3, level: 1, xp: 0, hasMoved: false },
    { id: 1, name: 'Archer', class: 'archer', x: 1, y: 5, hp: 90, maxHp: 90, damage: 28, armor: 5, range: 4, speed: 4, level: 1, xp: 0, hasMoved: false },
    { id: 2, name: 'Rin', class: 'mage', x: 1, y: 8, hp: 100, maxHp: 100, damage: 46, armor: 3, range: 2, speed: 3, level: 1, xp: 0, hasMoved: false }
];

let enemyUnits = [];
let selectedUnit = null;

function initGame() {
    if (enemyUnits.length === 0) generateEnemies();
    createBoard();
    updateUI();
}

// მასშტაბური მტრების გენერაცია (Stage 1-ზევე შემოდის 5 მტერი!)
function generateEnemies() {
    enemyUnits = [];
    let enemyCount = 4 + currentStage; 
    let hpMultiplier = 1 + (currentStage - 1) * 0.15;
    let dmgMultiplier = 1 + (currentStage - 1) * 0.10;

    for (let i = 0; i < enemyCount; i++) {
        let startX = 9 + (i % 3); 
        let startY = 1 + Math.floor((i * 2.2) % 10);

        if (obstacles.some(o => o.x === startX && o.y === startY)) {
            startY = (startY + 1) % boardSize;
        }

        enemyUnits.push({
            id: 10 + i,
            name: `Orc E${i+1}`,
            x: startX,
            y: startY,
            hp: Math.round(75 * hpMultiplier),
            maxHp: Math.round(75 * hpMultiplier),
            damage: Math.round(18 * dmgMultiplier),
            armor: 5,
            range: 1,
            speed: 3
        });
    }
}

function createBoard() {
    board.innerHTML = '';
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${x}-${y}`;
            if (obstacles.some(o => o.x === x && o.y === y)) cell.classList.add('obstacle');
            board.appendChild(cell);
        }
    }
    renderUnits();
    if (isPlayerTurn && selectedUnit) calculateActions();
}

function renderUnits() {
    playerUnits.forEach(u => {
        if (u.hp <= 0) return;
        const cell = document.getElementById(`cell-${u.x}-${u.y}`);
        const selClass = selectedUnit && selectedUnit.id === u.id ? 'selected' : '';
        cell.innerHTML = `<div class="character player-unit class-${u.class} ${selClass}" onclick="selectUnit(${u.id})">
            ${u.name}
            <div class="hp-bar"><div class="hp-fill" style="width: ${(u.hp/u.maxHp)*100}%"></div></div>
            <div class="lvl-badge">L${u.level}</div>
        </div>`;
    });

    enemyUnits.forEach(e => {
        if (e.hp <= 0) return;
        const cell = document.getElementById(`cell-${e.x}-${e.y}`);
        cell.innerHTML = `<div class="character enemy-unit" id="enemy-${e.id}">
            ${e.name}
            <div class="hp-bar"><div class="hp-fill" style="width: ${(e.hp/e.maxHp)*100}%"></div></div>
        </div>`;
    });
}

function updateUI() {
    document.getElementById('turn-indicator').innerText = `🔵 Stage ${currentStage} - შენი სვლაა!`;
    const statsBar = document.getElementById('stats-bar');
    statsBar.innerHTML = '';
    playerUnits.forEach(u => {
        let status = u.hp <= 0 ? "<span style='color:#ff6b6b'>დაეცა</span>" : `${u.hp}/${u.maxHp} HP`;
        statsBar.innerHTML += `<div><b>${u.name}</b> (Lvl ${u.level})<br>${status}<br>XP: ${u.xp}/100</div>`;
    });

    const panel = document.getElementById('squad-panel');
    panel.innerHTML = '';
    playerUnits.forEach(u => {
        if (u.hp <= 0) return;
        const btn = document.createElement('button');
        btn.className = `unit-btn ${selectedUnit && selectedUnit.id === u.id ? 'active' : ''}`;
        btn.innerText = `${u.name} ${u.hasMoved ? '✓' : ''}`;
        btn.onclick = () => selectUnit(u.id);
        panel.appendChild(btn);
    });
}

function selectUnit(id) {
    if (!isPlayerTurn) return;
    const unit = playerUnits.find(u => u.id === id);
    if (unit.hasMoved) return;
    selectedUnit = unit;
    updateUI();
    createBoard();
}

function calculateActions() {
    document.querySelectorAll('.cell').forEach(c => { c.classList.remove('walkable', 'attackable'); c.onclick = null; });

    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            if (obstacles.some(o => o.x === x && o.y === y)) continue;
            let distance = Math.abs(selectedUnit.x - x) + Math.abs(selectedUnit.y - y);
            let targetEnemy = enemyUnits.find(e => e.x === x && e.y === y && e.hp > 0);

            if (targetEnemy && distance <= selectedUnit.range) {
                const cell = document.getElementById(`cell-${x}-${y}`);
                cell.classList.add('attackable');
                cell.onclick = () => attackEnemy(targetEnemy);
            } else if (!targetEnemy && distance > 0 && distance <= selectedUnit.speed) {
                if (!playerUnits.some(p => p.x === x && p.y === y && p.hp > 0)) {
                    const cell = document.getElementById(`cell-${x}-${y}`);
                    cell.classList.add('walkable');
                    cell.onclick = () => moveUnit(x, y);
                }
            }
        }
    }
}

function moveUnit(newX, newY) {
    playSound('move');
    selectedUnit.x = newX;
    selectedUnit.y = newY;
    selectedUnit.hasMoved = true;
    selectedUnit = null;
    updateUI();
    checkTurnEnd();
}

// რეალისტური ბრძოლის ფორმულა აბჯრისა და აცილების გათვალისწინებით
function calculateDamage(attacker, defender) {
    let roll = Math.random();
    if (roll < 0.12) return { type: 'MISS', damage: 0 }; 

    let baseDmg = attacker.damage;
    let finalDmg = Math.max(6, baseDmg - defender.armor); 

    if (roll > 0.86) { 
        return { type: 'CRIT', damage: Math.round(finalDmg * 1.8) };
    }
    return { type: 'HIT', damage: Math.round(finalDmg * (0.9 + Math.random() * 0.25)) };
}

function attackEnemy(enemy) {
    let result = calculateDamage(selectedUnit, enemy);
    enemy.hp -= result.damage;
    if (enemy.hp < 0) enemy.hp = 0;

    if (result.type === 'CRIT') {
        playSound('crit');
        document.getElementById('game-body').classList.add('shake');
        setTimeout(() => document.getElementById('game-body').classList.remove('shake'), 300);
    } else if (result.type !== 'MISS') {
        playSound('hit');
    }

    let logText = `⚔️ [${result.type}] ${selectedUnit.name} -> ${enemy.name}: ${result.damage} DMG!`;

    // რეალისტური კონტრშეტევა (Counter-Attack)
    let distance = Math.abs(selectedUnit.x - enemy.x) + Math.abs(selectedUnit.y - enemy.y);
    if (enemy.hp > 0 && distance <= enemy.range && result.type !== 'MISS') {
        let counterResult = calculateDamage(enemy, selectedUnit);
        selectedUnit.hp -= counterResult.damage;
        if (selectedUnit.hp < 0) selectedUnit.hp = 0;
        logText += `<br>💥 კონტრდარტყმა: ${enemy.name}-მა დაუბრუნა ${counterResult.damage} ზიანი!`;
    }

    if (enemy.hp <= 0) {
        selectedUnit.xp += 50;
        if (selectedUnit.xp >= 100) {
            selectedUnit.level++;
            selectedUnit.xp -= 100;
            selectedUnit.maxHp += 25;
            selectedUnit.hp = selectedUnit.maxHp;
            selectedUnit.damage += 6;
            selectedUnit.armor += 2;
            logText = `🌟 LEVEL UP! ${selectedUnit.name} ავიდა ლეველ ${selectedUnit.level}-ზე!`;
        }
    }

    document.getElementById('combat-log').innerHTML = logText;
    selectedUnit.hasMoved = true;
    selectedUnit = null;

    if (enemyUnits.every(e => e.hp <= 0)) {
        setTimeout(nextStage, 1000);
    } else {
        updateUI();
        checkTurnEnd();
    }
}

function nextStage() {
    currentStage++;
    document.getElementById('combat-log').innerText = `🎉 ყველა ორკი განადგურდა! გადავდივართ Stage ${currentStage}-ზე!`;
    playerUnits.forEach(u => {
        if (u.hp > 0) u.hp = Math.min(u.maxHp, u.hp + 50); // ტურებს შორის სიცოცხლის აღდგენა
        u.hasMoved = false;
        u.x = 1; // საწყის პოზიციაზე დაბრუნება
    });
    isPlayerTurn = true;
    generateEnemies();
    createBoard();
    updateUI();
}

function checkTurnEnd() {
    let activeUnits = playerUnits.filter(u => u.hp > 0);
    if (activeUnits.length === 0) {
        document.getElementById('turn-indicator').innerText = "💀 თქვენი რაზმი განადგურდა. თამაში დასრულდა.";
        return;
    }
    if (activeUnits.every(u => u.hasMoved)) {
        isPlayerTurn = false;
        document.getElementById('turn-indicator').innerText = "🔴 მტრის სვლაა...";
        createBoard();
        setTimeout(enemyAI, 1000);
    } else {
        createBoard();
    }
}

function enemyAI() {
    enemyUnits.forEach(enemy => {
        if (enemy.hp <= 0) return;
        let targets = playerUnits.filter(u => u.hp > 0);
        if (targets.length === 0) return;

        let closestTarget = targets[0];
        let minDist = Math.abs(enemy.x - closestTarget.x) + Math.abs(enemy.y - closestTarget.y);

        targets.forEach(t => {
            let d = Math.abs(enemy.x - t.x) + Math.abs(enemy.y - t.y);
            if (d < minDist) { minDist = d; closestTarget = t; }
        });

        if (minDist <= enemy.range) {
            let result = calculateDamage(enemy, closestTarget);
            closestTarget.hp -= result.damage;
            playSound('hit');
            document.getElementById('combat-log').innerHTML = `💥 ${enemy.name} დაესხა თავს ${closestTarget.name}-ს (${result.damage} ზიანი!)`;
        } else {
            if (enemy.x < closestTarget.x && !obstacles.some(o=>o.x===enemy.x+1 && o.y===enemy.y)) enemy.x++;
            else if (enemy.x > closestTarget.x && !obstacles.some(o=>o.x===enemy.x-1 && o.y===enemy.y)) enemy.x--;
            else if (enemy.y < closestTarget.y && !obstacles.some(o=>o.x===enemy.x && o.y===enemy.y+1)) enemy.y++;
            else if (enemy.y > closestTarget.y && !obstacles.some(o=>o.x===enemy.x && o.y===enemy.y-1)) enemy.y--;
        }
    });

    setTimeout(() => {
        playerUnits.forEach(u => u.hasMoved = false);
        isPlayerTurn = true;
        initGame();
    }, 800);
}

initGame();
