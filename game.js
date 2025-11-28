// Game State
const gameState = {
    day: 1,
    money: 100,
    score: 0,
    resources: 50,
    maxDays: 7,
    currentQueue: [],
    queueIndex: 0,
    decisions: [],
    resourceAllocations: {
        health: 10,
        security: 10,
        food: 10,
        infrastructure: 10
    },
    stats: {
        approved: 0,
        rejected: 0,
        detained: 0,
        spiesCaught: 0,
        mistakes: 0
    }
};

// Dữ liệu người xin vào căn cứ
const applicants = [
    // Người hợp pháp
    {
        name: "Nguyễn Văn A",
        id: "001234567890",
        job: "Kỹ sư",
        reason: "Công tác bảo trì thiết bị",
        papers: "CMND, Giấy giới thiệu",
        isSpy: false,
        suspicious: []
    },
    {
        name: "Trần Thị B",
        id: "001234567891",
        job: "Bác sĩ",
        reason: "Khám sức khỏe định kỳ",
        papers: "CMND, Bằng cấp y tế",
        isSpy: false,
        suspicious: []
    },
    {
        name: "Lê Văn C",
        id: "001234567892",
        job: "Nhân viên cấp dưỡng",
        reason: "Giao thực phẩm",
        papers: "CMND, Hợp đồng",
        isSpy: false,
        suspicious: []
    },
    // Gián điệp - ID không hợp lệ
    {
        name: "Phạm Văn D",
        id: "00123456789X", // ID có ký tự không hợp lệ
        job: "Nhà báo",
        reason: "Phỏng vấn",
        papers: "CMND",
        isSpy: true,
        suspicious: ["ID có ký tự không hợp lệ (X)"]
    },
    // Gián điệp - Giấy tờ không đầy đủ
    {
        name: "Hoàng Thị E",
        id: "001234567893",
        job: "Nhà nghiên cứu",
        reason: "Nghiên cứu khoa học",
        papers: "CMND", // Thiếu giấy giới thiệu
        isSpy: true,
        suspicious: ["Thiếu giấy giới thiệu từ cơ quan"]
    },
    // Gián điệp - Nghề nghiệp không phù hợp
    {
        name: "Vũ Văn F",
        id: "001234567894",
        job: "Du lịch",
        reason: "Tham quan căn cứ",
        papers: "CMND, Hộ chiếu",
        isSpy: true,
        suspicious: ["Lý do không hợp lý cho căn cứ quân sự"]
    },
    // Gián điệp - Thông tin mâu thuẫn
    {
        name: "Đặng Thị G",
        id: "001234567895",
        job: "Giáo viên",
        reason: "Dạy học",
        papers: "CMND, Bằng sư phạm",
        isSpy: true,
        suspicious: ["Không có lý do hợp lý để vào căn cứ quân sự"]
    },
    // Người hợp pháp nhưng có vấn đề nhỏ
    {
        name: "Bùi Văn H",
        id: "001234567896",
        job: "Thợ điện",
        reason: "Sửa chữa hệ thống điện",
        papers: "CMND, Giấy phép hành nghề",
        isSpy: false,
        suspicious: ["Giấy phép sắp hết hạn"]
    },
    // Gián điệp - ID trùng lặp
    {
        name: "Ngô Thị I",
        id: "001234567890", // Trùng với người đầu tiên
        job: "Kế toán",
        reason: "Kiểm toán",
        papers: "CMND, Giấy giới thiệu",
        isSpy: true,
        suspicious: ["ID trùng với người đã được duyệt trước đó"]
    },
    // Người hợp pháp
    {
        name: "Đinh Văn K",
        id: "001234567897",
        job: "Lái xe",
        reason: "Vận chuyển hàng hóa",
        papers: "CMND, Bằng lái xe",
        isSpy: false,
        suspicious: []
    }
];

