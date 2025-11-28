// ============================================
// TỔNG KHỞI NGHĨA - RTS GAME
// ============================================

// Game State
const gameState = {
    resources: {
        food: 200,
        wood: 200,
        iron: 100
    },
    population: {
        current: 0,
        max: 10
    },
    buildings: [],
    units: [],
    enemies: [],
    selectedUnits: [],
    selectedBuilding: null,
    buildMode: null,
    gameTime: 0,
    paused: false,
    speed: 1,
    research: {
        weapons1: false,
        armor1: false,
        heroes: false
    },
    gameStarted: false,
    wavesDefeated: 0,
    currentWave: 0,  // Đợt hiện tại
    isSelecting: false,
    selectionStart: { x: 0, y: 0 },
    selectionEnd: { x: 0, y: 0 },
    finalBossSpawned: false,
    finalBossDefeated: false
};

// Canvas setup
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const canvasRect = canvas.getBoundingClientRect();

// Camera/viewport
const camera = {
    x: 0,
    y: 0,
    zoom: 1
};

// Resource nodes with regeneration
const resourceNodes = [
    { type: 'food', x: 200, y: 200, amount: 500, maxAmount: 500, icon: '🌾', regenTime: 0, regenDelay: 30000 },
    { type: 'food', x: 800, y: 300, amount: 500, maxAmount: 500, icon: '🌾', regenTime: 0, regenDelay: 30000 },
    { type: 'wood', x: 400, y: 500, amount: 500, maxAmount: 500, icon: '🪵', regenTime: 0, regenDelay: 40000 },
    { type: 'wood', x: 1000, y: 600, amount: 500, maxAmount: 500, icon: '🪵', regenTime: 0, regenDelay: 40000 },
    { type: 'iron', x: 600, y: 400, amount: 300, maxAmount: 300, icon: '⚙️', regenTime: 0, regenDelay: 60000 },
    { type: 'iron', x: 300, y: 700, amount: 300, maxAmount: 300, icon: '⚙️', regenTime: 0, regenDelay: 60000 }
];

// Building definitions
const buildingDefs = {
    house: {
        name: 'Nhà ở',
        icon: '🏠',
        width: 60,
        height: 60,
        hp: 200,
        maxHp: 200,
        cost: { food: 50, wood: 30 },
        population: 5,
        buildTime: 3000
    },
    barracks: {
        name: 'Trường huấn luyện',
        icon: '🏛️',
        width: 80,
        height: 80,
        hp: 300,
        maxHp: 300,
        cost: { food: 100, wood: 80, iron: 20 },
        buildTime: 5000
    },
    workshop: {
        name: 'Xưởng vũ khí',
        icon: '🔧',
        width: 80,
        height: 80,
        hp: 250,
        maxHp: 250,
        cost: { food: 80, wood: 100, iron: 50 },
        buildTime: 5000
    },
    hospital: {
        name: 'Bệnh viện',
        icon: '🏥',
        width: 70,
        height: 70,
        hp: 200,
        maxHp: 200,
        cost: { food: 60, wood: 70, iron: 10 },
        buildTime: 4000,
        healRange: 150,  // Phạm vi chữa trị
        healRate: 20     // HP chữa mỗi giây
    },
    research: {
        name: 'Trung tâm nghiên cứu',
        icon: '🔬',
        width: 90,
        height: 90,
        hp: 400,
        maxHp: 400,
        cost: { food: 150, wood: 120, iron: 80 },
        buildTime: 8000
    },
    headquarters: {
        name: 'Trụ sở chỉ huy',
        icon: '🏛️',
        width: 100,
        height: 100,
        hp: 500,
        maxHp: 500,
        cost: { food: 0, wood: 0, iron: 0 }, // Miễn phí, có sẵn
        buildTime: 0,
        isHeadquarters: true  // Đánh dấu là trụ sở chính
    }
};

// Unit definitions
const unitDefs = {
    worker: {
        name: 'Dân công',
        icon: '👷',
        width: 30,
        height: 30,
        hp: 50,
        maxHp: 50,
        speed: 2,
        cost: { food: 50 },
        attack: 5,
        range: 0,
        gatherRate: 10,
        population: 1
    },
    guerrilla: {
        name: 'Du kích',
        icon: '🔫',
        width: 35,
        height: 35,
        hp: 70,  // Tăng từ 60 lên 70
        maxHp: 70,
        speed: 3,
        cost: { food: 60, wood: 20 },
        attack: 18,  // Tăng từ 15 lên 18
        range: 80,
        population: 1
    },
    soldier: {
        name: 'Bộ đội chủ lực',
        icon: '🪖',
        width: 40,
        height: 40,
        hp: 140,  // Tăng từ 120 lên 140
        maxHp: 140,
        speed: 2.5,  // Tăng tốc độ để theo kịp kẻ địch
        cost: { food: 100, wood: 40, iron: 30 },
        attack: 35,  // Tăng từ 30 lên 35
        range: 60,
        population: 1
    },
    artillery: {
        name: 'Pháo binh',
        icon: '💣',
        width: 45,
        height: 45,
        hp: 80,
        maxHp: 80,
        speed: 1,
        cost: { food: 80, wood: 60, iron: 100 },
        attack: 50,
        range: 150,
        population: 2
    },
    'vo-nguyen-giap': {
        name: 'Võ Nguyên Giáp',
        icon: '⭐',
        width: 50,
        height: 50,
        hp: 300,
        maxHp: 300,
        speed: 2,
        cost: { food: 500, wood: 300, iron: 200 },
        attack: 60,
        range: 100,
        population: 3,
        isHero: true
    },
    'hoang-van-thu': {
        name: 'Hoàng Văn Thụ',
        icon: '⭐',
        width: 50,
        height: 50,
        hp: 250,
        maxHp: 250,
        speed: 2.5,
        cost: { food: 400, wood: 250, iron: 150 },
        attack: 50,
        range: 80,
        population: 3,
        isHero: true
    }
};

// Enemy types (đã tăng HP)
const enemyDefs = {
    french: {
        name: 'Lính Pháp',
        icon: '🇫🇷',
        width: 40,
        height: 40,
        hp: 90,  // Tăng từ 70 lên 90
        maxHp: 90,
        speed: 1.5,
        attack: 18,
        range: 70
    },
    japanese: {
        name: 'Lính Nhật',
        icon: '🇯🇵',
        width: 40,
        height: 40,
        hp: 75,  // Tăng từ 60 lên 75
        maxHp: 75,
        speed: 2,
        attack: 15,
        range: 60
    },
    american: {
        name: 'Lính Mỹ',
        icon: '🇺🇸',
        width: 45,
        height: 45,
        hp: 120,  // Tăng từ 100 lên 120
        maxHp: 120,
        speed: 1.8,
        attack: 25,
        range: 90
    },
    airplane: {
        name: 'Máy bay địch',
        icon: '✈️',
        width: 50,
        height: 50,
        hp: 50,  // HP thấp vì là máy bay
        maxHp: 50,
        speed: 3.5,  // Rất nhanh
        attack: 20,  // Tấn công từ xa
        range: 120  // Tầm xa
    },
    finalBoss: {
        name: 'BOSS CUỐI CÙNG',
        icon: '👹',
        width: 80,
        height: 80,
        hp: 2000,  // Rất khỏe
        maxHp: 2000,
        speed: 1.5,
        attack: 50,  // Tấn công mạnh
        range: 100
    }
};

// Initialize game
function initGame() {
    // Set up event listeners
    setupEventListeners();
    
    // Create headquarters (Trụ sở chỉ huy - Bác ở đây) ở giữa
    const hqX = 200;
    const hqY = 200;
    createBuilding('headquarters', hqX, hqY, true);
    
    // Create initial buildings xung quanh trụ sở (không đè lên nhau)
    // Nhà 1: bên trái trụ sở
    createBuilding('house', hqX - 120, hqY - 30, true);
    // Nhà 2: bên phải trụ sở
    createBuilding('house', hqX + 120, hqY - 30, true);
    
    // Start game loop
    gameLoop();
    
    // Start enemy spawner
    setTimeout(() => spawnEnemyWave(), 30000); // First wave after 30 seconds
    
    gameState.gameStarted = true;
    showNotification('Game đã bắt đầu! Bảo vệ Trụ sở chỉ huy (Bác) là ưu tiên số 1!', 'success');
    showNotification('⚠️ Nếu Trụ sở chỉ huy bị phá hủy, bạn sẽ thua!', 'error');
}

