/**
 * Chess Training Planner — Journal Page
 * Enhanced: Each entry is tied to a specific date + session slot
 */

const JournalPage = {
  selectedTags: [],
  selectedDate: null, // YYYY-MM-DD
  currentRating: 0,

  render() {
    if (!this.selectedDate) {
      this.selectedDate = new Date().toISOString().slice(0, 10);
    }

    const entries = this.getEntries();
    let html = '';

    // ═══ New Entry Form ═══
    html += `
      <div class="journal-form">
        <div class="journal-form-title">📝 Ghi Chú Phiên Học</div>

        <div class="form-group">
          <label class="form-label">📅 Ngày</label>
          <input type="date" class="form-input" id="journal-date" value="${this.selectedDate}"
                 onchange="JournalPage.onDateChange(this.value)">
        </div>

        <div class="form-group">
          <label class="form-label">⏰ Phiên học cụ thể</label>
          <div id="journal-sessions-list">
            ${this.renderSessionPicker()}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Đánh giá hiệu quả</label>
          <div class="star-rating" id="star-rating">
            ${[1,2,3,4,5].map(i => `
              <button class="star-btn" data-value="${i}" onclick="JournalPage.setRating(${i})">⭐</button>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Ghi chú</label>
          <textarea class="form-textarea" id="journal-notes"
                    placeholder="Hôm nay đã học gì? Cảm nhận thế nào?"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Bài học rút ra 💡</label>
          <textarea class="form-textarea" id="journal-lessons"
                    placeholder="Key takeaways, insights quan trọng..."
                    style="min-height:70px;"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Tags</label>
          <div class="tags-container">
            ${this.renderTagButtons()}
          </div>
        </div>

        <button class="btn-submit" onclick="JournalPage.saveEntry()">💾 Lưu Ghi Chú</button>
      </div>
    `;

    // ═══ Filter by date ═══
    html += `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div class="section-title" style="margin:0;">📚 Nhật ký</div>
        <select class="form-select" style="width:auto;padding:6px 10px;font-size:12px;" id="journal-filter"
                onchange="JournalPage.filterChanged()">
          <option value="all">Tất cả</option>
          <option value="today">Hôm nay</option>
          <option value="week">Tuần này</option>
          <option value="opening">#opening</option>
          <option value="middlegame">#middlegame</option>
          <option value="endgame">#endgame</option>
          <option value="tactics">#tactics</option>
          <option value="play">#play</option>
          <option value="tournament">#tournament</option>
          <option value="insight">#insight</option>
        </select>
      </div>
      <div style="margin-bottom:12px;">
        <input type="text" class="form-input" id="journal-search" placeholder="🔍 Tìm kiếm trong nhật ký..."
               oninput="JournalPage.filterChanged()" value="${this._searchQuery || ''}"
               style="font-size:13px;">
      </div>
    `;

    const filtered = this.filterEntries(entries);

    if (filtered.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <div class="empty-state-text">Chưa có ghi chú nào.<br>Hãy bắt đầu ghi lại phiên học đầu tiên!</div>
        </div>
      `;
    } else {
      // Group entries by date
      const grouped = this.groupByDate(filtered);
      for (const [dateStr, dateEntries] of Object.entries(grouped)) {
        const d = new Date(dateStr + 'T00:00:00');
        const dayName = d.toLocaleDateString('vi-VN', { weekday: 'long' });
        const dateDisplay = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

        html += `
          <div class="journal-date-group">
            <div class="journal-date-header">
              <span class="journal-date-day">${dayName}</span>
              <span class="journal-date-str">${dateDisplay}</span>
            </div>
        `;

        for (const entry of dateEntries) {
          html += this.renderEntry(entry);
        }

        html += '</div>';
      }

      if (filtered.length > 50) {
        html += `<div style="text-align:center;padding:12px;color:var(--text-dim);font-size:13px;">
          Hiển thị 50 / ${filtered.length} ghi chú
        </div>`;
      }
    }

    return html;
  },

  // ═══ Session Picker — shows slots for the selected date ═══
  renderSessionPicker() {
    const dateObj = new Date(this.selectedDate + 'T00:00:00');
    const dayOfWeek = dateObj.getDay();
    const schedule = getActiveSchedule()[dayOfWeek];

    if (!schedule || schedule.isRest) {
      return `
        <div style="padding:10px;background:var(--bg-elevated);border-radius:var(--border-radius-xs);color:var(--text-dim);font-size:13px;">
          🌿 Ngày nghỉ — không có phiên học
          <br><br>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
            <input type="radio" name="journal-slot" value="Ghi chú chung" checked>
            <span>📌 Ghi chú chung</span>
          </label>
        </div>
      `;
    }

    const phase = this.getPhaseForDate(dateObj);
    let html = '<div class="session-picker">';

    for (const slot of schedule.slots) {
      if (slot.type === 'meal' || slot.type === 'rest') continue;

      const typeInfo = TRAINING_CONFIG.slotTypes[slot.type] || {};
      const checked = '';

      // Get phase-specific content
      let detail = '';
      if (slot.phaseContent && phase) {
        detail = slot.phaseContent[phase.id] || '';
      } else {
        detail = slot.description || '';
      }

      html += `
        <label class="session-picker-item" onclick="this.querySelector('input').checked=true">
          <input type="radio" name="journal-slot" value="${slot.time} ${slot.title}" ${checked}>
          <div class="session-picker-info">
            <div class="session-picker-time">${slot.time}-${slot.endTime}</div>
            <div class="session-picker-title">${slot.icon} ${slot.title}</div>
            <div class="session-picker-detail">${detail ? detail.substring(0, 80) + (detail.length > 80 ? '...' : '') : ''}</div>
            <span class="slot-type-badge" style="background:${typeInfo.darkColor || 'var(--bg-elevated)'};color:${typeInfo.color || 'var(--text-secondary)'};">
              ${typeInfo.label || slot.type}
            </span>
          </div>
        </label>
      `;
    }

    html += `
      <label class="session-picker-item" onclick="this.querySelector('input').checked=true">
        <input type="radio" name="journal-slot" value="Ghi chú chung">
        <div class="session-picker-info">
          <div class="session-picker-title">📌 Ghi chú chung</div>
          <div class="session-picker-detail">Ghi chú không thuộc phiên nào cụ thể</div>
        </div>
      </label>
    `;

    html += '</div>';
    return html;
  },

  getPhaseForDate(dateObj) {
    const start = getTrainingStartDate();
    const diffMs = dateObj - start;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const week = Math.max(1, Math.floor(diffDays / 7) + 1);
    for (const phase of TRAINING_CONFIG.phases) {
      if (week >= phase.weekStart && week <= phase.weekEnd) return phase;
    }
    return TRAINING_CONFIG.phases[TRAINING_CONFIG.phases.length - 1];
  },

  onDateChange(value) {
    this.selectedDate = value;
    const container = document.getElementById('journal-sessions-list');
    if (container) {
      container.innerHTML = this.renderSessionPicker();
    }
  },

  renderTagButtons() {
    const tags = ['#opening', '#middlegame', '#endgame', '#tactics', '#play', '#analysis', '#exercise', '#tournament', '#insight'];
    return tags.map(tag => `
      <button class="tag-btn ${this.selectedTags.includes(tag) ? 'active' : ''}"
              onclick="JournalPage.toggleTag('${tag}')">${tag}</button>
    `).join('');
  },

  toggleTag(tag) {
    const idx = this.selectedTags.indexOf(tag);
    if (idx >= 0) {
      this.selectedTags.splice(idx, 1);
    } else {
      this.selectedTags.push(tag);
    }
    const container = document.querySelector('.tags-container');
    if (container) {
      container.innerHTML = this.renderTagButtons();
    }
  },

  setRating(value) {
    this.currentRating = value;
    const stars = document.querySelectorAll('#star-rating .star-btn');
    stars.forEach((btn, i) => {
      btn.classList.toggle('active', i < value);
    });
  },

  saveEntry() {
    const dateInput = document.getElementById('journal-date');
    const selectedSlot = document.querySelector('input[name="journal-slot"]:checked');
    const notes = document.getElementById('journal-notes').value.trim();
    const lessons = document.getElementById('journal-lessons').value.trim();

    if (!selectedSlot) {
      App.showToast('⚠️ Hãy chọn phiên học');
      return;
    }
    if (!notes && !lessons) {
      App.showToast('⚠️ Hãy viết ghi chú hoặc bài học');
      return;
    }

    const dateVal = dateInput.value;
    const dateObj = new Date(dateVal + 'T00:00:00');
    const dayOfWeek = dateObj.getDay();
    const schedule = TRAINING_CONFIG.weeklySchedule[dayOfWeek];
    const dayName = schedule ? schedule.name : '';

    // Calculate which week & phase this date falls in
    const start = getTrainingStartDate();
    const diffDays = Math.floor((dateObj - start) / (1000 * 60 * 60 * 24));
    const week = Math.max(1, Math.floor(diffDays / 7) + 1);
    const phase = this.getPhaseForDate(dateObj);

    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: dateVal,        // YYYY-MM-DD
      timestamp: new Date().toISOString(),
      dayName: dayName,     // Thứ 2, Thứ 3...
      session: selectedSlot.value,  // "06:00 Khai cuộc" or "Ghi chú chung"
      rating: this.currentRating,
      notes: notes,
      lessons: lessons,
      tags: [...this.selectedTags],
      week: week,
      phase: phase ? phase.id : 1
    };

    const entries = this.getEntries();
    entries.unshift(entry);
    localStorage.setItem('chess_journal', JSON.stringify(entries));

    // Reset form
    this.currentRating = 0;
    this.selectedTags = [];
    App.showToast('✅ Đã lưu ghi chú!');
    App.renderCurrentPage();
  },

  // ═══ Filtering ═══
  filterEntries(entries) {
    const filter = this._lastFilter || 'all';
    const query = (this._searchQuery || '').toLowerCase().trim();
    let filtered = entries;

    // Apply tag/date filter
    if (filter === 'today') {
      const today = new Date().toISOString().slice(0, 10);
      filtered = filtered.filter(e => e.date === today);
    } else if (filter === 'week') {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay() + 1);
      const weekStartStr = weekStart.toISOString().slice(0, 10);
      filtered = filtered.filter(e => e.date >= weekStartStr);
    } else if (filter !== 'all') {
      filtered = filtered.filter(e => e.tags && e.tags.includes(filter));
    }

    // Apply search
    if (query) {
      filtered = filtered.filter(e => {
        const text = [e.notes, e.lessons, e.session, (e.tags || []).join(' ')].join(' ').toLowerCase();
        return text.includes(query);
      });
    }

    return filtered.slice(0, 50);
  },

  filterChanged() {
    const filter = document.getElementById('journal-filter');
    this._lastFilter = filter ? filter.value : 'all';
    App.renderCurrentPage();
    // Preserve filter selection
    setTimeout(() => {
      const f = document.getElementById('journal-filter');
      if (f) f.value = this._lastFilter || 'all';
    }, 50);
  },

  groupByDate(entries) {
    const groups = {};
    for (const entry of entries) {
      const dateKey = entry.date || (entry.timestamp ? entry.timestamp.slice(0, 10) : 'unknown');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(entry);
    }
    return groups;
  },

  renderEntry(entry) {
    const stars = '⭐'.repeat(entry.rating || 0) + '☆'.repeat(5 - (entry.rating || 0));
    const phaseName = TRAINING_CONFIG.phases.find(p => p.id === entry.phase);

    return `
      <div class="journal-entry">
        <div class="journal-entry-header">
          <div>
            <div class="journal-entry-session">${entry.session || 'Không rõ'}</div>
            <div class="journal-entry-date">
              ${entry.dayName || ''} — Tuần ${entry.week || '?'}
              ${phaseName ? ' • Phase ' + phaseName.id + ': ' + phaseName.name : ''}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="journal-entry-stars">${stars}</span>
            <button class="journal-delete-btn" onclick="JournalPage.deleteEntry('${entry.id}')" title="Xóa">🗑️</button>
          </div>
        </div>
        ${entry.notes ? `<div class="journal-entry-notes">${this.escapeHtml(entry.notes)}</div>` : ''}
        ${entry.lessons ? `<div class="journal-entry-lessons">💡 ${this.escapeHtml(entry.lessons)}</div>` : ''}
        ${entry.tags && entry.tags.length > 0 ? `
          <div class="journal-entry-tags">
            ${entry.tags.map(t => `<span class="journal-tag">${t}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  },

  deleteEntry(id) {
    App.showConfirm('🗑️ Xóa ghi chú này?', () => {
      let entries = this.getEntries();
      entries = entries.filter(e => e.id !== id);
      localStorage.setItem('chess_journal', JSON.stringify(entries));
      App.showToast('🗑️ Đã xóa');
      App.renderCurrentPage();
    });
  },

  getEntries() {
    return JSON.parse(localStorage.getItem('chess_journal') || '[]');
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