// Tình huống đặc biệt
const specialSituations = [
    {
        title: "Tình huống khẩn cấp",
        text: "Có một nhóm người tị nạn đến căn cứ, họ không có giấy tờ đầy đủ nhưng khẳng định đang bị truy đuổi. Bạn sẽ làm gì?",
        options: [
            {
                text: "Cho họ vào ngay lập tức vì tình huống khẩn cấp",
                effects: { resources: -10, score: 20, security: -5 }
            },
            {
                text: "Yêu cầu họ chờ đợi để kiểm tra kỹ lưỡng",
                effects: { resources: -5, score: 10, security: 5 }
            },
            {
                text: "Từ chối vì không có giấy tờ hợp lệ",
                effects: { resources: 0, score: -10, security: 10 }
            }
        ]
    },
    {
        title: "Thiếu hụt tài nguyên",
        text: "Căn cứ đang thiếu hụt nghiêm trọng về lương thực. Bạn phải quyết định ưu tiên cung cấp cho ai?",
        options: [
            {
                text: "Ưu tiên cho nhân viên quan trọng",
                effects: { resources: -15, score: 15, food: -10 }
            },
            {
                text: "Chia đều cho tất cả mọi người",
                effects: { resources: -20, score: 25, food: -15 }
            },
            {
                text: "Giảm khẩu phần để tiết kiệm",
                effects: { resources: -5, score: -5, food: -5 }
            }
        ]
    },
    {
        title: "Nghi ngờ đồng nghiệp",
        text: "Một đồng nghiệp của bạn có hành vi đáng ngờ. Bạn nghi ngờ họ có thể là gián điệp. Bạn sẽ làm gì?",
        options: [
            {
                text: "Báo cáo ngay lập tức cho cấp trên",
                effects: { resources: 0, score: 30, security: 10 }
            },
            {
                text: "Theo dõi thêm trước khi báo cáo",
                effects: { resources: -5, score: 15, security: 5 }
            },
            {
                text: "Bỏ qua vì không có bằng chứng",
                effects: { resources: 0, score: -20, security: -10 }
            }
        ]
    },
    {
        title: "Thông tin mật bị rò rỉ",
        text: "Có thông tin cho rằng dữ liệu mật của căn cứ đã bị rò rỉ. Bạn cần quyết định cách xử lý.",
        options: [
            {
                text: "Khóa tất cả quyền truy cập và điều tra",
                effects: { resources: -10, score: 20, security: 15 }
            },
            {
                text: "Tăng cường an ninh nhưng vẫn hoạt động bình thường",
                effects: { resources: -5, score: 10, security: 10 }
            },
            {
                text: "Bỏ qua vì chưa có bằng chứng cụ thể",
                effects: { resources: 0, score: -15, security: -15 }
            }
        ]
    },
    {
        title: "Người thân cần giúp đỡ",
        text: "Một người thân của bạn đến xin vào căn cứ nhưng không có giấy tờ đầy đủ. Họ khẳng định đang gặp nguy hiểm.",
        options: [
            {
                text: "Cho họ vào vì là người thân",
                effects: { resources: -5, score: -10, security: -10 }
            },
            {
                text: "Xử lý như mọi người khác - yêu cầu giấy tờ đầy đủ",
                effects: { resources: 0, score: 15, security: 5 }
            },
            {
                text: "Tìm cách giúp đỡ họ mà không vi phạm quy định",
                effects: { resources: -10, score: 25, security: 0 }
            }
        ]
    }
];