// Setup event listeners
function setupEventListeners() {
    // Building buttons
    document.querySelectorAll('.build-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const buildingType = btn.dataset.building;
            if (canAffordBuilding(buildingType)) {
                gameState.buildMode = buildingType;
                showNotification(`Chọn vị trí để xây ${buildingDefs[buildingType].name}`, 'success');
            } else {
                showNotification('Không đủ tài nguyên!', 'error');
            }
        });
    });
    
    // Unit training buttons
    document.querySelectorAll('.train-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const unitType = btn.dataset.unit;
            const buildingType = btn.dataset.building;
            trainUnit(unitType, buildingType);
        });
    });
    
    // Research buttons
    document.querySelectorAll('.research-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const researchType = btn.dataset.research;
            startResearch(researchType);
        });
    });
    
    // Hero buttons
    document.querySelectorAll('.hero-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const heroType = btn.dataset.hero;
            trainHero(heroType);
        });
    });
    
    // Canvas click
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCanvasRightClick);
    
    // Canvas mouse move
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    
    // Canvas mouse down/up for drag selection
    canvas.addEventListener('mousedown', handleCanvasMouseDown);
    canvas.addEventListener('mouseup', handleCanvasMouseUp);
    
    // Control buttons
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('speed-btn').addEventListener('click', toggleSpeed);
}

// Handle canvas click
function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / camera.zoom + camera.x;
    const y = (e.clientY - rect.top) / camera.zoom + camera.y;
    
    if (gameState.buildMode) {
        // Try to build
        if (canBuildAt(x, y)) {
            createBuilding(gameState.buildMode, x, y);
            gameState.buildMode = null;
        } else {
            showNotification('Không thể xây dựng ở vị trí này!', 'error');
        }
    } else {
        // Select units/buildings
        selectAt(x, y);
    }
}

// Handle canvas mouse move
function handleCanvasMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / camera.zoom + camera.x;
    const y = (e.clientY - rect.top) / camera.zoom + camera.y;
    
    // Update cursor if in build mode
    if (gameState.buildMode) {
        canvas.style.cursor = 'crosshair';
    } else if (e.buttons === 1 && !gameState.buildMode) {
        // Update selection box while dragging
        if (gameState.isSelecting) {
            gameState.selectionEnd = { x, y };
        }
    } else {
        canvas.style.cursor = 'default';
    }
}

// Handle canvas right click (move units)
function handleCanvasRightClick(e) {
    e.preventDefault();
    
    if (gameState.buildMode) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / camera.zoom + camera.x;
    const y = (e.clientY - rect.top) / camera.zoom + camera.y;
    
    // Check if clicking on enemy
    let clickedEnemy = null;
    for (const enemy of gameState.enemies) {
        const dist = Math.sqrt(
            Math.pow(x - (enemy.x + enemy.width/2), 2) + 
            Math.pow(y - (enemy.y + enemy.height/2), 2)
        );
        if (dist < enemy.width) {
            clickedEnemy = enemy;
            break;
        }
    }
    
    // Check if clicking on resource node (for workers)
    let clickedResource = null;
    if (gameState.selectedUnits.length > 0 && gameState.selectedUnits[0].type === 'worker') {
        for (const node of resourceNodes) {
            if (node.amount > 0) {
                const dist = Math.sqrt(
                    Math.pow(x - node.x, 2) + 
                    Math.pow(y - node.y, 2)
                );
                if (dist < 50) {
                    clickedResource = node;
                    break;
                }
            }
        }
    }
    
    // Move selected units
    if (gameState.selectedUnits.length > 0) {
        if (clickedEnemy) {
            // Attack enemy
            gameState.selectedUnits.forEach(unit => {
                if (unit.range > 0) {
                    unit.target = clickedEnemy;
                    unit.targetX = null;
                    unit.targetY = null;
                }
            });
            showNotification('Tấn công!', 'success');
        } else if (clickedResource) {
            // Gather resource (for workers)
            gameState.selectedUnits.forEach(unit => {
                if (unit.type === 'worker') {
                    unit.targetX = clickedResource.x;
                    unit.targetY = clickedResource.y;
                    unit.gathering = null;
                }
            });
            showNotification('Thu thập tài nguyên', 'success');
        } else {
            // Move to position
            gameState.selectedUnits.forEach(unit => {
                unit.targetX = x;
                unit.targetY = y;
                unit.target = null;
            });
        }
    }
}

// Handle canvas mouse down (start drag selection)
function handleCanvasMouseDown(e) {
    if (e.button !== 0) return; // Only left mouse button
    if (gameState.buildMode) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / camera.zoom + camera.x;
    const y = (e.clientY - rect.top) / camera.zoom + camera.y;
    
    // Check if clicking on unit/building (don't start selection)
    let clickedSomething = false;
    
    // Check buildings
    for (const building of gameState.buildings) {
        if (building.hp > 0 && 
            x >= building.x && x <= building.x + building.width &&
            y >= building.y && y <= building.y + building.height) {
            clickedSomething = true;
            break;
        }
    }
    
    // Check units
    if (!clickedSomething) {
        for (const unit of gameState.units) {
            const dist = Math.sqrt(
                Math.pow(x - (unit.x + unit.width/2), 2) + 
                Math.pow(y - (unit.y + unit.height/2), 2)
            );
            if (dist < unit.width) {
                clickedSomething = true;
                break;
            }
        }
    }
    
    if (!clickedSomething) {
        // Start selection box
        gameState.isSelecting = true;
        gameState.selectionStart = { x, y };
        gameState.selectionEnd = { x, y };
    }
}

// Handle canvas mouse up (end drag selection)
function handleCanvasMouseUp(e) {
    if (e.button !== 0) return;
    
    if (gameState.isSelecting) {
        // Select units in selection box
        const minX = Math.min(gameState.selectionStart.x, gameState.selectionEnd.x);
        const maxX = Math.max(gameState.selectionStart.x, gameState.selectionEnd.x);
        const minY = Math.min(gameState.selectionStart.y, gameState.selectionEnd.y);
        const maxY = Math.max(gameState.selectionStart.y, gameState.selectionEnd.y);
        
        // Clear previous selection
        gameState.selectedUnits.forEach(unit => unit.selected = false);
        gameState.selectedUnits = [];
        gameState.selectedBuilding = null;
        
        // Select units in box
        gameState.units.forEach(unit => {
            const unitX = unit.x + unit.width / 2;
            const unitY = unit.y + unit.height / 2;
            
            if (unitX >= minX && unitX <= maxX && unitY >= minY && unitY <= maxY) {
                unit.selected = true;
                gameState.selectedUnits.push(unit);
            }
        });
        
        if (gameState.selectedUnits.length > 0) {
            showUnitInfo(gameState.selectedUnits[0]);
            if (gameState.selectedUnits.length > 1) {
                document.getElementById('info-display').innerHTML += 
                    `<p style="color: #4ade80;">Đã chọn: ${gameState.selectedUnits.length} đơn vị</p>`;
            }
        }
        
        gameState.isSelecting = false;
    }
}

// Check if can afford building
function canAffordBuilding(buildingType) {
    const def = buildingDefs[buildingType];
    return gameState.resources.food >= def.cost.food &&
           (!def.cost.wood || gameState.resources.wood >= def.cost.wood) &&
           (!def.cost.iron || gameState.resources.iron >= def.cost.iron);
}

// Check if can build at position
function canBuildAt(x, y) {
    if (!gameState.buildMode) return false;
    
    const def = buildingDefs[gameState.buildMode];
    const halfWidth = def.width / 2;
    const halfHeight = def.height / 2;
    
    // Check bounds
    if (x - halfWidth < 0 || y - halfHeight < 0 ||
        x + halfWidth > canvas.width || y + halfHeight > canvas.height) {
        return false;
    }
    
    // Check collision with other buildings
    for (const building of gameState.buildings) {
        if (x < building.x + building.width && x + def.width > building.x &&
            y < building.y + building.height && y + def.height > building.y) {
            return false;
        }
    }
    
    return true;
}

