/**
 * Chess Training Planner — Pomodoro Timer & Time Tracking
 * Features:
 * - Pomodoro timer with configurable work/break durations
 * - Manual time entry for actual study time
 * - Category-based time aggregation
 * - Persistent time logs in localStorage
 */

const TimerModule = {
  // Timer state
  isRunning: false,
  isPaused: false,
  startTime: null,
  elapsed: 0, // ms
  currentSlotId: null,
  currentSlotType: null,
  currentSlotTitle: '',
  timerInterval: null,
  pomodoroMode: 'work', // 'work' | 'break'
  pomodoroCount: 0,

  // Pomodoro config (in minutes)
  config: {
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLong: 4
  },

  // ═══ Timer Controls ═══

  start(slotId, slotType, slotTitle) {
    if (this.isRunning && this.currentSlotId !== slotId) {
      // Stop previous timer first
      this.stop();
    }
    this.currentSlotId = slotId;
    this.currentSlotType = slotType;
    this.currentSlotTitle = slotTitle;
    this.isRunning = true;
    this.isPaused = false;
    this.startTime = Date.now();
    this.elapsed = 0;
    this.pomodoroMode = 'work';

    this.timerInterval = setInterval(() => this.tick(), 1000);
    this.updateTimerUI();

    // Vibrate if available
    if (navigator.vibrate) navigator.vibrate(50);
  },

  pause() {
    if (!this.isRunning) return;
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.elapsed += Date.now() - this.startTime;
      clearInterval(this.timerInterval);
    } else {
      this.startTime = Date.now();
      this.timerInterval = setInterval(() => this.tick(), 1000);
    }
    this.updateTimerUI();
    if (navigator.vibrate) navigator.vibrate(30);
  },

  stop() {
    if (!this.isRunning) return;
    if (!this.isPaused) {
      this.elapsed += Date.now() - this.startTime;
    }
    clearInterval(this.timerInterval);

    const minutes = Math.round(this.elapsed / 60000);
    const slotId = this.currentSlotId;
    const slotType = this.currentSlotType;
    const slotTitle = this.currentSlotTitle;

    this.isRunning = false;
    this.isPaused = false;
    this.elapsed = 0;
    this.currentSlotId = null;
    this.currentSlotType = null;
    this.currentSlotTitle = '';
    this.pomodoroCount = 0;
    this.updateTimerUI();

    if (minutes > 0) {
      this.showStopConfirm(slotId, slotType, slotTitle, minutes);
    }

    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
  },

  // Show confirmation modal after stopping timer — allows task type override
  showStopConfirm(slotId, slotType, slotTitle, minutes) {
    const formHtml = `
      <div class="form-group">
        <div style="text-align:center;margin-bottom:12px;">
          <div style="font-size:28px;font-weight:700;color:var(--gold);">${this.formatTime(minutes * 60000)}</div>
          <div style="font-size:13px;color:var(--text-dim);margin-top:4px;">${slotTitle}</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">🔄 Nhiệm vụ thực tế</label>
        <select class="form-input" id="modal-override-type" style="padding:10px;">
          ${this.renderTypeOptions(slotType)}
        </select>
        <div style="font-size:11px;color:var(--text-dim);margin-top:4px;">Nếu bạn làm nhiệm vụ khác với lịch, hãy đổi lại cho chính xác</div>
      </div>
      <div class="form-group" style="margin-top:8px;">
        <label class="form-label">📝 Ghi chú (tùy chọn)</label>
        <input class="form-input" id="modal-stop-note" placeholder="VD: Học được 3 biến mới...">
      </div>
    `;

    App.showModal(`⏹️ Lưu Phiên Học — ${minutes} phút`, formHtml, () => {
      const overrideType = document.getElementById('modal-override-type').value;
      const note = document.getElementById('modal-stop-note').value.trim();
      this.saveTimeLog(slotId, slotType, slotTitle, minutes, note, overrideType !== slotType ? overrideType : null);
      App.closeModal();
      const actualLabel = this.getCategoryLabel(this.getCategory(overrideType || slotType));
      App.showToast(`⏱️ Đã ghi ${minutes} phút — ${actualLabel}`);
      App.renderCurrentPage();
    });
  },

  tick() {
    const total = this.elapsed + (Date.now() - this.startTime);
    const totalSec = Math.floor(total / 1000);
    const pomodoroSec = this.config.workDuration * 60;

    // Check pomodoro completion
    if (this.pomodoroMode === 'work' && totalSec > 0 && totalSec % pomodoroSec === 0) {
      this.pomodoroCount++;
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

      // Auto-notify
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🍅 Pomodoro hoàn thành!', {
          body: `${this.currentSlotTitle} — ${this.pomodoroCount} pomodoro`,
          icon: 'icons/icon-192.png'
        });
      }
    }

    this.updateTimerUI();
  },

  getElapsedMs() {
    if (!this.isRunning) return 0;
    if (this.isPaused) return this.elapsed;
    return this.elapsed + (Date.now() - this.startTime);
  },

  formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hours > 0) {
      return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  },

  // ═══ Timer UI ═══

  updateTimerUI() {
    const container = document.getElementById('floating-timer');
    if (!container) return;

    if (!this.isRunning) {
      container.classList.add('hidden');
      return;
    }

    container.classList.remove('hidden');
    const elapsed = this.getElapsedMs();
    const timeStr = this.formatTime(elapsed);
    const pomoDone = this.pomodoroCount;
    const pomoIcons = '🍅'.repeat(Math.min(pomoDone, 8));

    container.innerHTML = `
      <div class="timer-info">
        <div class="timer-slot-title">${this.currentSlotTitle}</div>
        <div class="timer-display ${this.isPaused ? 'paused' : ''}">${timeStr}</div>
        ${pomoDone > 0 ? `<div class="timer-pomo">${pomoIcons} ×${pomoDone}</div>` : ''}
      </div>
      <div class="timer-controls">
        <button class="timer-btn" onclick="TimerModule.pause()" title="${this.isPaused ? 'Tiếp tục' : 'Tạm dừng'}">
          ${this.isPaused ? '▶️' : '⏸️'}
        </button>
        <button class="timer-btn timer-btn-stop" onclick="TimerModule.stop()" title="Dừng & lưu">
          ⏹️
        </button>
      </div>
    `;
  },

  // ═══ Manual Time Entry ═══

  showManualEntry(slotId, slotType, slotTitle) {
    const formHtml = `
      <div class="form-group">
        <label class="form-label">⏱️ Thời gian thực tế (phút)</label>
        <div style="display:flex;gap:8px;margin-bottom:10px;">
          <input class="form-input" type="number" id="modal-time-input" placeholder="VD: 45" min="1" max="600" style="flex:1;">
          <span style="align-self:center;color:var(--text-dim);font-size:13px;">phút</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button class="tag-btn" onclick="document.getElementById('modal-time-input').value='15'">15p</button>
          <button class="tag-btn" onclick="document.getElementById('modal-time-input').value='25'">25p</button>
          <button class="tag-btn" onclick="document.getElementById('modal-time-input').value='30'">30p</button>
          <button class="tag-btn" onclick="document.getElementById('modal-time-input').value='45'">45p</button>
          <button class="tag-btn" onclick="document.getElementById('modal-time-input').value='60'">60p</button>
          <button class="tag-btn" onclick="document.getElementById('modal-time-input').value='90'">90p</button>
          <button class="tag-btn" onclick="document.getElementById('modal-time-input').value='120'">120p</button>
        </div>
      </div>
      <div class="form-group" style="margin-top:12px;">
        <label class="form-label">🔄 Nhiệm vụ thực tế</label>
        <select class="form-input" id="modal-override-type" style="padding:10px;">
          ${this.renderTypeOptions(slotType)}
        </select>
        <div style="font-size:11px;color:var(--text-dim);margin-top:4px;">Đổi nếu bạn làm khác với lịch</div>
      </div>
      <div class="form-group" style="margin-top:8px;">
        <label class="form-label">📝 Ghi chú (tùy chọn)</label>
        <input class="form-input" id="modal-time-note" placeholder="VD: Học được 3 biến mới...">
      </div>
    `;

    App.showModal(`⏱️ Ghi Thời Gian — ${slotTitle}`, formHtml, () => {
      const minutes = parseInt(document.getElementById('modal-time-input').value);
      if (!minutes || minutes < 1) {
        App.showToast('⚠️ Nhập số phút hợp lệ');
        return;
      }
      const overrideType = document.getElementById('modal-override-type').value;
      const note = document.getElementById('modal-time-note').value.trim();
      this.saveTimeLog(slotId, slotType, slotTitle, minutes, note, overrideType !== slotType ? overrideType : null);
      App.closeModal();
      const actualLabel = this.getCategoryLabel(this.getCategory(overrideType || slotType));
      App.showToast(`⏱️ Đã ghi ${minutes} phút — ${actualLabel}`);
      App.renderCurrentPage();
    });
  },

  // ═══ Task Type Override Helper ═══

  renderTypeOptions(currentType) {
    const types = TRAINING_CONFIG.slotTypes;
    const skipTypes = ['meal', 'rest'];
    let html = '';
    for (const [key, info] of Object.entries(types)) {
      if (skipTypes.includes(key)) continue;
      const selected = key === currentType ? 'selected' : '';
      html += `<option value="${key}" ${selected}>${info.label}</option>`;
    }
    return html;
  },

  // ═══ Time Data Management ═══

  // Category mapping from slot types
  getCategory(slotType) {
    const map = {
      'opening': 'opening',
      'middlegame': 'middlegame',
      'endgame': 'endgame',
      'tactics': 'tactics',
      'play': 'play',
      'study': 'study',
      'review': 'review',
      'mixed': 'mixed',
      'teaching': 'teaching',
      'exercise': 'exercise'
    };
    return map[slotType] || 'other';
  },

  getCategoryLabel(category) {
    const labels = {
      'opening': '♟️ Khai cuộc',
      'middlegame': '♟️ Trung cuộc',
      'endgame': '♟️ Tàn cuộc',
      'tactics': '🧩 Chiến thuật',
      'play': '⚔️ Thi đấu',
      'study': '📺 Nghiên cứu',
      'review': '📊 Ôn tập',
      'mixed': '♟️ Tổng hợp',
      'teaching': '👨‍🏫 Dạy cờ',
      'exercise': '🏃 Thể dục',
      'other': '📌 Khác'
    };
    return labels[category] || category;
  },

  getCategoryColor(category) {
    const colors = {
      'opening': 'var(--blue)',
      'middlegame': 'var(--purple)',
      'endgame': 'var(--orange)',
      'tactics': '#FF9800',
      'play': 'var(--red)',
      'study': 'var(--cyan)',
      'review': '#607D8B',
      'mixed': '#795548',
      'teaching': '#8BC34A',
      'exercise': 'var(--green)',
      'other': 'var(--text-dim)'
    };
    return colors[category] || 'var(--text-dim)';
  },

  saveTimeLog(slotId, slotType, slotTitle, minutes, note = '', overrideType = null) {
    const logs = this.getTimeLogs();
    const today = new Date().toISOString().slice(0, 10);
    const actualType = overrideType || slotType;
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      date: today,
      timestamp: new Date().toISOString(),
      slotId,
      slotType: actualType,
      slotTitle,
      category: this.getCategory(actualType),
      minutes,
      note,
      week: typeof getCurrentWeek === 'function' ? getCurrentWeek() : 0,
      phase: typeof getCurrentPhase === 'function' ? getCurrentPhase().id : 0
    };
    // Save original type if overridden
    if (overrideType && overrideType !== slotType) {
      entry.originalType = slotType;
    }
    logs.push(entry);
    localStorage.setItem('chess_time_logs', JSON.stringify(logs));
  },

  getTimeLogs() {
    return JSON.parse(localStorage.getItem('chess_time_logs') || '[]');
  },

  deleteTimeLog(logId) {
    let logs = this.getTimeLogs();
    logs = logs.filter(l => l.id !== logId);
    localStorage.setItem('chess_time_logs', JSON.stringify(logs));
  },

  // ═══ Aggregation ═══

  getTodayTotal() {
    const today = new Date().toISOString().slice(0, 10);
    return this.getTimeLogs()
      .filter(l => l.date === today)
      .reduce((sum, l) => sum + l.minutes, 0);
  },

  getWeekTotal() {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1);
    const weekStartStr = weekStart.toISOString().slice(0, 10);
    return this.getTimeLogs()
      .filter(l => l.date >= weekStartStr)
      .reduce((sum, l) => sum + l.minutes, 0);
  },

  getMonthTotal() {
    const monthStr = new Date().toISOString().slice(0, 7);
    return this.getTimeLogs()
      .filter(l => l.date.startsWith(monthStr))
      .reduce((sum, l) => sum + l.minutes, 0);
  },

  getBreakdownByCategory(dateFilter = 'all') {
    const logs = this.filterLogsByDate(dateFilter);
    const breakdown = {};
    for (const log of logs) {
      const cat = log.category || this.getCategory(log.slotType);
      if (!breakdown[cat]) breakdown[cat] = 0;
      breakdown[cat] += log.minutes;
    }
    return breakdown;
  },

  filterLogsByDate(filter) {
    const logs = this.getTimeLogs();
    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    if (filter === 'today') return logs.filter(l => l.date === today);
    if (filter === 'week') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay() + 1);
      return logs.filter(l => l.date >= weekStart.toISOString().slice(0, 10));
    }
    if (filter === 'month') {
      return logs.filter(l => l.date.startsWith(now.toISOString().slice(0, 7)));
    }
    return logs;
  },

  // ═══ Heatmap Data ═══

  getHeatmapData(weeks = 12) {
    const logs = this.getTimeLogs();
    const map = {};
    for (const log of logs) {
      if (!map[log.date]) map[log.date] = 0;
      map[log.date] += log.minutes;
    }
    return map;
  },

  formatMinutes(min) {
    if (min < 60) return `${min}p`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m > 0 ? `${h}h${m}p` : `${h}h`;
  }
};