// DOM Elements
const elements = {
    // Screens
    welcomeScreen: document.getElementById('welcome-screen'),
    documentScreen: document.getElementById('document-screen'),
    resourceScreen: document.getElementById('resource-screen'),
    decisionScreen: document.getElementById('decision-screen'),
    endingScreen: document.getElementById('ending-screen'),
    
    // Stats
    dayCounter: document.getElementById('day-counter'),
    moneyCounter: document.getElementById('money-counter'),
    scoreCounter: document.getElementById('score-counter'),
    resourcesCounter: document.getElementById('resources-counter'),
    
    // Document review
    currentDay: document.getElementById('current-day'),
    docName: document.getElementById('doc-name'),
    docId: document.getElementById('doc-id'),
    docJob: document.getElementById('doc-job'),
    docReason: document.getElementById('doc-reason'),
    docPapers: document.getElementById('doc-papers'),
    warningSigns: document.getElementById('warning-signs'),
    queueCount: document.getElementById('queue-count'),
    approveBtn: document.getElementById('approve-btn'),
    rejectBtn: document.getElementById('reject-btn'),
    detainBtn: document.getElementById('detain-btn'),
    
    // Resource allocation
    availableResources: document.getElementById('available-resources'),
    healthResource: document.getElementById('health-resource'),
    healthValue: document.getElementById('health-value'),
    securityResource: document.getElementById('security-resource'),
    securityValue: document.getElementById('security-value'),
    foodResource: document.getElementById('food-resource'),
    foodValue: document.getElementById('food-value'),
    infraResource: document.getElementById('infra-resource'),
    infraValue: document.getElementById('infra-value'),
    totalAllocated: document.getElementById('total-allocated'),
    maxResources: document.getElementById('max-resources'),
    confirmResourcesBtn: document.getElementById('confirm-resources-btn'),
    
    // Decision
    situationText: document.getElementById('situation-text'),
    decisionOptions: document.getElementById('decision-options'),
    
    // Ending
    endingTitle: document.getElementById('ending-title'),
    endingDescription: document.getElementById('ending-description'),
    endingStatsList: document.getElementById('ending-stats-list'),
    
    // Buttons
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    
    // Notification
    notification: document.getElementById('notification')
};

// Initialize game
function initGame() {
    showScreen('welcome-screen');
    updateStats();
    
    // Event listeners
    elements.startBtn.addEventListener('click', startGame);
    elements.restartBtn.addEventListener('click', restartGame);
    elements.approveBtn.addEventListener('click', () => handleDocumentDecision('approve'));
    elements.rejectBtn.addEventListener('click', () => handleDocumentDecision('reject'));
    elements.detainBtn.addEventListener('click', () => handleDocumentDecision('detain'));
    
    // Resource sliders
    elements.healthResource.addEventListener('input', () => updateResourceSlider('health'));
    elements.securityResource.addEventListener('input', () => updateResourceSlider('security'));
    elements.foodResource.addEventListener('input', () => updateResourceSlider('food'));
    elements.infraResource.addEventListener('input', () => updateResourceSlider('infrastructure'));
    
    elements.confirmResourcesBtn.addEventListener('click', confirmResourceAllocation);
}

// Show specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Update stats display
function updateStats() {
    elements.dayCounter.textContent = gameState.day;
    elements.moneyCounter.textContent = gameState.money;
    elements.scoreCounter.textContent = gameState.score;
    elements.resourcesCounter.textContent = gameState.resources;
}

// Start game
function startGame() {
    gameState.day = 1;
    gameState.money = 100;
    gameState.score = 0;
    gameState.resources = 50;
    gameState.queueIndex = 0;
    gameState.decisions = [];
    gameState.stats = {
        approved: 0,
        rejected: 0,
        detained: 0,
        spiesCaught: 0,
        mistakes: 0
    };
    
    startDay();
}

// Start a new day
function startDay() {
    updateStats();
    elements.currentDay.textContent = gameState.day;
    
    // Generate queue for the day
    generateQueue();
    
    // Show document review screen
    showScreen('document-screen');
    showNextApplicant();
}

// Generate queue of applicants
function generateQueue() {
    const queueSize = 5 + Math.floor(Math.random() * 3); // 5-7 applicants per day
    gameState.currentQueue = [];
    
    for (let i = 0; i < queueSize; i++) {
        const applicant = JSON.parse(JSON.stringify(
            applicants[Math.floor(Math.random() * applicants.length)]
        ));
        // Add some random variations
        if (Math.random() < 0.3) {
            applicant.suspicious.push("Hành vi lo lắng, đổ mồ hôi");
        }
        gameState.currentQueue.push(applicant);
    }
    
    gameState.queueIndex = 0;
    updateQueueCount();
}