// Create building
function createBuilding(type, x, y, instant = false) {
    const def = buildingDefs[type];
    
    if (!instant && !canAffordBuilding(type)) {
        showNotification('Không đủ tài nguyên!', 'error');
        return null;
    }
    
    // Pay cost
    if (!instant) {
        gameState.resources.food -= def.cost.food || 0;
        gameState.resources.wood -= def.cost.wood || 0;
        gameState.resources.iron -= def.cost.iron || 0;
        
        if (def.population) {
            gameState.population.max += def.population;
        }
    }
    
    const building = {
        id: Date.now() + Math.random(),
        type: type,
        x: x - def.width / 2,
        y: y - def.height / 2,
        width: def.width,
        height: def.height,
        hp: instant ? def.maxHp : 1,
        maxHp: def.maxHp,
        buildProgress: instant ? 100 : 0,
        buildTime: def.buildTime,
        trainingQueue: [],
        selected: false
    };
    
    gameState.buildings.push(building);
    updateUI();
    
    if (!instant) {
        showNotification(`Đang xây ${def.name}...`, 'success');
    }
    
    return building;
}

// Get unit cost with inflation (tăng giá theo thời gian)
function getUnitCost(unitType) {
    const def = unitDefs[unitType];
    
    // Tính hệ số tăng giá: mỗi 2 phút tăng 10% (hoặc mỗi 3 đợt tăng 10%)
    const timeMultiplier = 1 + (Math.floor(gameState.gameTime / 120) * 0.1); // Mỗi 2 phút
    const waveMultiplier = 1 + (Math.floor(gameState.currentWave / 3) * 0.1); // Mỗi 3 đợt
    const costMultiplier = Math.max(timeMultiplier, waveMultiplier);
    
    return {
        food: Math.floor((def.cost.food || 0) * costMultiplier),
        wood: Math.floor((def.cost.wood || 0) * costMultiplier),
        iron: Math.floor((def.cost.iron || 0) * costMultiplier)
    };
}

// Train unit
function trainUnit(unitType, buildingType) {
    // Find available building (must be completed and not destroyed)
    const building = gameState.buildings.find(b => 
        b.type === buildingType && 
        b.buildProgress === 100 &&
        b.hp > 0 &&
        b.trainingQueue.length < 3
    );
    
    if (!building) {
        showNotification(`Cần ${buildingDefs[buildingType].name} để tuyển quân!`, 'error');
        return;
    }
    
    const def = unitDefs[unitType];
    const cost = getUnitCost(unitType);
    
    // Check resources
    if (gameState.resources.food < cost.food ||
        gameState.resources.wood < cost.wood ||
        gameState.resources.iron < cost.iron) {
        showNotification('Không đủ tài nguyên!', 'error');
        return;
    }
    
    // Check population
    if (gameState.population.current + def.population > gameState.population.max) {
        showNotification('Không đủ chỗ ở! Xây thêm nhà!', 'error');
        return;
    }
    
    // Pay cost (với giá đã tăng)
    gameState.resources.food -= cost.food;
    gameState.resources.wood -= cost.wood;
    gameState.resources.iron -= cost.iron;
    
    // Add to training queue
    building.trainingQueue.push({
        type: unitType,
        progress: 0,
        time: 3000
    });
    
    updateUI();
    showNotification(`Đang huấn luyện ${def.name}...`, 'success');
}

// Train hero
function trainHero(heroType) {
    if (!gameState.research.heroes) {
        showNotification('Cần nghiên cứu "Tuyển anh hùng" trước!', 'error');
        return;
    }
    
    const def = unitDefs[heroType];
    
    // Check resources
    if (gameState.resources.food < def.cost.food ||
        gameState.resources.wood < def.cost.wood ||
        gameState.resources.iron < def.cost.iron) {
        showNotification('Không đủ tài nguyên!', 'error');
        return;
    }
    
    // Check population
    if (gameState.population.current + def.population > gameState.population.max) {
        showNotification('Không đủ chỗ ở!', 'error');
        return;
    }
    
    // Pay cost
    gameState.resources.food -= def.cost.food;
    gameState.resources.wood -= def.cost.wood;
    gameState.resources.iron -= def.cost.iron;
    
    // Create hero near barracks (must be completed and not destroyed)
    const barracks = gameState.buildings.find(b => b.type === 'barracks' && b.buildProgress === 100 && b.hp > 0);
    const spawnX = barracks ? barracks.x + barracks.width / 2 : 200;
    const spawnY = barracks ? barracks.y + barracks.height / 2 : 200;
    
    createUnit(heroType, spawnX, spawnY);
    updateUI();
    showNotification(`${def.name} đã gia nhập!`, 'success');
}

// Create unit
function createUnit(type, x, y) {
    const def = unitDefs[type];
    
    // Tính toán stats với research bonuses
    let baseAttack = def.attack;
    let baseMaxHp = def.maxHp;
    
    // Áp dụng research bonuses
    if (gameState.research.weapons1) {
        baseAttack = Math.floor(baseAttack * 1.5);
    }
    if (gameState.research.armor1) {
        baseMaxHp = Math.floor(baseMaxHp * 1.3);
    }
    
    const unit = {
        id: Date.now() + Math.random(),
        type: type,
        x: x,
        y: y,
        width: def.width,
        height: def.height,
        hp: baseMaxHp,
        maxHp: baseMaxHp,
        speed: def.speed,
        attack: baseAttack,
        range: def.range,
        target: null,
        targetX: null,
        targetY: null,
        gathering: null,
        selected: false,
        isHero: def.isHero || false,
        lastTargetUpdate: 0,  // Thời gian cập nhật mục tiêu lần cuối
        currentTargetEnemy: null  // Kẻ địch đang theo đuổi
    };
    
    gameState.units.push(unit);
    gameState.population.current += def.population;
    updateUI();
    
    return unit;
}

// Start research
function startResearch(researchType) {
    if (gameState.research[researchType]) {
        showNotification('Công nghệ này đã được nghiên cứu!', 'error');
        return;
    }
    
    const researchBtn = document.querySelector(`[data-research="${researchType}"]`);
    const costFood = parseInt(researchBtn.dataset.costFood);
    const costWood = parseInt(researchBtn.dataset.costWood);
    const costIron = parseInt(researchBtn.dataset.costIron);
    
    if (gameState.resources.food < costFood ||
        gameState.resources.wood < costWood ||
        gameState.resources.iron < costIron) {
        showNotification('Không đủ tài nguyên!', 'error');
        return;
    }
    
    // Check if research center exists (must be completed and not destroyed)
    const researchCenter = gameState.buildings.find(b => 
        b.type === 'research' && b.buildProgress === 100 && b.hp > 0
    );
    
    if (!researchCenter) {
        showNotification('Cần Trung tâm nghiên cứu!', 'error');
        return;
    }
    
    // Pay cost
    gameState.resources.food -= costFood;
    gameState.resources.wood -= costWood;
    gameState.resources.iron -= costIron;
    
    // Research takes time
    setTimeout(() => {
        gameState.research[researchType] = true;
        updateUI();
        updateTechDisplay();
        
        if (researchType === 'weapons1') {
            // Upgrade unit attacks (cả đơn vị hiện có và tương lai)
            gameState.units.forEach(unit => {
                const def = unitDefs[unit.type];
                // Tính lại từ base attack với bonus
                unit.attack = Math.floor(def.attack * 1.5);
            });
            showNotification('Vũ khí đã được cải tiến! Tất cả đơn vị +50% sát thương!', 'success');
        } else if (researchType === 'armor1') {
            // Upgrade unit HP (cả đơn vị hiện có và tương lai)
            gameState.units.forEach(unit => {
                const def = unitDefs[unit.type];
                // Tính lại từ base HP với bonus
                const newMaxHp = Math.floor(def.maxHp * 1.3);
                const hpPercent = unit.hp / unit.maxHp;
                unit.maxHp = newMaxHp;
                unit.hp = Math.floor(newMaxHp * hpPercent);
            });
            showNotification('Giáp bảo vệ đã được nâng cấp! Tất cả đơn vị +30% HP!', 'success');
        } else if (researchType === 'heroes') {
            document.getElementById('hero-menu').style.display = 'block';
            showNotification('Có thể tuyển anh hùng!', 'success');
        }
    }, 10000); // 10 seconds research time
    
    updateUI();
    showNotification('Đang nghiên cứu...', 'success');
}

