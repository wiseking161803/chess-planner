/**
 * Chess Training Planner — Main App Controller & Router
 */

const App = {
  currentPage: 'dashboard',
  refreshInterval: null,

  pages: {
    dashboard: { title: 'Tổng Quan', module: () => DashboardPage },
    schedule:  { title: 'Lịch Học', module: () => SchedulePage },
    journal:   { title: 'Nhật Ký', module: () => JournalPage },
    tracker:   { title: 'Tiến Trình', module: () => TrackerPage },
    editor:    { title: 'Tùy Biến Lịch', module: () => ScheduleEditorPage }
  },

  init() {
    // Hide splash after animation
    setTimeout(() => {
      const splash = document.getElementById('splash-screen');
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.remove();
        document.getElementById('app').classList.remove('hidden');
      }, 500);
    }, 1400);

    // Setup navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        this.navigateTo(page);
      });
    });

    // Initial render
    this.navigateTo('dashboard');

    // Notifications
    NotificationManager.init();

    // FIDE ELO auto-crawl (monthly)
    autoFetchFideElo();

    // Cleanup old data
    cleanupOldCompletions();

    // Refresh dashboard every minute to update current session
    this.refreshInterval = setInterval(() => {
      if (this.currentPage === 'dashboard') {
        this.renderCurrentPage();
      }
    }, 60000);

    // Update floating timer every second
    setInterval(() => {
      if (TimerModule.isRunning) {
        TimerModule.updateTimerUI();
      }
    }, 1000);

    // Handle hash routing
    window.addEventListener('hashchange', () => {
      const page = location.hash.slice(1) || 'dashboard';
      if (this.pages[page]) this.navigateTo(page, false);
    });

    // Notification button in header
    document.getElementById('btn-notification').addEventListener('click', () => {
      if (NotificationManager.permission !== 'granted') {
        NotificationManager.requestPermission();
      } else {
        this.showToast('🔔 Thông báo đã được bật');
      }
    });

    // Offline/Online detection
    this.setupOfflineDetection();
  },

  navigateTo(page, updateHash = true) {
    if (!this.pages[page]) return;

    this.currentPage = page;
    if (updateHash) location.hash = page;

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });

    // Update header
    document.getElementById('header-title').textContent = this.pages[page].title;

    // Render page
    this.renderCurrentPage();
  },

  renderCurrentPage() {
    const container = document.getElementById('page-container');
    const pageModule = this.pages[this.currentPage].module();

    try {
      container.innerHTML = `<div class="page-enter">${pageModule.render()}</div>`;
    } catch (err) {
      console.error('Render error:', err);
      container.innerHTML = `
        <div class="card" style="padding:24px;text-align:center;margin-top:40px;">
          <div style="font-size:32px;margin-bottom:12px;">⚠️</div>
          <div style="color:var(--text-primary);font-weight:700;margin-bottom:8px;">Lỗi hiển thị trang</div>
          <div style="font-size:13px;color:var(--text-dim);margin-bottom:16px;">${err.message}</div>
          <button class="btn-submit" onclick="App.navigateTo('dashboard')">🏠 Về Dashboard</button>
        </div>
      `;
    }
    container.scrollTop = 0;

    // Auto-scroll to current slot on schedule page
    if (this.currentPage === 'schedule') {
      setTimeout(() => {
        const current = container.querySelector('.slot-item.current');
        if (current) {
          current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          current.classList.add('expanded');
        }
      }, 300);
    }
  },

  showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  },

  // ═══ Offline Detection ═══
  setupOfflineDetection() {
    const banner = document.getElementById('offline-banner');
    if (!banner) return;

    const update = () => {
      if (!navigator.onLine) {
        banner.classList.remove('hidden');
      } else {
        banner.classList.add('hidden');
      }
    };

    window.addEventListener('online', () => {
      update();
      this.showToast('✅ Đã kết nối lại!');
    });
    window.addEventListener('offline', () => {
      update();
    });
    update();
  },

  // ═══ Modal System ═══
  showModal(title, contentHtml, onSubmit) {
    this.closeModal();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'app-modal';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-handle"></div>
        <div class="modal-title">${title}</div>
        <div class="modal-body">${contentHtml}</div>
        <div style="display:flex;gap:10px;margin-top:16px;">
          <button class="btn-submit" id="modal-submit-btn" style="flex:1;">✅ Lưu</button>
          <button class="slot-action-btn secondary" onclick="App.closeModal()" style="flex:0.5;padding:14px;">Hủy</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) App.closeModal();
    });

    // Submit handler
    document.getElementById('modal-submit-btn').addEventListener('click', () => {
      if (onSubmit) onSubmit();
    });

    // Focus first input
    setTimeout(() => {
      const firstInput = overlay.querySelector('input, textarea, select');
      if (firstInput) firstInput.focus();
    }, 300);
  },

  closeModal() {
    const modal = document.getElementById('app-modal');
    if (modal) modal.remove();
  },

  showConfirm(message, onConfirm) {
    this.closeModal();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'app-modal';
    overlay.innerHTML = `
      <div class="modal-content" style="max-width:360px;">
        <div class="modal-handle"></div>
        <div style="font-size:15px;color:var(--text-primary);line-height:1.5;margin-bottom:16px;">${message}</div>
        <div style="display:flex;gap:10px;">
          <button class="btn-submit" style="flex:1;background:var(--red);" onclick="document.getElementById('app-modal')._onConfirm()">Xóa</button>
          <button class="slot-action-btn secondary" onclick="App.closeModal()" style="flex:1;padding:14px;">Hủy</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay._onConfirm = () => {
      App.closeModal();
      if (onConfirm) onConfirm();
    };
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) App.closeModal();
    });
  }
};

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW registration failed:', err));
  });
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => App.init());

