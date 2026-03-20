/**
 * Chess Training Planner — Schedule Editor Page
 * Allows creating, editing, cloning schedule profiles and assigning them to phases
 */

const ScheduleEditorPage = {
  editingProfileId: null,
  editingDay: null,

  render() {
    const profiles = getScheduleProfiles();
    const phaseMap = getPhaseScheduleMap();
    const activeId = getActiveProfileId();
    let html = '';

    // Header
    html += `
      <div class="card" style="padding:16px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="font-size:24px;">⚙️</span>
          <div>
            <div style="font-weight:700;font-size:16px;color:var(--text-primary);">Quản Lý Lịch Tập Luyện</div>
            <div style="font-size:12px;color:var(--text-dim);">Tạo lịch riêng cho từng giai đoạn. Hiện tại: <b style="color:var(--gold);">${profiles[activeId]?.name || 'Mặc định'}</b></div>
          </div>
        </div>
        <button class="btn-submit" style="width:100%;font-size:13px;padding:10px;" onclick="ScheduleEditorPage.showCreateProfile()">
          ➕ Tạo Lịch Mới
        </button>
      </div>
    `;

    // FIDE Settings
    const fideId = getFideId();
    const lastRating = JSON.parse(localStorage.getItem('chess_fide_last_rating') || 'null');
    const lastFetch = localStorage.getItem('chess_fide_last_fetch') || 'Chưa';
    html += `
      <div class="card" style="padding:16px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <span style="font-size:20px;">🌐</span>
          <div style="font-weight:700;font-size:14px;color:var(--text-primary);">FIDE ELO Auto-Sync</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
          <div style="flex:1;font-size:12px;color:var(--text-secondary);">
            FIDE ID: <b style="color:var(--gold);">${fideId || 'Chưa cài'}</b>
            ${fideId ? `<br><a href="https://ratings.fide.com/profile/${fideId}" target="_blank" style="color:var(--blue);font-size:11px;">Xem trên FIDE ↗</a>` : ''}
          </div>
          <button class="slot-action-btn secondary" style="padding:6px 12px;font-size:11px;" onclick="ScheduleEditorPage.editFideId()">
            ${fideId ? '✏️ Sửa' : '➕ Thêm'}
          </button>
        </div>
        ${lastRating ? `
          <div style="display:flex;gap:8px;margin-bottom:8px;">
            <div style="flex:1;padding:8px;background:var(--bg-elevated);border-radius:8px;text-align:center;">
              <div style="font-size:18px;font-weight:800;color:var(--gold);">${lastRating.standard || '?'}</div>
              <div style="font-size:10px;color:var(--text-dim);">Standard</div>
            </div>
            <div style="flex:1;padding:8px;background:var(--bg-elevated);border-radius:8px;text-align:center;">
              <div style="font-size:18px;font-weight:800;color:var(--blue);">${lastRating.rapid || '?'}</div>
              <div style="font-size:10px;color:var(--text-dim);">Rapid</div>
            </div>
            <div style="flex:1;padding:8px;background:var(--bg-elevated);border-radius:8px;text-align:center;">
              <div style="font-size:18px;font-weight:800;color:var(--orange);">${lastRating.blitz || '?'}</div>
              <div style="font-size:10px;color:var(--text-dim);">Blitz</div>
            </div>
          </div>
          <div style="font-size:10px;color:var(--text-dim);margin-bottom:8px;">Cập nhật gần nhất: ${lastFetch}</div>
        ` : ''}
        <button class="btn-submit" style="width:100%;font-size:12px;padding:8px;background:var(--blue);" onclick="ScheduleEditorPage.manualFetchFide()" id="fide-fetch-btn">
          🔄 Cập nhật ELO từ FIDE ngay
        </button>
        <div style="font-size:10px;color:var(--text-dim);margin-top:6px;text-align:center;">Tự động cập nhật vào đầu mỗi tháng</div>
      </div>
    `;

    // Phase Assignment Section
    html += `<div class="section-title">📋 Gán Lịch Theo Giai Đoạn</div>`;
    html += '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">';
    for (const phase of TRAINING_CONFIG.phases) {
      const assignedId = phaseMap[phase.id] || 'default';
      const assignedProfile = profiles[assignedId];
      const isCurrent = phase.id === getCurrentPhase().id;
      html += `
        <div class="card ${isCurrent ? 'card-glow' : ''}" style="padding:12px 14px;" onclick="ScheduleEditorPage.showAssignPhase(${phase.id})">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="dash-phase-badge phase-bg-${phase.id}" style="margin:0;font-size:11px;padding:3px 8px;">
                ${phase.icon} P${phase.id}
              </span>
              <div>
                <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${phase.name} → ${phase.eloTarget}</div>
                ${isCurrent ? '<span style="font-size:10px;color:var(--green);">● Đang ở đây</span>' : ''}
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px;color:var(--gold);font-weight:600;">${assignedProfile?.name || 'Mặc định'}</div>
              <div style="font-size:10px;color:var(--text-dim);">Nhấn để đổi →</div>
            </div>
          </div>
        </div>
      `;
    }
    html += '</div>';

    // Profiles List
    html += `<div class="section-title">📁 Danh Sách Lịch</div>`;
    for (const [id, profile] of Object.entries(profiles)) {
      const isActive = id === activeId;
      const usedBy = TRAINING_CONFIG.phases.filter(p => (phaseMap[p.id] || 'default') === id);
      html += `
        <div class="card ${isActive ? 'card-glow' : ''}" style="padding:14px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div style="flex:1;">
              <div style="font-weight:700;font-size:14px;color:var(--text-primary);">
                ${isActive ? '✨ ' : ''}${profile.name}
              </div>
              ${profile.description ? `<div style="font-size:11px;color:var(--text-dim);margin-top:2px;">${profile.description}</div>` : ''}
              ${usedBy.length > 0 ? `<div style="font-size:11px;color:var(--blue);margin-top:4px;">Dùng cho: ${usedBy.map(p => `P${p.id}`).join(', ')}</div>` : ''}
            </div>
            <div style="display:flex;gap:6px;">
              <button class="slot-action-btn secondary" style="padding:6px 10px;font-size:12px;" onclick="event.stopPropagation(); ScheduleEditorPage.editProfile('${id}')">✏️</button>
              <button class="slot-action-btn secondary" style="padding:6px 10px;font-size:12px;" onclick="event.stopPropagation(); ScheduleEditorPage.cloneProfile('${id}')">📋</button>
              ${!profile.isDefault ? `<button class="slot-action-btn secondary" style="padding:6px 10px;font-size:12px;background:rgba(244,67,54,0.15);color:var(--red);" onclick="event.stopPropagation(); ScheduleEditorPage.deleteProfile('${id}')">🗑️</button>` : ''}
            </div>
          </div>
          <!-- Day preview -->
          <div style="display:flex;gap:4px;margin-top:10px;flex-wrap:wrap;">
            ${[1,2,3,4,5,6,0].map(d => {
              const day = profile.schedule[d];
              const dayNames = {0:'CN',1:'T2',2:'T3',3:'T4',4:'T5',5:'T6',6:'T7'};
              const chessSlots = day?.slots?.filter(s => !['meal','rest'].includes(s.type)).length || 0;
              return `<div style="flex:1;min-width:38px;text-align:center;padding:4px;border-radius:6px;background:var(--bg-elevated);font-size:10px;${day?.isRest ? 'opacity:0.5;' : ''}">
                <div style="font-weight:600;color:var(--text-secondary);">${dayNames[d]}</div>
                <div style="color:${day?.isRest ? 'var(--text-dim)' : 'var(--gold)'};font-weight:700;">${day?.isRest ? '😴' : chessSlots}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      `;
    }
    return html;
  },

  // ═══ FIDE Functions ═══
  editFideId() {
    const current = getFideId();
    const formHtml = `
      <div class="form-group">
        <label class="form-label">FIDE ID</label>
        <input class="form-input" id="modal-fide-id" placeholder="VD: 12403938" value="${current}">
        <div style="font-size:11px;color:var(--text-dim);margin-top:6px;">
          Tìm FIDE ID tại <a href="https://ratings.fide.com" target="_blank" style="color:var(--blue);">ratings.fide.com</a>
        </div>
      </div>
    `;
    App.showModal('🌐 Cập nhật FIDE ID', formHtml, () => {
      const newId = document.getElementById('modal-fide-id').value.trim();
      if (newId) {
        setFideId(newId);
        App.closeModal();
        App.showToast('✅ Đã lưu FIDE ID: ' + newId);
        App.renderCurrentPage();
      } else {
        App.showToast('⚠️ Nhập FIDE ID');
      }
    });
  },

  async manualFetchFide() {
    const fideId = getFideId();
    if (!fideId) {
      App.showToast('⚠️ Chưa cài FIDE ID. Nhấn "Sửa" để thêm.');
      return;
    }
    const btn = document.getElementById('fide-fetch-btn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⏳ Đang tải...';
    }
    try {
      const rating = await fetchFideRating(fideId);
      localStorage.setItem('chess_fide_last_rating', JSON.stringify(rating));
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      localStorage.setItem('chess_fide_last_fetch', currentMonth);

      // Save to ELO history
      if (rating.standard) {
        const data = JSON.parse(localStorage.getItem('chess_elo_data') || '[]');
        const today = now.toISOString().slice(0, 10);
        if (!data.some(d => d.date === today)) {
          data.push({
            date: today, value: rating.standard,
            note: `🌐 FIDE (Std: ${rating.standard}, Rapid: ${rating.rapid || '?'}, Blitz: ${rating.blitz || '?'})`
          });
          localStorage.setItem('chess_elo_data', JSON.stringify(data));
        }
      }

      const parts = [];
      if (rating.standard) parts.push(`Std: ${rating.standard}`);
      if (rating.rapid) parts.push(`Rapid: ${rating.rapid}`);
      if (rating.blitz) parts.push(`Blitz: ${rating.blitz}`);
      App.showToast(`🌐 FIDE: ${parts.join(' | ') || 'Không tìm thấy rating'}`);
      App.renderCurrentPage();
    } catch (err) {
      App.showToast(`❌ Lỗi: ${err.message}`);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '🔄 Cập nhật ELO từ FIDE ngay';
      }
    }
  },

  showCreateProfile() {
    const formHtml = `
      <div class="form-group">
        <label class="form-label">Tên lịch</label>
        <input class="form-input" id="modal-profile-name" placeholder="VD: Lịch 2100-2200 Chuyên sâu">
      </div>
      <div class="form-group">
        <label class="form-label">Mô tả (tùy chọn)</label>
        <input class="form-input" id="modal-profile-desc" placeholder="Mô tả ngắn...">
      </div>
      <div class="form-group">
        <label class="form-label">Tạo từ</label>
        <select class="form-input" id="modal-profile-base">
          <option value="empty">🆕 Lịch trống (tự tạo)</option>
          ${Object.entries(getScheduleProfiles()).map(([id, p]) =>
            `<option value="${id}">📋 Sao chép từ: ${p.name}</option>`
          ).join('')}
        </select>
      </div>
    `;
    App.showModal('➕ Tạo Lịch Mới', formHtml, () => {
      const name = document.getElementById('modal-profile-name').value.trim();
      if (!name) { App.showToast('⚠️ Nhập tên lịch'); return; }
      const desc = document.getElementById('modal-profile-desc').value.trim();
      const base = document.getElementById('modal-profile-base').value;
      const profiles = getScheduleProfiles();
      const id = 'profile-' + Date.now().toString(36);
      let schedule;
      if (base === 'empty') {
        schedule = this.createEmptySchedule();
      } else {
        schedule = JSON.parse(JSON.stringify(profiles[base]?.schedule || this.createEmptySchedule()));
      }
      profiles[id] = { name, description: desc, schedule, isDefault: false, createdAt: new Date().toISOString() };
      saveScheduleProfiles(profiles);
      App.closeModal();
      App.showToast('✅ Đã tạo lịch: ' + name);
      App.renderCurrentPage();
    });
  },

  createEmptySchedule() {
    const dayNames = {0:'Chủ Nhật',1:'Thứ 2',2:'Thứ 3',3:'Thứ 4',4:'Thứ 5',5:'Thứ 6',6:'Thứ 7'};
    const sched = {};
    for (let d = 0; d <= 6; d++) {
      sched[d] = { name: dayNames[d], isRest: (d === 5), slots: [], restMessage: d === 5 ? '🟢 Nghỉ ngơi — Hồi phục năng lượng.' : '' };
    }
    return sched;
  },

  editProfile(profileId) {
    this.editingProfileId = profileId;
    const profiles = getScheduleProfiles();
    const profile = profiles[profileId];
    if (!profile) return;
    const dayNames = {0:'Chủ Nhật',1:'Thứ 2',2:'Thứ 3',3:'Thứ 4',4:'Thứ 5',5:'Thứ 6',6:'Thứ 7'};
    let dayList = [1,2,3,4,5,6,0].map(d => {
      const day = profile.schedule[d];
      const slots = day?.slots || [];
      const chessSlots = slots.filter(s => !['meal','rest'].includes(s.type));
      return `
        <div class="card" style="padding:10px 12px;margin-bottom:8px;cursor:pointer;" onclick="ScheduleEditorPage.editDay('${profileId}', ${d})">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-weight:600;color:var(--text-primary);">${dayNames[d]} ${day?.isRest ? '😴' : ''}</div>
            <div style="font-size:12px;color:var(--text-dim);">${chessSlots.length} buổi học → Nhấn để sửa</div>
          </div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">
            ${chessSlots.slice(0, 4).map(s => `${s.icon || '📌'} ${s.title}`).join(' • ') || 'Chưa có slot'}
          </div>
        </div>
      `;
    }).join('');

    const formHtml = `
      <div class="form-group">
        <label class="form-label">Tên lịch</label>
        <input class="form-input" id="modal-edit-name" value="${profile.name}" ${profile.isDefault ? 'disabled' : ''}>
      </div>
      <div class="form-group" style="margin-top:12px;">
        <label class="form-label">Các ngày trong tuần (nhấn để chỉnh)</label>
        ${dayList}
      </div>
    `;

    App.showModal('✏️ Sửa Lịch: ' + profile.name, formHtml, () => {
      if (!profile.isDefault) {
        const newName = document.getElementById('modal-edit-name').value.trim();
        if (newName) { profile.name = newName; }
      }
      saveScheduleProfiles(profiles);
      App.closeModal();
      App.showToast('✅ Đã lưu');
      App.renderCurrentPage();
    });
  },

  editDay(profileId, dayNum) {
    App.closeModal();
    const profiles = getScheduleProfiles();
    const profile = profiles[profileId];
    const day = profile.schedule[dayNum];
    const dayNames = {0:'Chủ Nhật',1:'Thứ 2',2:'Thứ 3',3:'Thứ 4',4:'Thứ 5',5:'Thứ 6',6:'Thứ 7'};
    const types = TRAINING_CONFIG.slotTypes;

    let slotsHtml = '';
    if (day.slots && day.slots.length > 0) {
      slotsHtml = day.slots.map((slot, i) => {
        const typeInfo = types[slot.type] || {};
        return `
          <div style="display:flex;align-items:center;gap:6px;padding:8px;background:var(--bg-elevated);border-radius:8px;margin-bottom:6px;">
            <div style="flex:1;min-width:0;">
              <div style="font-size:12px;font-weight:600;color:var(--text-primary);">${slot.icon || '📌'} ${slot.title}</div>
              <div style="font-size:10px;color:var(--text-dim);">${slot.time}–${slot.endTime} | ${typeInfo.label || slot.type}</div>
            </div>
            <button class="slot-action-btn secondary" style="padding:4px 8px;font-size:10px;" onclick="ScheduleEditorPage.editSlot('${profileId}', ${dayNum}, ${i})">✏️</button>
            <button class="slot-action-btn secondary" style="padding:4px 8px;font-size:10px;background:rgba(244,67,54,0.15);color:var(--red);" onclick="ScheduleEditorPage.removeSlot('${profileId}', ${dayNum}, ${i})">✕</button>
          </div>
        `;
      }).join('');
    } else {
      slotsHtml = '<div style="text-align:center;padding:16px;color:var(--text-dim);font-size:13px;">Chưa có slot nào</div>';
    }

    const formHtml = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
        <label style="font-size:13px;color:var(--text-secondary);">Ngày nghỉ?</label>
        <input type="checkbox" id="modal-day-rest" ${day.isRest ? 'checked' : ''} style="width:18px;height:18px;">
      </div>
      <div id="day-slots-list">${slotsHtml}</div>
      <button class="btn-submit" style="width:100%;font-size:12px;padding:10px;margin-top:8px;background:var(--blue);"
              onclick="ScheduleEditorPage.addSlot('${profileId}', ${dayNum})">
        ➕ Thêm Slot Mới
      </button>
    `;

    App.showModal(`📅 ${dayNames[dayNum]} — ${profile.name}`, formHtml, () => {
      day.isRest = document.getElementById('modal-day-rest').checked;
      saveScheduleProfiles(profiles);
      App.closeModal();
      App.showToast('✅ Đã lưu ngày');
      // Reopen profile editor
      setTimeout(() => this.editProfile(profileId), 200);
    });
  },

  addSlot(profileId, dayNum) {
    App.closeModal();
    const types = Object.entries(TRAINING_CONFIG.slotTypes);
    const formHtml = `
      <div class="form-group"><label class="form-label">Tiêu đề</label><input class="form-input" id="slot-title" placeholder="VD: Khai cuộc"></div>
      <div style="display:flex;gap:8px;">
        <div class="form-group" style="flex:1;"><label class="form-label">Bắt đầu</label><input class="form-input" type="time" id="slot-start" value="06:00"></div>
        <div class="form-group" style="flex:1;"><label class="form-label">Kết thúc</label><input class="form-input" type="time" id="slot-end" value="09:00"></div>
      </div>
      <div class="form-group"><label class="form-label">Loại</label>
        <select class="form-input" id="slot-type">${types.map(([k,v]) => `<option value="${k}">${v.label}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Icon</label><input class="form-input" id="slot-icon" value="♟️" style="width:60px;"></div>
      <div class="form-group"><label class="form-label">Mô tả</label><textarea class="form-textarea" id="slot-desc" style="min-height:50px;"></textarea></div>
    `;
    App.showModal('➕ Thêm Slot', formHtml, () => {
      const title = document.getElementById('slot-title').value.trim();
      if (!title) { App.showToast('⚠️ Nhập tiêu đề'); return; }
      const profiles = getScheduleProfiles();
      const day = profiles[profileId].schedule[dayNum];
      day.slots.push({
        id: 'custom-' + Date.now().toString(36),
        time: document.getElementById('slot-start').value,
        endTime: document.getElementById('slot-end').value,
        type: document.getElementById('slot-type').value,
        icon: document.getElementById('slot-icon').value || '📌',
        title: title,
        description: document.getElementById('slot-desc').value.trim()
      });
      day.slots.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
      saveScheduleProfiles(profiles);
      App.closeModal();
      App.showToast('✅ Đã thêm slot');
      setTimeout(() => this.editDay(profileId, dayNum), 200);
    });
  },

  editSlot(profileId, dayNum, slotIndex) {
    App.closeModal();
    const profiles = getScheduleProfiles();
    const slot = profiles[profileId].schedule[dayNum].slots[slotIndex];
    const types = Object.entries(TRAINING_CONFIG.slotTypes);
    const formHtml = `
      <div class="form-group"><label class="form-label">Tiêu đề</label><input class="form-input" id="slot-title" value="${slot.title}"></div>
      <div style="display:flex;gap:8px;">
        <div class="form-group" style="flex:1;"><label class="form-label">Bắt đầu</label><input class="form-input" type="time" id="slot-start" value="${slot.time}"></div>
        <div class="form-group" style="flex:1;"><label class="form-label">Kết thúc</label><input class="form-input" type="time" id="slot-end" value="${slot.endTime}"></div>
      </div>
      <div class="form-group"><label class="form-label">Loại</label>
        <select class="form-input" id="slot-type">${types.map(([k,v]) => `<option value="${k}" ${k === slot.type ? 'selected' : ''}>${v.label}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Icon</label><input class="form-input" id="slot-icon" value="${slot.icon || '📌'}" style="width:60px;"></div>
      <div class="form-group"><label class="form-label">Mô tả</label><textarea class="form-textarea" id="slot-desc" style="min-height:50px;">${slot.description || ''}</textarea></div>
    `;
    App.showModal('✏️ Sửa: ' + slot.title, formHtml, () => {
      slot.title = document.getElementById('slot-title').value.trim() || slot.title;
      slot.time = document.getElementById('slot-start').value;
      slot.endTime = document.getElementById('slot-end').value;
      slot.type = document.getElementById('slot-type').value;
      slot.icon = document.getElementById('slot-icon').value || '📌';
      slot.description = document.getElementById('slot-desc').value.trim();
      const day = profiles[profileId].schedule[dayNum];
      day.slots.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
      saveScheduleProfiles(profiles);
      App.closeModal();
      App.showToast('✅ Đã cập nhật');
      setTimeout(() => this.editDay(profileId, dayNum), 200);
    });
  },

  removeSlot(profileId, dayNum, slotIndex) {
    const profiles = getScheduleProfiles();
    profiles[profileId].schedule[dayNum].slots.splice(slotIndex, 1);
    saveScheduleProfiles(profiles);
    App.showToast('🗑️ Đã xóa slot');
    this.editDay(profileId, dayNum);
  },

  cloneProfile(sourceId) {
    const profiles = getScheduleProfiles();
    const source = profiles[sourceId];
    const id = 'profile-' + Date.now().toString(36);
    profiles[id] = {
      name: source.name + ' (Bản sao)',
      description: 'Sao chép từ ' + source.name,
      schedule: JSON.parse(JSON.stringify(source.schedule)),
      isDefault: false,
      createdAt: new Date().toISOString()
    };
    saveScheduleProfiles(profiles);
    App.showToast('📋 Đã sao chép');
    App.renderCurrentPage();
  },

  deleteProfile(profileId) {
    App.showConfirm('🗑️ Xóa lịch này? Các giai đoạn đang dùng sẽ chuyển về mặc định.', () => {
      const profiles = getScheduleProfiles();
      delete profiles[profileId];
      saveScheduleProfiles(profiles);
      // Reset any phases using this profile
      const map = getPhaseScheduleMap();
      for (const key of Object.keys(map)) {
        if (map[key] === profileId) map[key] = 'default';
      }
      savePhaseScheduleMap(map);
      App.showToast('🗑️ Đã xóa');
      App.renderCurrentPage();
    });
  },

  showAssignPhase(phaseId) {
    const profiles = getScheduleProfiles();
    const phaseMap = getPhaseScheduleMap();
    const currentAssigned = phaseMap[phaseId] || 'default';
    const phase = TRAINING_CONFIG.phases.find(p => p.id === phaseId);

    const options = Object.entries(profiles).map(([id, p]) =>
      `<option value="${id}" ${id === currentAssigned ? 'selected' : ''}>${p.name}</option>`
    ).join('');

    const formHtml = `
      <div style="margin-bottom:12px;font-size:13px;color:var(--text-secondary);">
        ${phase.icon} <b>${phase.name}</b> — Mục tiêu: ${phase.eloTarget}
      </div>
      <div class="form-group">
        <label class="form-label">Chọn lịch cho giai đoạn này</label>
        <select class="form-input" id="modal-assign-profile">${options}</select>
      </div>
    `;

    App.showModal('📋 Gán Lịch — Phase ' + phaseId, formHtml, () => {
      const selectedId = document.getElementById('modal-assign-profile').value;
      const map = getPhaseScheduleMap();
      map[phaseId] = selectedId;
      savePhaseScheduleMap(map);
      App.closeModal();
      App.showToast(`✅ Phase ${phaseId} → ${profiles[selectedId].name}`);
      App.renderCurrentPage();
    });
  },

  editFideId() {
    const current = getFideId();
    const formHtml = `
      <div class="form-group">
        <label class="form-label">FIDE ID</label>
        <input class="form-input" id="modal-fide-id" value="${current}" placeholder="VD: 12403938" type="number">
      </div>
      <div style="font-size:11px;color:var(--text-dim);margin-top:4px;">
        Tìm ID tại <a href="https://ratings.fide.com" target="_blank" style="color:var(--blue);">ratings.fide.com</a>
      </div>
    `;
    App.showModal('🌐 Cài Đặt FIDE ID', formHtml, () => {
      const newId = document.getElementById('modal-fide-id').value.trim();
      setFideId(newId);
      App.closeModal();
      App.showToast(newId ? `✅ FIDE ID: ${newId}` : '🗑️ Đã xóa FIDE ID');
      App.renderCurrentPage();
    });
  },

  async manualFetchFide() {
    const fideId = getFideId();
    if (!fideId) {
      this.editFideId();
      return;
    }
    const btn = document.getElementById('fide-fetch-btn');
    if (btn) { btn.textContent = '⏳ Đang tải...'; btn.disabled = true; }
    try {
      const rating = await fetchFideRating(fideId);
      if (rating.standard) {
        const data = JSON.parse(localStorage.getItem('chess_elo_data') || '[]');
        const today = new Date().toISOString().slice(0, 10);
        if (!data.some(d => d.date === today)) {
          data.push({
            date: today, value: rating.standard,
            note: `🌐 FIDE manual (Std: ${rating.standard}, Rapid: ${rating.rapid || '?'}, Blitz: ${rating.blitz || '?'})`
          });
          localStorage.setItem('chess_elo_data', JSON.stringify(data));
        }
        const now = new Date();
        localStorage.setItem('chess_fide_last_fetch', `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
        localStorage.setItem('chess_fide_last_rating', JSON.stringify(rating));
        App.showToast(`✅ FIDE: Std ${rating.standard} | Rapid ${rating.rapid || '?'} | Blitz ${rating.blitz || '?'}`);
      } else {
        App.showToast('⚠️ Không tìm thấy rating. Kiểm tra FIDE ID.');
      }
    } catch (e) {
      App.showToast('❌ Lỗi: ' + e.message);
    }
    App.renderCurrentPage();
  }
};
