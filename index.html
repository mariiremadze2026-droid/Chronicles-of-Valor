<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronicles of Valor - Anime Tactics</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-image: url('https://img.freepik.com/free-vector/anime-style-landscape-with-rolling-hills_23-2148111956.jpg');
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden;
        }

        /* ეკრანის შერყევა დარტყმისას */
        .shake { animation: shakeAnim 0.3s ease-in-out; }
        @keyframes shakeAnim {
            0%, 100% { transform: translate(0, 0); }
            20%, 60% { transform: translate(-8px, 4px); }
            40%, 80% { transform: translate(8px, -4px); }
        }

        /* თამაშის ეპიკური სათაური */
        h1 {
            color: #fff;
            text-shadow: 0 0 10px #ff9f43, 0 0 20px #ff9f43;
            margin: 0 0 10px 0;
            font-size: 32px;
            letter-spacing: 2px;
        }

        #ui-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 15px;
            z-index: 100;
            width: 620px;
        }

        .panel {
            background-color: rgba(15, 15, 25, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            border: 2px solid #ff9f43;
            box-shadow: 0 6px 20px rgba(0,0,0,0.7);
            text-align: center;
        }

        #turn-indicator { font-size: 18px; font-weight: bold; color: #fff; }
        #combat-log { font-size: 13px; color: #0abde3; margin-top: 4px; height: 18px; }

        /* სტატუსების პანელი (ლეველები და XP) */
        #stats-bar {
            display: flex;
            justify-content: space-around;
            background: rgba(0, 0, 0, 0.6);
            padding: 6px;
            border-radius: 8px;
            font-size: 12px;
            margin-top: 8px;
        }

        #squad-panel {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 8px;
        }
        .unit-btn {
            background: #222;
            color: #fff;
            border: 1px solid #555;
            padding: 4px 12px;
            cursor: pointer;
            border-radius: 5px;
            font-size: 12px;
        }
        .unit-btn.active {
            background: #ff9f43;
            color: #000;
            border-color: #fff;
            font-weight: bold;
        }

        #game-board {
            display: grid;
            grid-template-columns: repeat(12, 50px);
            grid-template-rows: repeat(12, 50px);
            gap: 2px;
            background-color: rgba(0, 0, 0, 0.5);
            border: 4px solid #fff;
            box-shadow: 0 0 30px rgba(0,0,0,0.8);
            border-radius: 8px;
        }

        .cell {
            width: 50px;
            height: 50px;
            background-color: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .obstacle {
            background-image: url('https://cdn-icons-png.flaticon.com/512/489/489969.png');
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: center;
            background-color: rgba(34, 112, 44, 0.4) !important;
        }

        .walkable { background-color: rgba(72, 219, 251, 0.45) !important; cursor: pointer; }
        .walkable:hover { background-color: rgba(72, 219, 251, 0.75) !important; }
        
        .attackable { background-color: rgba(255, 107, 107, 0.55) !important; cursor: crosshair; }
        .attackable:hover { background-color: rgba(255, 107, 107, 0.85) !important; }

        /* პერსონაჟები */
        .character {
            width: 42px;
            height: 42px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            color: white;
            font-size: 11px;
            position: absolute;
            z-index: 10;
            box-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }

        .player-unit { border: 2px solid #00d2d3; cursor: pointer; }
        .player-unit.selected { border-color: #ffff00; box-shadow: 0 0 15px #ffff00; }
        .enemy-unit { background: linear-gradient(135deg, #ff6b6b, #ee5253); border: 2px solid #ff2222; }

        .class-warrior { background: linear-gradient(135deg, #2e86de, #1a5276); }
        .class-archer { background: linear-gradient(135deg, #10ac84, #0b6623); }
        .class-mage { background: linear-gradient(135deg, #9b59b6, #6c3483); }

        .damaged { background: #fff !important; color: #000 !important; }

        .hp-bar {
            position: absolute;
            top: -6px;
            left: 2px;
            width: 38px;
            height: 5px;
            background-color: #ff6b6b;
            border-radius: 3px;
            overflow: hidden;
        }
        .hp-fill { height: 100%; background-color: #1dd1a1; transition: width 0.3s; }
        
        /* ლეველის ტექსტი პერსონაჟზე */
        .lvl-badge {
            position: absolute;
            bottom: -4px;
            right: -4px;
            background: #ff9f43;
            color: black;
            font-size: 8px;
            padding: 1px 3px;
            border-radius: 3px;
            font-weight: bold;
        }
    </style>
</head>
<body id="game-body">

    <h1>CHRONICLES OF VALOR</h1>

    <div id="ui-container">
        <div class="panel">
            <div id="turn-indicator">🔵 Stage 1 - შენი სვლაა! აირჩიე მეომარი</div>
            <div id="combat-log">მოამზადე შენი რაზმი საბრძოლველად.</div>
            
            <div id="stats-bar"></div>
            <div id="squad-panel"></div>
        </div>
    </div>

    <div id="game-board"></div>

    <script>
        const board = document.getElementById('game-board');
        const boardSize = 12;
        let isPlayerTurn = true;
        let currentStage = 1;
        
        // ხმის ეფექტების გენერატორი
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function playSound(type) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain); gain.connect(audioCtx.destination);
            if (type === 'move') {
                osc.type = 'triangle'; osc.frequency.setValueAtTime(150, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                osc.start(); osc.stop(audioCtx.currentTime + 0.08);
            } else if (type === 'hit') {
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                osc.start(); osc.stop(audioCtx.currentTime + 0.15);
            } else if (type === 'lvlup') {
                osc.type = 'sine'; osc.frequency.setValueAtTime(300, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.4);
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                osc.start(); osc.stop(audioCtx.currentTime + 0.4);
            }
        }

        // ბარიერები
        const obstacles = [{x:3,y:3}, {x:3,y:4}, {x:4,y:3}, {x:7,y:8}, {x:8,y:8}, {x:5,y:5}, {x:6,y:5}];

        // მოთამაშის რაზმი (ინახავს ლეველებს და XP-ს)
        let playerUnits = [
            { id: 0, name: 'Saber', class: 'warrior', x: 1, y: 2, hp: 120, maxHp: 120, damage: 35, range: 1, speed: 3, level: 1, xp: 0, hasMoved: false },
            { id: 1, name: 'Archer', class: 'archer', x: 1, y: 5, hp: 80, maxHp: 80, damage: 25, range: 4, speed: 4, level: 1, xp: 0, hasMoved: false },
            { id: 2, name: 'Rin', class: 'mage', x: 1, y: 8, hp: 90, maxHp: 90, damage: 45, range: 2, speed: 3, level: 1, xp: 0, hasMoved: false }
        ];

        // მტრების მასივი (გენერირდება დინამიურად ტურების მიხედვით)
        let enemyUnits = [];
        let selectedUnit = null;

        function initGame() {
            generateEnemies();
            createBoard();
            updateUI();
        }

        // მტრების გენერაცია ტურის (Stage) მიხედვით
        function generateEnemies() {
            enemyUnits = [];
            // ყოველ ტურში მტრების რაოდენობა და სიცოცხლე იზრდება
            let enemyCount = 1 + currentStage; 
            let hpMultiplier = 1 + (currentStage - 1) * 0.25; // +25% HP ყოველ ტურში
            let dmgMultiplier = 1 + (currentStage - 1) * 0.15; // +15% DMG ყოველ ტურში

            for (let i = 0; i < enemyCount; i++) {
                enemyUnits.push({
                    id: 10 + i,
                    name: `Orc E${i+1}`,
                    x: 10,
                    y: 2 + (i * 3) % 9,
                    hp: Math.round(80 * hpMultiplier),
                    maxHp: Math.round(80 * hpMultiplier),
                    damage: Math.round(20 * dmgMultiplier),
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
            document.getElementById('turn-indicator').innerText = `🔵 Stage ${currentStage} - შენი სვლაა! აირჩიე მეომარი`;
            
            // განვიხილოთ ზედა სტატუსების ბარი (XP-ს ჩვენება)
            const statsBar = document.getElementById('stats-bar');
            statsBar.innerHTML = '';
            playerUnits.forEach(u => {
                statsBar.innerHTML += `<div><b>${u.name}</b>: Lvl ${u.level} (${u.xp}/100 XP) | HP: ${u.hp}/${u.maxHp}</div>`;
            });

            // რაზმის ღილაკები
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

        function attackEnemy(enemy) {
            playSound('hit');
            document.getElementById('game-body').classList.add('shake');
            const enemyVisual = document.getElementById(`enemy-${enemy.id}`);
            if (enemyVisual) enemyVisual.classList.add('damaged');

            enemy.hp -= selectedUnit.damage;
            if (enemy.hp < 0) enemy.hp = 0;

            let logText = `⚔️ ${selectedUnit.name}-მა მიაყენა ${selectedUnit.damage} ზიანი ${enemy.name}-ს!`;

            // თუ მტერი მოკვდა, გმირი იღებს XP-ს
            if (enemy.hp <= 0) {
                selectedUnit.xp += 50;
                logText += ` კაი დარტყმაა! +50 XP.`;
                
                // Level Up ლოგიკა
                if (selectedUnit.xp >= 100) {
                    selectedUnit.level++;
                    selectedUnit.xp -= 100;
                    selectedUnit.maxHp += 20;
                    selectedUnit.hp = selectedUnit.maxHp; // სიცოცხლე უვსდება
                    selectedUnit.damage += 8;
                    logText = `🌟 LEVEL UP! ${selectedUnit.name} გადავიდა ლეველ ${selectedUnit.level}-ზე!`;
                    playSound('lvlup');
                }
            }

            document.getElementById('combat-log').innerText = logText;

            setTimeout(() => {
                document.getElementById('game-body').classList.remove('shake');
                selectedUnit.hasMoved = true;
                selectedUnit = null;
                
                // შემოწმება: მოკვდა თუ არა ყველა მტერი ტურში
                if (enemyUnits.every(e => e.hp <= 0)) {
                    nextStage();
                    return;
                }

                updateUI();
                checkTurnEnd();
            }, 300);
        }

        // შემდეგ ტურზე გადასვლა
        function nextStage() {
            currentStage++;
            document.getElementById('combat-log').innerText = `🎉 ტური ძლევამოსილად დასრულდა! გადავდივართ Stage ${currentStage}-ზე!`;
            
            // გმირებს ცოტათი აღვუდგინოთ სიცოცხლე ახალი ტურისთვის
            playerUnits.forEach(u => {
                if (u.hp > 0) u.hp = Math.min(u.maxHp, u.hp + 30);
                u.hasMoved = false;
                // თავდაპირველ პოზიციებზე დაბრუნება
                u.x = 1;
            });

            isPlayerTurn = true;
            setTimeout(() => {
                initGame();
            }, 1500);
        }

        function checkTurnEnd() {
            let activeUnits = playerUnits.filter(u => u.hp > 0);
            if (activeUnits.every(u => u.hasMoved)) {
                isPlayerTurn = false;
                document.getElementById('turn-indicator').innerText = "🔴 მტრის (AI) სვლაა...";
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
                    closestTarget.hp -= enemy.damage;
                    playSound('hit');
                    if (closestTarget.hp < 0) closestTarget.hp = 0;
                    document.getElementById('combat-log').innerText = `💥 ${enemy.name} თავს დაესხა ${closestTarget.name}-ს (${enemy.damage} DMG)!`;
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
                document.getElementById('combat-log').innerText = "ახალი რაუნდი დაიწყო.";
                initGame();

                if (playerUnits.every(u => u.hp <= 0)) {
                    document.getElementById('turn-indicator').innerText = "💀 თქვენი რაზმი განადგურდა. Chronicles of Valor დასრულდა.";
                }
            }, 800);
        }

        initGame();
    </script>
</body>
</html>
