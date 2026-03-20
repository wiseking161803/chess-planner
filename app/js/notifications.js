/**
 * Chess Training Planner — Notification Manager
 */

const NotificationManager = {
  permission: 'default',
  checkInterval: null,
  lastNotifiedSlot: null,

  init() {
    if ('Notification' in window) {
      this.permission = Notification.permission;
    }
    this.startChecking();
  },

  async requestPermission() {
    if (!('Notification' in window)) {
      App.showToast('Trình duyệt không hỗ trợ thông báo');
      return false;
    }
    const result = await Notification.requestPermission();
    this.permission = result;
    if (result === 'granted') {
      App.showToast('✅ Đã bật thông báo!');
      this.hideBanner();
      return true;
    }
    return false;
  },

  startChecking() {
    // Check every minute
    this.checkInterval = setInterval(() => this.checkUpcoming(), 60000);
    // Also check immediately
    setTimeout(() => this.checkUpcoming(), 3000);
  },

  checkUpcoming() {
    if (this.permission !== 'granted') return;

    const schedule = getTodaySchedule();
    if (!schedule || schedule.isRest) return;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const slot of schedule.slots) {
      const startMin = timeToMinutes(slot.time);
      // Notify 5 minutes before
      const notifyAt = startMin - 5;

      if (currentMinutes === notifyAt && this.lastNotifiedSlot !== slot.id) {
        this.lastNotifiedSlot = slot.id;
        this.showNotification(slot);
        break;
      }
    }
  },

  showNotification(slot) {
    const content = getSlotContent(slot);
    const notification = new Notification(`${slot.icon} ${slot.title} — ${slot.time}`, {
      body: content || slot.description || 'Sắp đến giờ!',
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-192.png',
      tag: slot.id,
      vibrate: [200, 100, 200],
      requireInteraction: true
    });

    notification.onclick = () => {
      window.focus();
      App.navigateTo('schedule');
      notification.close();
    };
  },

  showBanner() {
    if (this.permission === 'granted') return '';
    return `
      <div class="notif-banner" id="notif-banner">
        <span class="notif-banner-icon">🔔</span>
        <span class="notif-banner-text">Bật thông báo để nhận nhắc nhở trước mỗi phiên học 5 phút</span>
        <button class="notif-banner-btn" onclick="NotificationManager.requestPermission()">Bật</button>
      </div>
    `;
  },

  hideBanner() {
    const banner = document.getElementById('notif-banner');
    if (banner) banner.remove();
  },

  destroy() {
    if (this.checkInterval) clearInterval(this.checkInterval);
  }
};
