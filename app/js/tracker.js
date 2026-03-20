/**
 * Chess Training Planner — Progress Tracker Page
 * Uses App.showModal() instead of prompt() for Android PWA compatibility
 */

const TrackerPage = {
  render() {
    let html = '';
    html += StatsModule.renderFullStats();
    html += this.renderEloSection();
    html += this.renderWeightSection();
    html += this.renderBookProgress();
    html += this.renderTournamentLog();
    html += DataSync.renderSyncSection();
    return html;
  },

  // ═══ ELO Tracking ═══
  renderEloSection() {
    const data = this.getData('chess_elo_data');
    const ultimate = TRAINING_CONFIG.playerInfo.targetElo;
    const shortTerm = TRAINING_CONFIG.playerInfo.shortTermTarget || ultimate;
    const start = TRAINING_CONFIG.playerInfo.startElo;
    const latest = data.length > 0 ? data[data.length - 1].value : start;
    const phase = getCurrentPhase();
    const phaseTarget = phase.eloTarget;
    const progress = Math.min(100, ((latest - start) / (ultimate - start)) * 100);

    return `
      <div class="tracker-section">
        <div class="tracker-section-title">♟️ ELO FIDE Rating</div>
        <div class="progress-bar-container">
          <div class="progress-bar-label">
            <span class="progress-bar-name">${start} → ${ultimate} 👑</span>
            <span class="progress-bar-pct" style="color:var(--gold);">${latest} (${progress >= 0 ? '+' : ''}${latest - start})</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${Math.max(0, progress)}%;"></div>
          </div>
          <div style="font-size:10px;color:var(--text-dim);margin-top:4px;display:flex;justify-content:space-between;">
            <span>Phase ${phase.id}: ${phaseTarget}</span>
            <span>GM: ${ultimate}</span>
          </div>
        </div>
        <div class="tracker-add-row">
          <input class="form-input" type="number" id="elo-input" placeholder="Nhập ELO mới" min="1000" max="3000">
          <button class="tracker-add-btn" onclick="TrackerPage.addData('chess_elo_data', 'elo-input')">+</button>
        </div>
        ${this.renderChart(data, start, ultimate, 'var(--gold)')}
        ${this.renderDataEntries(data, 'chess_elo_data')}
      </div>
    `;
  },

  // ═══ Weight Tracking ═══
  renderWeightSection() {
    const data = this.getData('chess_weight_data');
    const target = TRAINING_CONFIG.playerInfo.targetWeight;
    const start = TRAINING_CONFIG.playerInfo.startWeight;
    const latest = data.length > 0 ? data[data.length - 1].value : start;
    const progress = Math.min(100, ((start - latest) / (start - target)) * 100);

    return `
      <div class="tracker-section">
        <div class="tracker-section-title">⚖️ Cân Nặng (kg)</div>
        <div class="progress-bar-container">
          <div class="progress-bar-label">
            <span class="progress-bar-name">${start}kg → ${target}kg</span>
            <span class="progress-bar-pct" style="color:var(--green);">${latest}kg (${latest <= start ? '' : '+'}${(latest - start).toFixed(1)})</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${Math.max(0, progress)}%; background:linear-gradient(90deg, var(--green-dim), var(--green));"></div>
          </div>
        </div>
        <div class="tracker-add-row">
          <input class="form-input" type="number" id="weight-input" placeholder="Nhập cân nặng" min="40" max="200" step="0.1">
          <button class="tracker-add-btn" onclick="TrackerPage.addData('chess_weight_data', 'weight-input')" style="background:var(--green);">+</button>
        </div>
        ${this.renderChart(data, target, start, 'var(--green)', true)}
        ${this.renderDataEntries(data, 'chess_weight_data')}
      </div>
    `;
  },

  // ═══ Book Progress ═══
  renderBookProgress() {
    const bookProgress = JSON.parse(localStorage.getItem('chess_book_progress') || '{}');
    const allBooks = [
      ...TRAINING_CONFIG.materials.openings.map(b => ({ ...b, category: 'Khai cuộc' })),
      ...TRAINING_CONFIG.materials.endgames.map(b => ({ ...b, category: 'Tàn cuộc' })),
      ...TRAINING_CONFIG.materials.middlegames.map(b => ({ ...b, category: 'Trung cuộc' })),
      ...TRAINING_CONFIG.materials.tactics.map(b => ({ ...b, category: 'Chiến thuật' }))
    ];

    // Group by tier
    const tierGroups = {};
    for (const book of allBooks) {
      const tier = book.tier || 'Khác';
      if (!tierGroups[tier]) tierGroups[tier] = [];
      tierGroups[tier].push(book);
    }

    const phase = getCurrentPhase();
    const currentElo = phase.eloTarget;

    let html = `
      <div class="tracker-section">
        <div class="tracker-section-title">📚 Tiến Trình Tài Liệu (${allBooks.length} cuốn)</div>
        <div style="font-size:12px;color:var(--text-dim);margin-bottom:12px;">👆 Nhấn vào từng mục để cập nhật %</div>
    `;

    // Sort tiers by starting ELO
    const sortedTiers = Object.keys(tierGroups).sort((a, b) => {
      const aNum = parseInt(a) || 9999;
      const bNum = parseInt(b) || 9999;
      return aNum - bNum;
    });

    for (const tier of sortedTiers) {
      const books = tierGroups[tier];
      const completed = books.filter(b => (bookProgress[b.id] || 0) === 100).length;
      html += `
        <div style="margin-bottom:4px;margin-top:12px;font-size:12px;font-weight:700;color:var(--text-secondary);display:flex;justify-content:space-between;">
          <span>🎯 ${tier}</span>
          <span style="color:var(--green);">${completed}/${books.length} ✓</span>
        </div>
      `;
      for (const book of books) {
        const pct = bookProgress[book.id] || 0;
        const color = book.category === 'Khai cuộc' ? 'var(--blue)' :
                      book.category === 'Tàn cuộc' ? 'var(--orange)' :
                      book.category === 'Chiến thuật' ? 'var(--red)' : 'var(--purple)';
        html += `
          <div class="progress-bar-container book-progress-item"
               onclick="TrackerPage.showBookModal('${book.id}', '${book.name.replace(/'/g, "\\'")}', ${pct})">
            <div class="progress-bar-label">
              <span class="progress-bar-name" style="font-size:11px;">
                ${pct === 100 ? '✅' : '📖'} ${book.name}
              </span>
              <span class="progress-bar-pct" style="color:${color};font-size:11px;">${pct}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width:${pct}%; background:${color};"></div>
            </div>
          </div>
        `;
      }
    }

    html += '</div>';
    return html;
  },

  showBookModal(bookId, bookName, currentPct) {
    const formHtml = `
      <div class="form-group">
        <label class="form-label">📚 ${bookName}</label>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">Hiện tại: ${currentPct}%</div>
        <input type="range" id="modal-book-range" min="0" max="100" step="5" value="${currentPct}"
               oninput="document.getElementById('modal-book-value').textContent = this.value + '%'"
               style="width:100%;accent-color:var(--gold);">
        <div style="text-align:center;margin-top:8px;">
          <span id="modal-book-value" style="font-size:24px;font-weight:800;color:var(--gold);">${currentPct}%</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;">
          <button class="slot-action-btn secondary" onclick="document.getElementById('modal-book-range').value=0;document.getElementById('modal-book-value').textContent='0%'">0%</button>
          <button class="slot-action-btn secondary" onclick="document.getElementById('modal-book-range').value=25;document.getElementById('modal-book-value').textContent='25%'">25%</button>
          <button class="slot-action-btn secondary" onclick="document.getElementById('modal-book-range').value=50;document.getElementById('modal-book-value').textContent='50%'">50%</button>
          <button class="slot-action-btn secondary" onclick="document.getElementById('modal-book-range').value=75;document.getElementById('modal-book-value').textContent='75%'">75%</button>
          <button class="slot-action-btn secondary" onclick="document.getElementById('modal-book-range').value=100;document.getElementById('modal-book-value').textContent='100%'">100%</button>
        </div>
      </div>
    `;

    App.showModal('📚 Cập Nhật Tiến Trình', formHtml, () => {
      const val = parseInt(document.getElementById('modal-book-range').value);
      const current = JSON.parse(localStorage.getItem('chess_book_progress') || '{}');
      current[bookId] = val;
      localStorage.setItem('chess_book_progress', JSON.stringify(current));
      App.closeModal();
      App.showToast(`✅ ${bookName}: ${val}%`);
      App.renderCurrentPage();
    });
  },

  // ═══ Tournament Log ═══
  renderTournamentLog() {
    const tournaments = JSON.parse(localStorage.getItem('chess_tournaments') || '[]');

    let html = `
      <div class="tracker-section">
        <div class="tracker-section-title">🏆 Kết Quả Giải Đấu</div>
        <button class="btn-submit" style="margin-bottom:12px;font-size:13px;padding:10px;"
                onclick="TrackerPage.showTournamentModal()">
          ➕ Thêm Giải Đấu
        </button>
    `;

    if (tournaments.length === 0) {
      html += `
        <div class="empty-state" style="padding:20px;">
          <div class="empty-state-icon">🏆</div>
          <div class="empty-state-text">Chưa có kết quả giải đấu nào.<br>Nhấn nút ở trên để thêm!</div>
        </div>
      `;
    } else {
      for (const t of tournaments) {
        html += `
          <div class="tournament-entry">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div style="flex:1;">
                <div class="tournament-name">🏆 ${this.escapeHtml(t.name)}</div>
                <div class="tournament-details">
                  📅 ${t.date} | 🎯 ${t.result} | ♟️ ${t.eloChange >= 0 ? '+' : ''}${t.eloChange} ELO
                </div>
                ${t.notes ? `<div style="font-size:12px;color:var(--text-dim);margin-top:4px;">📝 ${this.escapeHtml(t.notes)}</div>` : ''}
              </div>
              <button class="journal-delete-btn" onclick="TrackerPage.deleteTournament('${t.id}')">🗑️</button>
            </div>
          </div>
        `;
      }
    }

    html += '</div>';
    return html;
  },

  showTournamentModal() {
    const formHtml = `
      <div class="form-group">
        <label class="form-label">Tên giải đấu</label>
        <input class="form-input" type="text" id="modal-t-name" placeholder="VD: Giải mở rộng TP.HCM">
      </div>
      <div class="form-group">
        <label class="form-label">📅 Ngày</label>
        <input class="form-input" type="date" id="modal-t-date" value="${new Date().toISOString().slice(0, 10)}">
      </div>
      <div class="form-group">
        <label class="form-label">🎯 Kết quả</label>
        <input class="form-input" type="text" id="modal-t-result" placeholder="VD: 5/7 hoặc 3.5/5">
      </div>
      <div class="form-group">
        <label class="form-label">♟️ Thay đổi ELO</label>
        <input class="form-input" type="number" id="modal-t-elo" placeholder="VD: 15 hoặc -10">
      </div>
      <div class="form-group">
        <label class="form-label">📝 Ghi chú (tùy chọn)</label>
        <textarea class="form-textarea" id="modal-t-notes" placeholder="Nhận xét về giải đấu..." style="min-height:60px;"></textarea>
      </div>
    `;

    App.showModal('🏆 Thêm Kết Quả Giải Đấu', formHtml, () => {
      const name = document.getElementById('modal-t-name').value.trim();
      const date = document.getElementById('modal-t-date').value;
      const result = document.getElementById('modal-t-result').value.trim();
      const eloChange = document.getElementById('modal-t-elo').value;
      const notes = document.getElementById('modal-t-notes').value.trim();

      if (!name) {
        App.showToast('⚠️ Nhập tên giải đấu');
        return;
      }
      if (!result) {
        App.showToast('⚠️ Nhập kết quả');
        return;
      }

      const tournaments = JSON.parse(localStorage.getItem('chess_tournaments') || '[]');
      tournaments.unshift({
        id: Date.now().toString(36),
        name: name,
        date: new Date(date).toLocaleDateString('vi-VN'),
        result: result,
        eloChange: parseInt(eloChange) || 0,
        notes: notes
      });
      localStorage.setItem('chess_tournaments', JSON.stringify(tournaments));
      App.closeModal();
      App.showToast('✅ Đã lưu kết quả giải đấu!');
      App.renderCurrentPage();
    });
  },

  deleteTournament(id) {
    App.showConfirm('🗑️ Xóa kết quả giải đấu này?', () => {
      let tournaments = JSON.parse(localStorage.getItem('chess_tournaments') || '[]');
      tournaments = tournaments.filter(t => t.id !== id);
      localStorage.setItem('chess_tournaments', JSON.stringify(tournaments));
      App.showToast('🗑️ Đã xóa');
      App.renderCurrentPage();
    });
  },

  // ═══ Chart Rendering ═══
  renderChart(data, minVal, maxVal, color, inverted = false) {
    if (data.length < 2) {
      return `<div class="chart-container"><div class="chart-empty">Cần ít nhất 2 điểm dữ liệu để hiển thị biểu đồ</div></div>`;
    }

    const width = Math.max(300, data.length * 40);
    const height = 140;
    const padding = { top: 20, right: 20, bottom: 30, left: 10 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const values = data.map(d => d.value);
    const dataMin = Math.min(...values, minVal);
    const dataMax = Math.max(...values, maxVal);
    const range = dataMax - dataMin || 1;

    const points = data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartW;
      const y = padding.top + (1 - (d.value - dataMin) / range) * chartH;
      return { x, y, value: d.value, date: d.date };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = pathD + ` L ${points[points.length-1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;
    const gradId = 'grad-' + color.replace(/[^a-z]/g, '') + '-' + Date.now();

    let svg = `
      <div class="chart-container" style="overflow-x:auto;">
        <svg width="${width}" height="${height}" style="min-width:${width}px;">
          <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path d="${areaD}" fill="url(#${gradId})" />
          <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;

    for (const p of points) {
      svg += `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${color}" />`;
    }

    if (points.length <= 10) {
      for (const p of points) {
        svg += `<text x="${p.x}" y="${p.y - 8}" text-anchor="middle" fill="${color}" font-size="10" font-weight="600">${p.value}</text>`;
      }
    } else {
      const first = points[0];
      const last = points[points.length - 1];
      svg += `<text x="${first.x}" y="${first.y - 8}" text-anchor="start" fill="${color}" font-size="10" font-weight="600">${first.value}</text>`;
      svg += `<text x="${last.x}" y="${last.y - 8}" text-anchor="end" fill="${color}" font-size="10" font-weight="600">${last.value}</text>`;
    }

    svg += '</svg></div>';
    return svg;
  },

  renderDataEntries(data, storageKey) {
    if (data.length === 0) return '';
    const shown = data.slice(-5).reverse();
    let html = '';
    for (const entry of shown) {
      const dateStr = entry.date.length === 10 ? entry.date + 'T00:00:00' : entry.date;
      const d = new Date(dateStr);
      html += `
        <div class="data-entry">
          <div>
            <div class="data-entry-value">${entry.value}</div>
            <div class="data-entry-date">${d.toLocaleDateString('vi-VN')}</div>
          </div>
          <button class="data-entry-delete" onclick="TrackerPage.deleteData('${storageKey}', '${entry.date}')">✕</button>
        </div>
      `;
    }
    return html;
  },

  // ═══ Data Operations ═══
  getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  },

  addData(storageKey, inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const value = parseFloat(input.value);
    if (isNaN(value)) {
      App.showToast('⚠️ Nhập số hợp lệ');
      return;
    }
    const data = this.getData(storageKey);
    data.push({ value: value, date: new Date().toISOString().slice(0, 10) });
    localStorage.setItem(storageKey, JSON.stringify(data));
    input.value = '';
    App.showToast('✅ Đã thêm!');
    App.renderCurrentPage();
  },

  deleteData(storageKey, date) {
    App.showConfirm('🗑️ Xóa dữ liệu này?', () => {
      let data = this.getData(storageKey);
      data = data.filter(d => d.date !== date);
      localStorage.setItem(storageKey, JSON.stringify(data));
      App.renderCurrentPage();
    });
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