// Select at position
function selectAt(x, y) {
    // Clear previous selection
    gameState.selectedUnits = [];
    gameState.selectedBuilding = null;
    
    // Check buildings first (only if HP > 0)
    for (const building of gameState.buildings) {
        if (building.hp > 0 && 
            x >= building.x && x <= building.x + building.width &&
            y >= building.y && y <= building.y + building.height) {
            gameState.selectedBuilding = building;
            building.selected = true;
            showBuildingInfo(building);
            return;
        }
    }
    
    // Check units
    for (const unit of gameState.units) {
        const dist = Math.sqrt(
            Math.pow(x - (unit.x + unit.width/2), 2) + 
            Math.pow(y - (unit.y + unit.height/2), 2)
        );
        if (dist < unit.width) {
            gameState.selectedUnits.push(unit);
            unit.selected = true;
            showUnitInfo(unit);
            return;
        }
    }
    
    // Clear info display
    document.getElementById('info-display').innerHTML = 
        '<p>Chọn một đơn vị hoặc tòa nhà để xem thông tin</p>';
}

// Show building info
function showBuildingInfo(building) {
    const def = buildingDefs[building.type];
    let info = `
        <h4>${def.name}</h4>
        <p>HP: ${Math.floor(building.hp)}/${building.maxHp}</p>
        <p>Tiến độ: ${Math.floor(building.buildProgress)}%</p>
    `;
    
    // Thông tin đặc biệt cho Trụ sở chỉ huy
    if (building.type === 'headquarters' || def.isHeadquarters) {
        const hpPercent = (building.hp / building.maxHp) * 100;
        let statusColor = '#4ade80';
        let statusText = 'An toàn';
        if (hpPercent < 50) {
            statusColor = '#ef4444';
            statusText = 'NGUY HIỂM!';
        } else if (hpPercent < 75) {
            statusColor = '#fbbf24';
            statusText = 'Cảnh báo';
        }
        
        info += `
            <p style="color: ${statusColor}; font-weight: bold; margin-top: 10px;">
                ⚠️ Trạng thái: ${statusText}
            </p>
            <p style="color: #ef4444; font-weight: bold;">
                ⚠️ Nếu bị phá hủy → THUA GAME!
            </p>
        `;
    }
    
    if (building.trainingQueue.length > 0) {
        info += `<p>Đang huấn luyện: ${building.trainingQueue.length}</p>`;
    }
    
    if (building.type === 'hospital' && building.buildProgress === 100) {
        const hospitalX = building.x + building.width / 2;
        const hospitalY = building.y + building.height / 2;
        const injuredUnits = gameState.units.filter(unit => {
            if (unit.hp >= unit.maxHp) return false;
            const dist = Math.sqrt(
                Math.pow(unit.x + unit.width/2 - hospitalX, 2) + 
                Math.pow(unit.y + unit.height/2 - hospitalY, 2)
            );
            return dist <= def.healRange;
        }).length;
        
        info += `
            <p style="color: #4ade80;">💚 Chữa trị: ${def.healRate} HP/giây</p>
            <p style="color: #4ade80;">📏 Phạm vi: ${def.healRange}px</p>
            ${injuredUnits > 0 ? `<p style="color: #fbbf24;">Đang chữa: ${injuredUnits} đơn vị</p>` : ''}
        `;
    }
    
    document.getElementById('info-display').innerHTML = info;
}

// Show unit info
function showUnitInfo(unit) {
    const def = unitDefs[unit.type];
    let info = `
        <h4>${def.name}</h4>
        <p>HP: ${Math.floor(unit.hp)}/${unit.maxHp}</p>
        <p>Tấn công: ${unit.attack}</p>
        <p>Tầm: ${unit.range}</p>
        ${unit.isHero ? '<p style="color: #fbbf24;">⭐ Anh hùng</p>' : ''}
    `;
    
    if (gameState.selectedUnits.length > 1) {
        info += `<p style="color: #4ade80; margin-top: 10px;">📋 Đã chọn: ${gameState.selectedUnits.length} đơn vị</p>`;
    }
    
    document.getElementById('info-display').innerHTML = info;
}

// Update tech display
function updateTechDisplay() {
    const techDisplay = document.getElementById('tech-display');
    techDisplay.innerHTML = '<div class="tech-item">Vũ khí thô sơ ✓</div>';
    
    if (gameState.research.weapons1) {
        techDisplay.innerHTML += '<div class="tech-item">Vũ khí cải tiến ✓</div>';
    }
    if (gameState.research.armor1) {
        techDisplay.innerHTML += '<div class="tech-item">Giáp bảo vệ ✓</div>';
    }
    if (gameState.research.heroes) {
        techDisplay.innerHTML += '<div class="tech-item">Tuyển anh hùng ✓</div>';
    }
}

// Spawn enemy wave
function spawnEnemyWave() {
    if (gameState.paused) return;
    
    gameState.currentWave++;
    
    // Spawn boss cuối cùng ở đợt 10
    if (gameState.currentWave === 10 && !gameState.finalBossSpawned) {
        spawnFinalBoss();
        gameState.finalBossSpawned = true;
        return; // Không spawn đợt thường nữa
    }
    
    // Tính số lượng kẻ địch (tăng theo đợt)
    const baseWaveSize = 3;
    const waveSize = baseWaveSize + Math.floor(gameState.currentWave / 2); // Tăng 1 kẻ địch mỗi 2 đợt
    
    // Tính hệ số tăng sức mạnh (scaling factor)
    // Mỗi đợt tăng 10% HP và 8% tấn công
    const hpMultiplier = 1 + (gameState.currentWave * 0.1);
    const attackMultiplier = 1 + (gameState.currentWave * 0.08);
    
    for (let i = 0; i < waveSize; i++) {
        // Chọn loại kẻ địch (máy bay có tỷ lệ thấp hơn)
        let enemyType;
        if (gameState.currentWave >= 3 && Math.random() < 0.2) {
            // 20% cơ hội là máy bay (từ đợt 3)
            enemyType = 'airplane';
        } else {
            enemyType = ['french', 'japanese', 'american'][Math.floor(Math.random() * 3)];
        }
        
        const def = enemyDefs[enemyType];
        
        // Tính HP và tấn công với scaling
        const scaledHp = Math.floor(def.maxHp * hpMultiplier);
        const scaledAttack = Math.floor(def.attack * attackMultiplier);
        
        // Spawn from right side (máy bay spawn từ trên)
        let x, y;
        if (enemyType === 'airplane') {
            // Máy bay spawn từ trên bản đồ
            x = 200 + Math.random() * (canvas.width - 400);
            y = -50;
        } else {
            // Lính bộ binh spawn từ bên phải
            x = canvas.width + 100;
            y = 100 + Math.random() * (canvas.height - 200);
        }
        
        const enemy = {
            id: Date.now() + Math.random() + i,
            type: enemyType,
            x: x,
            y: y,
            width: def.width,
            height: def.height,
            hp: scaledHp,
            maxHp: scaledHp,
            speed: def.speed,
            attack: scaledAttack,
            range: def.range,
            target: null,
            waveNumber: gameState.currentWave
        };
        
        gameState.enemies.push(enemy);
    }
    
    // Hiển thị thông báo với thông tin scaling
    const scalingInfo = gameState.currentWave > 1 ? 
        ` (HP +${Math.floor((hpMultiplier - 1) * 100)}%, Tấn công +${Math.floor((attackMultiplier - 1) * 100)}%)` : '';
    showNotification(`⚠️ Đợt ${gameState.currentWave}: ${waveSize} kẻ địch${scalingInfo}`, 'error');
    
    // Schedule next wave
    const nextWaveTime = 30000 + Math.random() * 20000; // 30-50 seconds
    setTimeout(() => spawnEnemyWave(), nextWaveTime);
}