// Show next applicant
function showNextApplicant() {
    if (gameState.queueIndex >= gameState.currentQueue.length) {
        // End of queue, move to resource allocation
        showResourceScreen();
        return;
    }
    
    const applicant = gameState.currentQueue[gameState.queueIndex];
    
    elements.docName.textContent = applicant.name;
    elements.docId.textContent = applicant.id;
    elements.docJob.textContent = applicant.job;
    elements.docReason.textContent = applicant.reason;
    elements.docPapers.textContent = applicant.papers;
    
    // Show warning signs
    if (applicant.suspicious.length > 0) {
        elements.warningSigns.innerHTML = '<strong>⚠️ Dấu hiệu đáng ngờ:</strong><br>' +
            applicant.suspicious.map(s => `<div class="warning-sign">• ${s}</div>`).join('');
        elements.warningSigns.style.display = 'block';
    } else {
        elements.warningSigns.innerHTML = '';
        elements.warningSigns.style.display = 'none';
    }
    
    updateQueueCount();
}

// Update queue count
function updateQueueCount() {
    const remaining = gameState.currentQueue.length - gameState.queueIndex - 1;
    elements.queueCount.textContent = remaining;
}

// Handle document decision
function handleDocumentDecision(decision) {
    const applicant = gameState.currentQueue[gameState.queueIndex];
    let message = '';
    let isCorrect = false;
    
    if (decision === 'approve') {
        gameState.stats.approved++;
        if (applicant.isSpy) {
            // Wrong decision - approved a spy
            gameState.stats.mistakes++;
            gameState.score -= 30;
            gameState.money -= 20;
            gameState.resources -= 10;
            message = '❌ Bạn đã cho phép một gián điệp vào căn cứ!';
            showNotification(message, 'error');
        } else {
            // Correct decision
            isCorrect = true;
            gameState.score += 10;
            gameState.money += 5;
            message = '✅ Chấp nhận đúng người!';
            showNotification(message, 'success');
        }
    } else if (decision === 'reject') {
        gameState.stats.rejected++;
        if (applicant.isSpy) {
            // Correct decision - rejected a spy
            isCorrect = true;
            gameState.score += 15;
            gameState.money += 3;
            message = '✅ Từ chối đúng - đó là gián điệp!';
            showNotification(message, 'success');
        } else {
            // Wrong decision - rejected innocent person
            gameState.stats.mistakes++;
            gameState.score -= 10;
            message = '⚠️ Bạn đã từ chối một người hợp pháp';
            showNotification(message, 'warning');
        }
    } else if (decision === 'detain') {
        gameState.stats.detained++;
        if (applicant.isSpy) {
            // Correct decision - caught a spy
            isCorrect = true;
            gameState.stats.spiesCaught++;
            gameState.score += 30;
            gameState.money += 10;
            message = '🎯 Bạn đã bắt được gián điệp!';
            showNotification(message, 'success');
        } else {
            // Wrong decision - detained innocent person
            gameState.stats.mistakes++;
            gameState.score -= 20;
            gameState.money -= 15;
            message = '❌ Bạn đã bắt giữ nhầm người vô tội!';
            showNotification(message, 'error');
        }
    }
    
    gameState.queueIndex++;
    updateStats();
    
    // Wait a bit before showing next applicant
    setTimeout(() => {
        showNextApplicant();
    }, 1000);
}

