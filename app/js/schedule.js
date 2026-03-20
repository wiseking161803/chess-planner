/**
 * Chess Training Planner — Schedule Page
 * Enhanced with completion/incomplete tracking
 */

const SchedulePage = {
  selectedDay: null,

  render() {
    const today = new Date().getDay();
    if (this.selectedDay === null) this.selectedDay = today;

    let html = '';

    // Day Tabs
    html += '<div class="schedule-day-tabs">';
    const dayOrder = [1, 2, 3, 4, 5, 6, 0];
    for (const d of dayOrder) {
      const sched = getActiveSchedule()[d];
      const isActive = d === this.selectedDay;
      const isToday = d === today;
      html += `
        <button class="day-tab ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}"
                onclick="SchedulePage.selectDay(${d})">
          ${sched.name} ${isToday ? '•' : ''}
        </button>
      `;
    }
    html += '</div>';

    const schedule = getActiveSchedule()[this.selectedDay];

    if (schedule.isRest) {
      html += `
        <div class="rest-day-card">
          <div class="rest-day-icon">🌿</div>
          <div class="rest-day-title">Ngày Nghỉ Ngơi</div>
          <div class="rest-day-text">${schedule.restMessage || 'Hồi phục năng lượng!'}</div>
        </div>
      `;
      if (schedule.slots && schedule.slots.length > 0) {
        html += '<div class="section-title" style="margin-top:20px;">📋 Gợi ý</div>';
        html += '<div class="slot-list">';
        for (const slot of schedule.slots) {
          html += this.renderSlot(slot, false, false);
        }
        html += '</div>';
      }
    } else {
      const phase = getCurrentPhase();
      const profiles = getScheduleProfiles();
      const activeId = getActiveProfileId();
      const profileName = profiles[activeId]?.name || 'Mặc định';
      html += `
        <div class="card" style="padding:12px 16px; margin-bottom:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="dash-phase-badge phase-bg-${phase.id}" style="margin:0;">
                ${phase.icon} Phase ${phase.id}
              </span>
              <span style="font-size:13px;color:var(--text-secondary);">
                Tuần ${getCurrentWeek()} — ${phase.name}
              </span>
            </div>
            <div style="text-align:right;cursor:pointer;" onclick="App.navigateTo('editor')">
              <div style="font-size:10px;color:var(--text-dim);">📁 ${profileName}</div>
              <div style="font-size:9px;color:var(--blue);">Tùy biến →</div>
            </div>
          </div>
        </div>
      `;

      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();
      const isToday = this.selectedDay === new Date().getDay();

      html += '<div class="slot-list">';
      for (const slot of schedule.slots) {
        const startMin = timeToMinutes(slot.time);
        const endMin = timeToMinutes(slot.endTime);
        const isCurrent = isToday && currentMin >= startMin && currentMin < endMin;
        const isPast = isToday && currentMin >= endMin;
        html += this.renderSlot(slot, isCurrent, isPast);
      }
      html += '</div>';
    }

    return html;
  },

  renderSlot(slot, isCurrent, isPast) {
    const content = getSlotContent(slot);
    const typeInfo = TRAINING_CONFIG.slotTypes[slot.type] || {};
    const today = new Date().toISOString().slice(0, 10);
    const completion = this.getCompletion(today, slot.id);
    const isMealOrRest = slot.type === 'meal' || slot.type === 'rest';
    let statusBadge = '';

    if (completion) {
      if (completion.status === 'completed') {
        statusBadge = '<span class="completion-badge completed">✅ Hoàn thành</span>';
      } else if (completion.status === 'incomplete') {
        statusBadge = `<span class="completion-badge incomplete">❌ Chưa xong</span>`;
      }
    }

    // Check if timer is running for this slot
    const timerActive = TimerModule.isRunning && TimerModule.currentSlotId === slot.id;

    return `
      <div class="slot-item ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''} ${completion ? 'has-status' : ''} ${timerActive ? 'timer-active' : ''}"
           id="slot-${slot.id}"
           onclick="SchedulePage.toggleSlot('${slot.id}')">
        <div class="slot-time">
          <span class="slot-time-start">${slot.time}</span>
          <span class="slot-time-end">${slot.endTime}</span>
        </div>
        <div class="slot-content">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="slot-icon">${slot.icon}</span>
            <div style="flex:1;min-width:0;">
              <div class="slot-title">${slot.title}</div>
              ${slot.duration ? `<span class="slot-duration">${slot.duration}</span>` : ''}
            </div>
            ${statusBadge}
          </div>
          <div class="slot-desc">${content || ''}</div>
          <span class="slot-type-badge" style="background:${typeInfo.darkColor || 'var(--bg-elevated)'};color:${typeInfo.color || 'var(--text-secondary)'};">
            ${typeInfo.label || slot.type}
          </span>
          ${completion && completion.status === 'incomplete' && completion.reason ?
            `<div class="slot-reason">💬 ${completion.reason}</div>` : ''}
          <div class="slot-actions">
            ${!isMealOrRest ? `
              <button class="slot-action-btn ${timerActive ? 'timer-active-btn' : 'timer-btn-start'}" onclick="event.stopPropagation(); ${timerActive ? 'TimerModule.stop()' : `TimerModule.start('${slot.id}', '${slot.type}', '${slot.title.replace(/'/g, "\\\\'")}')`}">
                ${timerActive ? '⏹️ Dừng Timer' : '🍅 Timer'}
              </button>
              <button class="slot-action-btn secondary" style="background:rgba(0,188,212,0.12);color:var(--cyan);"
                      onclick="event.stopPropagation(); TimerModule.showManualEntry('${slot.id}', '${slot.type}', '${slot.title.replace(/'/g, "\\\\'")}')">
                ⏱️ Ghi TG
              </button>
            ` : ''}
            <button class="slot-action-btn primary" onclick="event.stopPropagation(); SchedulePage.markComplete('${slot.id}', '${slot.title}')">
              ✅ Xong
            </button>
            <button class="slot-action-btn secondary" style="background:rgba(244,67,54,0.15);color:var(--red);"
                    onclick="event.stopPropagation(); SchedulePage.markIncomplete('${slot.id}', '${slot.title}')">
              ❌
            </button>
            <button class="slot-action-btn secondary" onclick="event.stopPropagation(); SchedulePage.writeNote('${slot.id}', '${slot.title}')">
              📝
            </button>
          </div>
        </div>
      </div>
    `;
  },

  selectDay(day) {
    this.selectedDay = day;
    App.renderCurrentPage();
  },

  toggleSlot(slotId) {
    const el = document.getElementById('slot-' + slotId);
    if (el) el.classList.toggle('expanded');
  },

  markComplete(slotId, slotTitle) {
    const today = new Date().toISOString().slice(0, 10);
    this.saveCompletion(today, slotId, {
      status: 'completed',
      slotTitle: slotTitle,
      timestamp: new Date().toISOString(),
      week: getCurrentWeek(),
      phase: getCurrentPhase().id,
      reason: null
    });
    App.showToast('✅ Đã đánh dấu hoàn thành!');
    App.renderCurrentPage();
  },

  markIncomplete(slotId, slotTitle) {
    const formHtml = `
      <div class="form-group">
        <label class="form-label">Lý do chưa hoàn thành</label>
        <div class="tags-container" style="margin-bottom:10px;">
          <button class="tag-btn" onclick="document.getElementById('modal-reason').value='Không đủ thời gian'; this.classList.add('active');">⏰ Hết giờ</button>
          <button class="tag-btn" onclick="document.getElementById('modal-reason').value='Mệt mỏi, cần nghỉ'; this.classList.add('active');">😴 Mệt mỏi</button>
          <button class="tag-btn" onclick="document.getElementById('modal-reason').value='Bận việc khác'; this.classList.add('active');">📋 Bận việc</button>
          <button class="tag-btn" onclick="document.getElementById('modal-reason').value='Bỏ qua, ưu tiên việc khác'; this.classList.add('active');">⏭️ Bỏ qua</button>
          <button class="tag-btn" onclick="document.getElementById('modal-reason').value='Bị ốm'; this.classList.add('active');">🤒 Ốm</button>
        </div>
        <textarea class="form-textarea" id="modal-reason" placeholder="Nhập lý do chi tiết..." style="min-height:70px;"></textarea>
      </div>
    `;

    App.showModal('❌ Chưa Hoàn Thành — ' + slotTitle, formHtml, () => {
      const reason = document.getElementById('modal-reason').value.trim();
      if (!reason) {
        App.showToast('⚠️ Hãy nhập lý do');
        return;
      }

      const today = new Date().toISOString().slice(0, 10);
      this.saveCompletion(today, slotId, {
        status: 'incomplete',
        slotTitle: slotTitle,
        timestamp: new Date().toISOString(),
        week: getCurrentWeek(),
        phase: getCurrentPhase().id,
        reason: reason
      });
      App.closeModal();
      App.showToast('❌ Đã ghi nhận — Keep going! 💪');
      App.renderCurrentPage();
    });
  },

  writeNote(slotId, slotTitle) {
    App.navigateTo('journal');
    setTimeout(() => {
      const radios = document.querySelectorAll('input[name="journal-slot"]');
      for (const r of radios) {
        if (r.value.includes(slotTitle)) {
          r.checked = true;
          break;
        }
      }
    }, 100);
  },

  // ═══ Completion Data Management ═══
  getCompletions() {
    return JSON.parse(localStorage.getItem('chess_completions') || '{}');
  },

  getCompletion(date, slotId) {
    const completions = this.getCompletions();
    return completions[`${date}-${slotId}`] || null;
  },

  saveCompletion(date, slotId, data) {
    const completions = this.getCompletions();
    completions[`${date}-${slotId}`] = data;
    localStorage.setItem('chess_completions', JSON.stringify(completions));
  }
};