// Game loop
function gameLoop() {
    if (!gameState.paused) {
        updateGame();
    }
    renderGame();
    requestAnimationFrame(gameLoop);
}

// Update game
function updateGame() {
    const deltaTime = 16 * gameState.speed; // ~60 FPS
    
    gameState.gameTime += deltaTime / 1000;
    updateGameTime();
    
    // Update buildings
    gameState.buildings.forEach(building => {
        if (building.buildProgress < 100) {
            building.buildProgress += (deltaTime / building.buildTime) * 100;
            if (building.buildProgress >= 100) {
                building.buildProgress = 100;
                building.hp = building.maxHp;
                showNotification(`${buildingDefs[building.type].name} đã hoàn thành!`, 'success');
            }
        }
        
        // Update training queue (only if building is completed and not destroyed)
        if (building.trainingQueue.length > 0 && building.buildProgress === 100 && building.hp > 0) {
            const training = building.trainingQueue[0];
            training.progress += deltaTime;
            
            if (training.progress >= training.time) {
                // Spawn unit
                const spawnX = building.x + building.width / 2;
                const spawnY = building.y + building.height / 2;
                createUnit(training.type, spawnX, spawnY);
                
                building.trainingQueue.shift();
            }
        }
        
        // Hospital healing (only if completed and not destroyed)
        if (building.type === 'hospital' && building.buildProgress === 100 && building.hp > 0) {
            const def = buildingDefs.hospital;
            const hospitalX = building.x + building.width / 2;
            const hospitalY = building.y + building.height / 2;
            
            // Find injured units within range
            gameState.units.forEach(unit => {
                if (unit.hp < unit.maxHp) {
                    const dist = Math.sqrt(
                        Math.pow(unit.x + unit.width/2 - hospitalX, 2) + 
                        Math.pow(unit.y + unit.height/2 - hospitalY, 2)
                    );
                    
                    if (dist <= def.healRange) {
                        // Heal the unit
                        const healAmount = def.healRate * (deltaTime / 1000);
                        unit.hp = Math.min(unit.maxHp, unit.hp + healAmount);
                    }
                }
            });
        }
    });
    
    // Update units
    gameState.units.forEach(unit => {
        updateUnit(unit, deltaTime);
    });
    
    // Update enemies
    gameState.enemies.forEach(enemy => {
        updateEnemy(enemy, deltaTime);
    });
    
    // Regenerate resource nodes
    resourceNodes.forEach(node => {
        if (node.amount <= 0 && node.regenTime > 0 && Date.now() >= node.regenTime) {
            node.amount = node.maxAmount;
            node.regenTime = 0;
            showNotification(`💚 ${node.type === 'food' ? 'Lương thực' : node.type === 'wood' ? 'Gỗ' : 'Sắt'} đã tái tạo!`, 'success');
        }
    });
    
    // Remove dead units
    const deadEnemies = gameState.enemies.filter(enemy => enemy.hp <= 0);
    gameState.units = gameState.units.filter(unit => unit.hp > 0);
    gameState.enemies = gameState.enemies.filter(enemy => enemy.hp > 0);
    
    // Check if wave is defeated (all enemies from a wave are dead)
    if (deadEnemies.length > 0) {
        const currentWave = Math.max(...deadEnemies.map(e => e.waveNumber || 0));
        const remainingEnemies = gameState.enemies.filter(e => (e.waveNumber || 0) === currentWave);
        
        if (remainingEnemies.length === 0 && currentWave > gameState.wavesDefeated) {
            gameState.wavesDefeated = currentWave;
            
            // Kiểm tra nếu đánh bại boss cuối
            const bossKilled = deadEnemies.some(e => e.isFinalBoss);
            if (bossKilled) {
                gameState.finalBossDefeated = true;
                showNotification('🎉🎉🎉 ĐÃ ĐÁNH BẠI BOSS CUỐI CÙNG! 🎉🎉🎉', 'success');
                checkWinCondition();
            } else if (currentWave < 10) {
                // Chỉ thông báo đánh bại đợt nếu chưa đến đợt 10
                showNotification(`🎉 Đã đánh bại đợt ${currentWave}!`, 'success');
            }
        }
    }
    
    // Remove destroyed buildings
    const destroyedBuildings = gameState.buildings.filter(building => building.hp <= 0);
    if (destroyedBuildings.length > 0) {
        destroyedBuildings.forEach(building => {
            const def = buildingDefs[building.type];
            
            // Kiểm tra nếu Trụ sở chỉ huy bị phá hủy
            if (building.type === 'headquarters' || def.isHeadquarters) {
                showNotification('❌❌❌ TRỤ SỞ CHỈ HUY ĐÃ BỊ PHÁ HỦY! ❌❌❌', 'error');
                showNotification('Bác đã không an toàn! Game kết thúc!', 'error');
                gameState.paused = true;
                setTimeout(() => {
                    if (confirm('Bạn đã thua! Trụ sở chỉ huy bị phá hủy!\n\nChơi lại?')) {
                        location.reload();
                    }
                }, 2000);
                return;
            }
            
            showNotification(`${def.name} đã bị phá hủy!`, 'error');
            
            // Refund population if building provided it
            if (def.population) {
                gameState.population.max = Math.max(10, gameState.population.max - def.population);
            }
        });
    }
    gameState.buildings = gameState.buildings.filter(building => building.hp > 0);
    
    // Cảnh báo khi Trụ sở chỉ huy bị tấn công
    const headquartersCheck = gameState.buildings.find(b => b.type === 'headquarters' && b.hp > 0);
    if (headquartersCheck && headquartersCheck.hp < headquartersCheck.maxHp * 0.5) {
        // HP dưới 50% - cảnh báo nguy hiểm
        if (!headquartersCheck.lowHpWarning) {
            headquartersCheck.lowHpWarning = true;
            showNotification('⚠️⚠️⚠️ CẢNH BÁO! Trụ sở chỉ huy đang bị tấn công! ⚠️⚠️⚠️', 'error');
        }
    }
    
    // Update population
    let currentPop = 0;
    gameState.units.forEach(unit => {
        currentPop += unitDefs[unit.type].population;
    });
    gameState.population.current = currentPop;
    
    // Check win/lose conditions
    const headquarters = gameState.buildings.find(b => b.type === 'headquarters');
    if (!headquarters || headquarters.hp <= 0) {
        // Trụ sở chỉ huy bị phá hủy - thua ngay
        if (!gameState.paused) {
            showNotification('❌❌❌ THẤT BẠI! Trụ sở chỉ huy đã bị phá hủy! ❌❌❌', 'error');
            gameState.paused = true;
            setTimeout(() => {
                if (confirm('Bạn đã thua! Trụ sở chỉ huy (Bác) không còn an toàn!\n\nChơi lại?')) {
                    location.reload();
                }
            }, 2000);
        }
    }
    
    // Check other buildings
    const completedBuildings = gameState.buildings.filter(b => b.buildProgress === 100 && b.type !== 'headquarters');
    if (completedBuildings.length === 0 && gameState.buildings.filter(b => b.type !== 'headquarters').length === 0 && headquarters && headquarters.hp > 0) {
        // Chỉ còn trụ sở chỉ huy - cảnh báo
        if (!headquarters.lastBuildingWarning) {
            headquarters.lastBuildingWarning = true;
            showNotification('⚠️ Cảnh báo! Chỉ còn Trụ sở chỉ huy! Xây thêm tòa nhà!', 'error');
        }
    }
    
    // Check win condition (chỉ khi boss đã spawn)
    if (gameState.finalBossSpawned) {
        checkWinCondition();
    }
    
    updateUI();
}

// Spawn final boss
function spawnFinalBoss() {
    const def = enemyDefs.finalBoss;
    
    // Spawn boss ở giữa bên phải bản đồ
    const x = canvas.width + 50;
    const y = canvas.height / 2;
    
    const boss = {
        id: 'final-boss-' + Date.now(),
        type: 'finalBoss',
        x: x,
        y: y,
        width: def.width,
        height: def.height,
        hp: def.maxHp,
        maxHp: def.maxHp,
        speed: def.speed,
        attack: def.attack,
        range: def.range,
        target: null,
        waveNumber: 10,
        isFinalBoss: true
    };
    
    gameState.enemies.push(boss);
    showNotification('⚠️⚠️⚠️ BOSS CUỐI CÙNG XUẤT HIỆN! ⚠️⚠️⚠️', 'error');
    showNotification('Đánh bại boss để chiến thắng!', 'error');
}

