/**
 * Chess Training Planner — Data Sync Module
 * Handles: Export JSON, Import JSON, Google Drive sync via Apps Script
 */

const DataSync = {
  // Google Apps Script Web App URL (user deploys their own)
  SCRIPT_URL: localStorage.getItem('chess_gdrive_url') || '',

  // ═══ Export all data as structured JSON ═══
  exportData() {
    const data = this.gatherAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `chess_training_${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('📥 Đã tải xuống file JSON!');
  },

  // ═══ Import data from JSON file ═══
  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          this.restoreAllData(data);
          App.showToast('✅ Đã import dữ liệu thành công!');
          App.renderCurrentPage();
        } catch (err) {
          App.showToast('❌ File không hợp lệ!');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  // ═══ Gather all data into a structured object ═══
  gatherAllData() {
    const now = new Date();
    return {
      _meta: {
        appName: 'Chess Training Planner',
        exportDate: now.toISOString(),
        exportDateLocal: now.toLocaleString('vi-VN'),
        version: '2.0',
        player: TRAINING_CONFIG.playerInfo,
        currentWeek: getCurrentWeek(),
        currentPhase: getCurrentPhase().name
      },
      eloHistory: JSON.parse(localStorage.getItem('chess_elo_data') || '[]'),
      weightHistory: JSON.parse(localStorage.getItem('chess_weight_data') || '[]'),
      journal: JSON.parse(localStorage.getItem('chess_journal') || '[]'),
      completions: JSON.parse(localStorage.getItem('chess_completions') || '{}'),
      bookProgress: JSON.parse(localStorage.getItem('chess_book_progress') || '{}'),
      tournaments: JSON.parse(localStorage.getItem('chess_tournaments') || '[]'),
      timeLogs: JSON.parse(localStorage.getItem('chess_time_logs') || '[]'),
      settings: {
        gdriveUrl: localStorage.getItem('chess_gdrive_url') || ''
      }
    };
  },

  // ═══ Restore data from a structured object ═══
  restoreAllData(data) {
    if (data.eloHistory) localStorage.setItem('chess_elo_data', JSON.stringify(data.eloHistory));
    if (data.weightHistory) localStorage.setItem('chess_weight_data', JSON.stringify(data.weightHistory));
    if (data.journal) localStorage.setItem('chess_journal', JSON.stringify(data.journal));
    if (data.completions) localStorage.setItem('chess_completions', JSON.stringify(data.completions));
    if (data.bookProgress) localStorage.setItem('chess_book_progress', JSON.stringify(data.bookProgress));
    if (data.tournaments) localStorage.setItem('chess_tournaments', JSON.stringify(data.tournaments));
    if (data.timeLogs) localStorage.setItem('chess_time_logs', JSON.stringify(data.timeLogs));
    if (data.settings && data.settings.gdriveUrl) {
      localStorage.setItem('chess_gdrive_url', data.settings.gdriveUrl);
      this.SCRIPT_URL = data.settings.gdriveUrl;
    }
  },

  // ═══ Google Drive Sync ═══
  async syncToGoogleDrive() {
    if (!this.SCRIPT_URL) {
      this.showSetupModal();
      return;
    }

    App.showToast('☁️ Đang đồng bộ lên Google Drive...');

    try {
      const data = this.gatherAllData();
      const response = await fetch(this.SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      });

      // no-cors means we can't read the response, but if no error thrown, it likely worked
      App.showToast('✅ Đã gửi dữ liệu lên Google Drive!');
    } catch (err) {
      console.error('Drive sync error:', err);
      App.showToast('❌ Lỗi đồng bộ: ' + err.message);
    }
  },

  showSetupModal() {
    const formHtml = `
      <div class="form-group">
        <label class="form-label">Google Apps Script URL</label>
        <div style="font-size:12px;color:var(--text-dim);margin-bottom:8px;line-height:1.5;">
          Tạo Google Apps Script tại <b>script.google.com</b>, dán code bên dưới,
          deploy as Web App → Copy URL rồi dán vào đây.
        </div>
        <input class="form-input" type="url" id="modal-gdrive-url"
               placeholder="https://script.google.com/macros/s/xxx/exec"
               value="${this.SCRIPT_URL || ''}">
      </div>
      <div class="card" style="padding:12px;margin-top:12px;background:var(--bg-elevated);">
        <div style="font-size:11px;color:var(--text-dim);font-family:monospace;white-space:pre-wrap;line-height:1.5;">Code Apps Script:

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var folder = DriveApp.getFolderById(
    '1X9zh96E1d_pUyEWjwWlsXKefukZ7iapu'
  );
  var date = new Date().toISOString().slice(0,10);
  var fileName = 'chess_data_' + date + '.json';
  
  // Delete old file with same name
  var files = folder.getFilesByName(fileName);
  while (files.hasNext()) files.next().setTrashed(true);
  
  // Create new file
  folder.createFile(fileName,
    JSON.stringify(data, null, 2),
    'application/json'
  );
  
  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}</div>
      </div>
    `;

    App.showModal('☁️ Cài Đặt Google Drive Sync', formHtml, () => {
      const url = document.getElementById('modal-gdrive-url').value.trim();
      if (url) {
        localStorage.setItem('chess_gdrive_url', url);
        this.SCRIPT_URL = url;
        App.closeModal();
        App.showToast('✅ Đã lưu URL! Đang đồng bộ...');
        this.syncToGoogleDrive();
      } else {
        App.showToast('⚠️ Nhập URL');
      }
    });
  },

  // ═══ Render sync section for Tracker ═══
  renderSyncSection() {
    const hasUrl = !!this.SCRIPT_URL;
    return `
      <div class="tracker-section">
        <div class="tracker-section-title">💾 Dữ Liệu & Đồng Bộ</div>

        <div style="display:flex;gap:8px;margin-bottom:12px;">
          <button class="btn-submit" style="flex:1;font-size:13px;padding:10px;background:var(--blue);"
                  onclick="DataSync.exportData()">
            📥 Xuất JSON
          </button>
          <button class="btn-submit" style="flex:1;font-size:13px;padding:10px;background:var(--purple);"
                  onclick="DataSync.importData()">
            📤 Nhập JSON
          </button>
        </div>

        <button class="btn-submit" style="font-size:13px;padding:10px;${hasUrl ? 'background:var(--green);' : ''}"
                onclick="DataSync.syncToGoogleDrive()">
          ☁️ ${hasUrl ? 'Đồng bộ Google Drive' : 'Cài đặt Google Drive Sync'}
        </button>

        ${hasUrl ? `
          <div style="font-size:11px;color:var(--text-dim);margin-top:8px;text-align:center;">
            ✅ Đã kết nối — <span style="cursor:pointer;color:var(--blue);text-decoration:underline;"
                                  onclick="DataSync.showSetupModal()">Đổi URL</span>
          </div>
        ` : ''}
      </div>
    `;
  }
};
