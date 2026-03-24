/**
 * Chess Training Planner — Statistics & Analytics Module
 * Renders: Time breakdown charts, streak heatmap, weekly/monthly reports
 */

const StatsModule = {

  // ═══ Time Statistics Cards for Dashboard ═══
  renderDashboardStats() {
    const todayMin = TimerModule.getTodayTotal();
    const weekMin = TimerModule.getWeekTotal();
    const monthMin = TimerModule.getMonthTotal();
    const todayBreakdown = TimerModule.getBreakdownByCategory('today');

    // Chess-only time (exclude exercise, teaching)
    const chessCategories = ['opening', 'middlegame', 'endgame', 'tactics', 'play', 'study', 'review', 'mixed'];
    const todayChess = Object.entries(todayBreakdown)
      .filter(([cat]) => chessCategories.includes(cat))
      .reduce((sum, [, min]) => sum + min, 0);

    let html = `
      <div class="section-title">⏱️ Thời Gian Học Hôm Nay</div>
      <div class="stats-row" style="margin-bottom:8px;">
        <div class="stat-card">
          <div class="stat-value" style="color:var(--gold);">${TimerModule.formatMinutes(todayChess)}</div>
          <div class="stat-label">Chess hôm nay</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--blue);">${TimerModule.formatMinutes(weekMin)}</div>
          <div class="stat-label">Tuần này</div>
        </div>
      </div>
    `;

    // Today's breakdown mini bars
    if (Object.keys(todayBreakdown).length > 0) {
      html += '<div class="time-breakdown-mini">';
      const sorted = Object.entries(todayBreakdown).sort((a, b) => b[1] - a[1]);
      for (const [cat, min] of sorted) {
        const pct = todayMin > 0 ? (min / todayMin) * 100 : 0;
        const color = TimerModule.getCategoryColor(cat);
        const label = TimerModule.getCategoryLabel(cat);
        html += `
          <div class="breakdown-item">
            <div class="breakdown-label">${label}</div>
            <div class="breakdown-bar-container">
              <div class="breakdown-bar" style="width:${pct}%;background:${color};"></div>
            </div>
            <div class="breakdown-value">${TimerModule.formatMinutes(min)}</div>
          </div>
        `;
      }
      html += '</div>';
    }

    return html;
  },

  // ═══ Full Statistics Section for Tracker Page ═══
  renderFullStats() {
    let html = `
      <div class="tracker-section">
        <div class="tracker-section-title">⏱️ Thống Kê Thời Gian Học</div>
        <div style="display:flex;gap:6px;margin-bottom:12px;">
          <button class="tag-btn ${this._filter === 'week' || !this._filter ? 'active' : ''}"
                  onclick="StatsModule.setFilter('week')">Tuần</button>
          <button class="tag-btn ${this._filter === 'month' ? 'active' : ''}"
                  onclick="StatsModule.setFilter('month')">Tháng</button>
          <button class="tag-btn ${this._filter === 'all' ? 'active' : ''}"
                  onclick="StatsModule.setFilter('all')">Tất cả</button>
        </div>
    `;

    const filter = this._filter || 'week';
    const breakdown = TimerModule.getBreakdownByCategory(filter);
    const total = Object.values(breakdown).reduce((s, v) => s + v, 0);

    // Summary cards
    const weekMin = TimerModule.getWeekTotal();
    const monthMin = TimerModule.getMonthTotal();
    const allMin = TimerModule.getTimeLogs().reduce((s, l) => s + l.minutes, 0);

    html += `
      <div class="stats-row" style="margin-bottom:12px;">
        <div class="stat-card">
          <div class="stat-value" style="color:var(--gold);">${TimerModule.formatMinutes(weekMin)}</div>
          <div class="stat-label">Tuần này</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--blue);">${TimerModule.formatMinutes(monthMin)}</div>
          <div class="stat-label">Tháng này</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--green);">${TimerModule.formatMinutes(allMin)}</div>
          <div class="stat-label">Tổng cộng</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--orange);">${TimerModule.getTimeLogs().length}</div>
          <div class="stat-label">Phiên học</div>
        </div>
      </div>
    `;

    // Category breakdown
    if (total > 0) {
      html += `<div class="card" style="padding:16px;margin-bottom:12px;">`;
      html += `<div style="font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:12px;">
        📊 Phân bổ thời gian — ${TimerModule.formatMinutes(total)} tổng
      </div>`;

      // Donut-style horizontal bars
      const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
      for (const [cat, min] of sorted) {
        const pct = (min / total) * 100;
        const color = TimerModule.getCategoryColor(cat);
        const label = TimerModule.getCategoryLabel(cat);
        html += `
          <div class="breakdown-item" style="margin-bottom:8px;">
            <div class="breakdown-label" style="min-width:100px;">${label}</div>
            <div class="breakdown-bar-container" style="flex:1;">
              <div class="breakdown-bar" style="width:${pct}%;background:${color};"></div>
            </div>
            <div class="breakdown-value" style="min-width:55px;text-align:right;">${TimerModule.formatMinutes(min)} <span style="color:var(--text-dim);font-size:10px;">(${Math.round(pct)}%)</span></div>
          </div>
        `;
      }
      html += '</div>';
    }

    // Heatmap
    html += this.renderHeatmap();

    // Recent time logs
    html += this.renderRecentLogs();

    html += '</div>';
    return html;
  },

  setFilter(f) {
    this._filter = f;
    App.renderCurrentPage();
  },

  // ═══ Streak Heatmap (GitHub-style) ═══
  renderHeatmap() {
    const heatData = TimerModule.getHeatmapData();
    const today = new Date();
    const weeks = 12;
    const days = weeks * 7;

    let html = `
      <div class="card" style="padding:16px;margin-bottom:12px;">
        <div style="font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:10px;">
          🔥 Biểu Đồ Hoạt Động (${weeks} tuần)
        </div>
        <div class="heatmap-container">
          <div class="heatmap-labels">
            <span>T2</span><span>T4</span><span>T6</span>
          </div>
          <div class="heatmap-grid">
    `;

    // Build grid: columns = weeks, rows = days of week (Mon-Sun)
    for (let w = weeks - 1; w >= 0; w--) {
      html += '<div class="heatmap-week">';
      for (let d = 1; d <= 7; d++) { // 1=Mon ... 7=Sun
        const date = new Date(today);
        const todayDow = today.getDay() || 7; // 1-7, Mon=1
        const daysBack = (w * 7) + (todayDow - d);
        date.setDate(today.getDate() - daysBack);
        const dateStr = date.toISOString().slice(0, 10);
        const minutes = heatData[dateStr] || 0;
        const level = minutes === 0 ? 0 : minutes < 30 ? 1 : minutes < 60 ? 2 : minutes < 120 ? 3 : 4;
        const isToday = dateStr === today.toISOString().slice(0, 10);
        html += `<div class="heatmap-cell level-${level} ${isToday ? 'today' : ''}"
                      title="${dateStr}: ${minutes}p"></div>`;
      }
      html += '</div>';
    }

    html += `
          </div>
        </div>
        <div class="heatmap-legend">
          <span style="font-size:10px;color:var(--text-dim);">Ít</span>
          <div class="heatmap-cell level-0"></div>
          <div class="heatmap-cell level-1"></div>
          <div class="heatmap-cell level-2"></div>
          <div class="heatmap-cell level-3"></div>
          <div class="heatmap-cell level-4"></div>
          <span style="font-size:10px;color:var(--text-dim);">Nhiều</span>
        </div>
      </div>
    `;
    return html;
  },

  // ═══ Recent Time Logs ═══
  renderRecentLogs() {
    const logs = TimerModule.getTimeLogs().slice(-10).reverse();
    if (logs.length === 0) {
      return `
        <div class="empty-state" style="padding:20px;">
          <div class="empty-state-icon">⏱️</div>
          <div class="empty-state-text">Chưa có dữ liệu thời gian.<br>Dùng Timer hoặc nhập tay từ trang Lịch Học!</div>
        </div>
      `;
    }

    let html = `
      <div style="font-size:13px;font-weight:700;color:var(--text-primary);margin:12px 0 8px;">
        📋 Phiên học gần đây
      </div>
    `;
    for (const log of logs) {
      const color = TimerModule.getCategoryColor(log.category);
      const label = TimerModule.getCategoryLabel(log.category);
      const d = new Date(log.date + 'T00:00:00');
      const overrideInfo = log.originalType
        ? `<div style="font-size:10px;color:var(--text-dim);margin-top:2px;">🔄 Lịch: ${TimerModule.getCategoryLabel(TimerModule.getCategory(log.originalType))}</div>`
        : '';
      html += `
        <div class="data-entry" style="border-left:3px solid ${color};">
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${log.slotTitle}</div>
            <div style="font-size:11px;color:var(--text-dim);">
              ${d.toLocaleDateString('vi-VN')} • ${label} • ${TimerModule.formatMinutes(log.minutes)}
            </div>
            ${overrideInfo}
            ${log.note ? `<div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">📝 ${log.note}</div>` : ''}
          </div>
          <button class="data-entry-delete" onclick="StatsModule.deleteLog('${log.id}')">✕</button>
        </div>
      `;
    }
    return html;
  },

  deleteLog(logId) {
    App.showConfirm('🗑️ Xóa bản ghi thời gian này?', () => {
      TimerModule.deleteTimeLog(logId);
      App.showToast('🗑️ Đã xóa');
      App.renderCurrentPage();
    });
  }
};