// Check win condition
function checkWinCondition() {
    // Chỉ thắng khi đánh bại boss cuối cùng
    if (gameState.finalBossSpawned && !gameState.finalBossDefeated) {
        const bossAlive = gameState.enemies.some(enemy => enemy.isFinalBoss && enemy.hp > 0);
        
        if (!bossAlive) {
            gameState.finalBossDefeated = true;
            showWinScreen('Đánh bại BOSS CUỐI CÙNG!');
            return;
        }
    }
}

// Show win screen
function showWinScreen(reason) {
    gameState.paused = true;
    
    const stats = {
        time: gameState.gameTime,
        waves: gameState.wavesDefeated,
        units: gameState.units.length,
        buildings: gameState.buildings.filter(b => b.buildProgress === 100).length,
        enemiesKilled: gameState.wavesDefeated * 5 // Estimate
    };
    
    const winMessage = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: rgba(0, 0, 0, 0.9); color: white; padding: 40px; 
                    border-radius: 15px; border: 3px solid #4ade80; z-index: 10000; 
                    text-align: center; max-width: 500px;">
            <h1 style="color: #4ade80; font-size: 2.5em; margin-bottom: 20px;">🎉 CHIẾN THẮNG!</h1>
            <p style="font-size: 1.3em; margin-bottom: 30px;">${reason}</p>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #4ade80; margin-bottom: 15px;">Thống kê:</h3>
                <p>⏱️ Thời gian: ${Math.floor(stats.time / 60)}:${String(Math.floor(stats.time % 60)).padStart(2, '0')}</p>
                <p>⚔️ Đợt đã đánh bại: ${stats.waves}</p>
                <p>👥 Đơn vị còn lại: ${stats.units}</p>
                <p>🏗️ Tòa nhà: ${stats.buildings}</p>
            </div>
            <button onclick="location.reload()" style="
                background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
                color: white; border: none; padding: 15px 30px; 
                font-size: 1.2em; border-radius: 8px; cursor: pointer;
                font-weight: bold; margin-top: 20px;
            ">Chơi lại</button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', winMessage);
}

// Update unit
function updateUnit(unit, deltaTime) {
    const def = unitDefs[unit.type];
    
    // If worker, gather resources
    if (unit.type === 'worker' && unit.gathering) {
        const node = resourceNodes.find(n => 
            Math.abs(n.x - unit.x) < 50 && Math.abs(n.y - unit.y) < 50
        );
        
        if (node && node.amount > 0) {
            const gathered = Math.min(def.gatherRate * (deltaTime / 1000), node.amount);
            node.amount -= gathered;
            gameState.resources[node.type] += gathered;
            
            if (node.amount <= 0) {
                node.amount = 0;
                // Start regeneration timer
                node.regenTime = Date.now() + node.regenDelay;
                unit.gathering = null;
                unit.targetX = null;
                unit.targetY = null;
            }
        } else {
            unit.gathering = null;
        }
    }
    
    // For combat units (not workers), auto-find and attack enemies
    if (unit.type !== 'worker' && unit.range > 0) {
        let nearestEnemy = null;
        let nearestDist = Infinity;
        
        // Find nearest enemy (within range for attack)
        gameState.enemies.forEach(enemy => {
            const dist = Math.sqrt(
                Math.pow(enemy.x - unit.x, 2) + 
                Math.pow(enemy.y - unit.y, 2)
            );
            
            // If enemy is in attack range
            if (dist <= unit.range) {
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearestEnemy = enemy;
                }
            }
        });
        
        if (nearestEnemy) {
            // Enemy in range - attack and stop moving
            unit.target = nearestEnemy;
            unit.targetX = null;
            unit.targetY = null;
            unit.currentTargetEnemy = null;
            nearestEnemy.hp -= unit.attack * (deltaTime / 1000);
            if (nearestEnemy.hp <= 0) {
                unit.target = null;
            }
        } else {
            // No enemy in range - find nearest enemy to move towards
            let nearestEnemyToMove = null;
            let nearestDistToMove = Infinity;
            
            gameState.enemies.forEach(enemy => {
                const dist = Math.sqrt(
                    Math.pow(enemy.x - unit.x, 2) + 
                    Math.pow(enemy.y - unit.y, 2)
                );
                if (dist < nearestDistToMove) {
                    nearestDistToMove = dist;
                    nearestEnemyToMove = enemy;
                }
            });
            
            if (nearestEnemyToMove) {
                // Update target only if:
                // 1. No current target, OR
                // 2. Current target is different, OR
                // 3. Current target moved too far (more than 50px from target position)
                const shouldUpdate = !unit.currentTargetEnemy || 
                                    unit.currentTargetEnemy.id !== nearestEnemyToMove.id ||
                                    (unit.targetX && unit.targetY && 
                                     Math.sqrt(
                                         Math.pow(nearestEnemyToMove.x - unit.targetX, 2) + 
                                         Math.pow(nearestEnemyToMove.y - unit.targetY, 2)
                                     ) > 50);
                
                if (shouldUpdate) {
                    unit.currentTargetEnemy = nearestEnemyToMove;
                    unit.targetX = nearestEnemyToMove.x;
                    unit.targetY = nearestEnemyToMove.y;
                    unit.lastTargetUpdate = gameState.gameTime;
                } else if (unit.currentTargetEnemy) {
                    // Update target position to follow moving enemy (smoothly)
                    const currentDist = Math.sqrt(
                        Math.pow(unit.currentTargetEnemy.x - unit.targetX, 2) + 
                        Math.pow(unit.currentTargetEnemy.y - unit.targetY, 2)
                    );
                    
                    // Only update if enemy moved significantly (more than 30px)
                    if (currentDist > 30) {
                        unit.targetX = unit.currentTargetEnemy.x;
                        unit.targetY = unit.currentTargetEnemy.y;
                    }
                }
            } else {
                // No enemies - clear target
                unit.currentTargetEnemy = null;
                unit.targetX = null;
                unit.targetY = null;
            }
            unit.target = null;
        }
    }
    
    // Move towards target
    if (unit.targetX !== null && unit.targetY !== null && !unit.target) {
        const dx = unit.targetX - unit.x;
        const dy = unit.targetY - unit.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 5) {
            unit.x += (dx / dist) * unit.speed * (deltaTime / 16);
            unit.y += (dy / dist) * unit.speed * (deltaTime / 16);
        } else {
            // Reached target
            unit.targetX = null;
            unit.targetY = null;
            
            // If worker, start gathering
            if (unit.type === 'worker') {
                const node = resourceNodes.find(n => 
                    Math.abs(n.x - unit.x) < 50 && Math.abs(n.y - unit.y) < 50
                );
                if (node) {
                    unit.gathering = node;
                }
            }
        }
    }
    
    // For combat units: if no target and no movement command, patrol near base
    if (unit.type !== 'worker' && !unit.target && !unit.targetX && gameState.enemies.length === 0) {
        // No enemies, stay near base (center of map or near buildings)
        const baseX = canvas.width / 2;
        const baseY = canvas.height / 2;
        const distToBase = Math.sqrt(
            Math.pow(unit.x - baseX, 2) + 
            Math.pow(unit.y - baseY, 2)
        );
        
        // If too far from base, move back
        if (distToBase > 200) {
            unit.targetX = baseX + (Math.random() - 0.5) * 100;
            unit.targetY = baseY + (Math.random() - 0.5) * 100;
        }
    }
    
    // Auto-gather for workers
    if (unit.type === 'worker' && !unit.gathering && !unit.targetX) {
        const nearestNode = findNearestResource(unit.x, unit.y);
        if (nearestNode) {
            unit.targetX = nearestNode.x;
            unit.targetY = nearestNode.y;
        }
    }
}