// Show resource allocation screen
function showResourceScreen() {
    showScreen('resource-screen');
    elements.availableResources.textContent = gameState.resources;
    elements.maxResources.textContent = gameState.resources;
    
    // Set max values for sliders
    elements.healthResource.max = gameState.resources;
    elements.securityResource.max = gameState.resources;
    elements.foodResource.max = gameState.resources;
    elements.infraResource.max = gameState.resources;
    
    // Reset to default values
    const defaultAllocation = Math.floor(gameState.resources / 4);
    elements.healthResource.value = defaultAllocation;
    elements.securityResource.value = defaultAllocation;
    elements.foodResource.value = defaultAllocation;
    elements.infraResource.value = defaultAllocation;
    
    updateResourceSlider('health');
    updateResourceSlider('security');
    updateResourceSlider('food');
    updateResourceSlider('infrastructure');
}

// Update resource slider display
function updateResourceSlider(type) {
    let slider, valueDisplay, value;
    
    switch(type) {
        case 'health':
            slider = elements.healthResource;
            valueDisplay = elements.healthValue;
            value = parseInt(slider.value);
            break;
        case 'security':
            slider = elements.securityResource;
            valueDisplay = elements.securityValue;
            value = parseInt(slider.value);
            break;
        case 'food':
            slider = elements.foodResource;
            valueDisplay = elements.foodValue;
            value = parseInt(slider.value);
            break;
        case 'infrastructure':
            slider = elements.infraResource;
            valueDisplay = elements.infraValue;
            value = parseInt(slider.value);
            break;
    }
    
    valueDisplay.textContent = value;
    updateResourceTotal();
}

// Update resource total
function updateResourceTotal() {
    const total = parseInt(elements.healthResource.value) +
                 parseInt(elements.securityResource.value) +
                 parseInt(elements.foodResource.value) +
                 parseInt(elements.infraResource.value);
    
    elements.totalAllocated.textContent = total;
    
    if (total > gameState.resources) {
        elements.totalAllocated.style.color = '#dc3545';
        elements.confirmResourcesBtn.disabled = true;
    } else {
        elements.totalAllocated.style.color = '#1e3c72';
        elements.confirmResourcesBtn.disabled = false;
    }
}

// Confirm resource allocation
function confirmResourceAllocation() {
    const total = parseInt(elements.healthResource.value) +
                 parseInt(elements.securityResource.value) +
                 parseInt(elements.foodResource.value) +
                 parseInt(elements.infraResource.value);
    
    if (total > gameState.resources) {
        showNotification('Tổng tài nguyên phân bổ vượt quá số lượng có!', 'error');
        return;
    }
    
    gameState.resourceAllocations.health = parseInt(elements.healthResource.value);
    gameState.resourceAllocations.security = parseInt(elements.securityResource.value);
    gameState.resourceAllocations.food = parseInt(elements.foodResource.value);
    gameState.resourceAllocations.infrastructure = parseInt(elements.infraResource.value);
    
    // Calculate effects
    const healthBonus = gameState.resourceAllocations.health * 0.5;
    const securityBonus = gameState.resourceAllocations.security * 0.3;
    const foodBonus = gameState.resourceAllocations.food * 0.4;
    const infraBonus = gameState.resourceAllocations.infrastructure * 0.2;
    
    gameState.score += Math.floor(healthBonus + securityBonus + foodBonus + infraBonus);
    gameState.resources -= total;
    
    // Check for special situation
    if (Math.random() < 0.4 || gameState.day === 3 || gameState.day === 5) {
        showSpecialSituation();
    } else {
        endDay();
    }
}

// Show special situation
function showSpecialSituation() {
    const situation = specialSituations[Math.floor(Math.random() * specialSituations.length)];
    
    elements.situationText.innerHTML = `<h3>${situation.title}</h3><p>${situation.text}</p>`;
    elements.decisionOptions.innerHTML = '';
    
    situation.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'decision-option';
        optionDiv.innerHTML = `
            <h3>Lựa chọn ${index + 1}</h3>
            <p>${option.text}</p>
        `;
        optionDiv.addEventListener('click', () => handleSpecialDecision(option));
        elements.decisionOptions.appendChild(optionDiv);
    });
    
    showScreen('decision-screen');
}

