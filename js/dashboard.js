/**
 * Chess Training Planner — Dashboard Page
 */

const DashboardPage = {
  render() {
    const phase = getCurrentPhase();
    const week = getCurrentWeek();
    const totalWeeks = getTotalWeeks();
    const phaseProgress = getPhaseProgress();
    const daysLeft = getDaysUntilTournament();
    const currentSlot = getCurrentSlot();
    const nextSlot = getNextSlot();
    const today = getTodaySchedule();
    const stats = this.getStats();

    let html = '';

    // Notification banner
    html += NotificationManager.showBanner();

    // Hero Card
    html += `
      <div class="dash-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div style="flex:1;">
            <div class="dash-phase-badge phase-bg-${phase.id}">
              ${phase.icon} Phase ${phase.id}: ${phase.name}
            </div>
            <div class="dash-week">Tuần ${Math.min(week, totalWeeks)} / ${totalWeeks}</div>
            <div class="dash-week-sub">${phase.subtitle} — Target ELO ${phase.eloTarget}</div>
          </div>
          <div class="progress-ring-container">
            ${this.renderProgressRing(phaseProgress)}
          </div>
        </div>
        <div class="dash-countdown">
          <span class="dash-countdown-num">${daysLeft}</span>
          <span class="dash-countdown-label">ngày còn lại<br>đến ASEAN Age Group 🇸🇬</span>
        </div>
      </div>
    `;

    // Current / Next Session
    if (today && !today.isRest) {
      if (currentSlot) {
        const content = getSlotContent(currentSlot);
        html += `
          <div class="current-session">
            <div class="session-now-badge"><span class="dot"></span> ĐANG HỌC</div>
            <div class="session-title">${currentSlot.icon} ${currentSlot.title}</div>
            <div class="session-time">${currentSlot.time} — ${currentSlot.endTime} ${currentSlot.duration ? '(' + currentSlot.duration + ')' : ''}</div>
            ${content ? `<div class="session-desc">${content}</div>` : ''}
          </div>
        `;
      } else if (nextSlot) {
        const content = getSlotContent(nextSlot);
        const now = new Date();
        const minutesTill = timeToMinutes(nextSlot.time) - (now.getHours() * 60 + now.getMinutes());
        html += `
          <div class="card card-glow">
            <div class="session-now-badge" style="background:var(--blue);">⏭️ SẮP TỚI — ${minutesTill} phút</div>
            <div class="session-title">${nextSlot.icon} ${nextSlot.title}</div>
            <div class="session-time">${nextSlot.time} — ${nextSlot.endTime}</div>
            ${content ? `<div class="session-desc">${content}</div>` : ''}
          </div>
        `;
      } else {
        html += `
          <div class="card">
            <div class="session-title">🌙 Kết thúc ngày học!</div>
            <div class="session-desc">Nghỉ ngơi tốt, chuẩn bị cho ngày mai.</div>
          </div>
        `;
      }
    } else if (today && today.isRest) {
      html += `
        <div class="rest-day-card">
          <div class="rest-day-icon">🌿</div>
          <div class="rest-day-title">Ngày nghỉ ngơi</div>
          <div class="rest-day-text">${today.restMessage || 'Hồi phục năng lượng cho tuần mới!'}</div>
        </div>
      `;
    }

    // Quick Stats
    html += `
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value" style="color:var(--gold);">${stats.elo}</div>
          <div class="stat-label">ELO FIDE</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--green);">${stats.weight}</div>
          <div class="stat-label">Cân nặng (kg)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--blue);">${stats.entries}</div>
          <div class="stat-label">Nhật ký</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--orange);">${stats.streak}</div>
          <div class="stat-label">Streak 🔥</div>
        </div>
      </div>
    `;

    // Today's Schedule Quick View
    if (today && !today.isRest) {
      html += `<div class="section-title">📅 Hôm nay — ${today.name}</div>`;
      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();

      for (const slot of today.slots) {
        if (slot.type === 'meal' || slot.type === 'rest') continue;
        const startMin = timeToMinutes(slot.time);
        const endMin = timeToMinutes(slot.endTime);
        const isCurrent = currentMin >= startMin && currentMin < endMin;
        const isPast = currentMin >= endMin;
        const typeInfo = TRAINING_CONFIG.slotTypes[slot.type] || {};

        html += `
          <div class="slot-item ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''}" style="margin-bottom:6px;">
            <div class="slot-time">
              <span class="slot-time-start">${slot.time}</span>
              <span class="slot-time-end">${slot.endTime}</span>
            </div>
            <div class="slot-content">
              <div class="slot-title">${slot.icon} ${slot.title}</div>
              ${slot.duration ? `<span class="slot-duration">${slot.duration}</span>` : ''}
            </div>
          </div>
        `;
      }
    }

    // Phase Focus
    html += `
      <div class="card" style="margin-top:16px;">
        <div class="card-title">${phase.icon} Focus Phase ${phase.id}: ${phase.name}</div>
        <ul class="focus-list">
          ${phase.focus.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `;

    return html;
  },

  renderProgressRing(percent) {
    const r = 32;
    const circ = 2 * Math.PI * r;
    const offset = circ - (percent / 100) * circ;
    return `
      <svg class="progress-ring" width="80" height="80">
        <circle class="progress-ring-bg" cx="40" cy="40" r="${r}"/>
        <circle class="progress-ring-fill" cx="40" cy="40" r="${r}"
          stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
      </svg>
      <span class="progress-ring-text">${Math.round(percent)}%</span>
    `;
  },

  getStats() {
    const eloData = JSON.parse(localStorage.getItem('chess_elo_data') || '[]');
    const weightData = JSON.parse(localStorage.getItem('chess_weight_data') || '[]');
    const journal = JSON.parse(localStorage.getItem('chess_journal') || '[]');

    const latestElo = eloData.length > 0 ? eloData[eloData.length - 1].value : TRAINING_CONFIG.playerInfo.startElo;
    const latestWeight = weightData.length > 0 ? weightData[weightData.length - 1].value : TRAINING_CONFIG.playerInfo.startWeight;

    // Calculate streak
    let streak = 0;
    if (journal.length > 0) {
      const sorted = [...journal].sort((a, b) => new Date(b.date) - new Date(a.date));
      const today = new Date().toISOString().slice(0, 10);
      let checkDate = today;
      for (const entry of sorted) {
        const entryDate = entry.date.slice(0, 10);
        if (entryDate === checkDate || entryDate === this.prevDay(checkDate)) {
          streak++;
          checkDate = entryDate;
        } else {
          break;
        }
      }
    }

    return {
      elo: latestElo,
      weight: latestWeight,
      entries: journal.length,
      streak: streak
    };
  },

  prevDay(dateStr) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }
};