// Update enemy
function updateEnemy(enemy, deltaTime) {
    // Find nearest building or unit
    let nearestTarget = null;
    let nearestDist = Infinity;
    let headquartersTarget = null;
    let headquartersDist = Infinity;
    
    // Ưu tiên tìm Trụ sở chỉ huy trước (Bác cần được bảo vệ!)
    gameState.buildings.forEach(building => {
        if (building.buildProgress === 100 && building.hp > 0) {
            const def = buildingDefs[building.type];
            const dist = Math.sqrt(
                Math.pow(building.x + building.width/2 - enemy.x, 2) + 
                Math.pow(building.y + building.height/2 - enemy.y, 2)
            );
            
            // Nếu là Trụ sở chỉ huy, ưu tiên cao nhất
            if (building.type === 'headquarters' || def.isHeadquarters) {
                if (dist < headquartersDist) {
                    headquartersDist = dist;
                    headquartersTarget = { type: 'building', obj: building, priority: 999 };
                }
            } else if (dist < nearestDist) {
                nearestDist = dist;
                nearestTarget = { type: 'building', obj: building };
            }
        }
    });
    
    // Nếu tìm thấy Trụ sở chỉ huy, ưu tiên tấn công nó
    if (headquartersTarget) {
        nearestTarget = headquartersTarget;
        nearestDist = headquartersDist;
    }
    
    // Check units
    gameState.units.forEach(unit => {
        const dist = Math.sqrt(
            Math.pow(unit.x - enemy.x, 2) + 
            Math.pow(unit.y - enemy.y, 2)
        );
        if (dist < nearestDist && dist <= enemy.range) {
            nearestDist = dist;
            nearestTarget = { type: 'unit', obj: unit };
        }
    });
    
    if (nearestTarget) {
        if (nearestDist <= enemy.range) {
            // Attack
            if (nearestTarget.type === 'building') {
                nearestTarget.obj.hp -= enemy.attack * (deltaTime / 1000);
                // Ensure HP doesn't go below 0
                if (nearestTarget.obj.hp < 0) {
                    nearestTarget.obj.hp = 0;
                }
            } else {
                nearestTarget.obj.hp -= enemy.attack * (deltaTime / 1000);
                // Ensure HP doesn't go below 0
                if (nearestTarget.obj.hp < 0) {
                    nearestTarget.obj.hp = 0;
                }
            }
        } else {
            // Move towards target
            const targetX = nearestTarget.type === 'building' ? 
                nearestTarget.obj.x + nearestTarget.obj.width/2 : nearestTarget.obj.x;
            const targetY = nearestTarget.type === 'building' ? 
                nearestTarget.obj.y + nearestTarget.obj.height/2 : nearestTarget.obj.y;
            
            const dx = targetX - enemy.x;
            const dy = targetY - enemy.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            enemy.x += (dx / dist) * enemy.speed * (deltaTime / 16);
            enemy.y += (dy / dist) * enemy.speed * (deltaTime / 16);
        }
    } else {
        // Move towards center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dx = centerX - enemy.x;
        const dy = centerY - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 5) {
            enemy.x += (dx / dist) * enemy.speed * (deltaTime / 16);
            enemy.y += (dy / dist) * enemy.speed * (deltaTime / 16);
        }
    }
}

// Find nearest resource
function findNearestResource(x, y) {
    let nearest = null;
    let nearestDist = Infinity;
    
    resourceNodes.forEach(node => {
        // Only find resources that are available (amount > 0)
        if (node.amount > 0) {
            const dist = Math.sqrt(
                Math.pow(node.x - x, 2) + 
                Math.pow(node.y - y, 2)
            );
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest = node;
            }
        }
    });
    
    return nearest;
}

// Render game
function renderGame() {
    // Clear canvas
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid();
    
    // Draw resource nodes
    resourceNodes.forEach(node => {
        if (node.amount > 0) {
            // Draw available resource
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(node.icon, node.x, node.y + 10);
            
            // Show amount
            ctx.font = '12px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(Math.floor(node.amount), node.x, node.y + 35);
        } else if (node.regenTime > 0) {
            // Draw regenerating resource (grayed out with progress)
            const timeLeft = Math.max(0, node.regenTime - Date.now());
            const regenPercent = 1 - (timeLeft / node.regenDelay);
            
            ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw regeneration progress circle
            ctx.strokeStyle = 'rgba(76, 222, 128, 0.6)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 30, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * regenPercent));
            ctx.stroke();
            
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillText(node.icon, node.x, node.y + 10);
            
            // Show time left
            ctx.font = '10px Arial';
            ctx.fillStyle = '#4ade80';
            const secondsLeft = Math.ceil(timeLeft / 1000);
            ctx.fillText(`${secondsLeft}s`, node.x, node.y + 35);
        }
    });
    
    // Draw buildings (only if HP > 0)
    gameState.buildings.forEach(building => {
        if (building.hp > 0) {
            drawBuilding(building);
        }
    });
    
    // Draw units
    gameState.units.forEach(unit => {
        drawUnit(unit);
    });
    
    // Draw enemies
    gameState.enemies.forEach(enemy => {
        drawEnemy(enemy);
    });
    
    // Draw build preview
    if (gameState.buildMode) {
        drawBuildPreview();
    }
    
    // Draw selection box
    if (gameState.isSelecting) {
        drawSelectionBox();
    }
}

// Draw selection box
function drawSelectionBox() {
    const minX = Math.min(gameState.selectionStart.x, gameState.selectionEnd.x);
    const maxX = Math.max(gameState.selectionStart.x, gameState.selectionEnd.x);
    const minY = Math.min(gameState.selectionStart.y, gameState.selectionEnd.y);
    const maxY = Math.max(gameState.selectionStart.y, gameState.selectionEnd.y);
    
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    
    ctx.fillStyle = 'rgba(76, 222, 128, 0.1)';
    ctx.fillRect(minX, minY, maxX - minX, maxY - minY);
    
    ctx.setLineDash([]);
}