// Handle special decision
function handleSpecialDecision(option) {
    gameState.decisions.push(option.text);
    
    // Apply effects
    if (option.effects.resources !== undefined) {
        gameState.resources += option.effects.resources;
    }
    if (option.effects.score !== undefined) {
        gameState.score += option.effects.score;
    }
    if (option.effects.security !== undefined) {
        gameState.resourceAllocations.security += option.effects.security;
    }
    if (option.effects.food !== undefined) {
        gameState.resourceAllocations.food += option.effects.food;
    }
    
    // Ensure values don't go negative
    gameState.resources = Math.max(0, gameState.resources);
    gameState.score = Math.max(0, gameState.score);
    gameState.resourceAllocations.security = Math.max(0, gameState.resourceAllocations.security);
    gameState.resourceAllocations.food = Math.max(0, gameState.resourceAllocations.food);
    
    updateStats();
    showNotification('Quyết định đã được ghi nhận', 'success');
    
    setTimeout(() => {
        endDay();
    }, 1500);
}

// End day
function endDay() {
    gameState.day++;
    
    // Add daily resources
    gameState.resources += 20 + Math.floor(Math.random() * 10);
    
    // Daily expenses
    gameState.money -= 15;
    
    if (gameState.money < 0 || gameState.resources < 0) {
        showEnding('bad');
    } else if (gameState.day > gameState.maxDays) {
        showEnding('normal');
    } else {
        startDay();
    }
}

// Show ending
function showEnding(type) {
    showScreen('ending-screen');
    
    let title, description;
    
    if (type === 'bad') {
        title = 'Kết thúc tồi tệ';
        description = 'Bạn đã thất bại trong nhiệm vụ. Căn cứ rơi vào tình trạng hỗn loạn do thiếu tài nguyên hoặc quản lý kém.';
    } else {
        // Determine ending based on score and stats
        if (gameState.score >= 200 && gameState.stats.spiesCaught >= 3 && gameState.stats.mistakes <= 2) {
            title = 'Kết thúc xuất sắc';
            description = 'Bạn đã hoàn thành xuất sắc nhiệm vụ! Căn cứ được bảo vệ an toàn, nhiều gián điệp đã bị bắt, và bạn đã đưa ra những quyết định đúng đắn.';
        } else if (gameState.score >= 100 && gameState.stats.spiesCaught >= 2) {
            title = 'Kết thúc tốt';
            description = 'Bạn đã hoàn thành tốt nhiệm vụ. Căn cứ được bảo vệ và bạn đã bắt được một số gián điệp.';
        } else if (gameState.score >= 50) {
            title = 'Kết thúc bình thường';
            description = 'Bạn đã hoàn thành nhiệm vụ ở mức độ trung bình. Căn cứ vẫn hoạt động nhưng có một số vấn đề.';
        } else {
            title = 'Kết thúc kém';
            description = 'Bạn đã hoàn thành nhiệm vụ nhưng với kết quả không tốt. Nhiều sai sót đã xảy ra trong quá trình làm việc.';
        }
    }
    
    elements.endingTitle.textContent = title;
    elements.endingDescription.textContent = description;
    
    // Show stats
    elements.endingStatsList.innerHTML = `
        <li>Điểm số: ${gameState.score}</li>
        <li>Số ngày: ${gameState.day - 1}</li>
        <li>Tiền còn lại: ${gameState.money}₫</li>
        <li>Tài nguyên còn lại: ${gameState.resources}</li>
        <li>Đã chấp nhận: ${gameState.stats.approved} người</li>
        <li>Đã từ chối: ${gameState.stats.rejected} người</li>
        <li>Đã bắt giữ: ${gameState.stats.detained} người</li>
        <li>Gián điệp bắt được: ${gameState.stats.spiesCaught}</li>
        <li>Sai sót: ${gameState.stats.mistakes}</li>
    `;
}

// Restart game
function restartGame() {
    startGame();
}

// Show notification
function showNotification(message, type = '') {
    elements.notification.textContent = message;
    elements.notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        elements.notification.classList.remove('show');
    }, 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initGame);