// Draw grid
function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Draw building
function drawBuilding(building) {
    const def = buildingDefs[building.type];
    
    // Don't draw if destroyed
    if (building.hp <= 0) return;
    
    // Draw building (Trụ sở chỉ huy có màu đặc biệt)
    if (building.type === 'headquarters' || def.isHeadquarters) {
        // Trụ sở chỉ huy - màu vàng đặc biệt
        ctx.fillStyle = building.selected ? '#fbbf24' : '#f59e0b';
        ctx.fillRect(building.x, building.y, building.width, building.height);
        
        // Vẽ viền đỏ để nhấn mạnh
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.strokeRect(building.x - 2, building.y - 2, building.width + 4, building.height + 4);
        
        // Hiệu ứng nhấp nháy khi HP thấp
        if (building.hp < building.maxHp * 0.5) {
            const pulse = Math.sin(Date.now() / 300) * 0.3 + 0.7;
            ctx.fillStyle = `rgba(239, 68, 68, ${pulse})`;
            ctx.fillRect(building.x - 5, building.y - 5, building.width + 10, building.height + 10);
        }
    } else {
        ctx.fillStyle = building.selected ? '#4ade80' : '#8b5cf6';
        ctx.fillRect(building.x, building.y, building.width, building.height);
    }
    
    // Draw icon
    ctx.font = `${building.width * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(def.icon, building.x + building.width/2, building.y + building.height/2 + building.width * 0.2);
    
    // Draw HP bar (Trụ sở chỉ huy có thanh HP lớn hơn)
    const barWidth = (building.type === 'headquarters' || def.isHeadquarters) ? building.width + 20 : building.width;
    const barHeight = (building.type === 'headquarters' || def.isHeadquarters) ? 6 : 5;
    const hpPercent = building.hp / building.maxHp;
    
    if (building.hp < building.maxHp || building.type === 'headquarters') {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(building.x - ((building.type === 'headquarters') ? 10 : 0), building.y - 12, barWidth, barHeight);
        
        // Màu thanh HP: vàng cho trụ sở, xanh cho tòa nhà khác
        ctx.fillStyle = (building.type === 'headquarters' || def.isHeadquarters) ? '#fbbf24' : '#4ade80';
        ctx.fillRect(building.x - ((building.type === 'headquarters') ? 10 : 0), building.y - 12, barWidth * hpPercent, barHeight);
    }
    
    // Vẽ nhãn "BÁC" cho trụ sở chỉ huy
    if (building.type === 'headquarters' || def.isHeadquarters) {
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.strokeText('BÁC', building.x + building.width/2, building.y - 18);
        ctx.fillText('BÁC', building.x + building.width/2, building.y - 18);
    }
    
    // Draw build progress
    if (building.buildProgress < 100) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(building.x, building.y, building.width, building.height);
        
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(building.x, building.y, building.width * (building.buildProgress / 100), building.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
            Math.floor(building.buildProgress) + '%',
            building.x + building.width/2,
            building.y + building.height/2
        );
    }
    
    // Draw hospital healing range if selected
    if (building.type === 'hospital' && building.selected && building.buildProgress === 100) {
        const hospitalX = building.x + building.width / 2;
        const hospitalY = building.y + building.height / 2;
        ctx.strokeStyle = 'rgba(76, 222, 128, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(hospitalX, hospitalY, def.healRange, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Draw unit
function drawUnit(unit) {
    const def = unitDefs[unit.type];
    
    // Draw selection circle
    if (unit.selected) {
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(unit.x + unit.width/2, unit.y + unit.height/2, unit.width, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw unit
    ctx.fillStyle = unit.isHero ? '#fbbf24' : '#3b82f6';
    ctx.fillRect(unit.x, unit.y, unit.width, unit.height);
    
    // Draw icon
    ctx.font = `${unit.width * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(def.icon, unit.x + unit.width/2, unit.y + unit.height/2 + unit.width * 0.25);
    
    // Draw HP bar
    if (unit.hp < unit.maxHp) {
        const barWidth = unit.width;
        const barHeight = 3;
        const hpPercent = unit.hp / unit.maxHp;
        
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(unit.x, unit.y - 8, barWidth, barHeight);
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(unit.x, unit.y - 8, barWidth * hpPercent, barHeight);
    }
    
    // Draw attack range
    if (unit.selected && unit.range > 0) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(unit.x + unit.width/2, unit.y + unit.height/2, unit.range, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Draw enemy
function drawEnemy(enemy) {
    const def = enemyDefs[enemy.type];
    
    // Draw enemy (boss có màu đặc biệt)
    if (enemy.isFinalBoss) {
        // Boss có hiệu ứng đặc biệt
        ctx.fillStyle = '#8b0000'; // Màu đỏ đậm
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        // Vẽ viền vàng cho boss
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.strokeRect(enemy.x - 2, enemy.y - 2, enemy.width + 4, enemy.height + 4);
        
        // Hiệu ứng nhấp nháy
        const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(251, 191, 36, ${pulse})`;
        ctx.fillRect(enemy.x - 5, enemy.y - 5, enemy.width + 10, enemy.height + 10);
    } else {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
    
    // Draw icon
    ctx.font = `${enemy.width * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(def.icon, enemy.x + enemy.width/2, enemy.y + enemy.height/2 + enemy.width * 0.25);
    
    // Draw HP bar (boss có thanh HP lớn hơn)
    const barWidth = enemy.isFinalBoss ? enemy.width + 20 : enemy.width;
    const barHeight = enemy.isFinalBoss ? 6 : 3;
    const hpPercent = enemy.hp / enemy.maxHp;
    
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(enemy.x - (enemy.isFinalBoss ? 10 : 0), enemy.y - 12, barWidth, barHeight);
    ctx.fillStyle = enemy.isFinalBoss ? '#fbbf24' : '#4ade80';
    ctx.fillRect(enemy.x - (enemy.isFinalBoss ? 10 : 0), enemy.y - 12, barWidth * hpPercent, barHeight);
    
    // Vẽ tên boss
    if (enemy.isFinalBoss) {
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText(def.name, enemy.x + enemy.width/2, enemy.y - 20);
        ctx.fillText(def.name, enemy.x + enemy.width/2, enemy.y - 20);
    }
}

// Draw build preview
function drawBuildPreview() {
    // This would show where building will be placed
    // For now, just show cursor change
}

// Update UI
function updateUI() {
    document.getElementById('food-resource').textContent = Math.floor(gameState.resources.food);
    document.getElementById('wood-resource').textContent = Math.floor(gameState.resources.wood);
    document.getElementById('iron-resource').textContent = Math.floor(gameState.resources.iron);
    document.getElementById('population-current').textContent = gameState.population.current;
    document.getElementById('population-max').textContent = gameState.population.max;
    document.getElementById('unit-count').textContent = gameState.units.length;
    document.getElementById('building-count').textContent = gameState.buildings.filter(b => b.buildProgress === 100 && b.hp > 0).length;
    
    // Update wave counter
    const waveCounter = document.getElementById('wave-counter');
    if (waveCounter) {
        waveCounter.textContent = gameState.currentWave;
    }
    
    // Update boss indicator
    const bossIndicator = document.getElementById('boss-indicator');
    if (bossIndicator) {
        const bossAlive = gameState.enemies.some(e => e.isFinalBoss && e.hp > 0);
        if (bossAlive) {
            bossIndicator.style.display = 'inline';
            // Hiển thị HP boss
            const boss = gameState.enemies.find(e => e.isFinalBoss && e.hp > 0);
            if (boss) {
                bossIndicator.textContent = `👹 BOSS: ${Math.floor(boss.hp)}/${boss.maxHp}`;
            }
        } else {
            bossIndicator.style.display = 'none';
        }
    }
    
    // Update button states (bao gồm cập nhật giá)
    updateButtonStates();
    
    // Update unit cost displays
    updateUnitCostDisplays();
}

// Update unit cost displays
function updateUnitCostDisplays() {
    document.querySelectorAll('.train-btn').forEach(btn => {
        const unitType = btn.dataset.unit;
        const cost = getUnitCost(unitType);
        const costDisplay = btn.querySelector('.btn-cost');
        
        if (costDisplay) {
            let costText = '';
            if (cost.food > 0) costText += `🌾${cost.food} `;
            if (cost.wood > 0) costText += `🪵${cost.wood} `;
            if (cost.iron > 0) costText += `⚙️${cost.iron}`;
            costDisplay.textContent = costText.trim();
        }
    });
}

// Update button states
function updateButtonStates() {
    document.querySelectorAll('.build-btn').forEach(btn => {
        const buildingType = btn.dataset.building;
        const canAfford = canAffordBuilding(buildingType);
        btn.disabled = !canAfford;
    });
    
    document.querySelectorAll('.train-btn').forEach(btn => {
        const unitType = btn.dataset.unit;
        const def = unitDefs[unitType];
        const cost = getUnitCost(unitType);
        
        // Update cost display
        const costDisplay = btn.querySelector('.btn-cost');
        if (costDisplay) {
            let costText = '';
            if (cost.food > 0) costText += `🌾${cost.food} `;
            if (cost.wood > 0) costText += `🪵${cost.wood} `;
            if (cost.iron > 0) costText += `⚙️${cost.iron}`;
            costDisplay.textContent = costText.trim();
        }
        
        const canAfford = 
            gameState.resources.food >= cost.food &&
            gameState.resources.wood >= cost.wood &&
            gameState.resources.iron >= cost.iron &&
            gameState.population.current + def.population <= gameState.population.max;
        btn.disabled = !canAfford;
    });
}

// Update game time
function updateGameTime() {
    const minutes = Math.floor(gameState.gameTime / 60);
    const seconds = Math.floor(gameState.gameTime % 60);
    document.getElementById('game-time').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Toggle pause
function togglePause() {
    gameState.paused = !gameState.paused;
    const btn = document.getElementById('pause-btn');
    btn.textContent = gameState.paused ? '▶️ Tiếp tục' : '⏸️ Tạm dừng';
}

// Toggle speed
function toggleSpeed() {
    gameState.speed = gameState.speed === 1 ? 2 : gameState.speed === 2 ? 0.5 : 1;
    const btn = document.getElementById('speed-btn');
    btn.textContent = `⚡ Tốc độ: ${gameState.speed}x`;
}

// Show notification
function showNotification(message, type = '') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    updateUI();
    updateTechDisplay();
});

