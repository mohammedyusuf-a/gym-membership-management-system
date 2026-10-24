/**
 * TITAN IRON GYM - APPLICATION CONTROLLER (VERSION 6)
 * - 100% Tamil Gym Fitness Influencers & Creators (Surabi, Dolphin, Biglee, Saran, Kabilan, Danell, etc.)
 * - 100% Tamil Nadu Certified Coaches & Masters
 * - Real Market Protein Powders & Supplements Store
 * - Full E-Commerce Real-Time Shopping Cart & Multi-Payment Checkout
 * - Built-in Fail-Safe Image Fallback System
 */

const App = {
  currentView: 'dashboard',
  currentProShopCategory: 'ALL',
  currentProShopBrand: 'ALL',
  currentProShopSort: 'featured',
  currentCartCoupon: '',
  currentQuickViewProduct: null,
  selectedQuickViewFlavor: '',
  selectedQuickViewSize: '',
  currentCheckoutMethod: 'gpay',

  init() {
    this.bindEvents();
    this.startClock();
    this.checkAuthOnLoad();
    this.populateSelectDropdowns();
    this.updateCartHeaderUI();
    this.renderAll();

    const viewContent = document.querySelector('.view-content');
    if (viewContent) {
      viewContent.scrollTop = 0;
      viewContent.scrollLeft = 0;
    }
    window.scrollTo(0, 0);
  },

  // ==========================================================================
  // EVENT BINDINGS
  // ==========================================================================
  bindEvents() {
    // Navigation Menu
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        if (view) this.navigateTo(view);
      });
    });

    // Fast Check-in Topbar Input
    const fastInput = document.getElementById('fast-checkin-input');
    const fastBtn = document.getElementById('btn-fast-checkin');
    
    if (fastInput) {
      fastInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.executeFastCheckIn(fastInput.value.trim());
        }
      });
    }

    if (fastBtn) {
      fastBtn.addEventListener('click', () => {
        this.executeFastCheckIn(fastInput.value.trim());
      });
    }

    // Terminal Input in Attendance View
    const termInput = document.getElementById('terminal-input');
    const termBtn = document.getElementById('btn-terminal-submit');
    if (termInput) {
      termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.executeTerminalCheckIn(termInput.value.trim());
        }
      });
    }
    if (termBtn) {
      termBtn.addEventListener('click', () => {
        this.executeTerminalCheckIn(termInput.value.trim());
      });
    }

    // Open Add Member Modal
    const btnAddMember = document.getElementById('btn-open-add-member');
    if (btnAddMember) {
      btnAddMember.addEventListener('click', () => this.openAddMemberModal());
    }

    // Search and filters for members
    const memberSearch = document.getElementById('member-search-input');
    const planFilter = document.getElementById('member-plan-filter');
    const statusFilter = document.getElementById('member-status-filter');

    if (memberSearch) memberSearch.addEventListener('input', () => this.renderMembers());
    if (planFilter) planFilter.addEventListener('change', () => this.renderMembers());
    if (statusFilter) statusFilter.addEventListener('change', () => this.renderMembers());

    // Export CSV
    const btnExportMembers = document.getElementById('btn-export-members-csv');
    if (btnExportMembers) {
      btnExportMembers.addEventListener('click', () => this.exportMembersCSV());
    }

    const btnExportAtt = document.getElementById('btn-export-attendance');
    if (btnExportAtt) {
      btnExportAtt.addEventListener('click', () => this.exportAttendanceCSV());
    }

    // Theme toggle
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Quick reset
    const resetBtn = document.getElementById('btn-quick-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.confirmResetData());
    }

    // Plan & Trainer modal openers
    const btnAddPlan = document.getElementById('btn-open-add-plan');
    if (btnAddPlan) {
      btnAddPlan.addEventListener('click', () => this.openModal('modal-plan'));
    }

    const btnAddTrainer = document.getElementById('btn-open-add-trainer');
    if (btnAddTrainer) {
      btnAddTrainer.addEventListener('click', () => this.openModal('modal-trainer'));
    }

    const btnRecordPay = document.getElementById('btn-open-record-payment');
    if (btnRecordPay) {
      btnRecordPay.addEventListener('click', () => this.openRecordPaymentModal());
    }

    // Pro Shop Category Filters
    document.querySelectorAll('.proshop-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.proshop-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentProShopCategory = btn.getAttribute('data-category') || 'ALL';
        this.renderProShop();
      });
    });

    // Pro Shop Brand Filters
    document.querySelectorAll('.brand-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.brand-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentProShopBrand = btn.getAttribute('data-brand') || 'ALL';
        this.renderProShop();
      });
    });

    // Pro Shop Sort Selector
    const sortSelect = document.getElementById('proshop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        this.currentProShopSort = sortSelect.value;
        this.renderProShop();
      });
    }

    // Pro Shop Search
    const proshopSearch = document.getElementById('proshop-search-input');
    if (proshopSearch) {
      proshopSearch.addEventListener('input', () => this.renderProShop());
    }
  },

  // ==========================================================================
  // ADMIN AUTHENTICATION PORTAL (titan@gmail.com / titan123)
  // ==========================================================================
  openAdminPortalModal() {
    const auth = window.GymDB.getAdminAuth();
    const emailInput = document.getElementById('admin-email-input');
    const passInput = document.getElementById('admin-pass-input');
    const msgEl = document.getElementById('admin-login-msg');

    if (emailInput) emailInput.value = auth.email || 'titan@gmail.com';
    if (passInput) passInput.value = 'titan123';
    
    if (msgEl) {
      msgEl.style.display = 'block';
      msgEl.style.backgroundColor = 'var(--status-active-bg)';
      msgEl.style.color = 'var(--status-active-text)';
      msgEl.style.border = '1px solid var(--status-active-border)';
      msgEl.innerHTML = `<strong>Logged In:</strong> Admin session active for <strong>titan@gmail.com</strong> (Titan Club Master).`;
    }

    this.openModal('modal-admin-portal');
  },

  handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('admin-email-input').value.trim();
    const pass = document.getElementById('admin-pass-input').value.trim();
    const msgEl = document.getElementById('admin-login-msg');

    const result = window.GymDB.loginAdmin(email, pass);
    if (msgEl) {
      msgEl.style.display = 'block';
      if (result.success) {
        msgEl.style.backgroundColor = 'var(--status-active-bg)';
        msgEl.style.color = 'var(--status-active-text)';
        msgEl.style.border = '1px solid var(--status-active-border)';
        msgEl.innerText = result.message;
        this.updateUserSessionUI(result.user);
        this.showToast('Creator & Master Admin Verified!', 'success');
        setTimeout(() => {
          this.closeModals();
          this.navigateTo('dashboard');
        }, 600);
      } else {
        msgEl.style.backgroundColor = 'var(--status-expired-bg)';
        msgEl.style.color = 'var(--status-expired-text)';
        msgEl.style.border = '1px solid var(--status-expired-border)';
        msgEl.innerText = result.message;
        this.showToast(result.message, 'error');
      }
    }
  },

  openCreatorAdminModal() {
    this.closeAuthGateway();
    const emailInput = document.getElementById('admin-email-input');
    const passInput = document.getElementById('admin-pass-input');
    const msgEl = document.getElementById('admin-login-msg');
    if (passInput) passInput.value = '';
    if (msgEl) msgEl.style.display = 'none';
    this.openModal('modal-admin-portal');
  },

  closeCreatorAdminModal() {
    this.closeModals();
  },

  updateAdminStatusUI() {
    this.updateUserSessionUI();
  },

  updateUserSessionUI(auth) {
    if (!auth) auth = window.GymDB.getAdminAuth();
    const name = auth.name || 'Guest Athlete';
    const email = auth.email || 'guest@fitnessathlete.club';
    const role = auth.role || 'Visitor';
    const avatar = auth.avatar || (name.substring(0, 2).toUpperCase() || 'TG');
    const cleanEmail = (email || '').trim().toLowerCase();
    const dpImage = auth.dpImage || (cleanEmail ? localStorage.getItem('FITNESS_CLUB_USER_DP_' + cleanEmail) : '') || localStorage.getItem('FITNESS_CLUB_ACTIVE_DP') || '';

    const sideName = document.getElementById('sidebar-admin-name');
    const sideEmail = document.getElementById('sidebar-admin-email');
    const sideAvatar = document.getElementById('sidebar-user-avatar');
    const topName = document.getElementById('topbar-user-name');
    const topAvatar = document.getElementById('topbar-user-avatar');

    if (sideName) sideName.innerText = name;
    if (sideEmail) sideEmail.innerText = `${role} • ${email}`;

    if (sideAvatar) {
      if (dpImage) {
        sideAvatar.innerHTML = `<img src="${dpImage}" alt="DP" style="width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;">`;
      } else {
        sideAvatar.innerText = avatar;
      }
    }

    if (topName) topName.innerText = name.split(' ')[0];

    if (topAvatar) {
      if (dpImage) {
        topAvatar.innerHTML = `<img src="${dpImage}" alt="DP" style="width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;">`;
      } else {
        topAvatar.innerText = avatar;
      }
    }
  },

  checkAuthOnLoad() {
    const auth = window.GymDB.getAdminAuth();
    this.updateUserSessionUI(auth);
    if (!auth || !auth.isAuthenticated) {
      this.openAuthGateway();
    } else {
      this.closeAuthGateway();
    }
  },

  openAuthGateway() {
    const overlay = document.getElementById('auth-gateway-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      const closeBtn = document.getElementById('btn-auth-close');
      const auth = window.GymDB.getAdminAuth();
      if (closeBtn) closeBtn.style.display = (auth && auth.isAuthenticated) ? 'block' : 'none';
    }
  },

  closeAuthGateway() {
    const overlay = document.getElementById('auth-gateway-overlay');
    if (overlay) overlay.style.display = 'none';
  },

  switchAuthTab(tab) {
    const btnSignIn = document.getElementById('btn-tab-signin');
    const btnSignUp = document.getElementById('btn-tab-signup');
    const panelSignIn = document.getElementById('auth-tab-signin-panel');
    const panelSignUp = document.getElementById('auth-tab-signup-panel');

    if (tab === 'signin') {
      if (btnSignIn) btnSignIn.classList.add('active');
      if (btnSignUp) btnSignUp.classList.remove('active');
      if (panelSignIn) panelSignIn.style.display = 'block';
      if (panelSignUp) panelSignUp.style.display = 'none';
    } else {
      if (btnSignUp) btnSignUp.classList.add('active');
      if (btnSignIn) btnSignIn.classList.remove('active');
      if (panelSignUp) panelSignUp.style.display = 'block';
      if (panelSignIn) panelSignIn.style.display = 'none';
    }
  },

  handleUserSignIn(e) {
    e.preventDefault();
    const email = document.getElementById('auth-signin-email').value;
    const pass = document.getElementById('auth-signin-password').value;
    const msg = document.getElementById('auth-signin-msg');

    const res = window.GymDB.loginUser(email, pass);
    if (res.success) {
      if (msg) {
        msg.style.display = 'block';
        msg.className = 'auth-alert success';
        msg.innerText = res.message;
      }
      this.updateUserSessionUI(res.user);
      setTimeout(() => {
        this.closeAuthGateway();
        this.showToast(res.message, 'success');
        if (res.user && (res.user.role === 'Gym Member' || res.user.role === 'Athlete' || res.user.role === 'Customer')) {
          this.navigateTo('profile');
        } else {
          this.navigateTo('dashboard');
        }
      }, 400);
    } else {
      if (msg) {
        msg.style.display = 'block';
        msg.className = 'auth-alert error';
        msg.innerText = res.message;
      }
    }
  },

  handleUserSignUp(e) {
    e.preventDefault();
    const name = document.getElementById('auth-signup-name').value;
    const email = document.getElementById('auth-signup-email').value;
    const phone = document.getElementById('auth-signup-phone').value;
    const role = document.getElementById('auth-signup-role').value;
    const pass = document.getElementById('auth-signup-pass').value;
    const passConfirm = document.getElementById('auth-signup-pass-confirm').value;
    const msg = document.getElementById('auth-signup-msg');

    if (pass !== passConfirm) {
      if (msg) {
        msg.style.display = 'block';
        msg.className = 'auth-alert error';
        msg.innerText = 'Passwords do not match! Please verify.';
      }
      return;
    }

    const res = window.GymDB.registerUser(name, email, phone, role, pass);
    if (res.success) {
      if (msg) {
        msg.style.display = 'block';
        msg.className = 'auth-alert success';
        msg.innerText = res.message;
      }
      this.updateUserSessionUI(res.user);
      setTimeout(() => {
        this.closeAuthGateway();
        this.showToast(res.message, 'success');
        this.navigateTo('profile');
      }, 500);
    } else {
      if (msg) {
        msg.style.display = 'block';
        msg.className = 'auth-alert error';
        msg.innerText = res.message;
      }
    }
  },

  quickDemoLogin(type) {
    if (type === 'admin') {
      this.openCreatorAdminModal();
    } else if (type === 'member') {
      const res = window.GymDB.loginUser('yusuf@fitnessathlete.com', 'member123');
      this.updateUserSessionUI(res.user);
      this.closeAuthGateway();
      this.showToast('Welcome to your Member Portal, Md Yusuf!', 'success');
      this.navigateTo('profile');
    } else {
      const guestAuth = {
        isAuthenticated: true,
        name: 'Guest Athlete',
        email: 'guest@fitnessathlete.club',
        role: 'Guest Athlete',
        avatar: 'GA',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(guestAuth));
      this.updateUserSessionUI(guestAuth);
      this.closeAuthGateway();
      this.showToast('Welcome, Guest Athlete! Enjoy exploring the club.', 'info');
      this.navigateTo('dashboard');
    }
  },

  handleLogout() {
    window.GymDB.logoutAdmin();
    const guestAuth = { isAuthenticated: false, name: 'Guest', email: '', role: 'Guest', avatar: 'GU' };
    this.updateUserSessionUI(guestAuth);
    this.showToast('You have been logged out of Fitness Athlete Club.', 'info');
    this.openAuthGateway();
  },

  // ==========================================================================
  // NAVIGATION ROUTER
  // ==========================================================================
  navigateTo(viewName) {
    this.currentView = viewName;
    
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewName);
    });

    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active-view');
    });

    const targetPanel = document.getElementById(`view-${viewName}`);
    if (targetPanel) {
      targetPanel.classList.add('active-view');
    }

    // ALWAYS reset scroll to the very top immediately
    const viewContent = document.querySelector('.view-content');
    if (viewContent) {
      viewContent.scrollTop = 0;
      viewContent.scrollLeft = 0;
    }
    window.scrollTo(0, 0);
    document.querySelectorAll('.table-wrapper').forEach(tw => { tw.scrollLeft = 0; });

    const titleMap = {
      dashboard: 'Dashboard Overview',
      members: 'Gym Members',
      attendance: 'Attendance Desk',
      plans: 'Membership Plans',
      trainers: 'Trainers & Coaches',
      billing: 'Billing & Invoices',
      classes: 'Class Timetable',
      proshop: 'Supplements Store',
      guide: 'Gym Facilities',
      profile: 'My Member Profile & Fitness'
    };
    const titleEl = document.getElementById('current-view-title');
    if (titleEl) titleEl.innerText = titleMap[viewName] || 'Management System';

    if (viewName === 'profile') {
      this.populateCustomerProfileUI();
    }

    this.renderAll();
  },

  // ==========================================================================
  // CUSTOMER PROFILE & FITNESS DASHBOARD CONTROLLER
  // ==========================================================================
  populateCustomerProfileUI(user) {
    if (!user) {
      const auth = window.GymDB.getAdminAuth();
      user = window.GymDB.getUserProfile(auth.email || 'yusuf@fitnessathlete.com');
    }
    if (!user) return;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined && val !== null) el.value = val;
    };
    const setText = (id, txt) => {
      const el = document.getElementById(id);
      if (el && txt !== undefined && txt !== null) el.innerText = txt;
    };

    setVal('cust-fullname', user.name || 'Md Yusuf');
    setVal('cust-email', user.email || 'yusuf@fitnessathlete.com');
    setVal('cust-phone', user.phone || '+91 98401 99887');
    setVal('cust-dob', user.dob || '2001-08-15');
    setVal('cust-emergency', user.emergencyContact || '+91 98400 55443 (Brother - Tariq)');
    setVal('cust-address', user.address || 'Plot 45, 5th Main Road, Anna Nagar West, Chennai, Tamil Nadu');
    setVal('cust-height', user.height || '178');
    setVal('cust-weight', user.weight || '76.5');
    setVal('cust-target-weight', user.targetWeight || '82.0');
    setVal('cust-bodyfat', user.bodyFat || '13.5');
    setVal('cust-goal', user.fitnessGoal || 'Hypertrophy & Muscle Building');
    setVal('cust-experience', user.experience || 'Intermediate (1-3 Years)');
    setVal('cust-trainer', user.trainer || 'Saran Fitness');

    setText('profile-hero-name', user.name || 'Md Yusuf');
    setText('profile-hero-id', user.id || 'TG-MEMBER-001');
    setText('profile-avatar-initials', user.avatar || (user.name ? user.name.substring(0, 2).toUpperCase() : 'MY'));

    // Permanent DP Image handling
    const cleanEmail = (user.email || 'yusuf@fitnessathlete.com').trim().toLowerCase();
    const savedDP = user.dpImage || localStorage.getItem('FITNESS_CLUB_USER_DP_' + cleanEmail) || localStorage.getItem('FITNESS_CLUB_ACTIVE_DP') || '';
    const imgEl = document.getElementById('profile-avatar-img');
    const initialsEl = document.getElementById('profile-avatar-initials');
    if (savedDP) {
      if (imgEl) {
        imgEl.src = savedDP;
        imgEl.style.display = 'block';
      }
      if (initialsEl) initialsEl.style.display = 'none';
    } else {
      if (imgEl) imgEl.style.display = 'none';
      if (initialsEl) initialsEl.style.display = 'block';
    }
  },

  handleProfileDPUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.showToast('Please select an image file (JPG, PNG, WebP)', 'error');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      this.showToast('Image size should be less than 3MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const auth = window.GymDB.getAdminAuth();
      const email = auth.email || 'yusuf@fitnessathlete.com';
      const cleanEmail = email.trim().toLowerCase();

      // 1. Save permanently to dedicated localStorage keys
      localStorage.setItem('FITNESS_CLUB_USER_DP_' + cleanEmail, base64);
      localStorage.setItem('FITNESS_CLUB_ACTIVE_DP', base64);

      // 2. Update user profile in GymDB
      window.GymDB.updateUserProfile(email, { dpImage: base64 });

      // 3. Update member avatar in members roster
      const members = window.GymDB.getMembers();
      const mIdx = members.findIndex(m => (m.email && m.email.toLowerCase() === cleanEmail) || m.id === 'GYM-1000');
      if (mIdx !== -1) {
        members[mIdx].avatar = base64;
        members[mIdx].dpImage = base64;
        window.GymDB.set(STORAGE_KEYS.MEMBERS, members);
      }

      // 4. Update Profile Dashboard avatar
      const imgEl = document.getElementById('profile-avatar-img');
      const initialsEl = document.getElementById('profile-avatar-initials');
      if (imgEl) {
        imgEl.src = base64;
        imgEl.style.display = 'block';
      }
      if (initialsEl) initialsEl.style.display = 'none';

      // 5. Update topbar and sidebar with permanent photo
      this.updateUserSessionUI({ ...auth, dpImage: base64 });

      this.showToast('Profile photo saved permanently! It will stay until you change it.', 'success');
    };
    reader.readAsDataURL(file);
  },

  removeProfileDP() {
    const auth = window.GymDB.getAdminAuth();
    const email = auth.email || 'yusuf@fitnessathlete.com';
    const cleanEmail = email.trim().toLowerCase();

    // Remove from dedicated persistent keys
    localStorage.removeItem('FITNESS_CLUB_USER_DP_' + cleanEmail);
    localStorage.removeItem('FITNESS_CLUB_ACTIVE_DP');

    window.GymDB.updateUserProfile(email, { dpImage: '' });

    const imgEl = document.getElementById('profile-avatar-img');
    const initialsEl = document.getElementById('profile-avatar-initials');
    if (imgEl) imgEl.style.display = 'none';
    if (initialsEl) initialsEl.style.display = 'block';

    const sideAvatar = document.getElementById('sidebar-user-avatar');
    const topAvatar = document.getElementById('topbar-user-avatar');
    const initials = (auth.name || 'MY').substring(0, 2).toUpperCase();
    if (sideAvatar) sideAvatar.innerText = initials;
    if (topAvatar) topAvatar.innerText = initials;

    this.showToast('Profile picture removed.', 'info');
  },

  saveCustomerProfile() {
    const auth = window.GymDB.getAdminAuth();
    const email = auth.email || 'yusuf@fitnessathlete.com';
    const cleanEmail = email.trim().toLowerCase();
    const savedDP = localStorage.getItem('FITNESS_CLUB_USER_DP_' + cleanEmail) || localStorage.getItem('FITNESS_CLUB_ACTIVE_DP') || '';

    const data = {
      name: document.getElementById('cust-fullname')?.value?.trim() || 'Md Yusuf',
      phone: document.getElementById('cust-phone')?.value?.trim() || '',
      dob: document.getElementById('cust-dob')?.value || '',
      emergencyContact: document.getElementById('cust-emergency')?.value?.trim() || '',
      address: document.getElementById('cust-address')?.value?.trim() || '',
      height: document.getElementById('cust-height')?.value || '',
      weight: document.getElementById('cust-weight')?.value || '',
      targetWeight: document.getElementById('cust-target-weight')?.value || '',
      bodyFat: document.getElementById('cust-bodyfat')?.value || '',
      fitnessGoal: document.getElementById('cust-goal')?.value || '',
      experience: document.getElementById('cust-experience')?.value || '',
      trainer: document.getElementById('cust-trainer')?.value || '',
      termsAccepted: document.getElementById('profile-terms-checkbox')?.checked ?? true
    };

    if (savedDP) {
      data.dpImage = savedDP;
    }

    data.avatar = data.name.substring(0, 2).toUpperCase();

    window.GymDB.updateUserProfile(email, data);
    this.updateUserSessionUI({ ...auth, name: data.name, avatar: data.avatar, dpImage: savedDP });
    this.populateCustomerProfileUI();

    this.showToast('Your profile & fitness metrics have been saved!', 'success');
  },

  // ==========================================================================
  // CLOCK & DATE
  // ==========================================================================
  startClock() {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      
      const clockEl = document.getElementById('live-clock');
      const dateEl = document.getElementById('live-date');
      if (clockEl) clockEl.innerText = timeStr;
      if (dateEl) dateEl.innerText = dateStr;
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    this.showToast(`Switched to ${next.toUpperCase()} athletic mode`, 'success');
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = ``;
    if (type === 'success') {
      icon = `<svg style="width:18px;height:18px;color:#22c55e;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
    } else if (type === 'error') {
      icon = `<svg style="width:18px;height:18px;color:#ef4444;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    } else {
      icon = `<svg style="width:18px;height:18px;color:var(--red-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    }

    toast.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        ${icon}
        <span style="font-size:0.88rem; font-weight:600;">${message}</span>
      </div>
      <button style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1.1rem; line-height:1;" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4000);
  },

  // ==========================================================================
  // CHECK-IN PROCESSING
  // ==========================================================================
  executeFastCheckIn(query) {
    if (!query) {
      this.showToast('Please type a gym member name (e.g. Surabi, Dolphin, Biglee), ID or phone.', 'error');
      return;
    }
    const result = window.GymDB.checkInMember(query);
    const input = document.getElementById('fast-checkin-input');
    if (input) input.value = '';

    if (result.success) {
      this.showToast(result.message, 'success');
      this.renderAll();
    } else {
      this.showToast(result.message, 'error');
      if (result.member && result.member.status === 'Expired') {
        this.openRenewModal(result.member.id);
      }
    }
  },

  executeTerminalCheckIn(query) {
    const banner = document.getElementById('terminal-result-banner');
    const input = document.getElementById('terminal-input');
    if (!query) {
      if (banner) {
        banner.style.display = 'block';
        banner.className = 'terminal-banner-error';
        banner.innerHTML = `<strong>Error:</strong> Please enter a barcode or gym member ID.`;
      }
      return;
    }

    const result = window.GymDB.checkInMember(query);
    if (input) input.value = '';

    if (banner) {
      banner.style.display = 'block';
      if (result.success) {
        banner.className = 'terminal-banner-success';
        banner.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="font-size:1.5rem;">✅</div>
            <div>
              <div style="font-weight:700; font-size:1.05rem;">Access Granted: ${result.member.fullName}</div>
              <div style="font-size:0.8rem; opacity:0.9;">Plan: ${result.member.planId} &bull; Check-in Logged for Today</div>
            </div>
          </div>
        `;
        this.showToast(result.message, 'success');
      } else {
        banner.className = 'terminal-banner-error';
        banner.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="font-size:1.5rem;">⛔</div>
            <div>
              <div style="font-weight:700; font-size:1.05rem;">Access Denied: ${result.message}</div>
              <div style="font-size:0.8rem; opacity:0.9;">Member must renew plan before gaining floor access.</div>
            </div>
          </div>
        `;
        this.showToast(result.message, 'error');
      }
    }
    this.renderAll();
  },

  testCheckIn(memberId) {
    this.executeTerminalCheckIn(memberId);
  },

  // ==========================================================================
  // MASTER RENDER DISPATCHER
  // ==========================================================================
  renderAll() {
    this.renderSidebarBadges();
    this.updateCartHeaderUI();

    if (this.currentView === 'dashboard') this.renderDashboard();
    if (this.currentView === 'members') this.renderMembers();
    if (this.currentView === 'attendance') this.renderAttendance();
    if (this.currentView === 'plans') this.renderPlans();
    if (this.currentView === 'trainers') this.renderTrainers();
    if (this.currentView === 'billing') this.renderBilling();
    if (this.currentView === 'classes') this.renderClasses();
    if (this.currentView === 'proshop') this.renderProShop();
    if (this.currentView === 'guide') this.renderGuide();
  },

  renderSidebarBadges() {
    const members = window.GymDB.getMembers();
    const attendance = window.GymDB.getAttendanceLogs();
    const today = new Date().toISOString().split('T')[0];

    const countEl = document.getElementById('sidebar-member-count');
    if (countEl) countEl.innerText = members.length;

    const onFloorCount = attendance.filter(a => a.date === today && a.checkOutTime.includes('Active')).length;
    const floorEl = document.getElementById('sidebar-active-floor-count');
    if (floorEl) floorEl.innerText = onFloorCount;
  },

  // ==========================================================================
  // DASHBOARD CONTROLLER (INR RUPEE FINANCIALS)
  // ==========================================================================
  renderDashboard() {
    const members = window.GymDB.getMembers();
    const attendance = window.GymDB.getAttendanceLogs();
    const invoices = window.GymDB.getInvoices();
    const today = new Date().toISOString().split('T')[0];

    const activeMembers = members.filter(m => m.status === 'Active').length;
    const expiringSoon = members.filter(m => m.status === 'Expiring Soon').length;
    const todayLogs = attendance.filter(a => a.date === today);
    const onFloor = todayLogs.filter(a => a.checkOutTime.includes('Active')).length;
    
    // Total Revenue in Rupees (₹)
    const totalRev = invoices
      .filter(i => i.status === 'Paid')
      .reduce((sum, inv) => sum + inv.amount, 0);

    const kpiActive = document.getElementById('kpi-active-members');
    const kpiTotalSub = document.getElementById('kpi-total-members-sub');
    const kpiToday = document.getElementById('kpi-today-checkins');
    const kpiFloor = document.getElementById('kpi-on-floor');
    const kpiExp = document.getElementById('kpi-expiring-soon');
    const kpiRev = document.getElementById('kpi-revenue');

    if (kpiActive) kpiActive.innerText = activeMembers;
    if (kpiTotalSub) kpiTotalSub.innerText = `of ${members.length} total enrolled`;
    if (kpiToday) kpiToday.innerText = todayLogs.length;
    if (kpiFloor) kpiFloor.innerText = `${onFloor} currently on floor`;
    if (kpiExp) kpiExp.innerText = expiringSoon;
    if (kpiRev) kpiRev.innerText = `₹${totalRev.toLocaleString('en-IN')}`;

    // Live stream table (limit 6)
    const streamTbody = document.getElementById('live-stream-table-body');
    if (streamTbody) {
      if (todayLogs.length === 0) {
        streamTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--text-muted);">No check-in activity logged today yet.</td></tr>`;
      } else {
        streamTbody.innerHTML = todayLogs.slice(0, 6).map(log => {
          const isOnFloor = log.checkOutTime.includes('Active');
          return `
            <tr>
              <td>
                <div style="font-weight:700; color:var(--text-white);">${log.memberName}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); font-family:monospace;">${log.memberId}</div>
              </td>
              <td><span class="badge badge-dark">${log.planName}</span></td>
              <td>${log.checkInTime}</td>
              <td>${isOnFloor ? '<span style="color:#22c55e; font-weight:700;">● Active on floor</span>' : log.checkOutTime}</td>
              <td><span class="badge ${isOnFloor ? 'badge-active' : 'badge-dark'}">${isOnFloor ? 'In Gym' : 'Finished'}</span></td>
              <td>
                ${isOnFloor ? `
                  <button class="btn-outline" style="padding:4px 8px; font-size:0.75rem;" onclick="App.executeFastCheckIn('${log.memberId}')">
                    Check-out
                  </button>
                ` : `<span style="font-size:0.75rem; color:var(--text-muted);">Logged</span>`}
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    // Expiring alerts list
    const expiringList = document.getElementById('expiring-members-list');
    if (expiringList) {
      const expiring = members.filter(m => m.status === 'Expiring Soon');
      if (expiring.length === 0) {
        expiringList.innerHTML = `<div style="text-align:center; padding:24px; color:var(--text-muted);">No memberships expiring within 7 days.</div>`;
      } else {
        expiringList.innerHTML = expiring.map(m => `
          <div class="expiring-member-card">
            <div class="expiring-member-info">
              <img src="${m.avatar}" class="member-avatar" style="width:36px;height:36px;" alt="${m.fullName}" onerror="window.handleImgError(this, 'avatar', '${m.fullName.replace(/'/g, "\\'")}')">
              <div>
                <div style="font-weight:700; font-size:0.9rem; color:var(--text-white);">${m.fullName}</div>
                <div style="font-size:0.75rem; color:var(--red-primary);">${m.instagram || '@athlete'} &bull; ${m.daysLeft} days remaining</div>
              </div>
            </div>
            <button class="btn-renew-pill" onclick="App.openRenewModal('${m.id}')">
              Renew
            </button>
          </div>
        `).join('');
      }
    }

      // Plans distribution
    const plansDist = document.getElementById('plans-distribution-list');
    if (plansDist) {
      const plans = window.GymDB.getPlans();
      const totalSubscribers = members.length || 1;
      plansDist.innerHTML = plans.map(p => {
        const pct = Math.round((p.activeMembers / totalSubscribers) * 100);
        return `
          <div class="plan-dist-item">
            <div class="dist-meta">
              <span class="dist-name">${p.name} (₹${p.monthlyPrice}/mo)</span>
              <span class="dist-count">${p.activeMembers} Subscribers (${pct}%)</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Also populate dashboard plans grid
    const dashPlans = document.getElementById('dashboard-plans-grid');
    if (dashPlans) {
      dashPlans.innerHTML = this.generatePlanCardsHTML(this.currentPlanCycle || 'yearly');
    }
  },

  // ==========================================================================
  // MEMBERS DIRECTORY CONTROLLER (100% TAMIL INFLUENCERS)
  // ==========================================================================
  renderMembers() {
    let members = window.GymDB.getMembers();
    const plans = window.GymDB.getPlans();
    const trainers = window.GymDB.getTrainers();

    const searchInput = document.getElementById('member-search-input');
    const planFilter = document.getElementById('member-plan-filter');
    const statusFilter = document.getElementById('member-status-filter');

    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const planVal = planFilter ? planFilter.value : 'ALL';
    const statusVal = statusFilter ? statusFilter.value : 'ALL';

    if (query) {
      members = members.filter(m => 
        m.fullName.toLowerCase().includes(query) ||
        (m.instagram && m.instagram.toLowerCase().includes(query)) ||
        m.id.toLowerCase().includes(query) ||
        m.phone.includes(query) ||
        m.email.toLowerCase().includes(query) ||
        (m.location && m.location.toLowerCase().includes(query)) ||
        (m.notes && m.notes.toLowerCase().includes(query))
      );
    }

    if (planVal !== 'ALL') {
      members = members.filter(m => m.planId === planVal);
    }

    if (statusVal !== 'ALL') {
      members = members.filter(m => m.status === statusVal);
    }

    const tbody = document.getElementById('members-table-body');
    if (!tbody) return;

    if (members.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:32px; color:var(--text-muted);">No Tamil fitness influencer records found matching filter criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = members.map(m => {
      const plan = plans.find(p => p.id === m.planId);
      const trainer = trainers.find(t => t.id === m.trainerId);
      
      let badgeClass = 'badge-active';
      if (m.status === 'Expiring Soon') badgeClass = 'badge-warning';
      if (m.status === 'Expired') badgeClass = 'badge-danger';

      const isYearly = m.durationCycle === 'yearly';

      return `
        <tr>
          <td>
            <div class="member-cell">
              <img src="${m.avatar}" class="member-avatar" alt="${m.fullName}" onerror="window.handleImgError(this, 'avatar', '${m.fullName.replace(/'/g, "\\'")}')">
              <div>
                <div class="member-name">${m.fullName}</div>
                <div class="member-insta-tag">${m.instagram || '@tamil_fit'}</div>
                <div class="member-id">${m.id} &bull; <span style="color:var(--text-secondary); font-size:0.72rem;">${m.location || 'Chennai'}</span></div>
              </div>
            </div>
          </td>
          <td>
            <div style="font-size:0.85rem; color:var(--text-white); font-weight:600;">${m.phone}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${m.email}</div>
          </td>
          <td>
            <span class="badge badge-dark">${plan ? plan.name : 'VIP Plan'}</span>
            <div style="font-size:0.72rem; color:var(--red-primary); margin-top:2px; font-weight:700;">
              ${isYearly ? '● Yearly Package (₹' + (plan ? plan.yearlyPrice : '11,999') + ')' : '● Monthly Plan (₹' + (plan ? plan.monthlyPrice : '1,000') + ')'}
            </div>
          </td>
          <td>
            ${trainer ? `<span style="font-weight:600; color:var(--text-white);">${trainer.name}</span>` : `<span style="color:var(--text-muted);">Floor General</span>`}
          </td>
          <td>
            <div style="font-weight:600;">${m.expiryDate}</div>
            <div style="font-size:0.72rem; color:${m.daysLeft < 0 ? 'var(--red-primary)' : m.daysLeft <= 7 ? '#fbbf24' : 'var(--text-muted)'};">
              ${m.daysLeft < 0 ? `Lapsed ${Math.abs(m.daysLeft)} days ago` : `${m.daysLeft} days remaining`}
            </div>
          </td>
          <td>
            <span class="badge ${badgeClass}">${m.status}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="action-icon-btn btn-action-checkin" title="Instant Check-in" onclick="App.executeFastCheckIn('${m.id}')">
                <svg style="width:15px;height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>
              <button class="action-icon-btn" title="View Digital ID Pass" onclick="App.openPassModal('${m.id}')">
                <svg style="width:15px;height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
              </button>
              <button class="action-icon-btn" title="Renew Plan" onclick="App.openRenewModal('${m.id}')">
                <svg style="width:15px;height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </button>
              <button class="action-icon-btn" title="Edit Profile" onclick="App.openEditMemberModal('${m.id}')">
                <svg style="width:15px;height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </button>
              <button class="action-icon-btn btn-action-delete" title="Delete Member" onclick="App.confirmDeleteMember('${m.id}')">
                <svg style="width:15px;height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderAttendance() {
    const logs = window.GymDB.getAttendanceLogs();
    const tbody = document.getElementById('full-attendance-table-body');
    if (!tbody) return;

    if (logs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">No attendance entries found.</td></tr>`;
      return;
    }

    tbody.innerHTML = logs.map(l => {
      const isOnFloor = l.checkOutTime.includes('Active');
      return `
        <tr>
          <td style="font-family:monospace; font-weight:700;">${l.id}</td>
          <td style="font-family:monospace;">${l.memberId}</td>
          <td>
            <div style="font-weight:700; color:var(--text-white);">${l.memberName}</div>
          </td>
          <td><span class="badge badge-dark">${l.planName}</span></td>
          <td>${l.checkInTime}</td>
          <td>${isOnFloor ? '<span style="color:#22c55e; font-weight:700;">● Active on floor</span>' : l.checkOutTime}</td>
          <td><span class="badge ${isOnFloor ? 'badge-active' : 'badge-dark'}">${l.status}</span></td>
          <td>
            ${isOnFloor ? `
              <button class="btn-outline" style="padding:4px 10px; font-size:0.75rem;" onclick="App.executeFastCheckIn('${l.memberId}')">
                Log Check-out
              </button>
            ` : `<span style="font-size:0.75rem; color:var(--text-muted);">Completed</span>`}
          </td>
        </tr>
      `;
    }).join('');
  },

  // ==========================================================================
  // MEMBERSHIP PLANS CONTROLLER (INTERACTIVE CYCLE SWITCHER & MATRIX)
  // ==========================================================================
  currentPlanCycle: 'yearly',

  switchPlanCycle(cycle) {
    this.currentPlanCycle = cycle;
    const btnMonthly = document.getElementById('btn-cycle-monthly');
    const btnYearly = document.getElementById('btn-cycle-yearly');
    if (btnMonthly && btnYearly) {
      btnMonthly.classList.toggle('active', cycle === 'monthly');
      btnYearly.classList.toggle('active', cycle === 'yearly');
    }
    const heading = document.getElementById('plans-current-cycle-heading');
    const sub = document.getElementById('plans-current-cycle-sub');
    if (heading && sub) {
      if (cycle === 'yearly') {
        heading.innerText = 'Yearly Membership Tiers (Best Annual Value & Maximum Savings)';
        sub.innerText = 'Save up to 44% with annual billing. Includes full shower, locker access & mobile QR entry pass.';
      } else {
        heading.innerText = 'Monthly Membership Tiers (Flexible Pay-As-You-Go)';
        sub.innerText = 'Flexible monthly gym floor access. Cancel or switch tiers anytime without long-term contracts.';
      }
    }
    this.renderPlans();
  },

  scrollToComparison() {
    const el = document.getElementById('plans-comparison-matrix');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  openAddMemberWithPlan(planId, cycle = 'yearly') {
    this.openAddMemberModal();
    const planSelect = document.getElementById('field-plan');
    const cycleSelect = document.getElementById('field-billing-cycle');
    if (planSelect && planId) planSelect.value = planId;
    if (cycleSelect && cycle) cycleSelect.value = cycle;
    this.handlePlanChange();
  },

  generatePlanCardsHTML(cycle = 'yearly') {
    const plans = window.GymDB.getPlans();
    const isYearly = cycle === 'yearly';

    const tierIcons = {
      'PLAN-STD': '🥉',
      'PLAN-PRO': '🥈',
      'PLAN-ELITE': '🥇',
      'PLAN-VIP': '👑'
    };

    return plans.map(p => {
      const isPopular = p.id === 'PLAN-PRO';
      const isVIP = p.id === 'PLAN-VIP';
      const price = isYearly ? p.yearlyPrice : p.monthlyPrice;
      const effectiveMo = Math.round(p.yearlyPrice / 12);
      const savings = (p.monthlyPrice * 12) - p.yearlyPrice;
      const savingsPct = Math.round((savings / (p.monthlyPrice * 12)) * 100);

      const cardClass = isVIP ? 'plan-card plan-card-vip' : (isPopular ? 'plan-card plan-card-popular' : 'plan-card');
      const icon = tierIcons[p.id] || '⚡';

      return `
        <div class="${cardClass}">
          ${isVIP ? `<div class="plan-ribbon plan-ribbon-gold">👑 CELEBRITY VIP TIER</div>` : (p.tag ? `<div class="plan-ribbon">${p.tag}</div>` : '')}
          
          <div class="plan-card-header">
            <span class="plan-tier-icon">${icon}</span>
            <div>
              <h4 class="plan-name">${p.name}</h4>
              <div class="plan-badge-subtitle">${isVIP ? '1-on-1 Personal Coaching Tier' : (isPopular ? 'Fitness Athlete Top Choice' : 'Athletic Fitness')}</div>
            </div>
          </div>
          
          <div class="plan-pricing-box">
            <div class="plan-price-main">
              <span class="currency">₹</span>
              <span class="amount">${price.toLocaleString('en-IN')}</span>
              <span class="cycle">/ ${isYearly ? 'Year' : 'Month'}</span>
            </div>
            
            ${isYearly ? `
              <div class="plan-effective-rate">
                <span>Equivalent to <strong>₹${effectiveMo.toLocaleString('en-IN')}/mo</strong></span>
                <span class="plan-savings-pill">Save ₹${savings.toLocaleString('en-IN')} (${savingsPct}% OFF)</span>
              </div>
            ` : `
              <div class="plan-price-sub">
                Or choose <strong>₹${p.yearlyPrice.toLocaleString('en-IN')}/yr</strong> (Save ₹${savings.toLocaleString('en-IN')})
              </div>
            `}
          </div>

          <ul class="plan-features">
            ${p.features.map(f => `
              <li>
                <svg class="feat-check" style="width:16px;height:16px;color:#22c55e;flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>

          <div class="plan-sub-count">
            <span class="dot-online"></span>
            <strong>${p.activeMembers}</strong> Gym Members Subscribed
          </div>

          <div class="plan-card-actions">
            <button type="button" class="btn-plan-primary-cta" onclick="App.openPlanUPIModal('${p.id}', '${cycle}')">
              <span>⚡ Subscribe ₹${price.toLocaleString('en-IN')} via UPI</span>
            </button>
            <button type="button" class="btn-plan-secondary-cta" onclick="App.openAddMemberWithPlan('${p.id}', '${cycle}')">
              <span>+ Add Member</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  renderPlans() {
    const container = document.getElementById('all-plans-grid');
    if (container) {
      container.innerHTML = this.generatePlanCardsHTML(this.currentPlanCycle || 'yearly');
    }
    const dashContainer = document.getElementById('dashboard-plans-grid');
    if (dashContainer) {
      dashContainer.innerHTML = this.generatePlanCardsHTML(this.currentPlanCycle || 'yearly');
    }
  },

  renderTrainers() {
    const trainers = window.GymDB.getTrainers();
    const container = document.getElementById('all-trainers-grid');
    if (!container) return;

    container.innerHTML = trainers.map(t => `
      <div class="trainer-card">
        <div class="trainer-image-wrap">
          <img src="${t.avatar}" alt="${t.name}" onerror="window.handleImgError(this, 'avatar', '${t.name.replace(/'/g, "\\'")}')">
          <div class="trainer-badge">${t.experience}</div>
        </div>
        <div class="trainer-details">
          <h4 class="trainer-name">${t.name}</h4>
          <div class="trainer-spec">${t.title}</div>
          
          <div class="trainer-location-tag">
            <svg style="width:13px;height:13px;color:var(--red-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>${t.location || 'Tamil Nadu, India'}</span>
          </div>

          <div class="trainer-info-row">
            <span>Specialty:</span>
            <strong style="color:var(--text-white);">${t.specialty}</strong>
          </div>
          <div class="trainer-info-row">
            <span>Influencer Clients:</span>
            <strong style="color:var(--red-primary);">${t.activeClients} Active</strong>
          </div>
          <div class="trainer-info-row">
            <span>Direct Contact:</span>
            <span>${t.phone}</span>
          </div>

          <div class="trainer-actions">
            <button class="btn-outline" style="flex:1; justify-content:center; padding:8px;" onclick="App.navigateTo('members')">
              View Clients
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderBilling() {
    const invoices = window.GymDB.getInvoices();
    const paidRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
    const pendingDues = invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0);

    const revEl = document.getElementById('billing-total-revenue');
    const duesEl = document.getElementById('billing-pending-dues');
    const countEl = document.getElementById('billing-invoice-count');
    const tbody = document.getElementById('invoices-table-body');

    if (revEl) revEl.innerText = `₹${paidRevenue.toLocaleString('en-IN')}`;
    if (duesEl) duesEl.innerText = `₹${pendingDues.toLocaleString('en-IN')}`;
    if (countEl) countEl.innerText = invoices.length;

    if (!tbody) return;

    if (invoices.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">No invoices recorded.</td></tr>`;
      return;
    }

    tbody.innerHTML = invoices.map(inv => {
      let badgeClass = 'badge-active';
      if (inv.status === 'Unpaid') badgeClass = 'badge-warning';
      if (inv.status === 'Overdue') badgeClass = 'badge-danger';

      return `
        <tr>
          <td style="font-family:monospace; font-weight:700;">${inv.id}</td>
          <td>
            <div style="font-weight:700; color:var(--text-white);">${inv.memberName}</div>
            <div style="font-size:0.72rem; color:var(--text-muted); font-family:monospace;">${inv.memberId}</div>
          </td>
          <td>${inv.planName}</td>
          <td style="font-family:var(--font-heading); font-size:1.15rem; font-weight:700; color:var(--text-white);">₹${inv.amount.toLocaleString('en-IN')}</td>
          <td><span class="badge badge-dark">${inv.paymentMethod}</span></td>
          <td>${inv.date}</td>
          <td><span class="badge ${badgeClass}">${inv.status}</span></td>
          <td>
            <button class="action-icon-btn" title="View Official Receipt" onclick="App.openReceiptModal('${inv.id}')">
              <svg style="width:15px;height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderClasses() {
    const classes = window.GymDB.getClasses();
    const container = document.getElementById('all-classes-grid');
    if (!container) return;

    container.innerHTML = classes.map(c => {
      const pct = Math.round((c.enrolled / c.capacity) * 100);
      return `
        <div class="class-card">
          <div class="class-category">${c.category}</div>
          <h4 class="class-title">${c.title}</h4>
          
          <div class="class-meta-item">
            <svg style="width:16px;height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>${c.time}</span>
          </div>

          <div class="class-meta-item">
            <svg style="width:16px;height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>${c.days}</span>
          </div>

          <div class="class-meta-item">
            <svg style="width:16px;height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>${c.room}</span>
          </div>

          <div class="class-meta-item">
            <svg style="width:16px;height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span>Coach: <strong style="color:var(--text-white);">${c.coach}</strong></span>
          </div>

          <div class="class-capacity-bar">
            <div class="capacity-labels">
              <span>Class Capacity</span>
              <span>${c.enrolled} / ${c.capacity} Enrolled</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>

          <button class="btn-outline" style="margin-top:14px; width:100%; justify-content:center;" onclick="App.showToast('Roster opened for ${c.title}', 'info')">
            Manage Class Roster
          </button>
        </div>
      `;
    }).join('');
  },

  // ==========================================================================
  // PRO SHOP & MARKET SUPPLEMENTS STORE (REAL-TIME E-COMMERCE)
  // ==========================================================================
  renderProShop() {
    const products = window.GymDB.getProducts();
    const container = document.getElementById('all-products-grid');
    if (!container) return;

    const searchInput = document.getElementById('proshop-search-input');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let filtered = products;

    // Filter by Category
    if (this.currentProShopCategory !== 'ALL') {
      filtered = filtered.filter(p => p.category === this.currentProShopCategory);
    }

    // Filter by Brand
    if (this.currentProShopBrand !== 'ALL') {
      filtered = filtered.filter(p => p.brand === this.currentProShopBrand);
    }

    // Filter by Search Query
    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.proteinPerServing.toLowerCase().includes(query)
      );
    }

    // Sort products
    if (this.currentProShopSort === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (this.currentProShopSort === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (this.currentProShopSort === 'rating-desc') {
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    const countAll = document.getElementById('count-cat-all');
    if (countAll) countAll.innerText = products.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:56px 20px; color:var(--text-muted); background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <div style="font-size:2.5rem; margin-bottom:12px;">🔍</div>
          <h4 style="color:var(--text-white); margin-bottom:6px;">No supplements found</h4>
          <p style="font-size:0.85rem;">Try clearing your brand filter or search term "${query}".</p>
          <button class="btn-outline" style="margin-top:14px;" onclick="App.resetStoreFilters()">Reset Store Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const flavorOptions = (p.flavors && p.flavors.length > 0)
        ? p.flavors.map(f => `<option value="${f}">${f}</option>`).join('')
        : `<option value="Standard">Standard Flavor</option>`;

      return `
        <div class="product-card" id="card-${p.id}">
          <div class="product-image-wrap" onclick="App.openProductQuickView('${p.id}')">
            <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="window.handleImgError(this, 'product', '${p.name.replace(/'/g, "\\'")}')">
            <span class="product-brand-tag">${p.brand || 'SUPPLEMENT'}</span>
            ${p.discount ? `<span class="product-discount-pill">${p.discount}</span>` : ''}
          </div>
          <div class="product-content">
            <div class="product-rating-row">
              <span class="stars-gold">★★★★★</span>
              <span style="font-weight:700; color:var(--text-white);">${p.rating || 4.8}</span>
              <span style="color:var(--text-muted);">(${p.reviews || 950})</span>
              <span class="badge badge-active" style="margin-left:auto; font-size:0.65rem;">Authentic</span>
            </div>

            <h4 class="product-title" onclick="App.openProductQuickView('${p.id}')" title="Click to view full specs">${p.name}</h4>
            
            <div class="product-spec-row">
              <span>Size: <strong>${p.size}</strong></span>
              <span><strong>${p.proteinPerServing}</strong></span>
            </div>

            <select class="product-flavor-select" id="flavor-${p.id}">
              ${flavorOptions}
            </select>

            <p class="product-desc">${p.description}</p>
            
            <div class="product-footer-row">
              <div class="product-price-box">
                ${p.mrp ? `<span class="price-mrp-cross">MRP ₹${p.mrp.toLocaleString('en-IN')}</span>` : ''}
                <span class="product-price-val">₹${p.price.toLocaleString('en-IN')}</span>
              </div>
              <div class="product-btn-group">
                <button class="btn-add-cart-mini" onclick="App.handleCardAddToCart('${p.id}')" title="Add to Cart">
                  <svg style="width:14px;height:14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  <span>+ Cart</span>
                </button>
                <button class="btn-buy-mini" onclick="App.handleCardInstantBuy('${p.id}')">
                  ⚡ Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  resetStoreFilters() {
    this.currentProShopCategory = 'ALL';
    this.currentProShopBrand = 'ALL';
    this.currentProShopSort = 'featured';
    
    document.querySelectorAll('.proshop-cat-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-category') === 'ALL');
    });
    document.querySelectorAll('.brand-chip').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-brand') === 'ALL');
    });

    const searchInput = document.getElementById('proshop-search-input');
    if (searchInput) searchInput.value = '';

    const sortSelect = document.getElementById('proshop-sort-select');
    if (sortSelect) sortSelect.value = 'featured';

    this.renderProShop();
  },

  // ==========================================================================
  // REAL-TIME SHOPPING CART CONTROLLER
  // ==========================================================================
  updateCartHeaderUI() {
    const totals = window.GymDB.getCartTotals(this.currentCartCoupon);

    // Topbar cart button
    const badgeEl = document.getElementById('cart-item-count-badge');
    const subtotalEl = document.getElementById('cart-subtotal-header');
    if (badgeEl) badgeEl.innerText = totals.itemCount;
    if (subtotalEl) subtotalEl.innerText = `₹${totals.grandTotal.toLocaleString('en-IN')}`;

    // Store banner cart trigger
    const bannerCountEl = document.getElementById('store-banner-cart-count');
    if (bannerCountEl) bannerCountEl.innerText = totals.itemCount;

    // Floating cart button
    const floatBtn = document.getElementById('btn-floating-cart');
    const floatCount = document.getElementById('float-cart-count');
    const floatTotal = document.getElementById('float-cart-total');

    if (floatBtn) {
      if (totals.itemCount > 0) {
        floatBtn.style.display = 'flex';
      } else {
        floatBtn.style.display = 'none';
      }
    }
    if (floatCount) floatCount.innerText = totals.itemCount;
    if (floatTotal) floatTotal.innerText = `₹${totals.grandTotal.toLocaleString('en-IN')}`;
  },

  openCart() {
    this.renderCartDrawerUI();
    this.openModal('modal-cart-drawer');
  },

  renderCartDrawerUI() {
    const totals = window.GymDB.getCartTotals(this.currentCartCoupon);
    const container = document.getElementById('cart-drawer-items-list');
    
    // Free Shipping Bar
    const threshold = 999;
    const progressPct = Math.min(100, Math.round((totals.subtotal / threshold) * 100));
    const barEl = document.getElementById('shipping-progress-bar');
    const progressText = document.getElementById('shipping-progress-text');
    
    if (barEl) barEl.style.width = `${progressPct}%`;
    if (progressText) {
      if (totals.subtotal >= threshold) {
        progressText.innerHTML = `🎉 <strong>Congratulations!</strong> You unlocked FREE Tamil Nadu Delivery!`;
      } else {
        const diff = threshold - totals.subtotal;
        progressText.innerHTML = `Add <strong>₹${diff.toLocaleString('en-IN')}</strong> more for <strong>FREE Delivery</strong>`;
      }
    }

    if (!container) return;

    if (totals.items.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:36px 14px; color:var(--text-muted);">
          <div style="font-size:3rem; margin-bottom:10px;">🛒</div>
          <h4 style="color:var(--text-white); margin-bottom:6px;">Your cart is empty</h4>
          <p style="font-size:0.82rem;">Explore Optimum Nutrition, MuscleBlaze, Dymatize and authentic gym supplements.</p>
          <button class="btn-red" style="margin-top:14px;" onclick="App.closeModals(); App.navigateTo('proshop');">
            Browse Supplement Store
          </button>
        </div>
      `;
      // Clear breakdown
      this.updatePriceBreakdownElements(totals);
      return;
    }

    container.innerHTML = totals.items.map(item => `
      <div class="cart-item-row" id="cart-item-${item.cartItemId}">
        <img src="${item.image}" class="cart-item-thumb" alt="${item.name}" onerror="window.handleImgError(this, 'product', '${item.name.replace(/'/g, "\\'")}')">
        
        <div class="cart-item-info">
          <div class="cart-item-title" title="${item.name}">${item.name}</div>
          <div class="cart-item-meta">
            <span>Flavor: <strong>${item.flavor}</strong></span>
            <span>&bull;</span>
            <span>Size: <strong>${item.size}</strong></span>
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
            ₹${item.price.toLocaleString('en-IN')} each
          </div>
        </div>

        <div class="cart-qty-stepper">
          <button class="btn-qty-step" onclick="App.updateCartQty('${item.cartItemId}', ${item.qty - 1})">&minus;</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="btn-qty-step" onclick="App.updateCartQty('${item.cartItemId}', ${item.qty + 1})">&plus;</button>
        </div>

        <div class="cart-item-price-box">
          <div class="cart-item-price-val">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
          <button class="btn-cart-remove" onclick="App.removeCartItem('${item.cartItemId}')" title="Remove item">
            <svg style="width:14px;height:14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
    `).join('');

    this.updatePriceBreakdownElements(totals);
  },

  updatePriceBreakdownElements(totals) {
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const savingsRow = document.getElementById('row-cart-savings');
    const savingsEl = document.getElementById('cart-savings-val');
    const couponRow = document.getElementById('row-coupon-discount');
    const couponLabel = document.getElementById('coupon-discount-label');
    const couponVal = document.getElementById('coupon-discount-val');
    const deliveryEl = document.getElementById('cart-delivery-val');
    const grandTotalEl = document.getElementById('cart-grand-total-val');

    if (subtotalEl) subtotalEl.innerText = `₹${totals.subtotal.toLocaleString('en-IN')}`;
    
    if (savingsRow && savingsEl) {
      if (totals.productSavings > 0) {
        savingsRow.style.display = 'flex';
        savingsEl.innerText = `-₹${totals.productSavings.toLocaleString('en-IN')}`;
      } else {
        savingsRow.style.display = 'none';
      }
    }

    if (couponRow && couponVal) {
      if (totals.couponApplied && totals.couponDiscount > 0) {
        couponRow.style.display = 'flex';
        couponLabel.innerText = `Coupon (${totals.couponApplied.code} - ${totals.couponApplied.discountPct}%):`;
        couponVal.innerText = `-₹${totals.couponDiscount.toLocaleString('en-IN')}`;
      } else {
        couponRow.style.display = 'none';
      }
    }

    if (deliveryEl) {
      if (totals.shippingFee === 0) {
        deliveryEl.innerText = 'FREE';
        deliveryEl.style.color = '#4ade80';
      } else {
        deliveryEl.innerText = `₹${totals.shippingFee}`;
        deliveryEl.style.color = 'var(--text-white)';
      }
    }

    if (grandTotalEl) grandTotalEl.innerText = `₹${totals.grandTotal.toLocaleString('en-IN')}`;
  },

  handleCardAddToCart(productId) {
    const flavorSelect = document.getElementById(`flavor-${productId}`);
    const selectedFlavor = flavorSelect ? flavorSelect.value : '';
    const res = window.GymDB.addToCart(productId, selectedFlavor, '', 1);

    if (res.success) {
      this.updateCartHeaderUI();
      this.showToast(res.message, 'success');
    }
  },

  handleCardInstantBuy(productId) {
    const flavorSelect = document.getElementById(`flavor-${productId}`);
    const selectedFlavor = flavorSelect ? flavorSelect.value : '';
    window.GymDB.addToCart(productId, selectedFlavor, '', 1);
    this.updateCartHeaderUI();
    this.openCheckout();
  },

  updateCartQty(cartItemId, newQty) {
    window.GymDB.updateCartQty(cartItemId, newQty);
    this.updateCartHeaderUI();
    this.renderCartDrawerUI();
  },

  removeCartItem(cartItemId) {
    window.GymDB.removeCartItem(cartItemId);
    this.updateCartHeaderUI();
    this.renderCartDrawerUI();
    this.showToast('Item removed from cart', 'info');
  },

  clearCart() {
    if (confirm("Are you sure you want to clear your shopping cart?")) {
      window.GymDB.clearCart();
      this.updateCartHeaderUI();
      this.renderCartDrawerUI();
      this.showToast('Shopping cart cleared', 'info');
    }
  },

  applyCartCoupon() {
    const input = document.getElementById('cart-coupon-input');
    const code = input ? input.value.trim().toUpperCase() : '';
    const feedbackEl = document.getElementById('cart-coupon-feedback');

    if (!code) {
      this.showToast('Please enter a coupon code (e.g. TAMILFIT10)', 'error');
      return;
    }

    this.currentCartCoupon = code;
    const totals = window.GymDB.getCartTotals(this.currentCartCoupon);

    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      if (totals.couponApplied) {
        feedbackEl.style.color = '#4ade80';
        feedbackEl.innerText = `✓ ${totals.couponApplied.note} applied! You saved ₹${totals.couponDiscount}.`;
        this.showToast(`Applied ${code}: ${totals.couponApplied.discountPct}% OFF`, 'success');
      } else {
        feedbackEl.style.color = 'var(--red-primary)';
        feedbackEl.innerText = `✗ Invalid coupon code. Try TAMILFIT10, DOLPHIN15, or TITAN20.`;
        this.currentCartCoupon = '';
        this.showToast('Invalid coupon code', 'error');
      }
    }

    this.updateCartHeaderUI();
    this.renderCartDrawerUI();
  },

  copyCoupon(code) {
    const input = document.getElementById('cart-coupon-input');
    if (input) input.value = code;
    this.applyCartCoupon();
  },

  // ==========================================================================
  // REAL-TIME MULTI-PAYMENT CHECKOUT CONTROLLER
  // ==========================================================================
  openCheckout() {
    const cart = window.GymDB.getCart();
    if (cart.length === 0) {
      this.showToast('Your cart is empty! Add products to proceed.', 'error');
      return;
    }

    this.closeModals();
    const totals = window.GymDB.getCartTotals(this.currentCartCoupon);

    // Pre-fill with first Tamil influencer member info if available
    const members = window.GymDB.getMembers();
    const nameInput = document.getElementById('checkout-customer-name');
    const phoneInput = document.getElementById('checkout-customer-phone');
    const totalEl = document.getElementById('checkout-total-display');

    if (nameInput && !nameInput.value && members.length > 0) {
      nameInput.value = members[0].fullName;
    }
    if (phoneInput && !phoneInput.value && members.length > 0) {
      phoneInput.value = members[0].phone.replace(/[^0-9]/g, '').slice(-10);
    }
    if (totalEl) totalEl.innerText = `₹${totals.grandTotal.toLocaleString('en-IN')}`;

    // Update Checkout UPI QR code
    this.updateCheckoutUPIQR(totals.grandTotal);
    this.switchCheckoutMethod(this.currentCheckoutMethod || 'gpay');

    this.openModal('modal-checkout');
  },

  updateCheckoutUPIQR(amount) {
    const qrImg = document.getElementById('checkout-qr-image');
    if (qrImg) {
      const upiUri = encodeURIComponent(`upi://pay?pa=titanirongym@okaxis&pn=TITAN%20IRON%20GYM&am=${amount}&cu=INR&tn=Supplement%20Order`);
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${upiUri}`;
    }
  },

  switchCheckoutMethod(method) {
    this.currentCheckoutMethod = method;

    document.querySelectorAll('.payment-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-method') === method);
    });

    const upiPanel = document.getElementById('checkout-upi-panel');
    const cardPanel = document.getElementById('checkout-card-panel');
    const codPanel = document.getElementById('checkout-cod-panel');
    const qrOverlay = document.getElementById('checkout-qr-brand-overlay');

    if (upiPanel) upiPanel.style.display = (method === 'gpay' || method === 'phonepe') ? 'block' : 'none';
    if (cardPanel) cardPanel.style.display = (method === 'card') ? 'block' : 'none';
    if (codPanel) codPanel.style.display = (method === 'cod') ? 'block' : 'none';

    if (qrOverlay) {
      if (method === 'gpay') {
        qrOverlay.innerText = 'GPAY';
        qrOverlay.style.backgroundColor = '#4285F4';
      } else if (method === 'phonepe') {
        qrOverlay.innerText = 'PHONEPE';
        qrOverlay.style.backgroundColor = '#5f259f';
      }
    }
  },

  simulateInstantCheckoutPayment() {
    const methodName = this.currentCheckoutMethod === 'phonepe' ? 'PhonePe' : 'Google Pay';
    this.showToast(`Connecting to ${methodName} UPI gateway... approval in progress`, 'info');

    setTimeout(() => {
      const ref = `UPI-${this.currentCheckoutMethod.toUpperCase()}-${Math.floor(Math.random() * 899999 + 100000)}`;
      const utrInput = document.getElementById('checkout-utr-input');
      if (utrInput) utrInput.value = ref;

      this.executeCheckoutOrder(ref, `UPI (${methodName})`);
    }, 750);
  },

  handlePlaceOrder(e) {
    e.preventDefault();
    const utrInput = document.getElementById('checkout-utr-input');
    const utr = utrInput ? utrInput.value.trim() : '';

    let payMethodName = 'UPI (Google Pay)';
    if (this.currentCheckoutMethod === 'phonepe') payMethodName = 'UPI (PhonePe)';
    if (this.currentCheckoutMethod === 'card') payMethodName = 'Credit / Debit Card';
    if (this.currentCheckoutMethod === 'cod') payMethodName = 'Cash on Delivery (Counter Pay)';

    this.executeCheckoutOrder(utr, payMethodName);
  },

  executeCheckoutOrder(utrReference, paymentMethod) {
    const name = document.getElementById('checkout-customer-name')?.value.trim();
    const phone = document.getElementById('checkout-customer-phone')?.value.trim();
    const address = document.getElementById('checkout-customer-address')?.value.trim();
    const city = document.getElementById('checkout-customer-city')?.value.trim();
    const pincode = document.getElementById('checkout-customer-pincode')?.value.trim();

    const orderResult = window.GymDB.checkoutCart({
      customerName: name,
      phone: phone,
      address: address,
      city: city,
      pincode: pincode,
      paymentMethod: paymentMethod,
      utrReference: utrReference,
      couponCode: this.currentCartCoupon
    });

    if (orderResult.success) {
      this.closeModals();
      this.currentCartCoupon = '';
      this.updateCartHeaderUI();
      this.renderAll();

      // Show Order Success Celebration Modal
      const orderIdEl = document.getElementById('success-order-id');
      const custEl = document.getElementById('success-customer-name');
      const amountEl = document.getElementById('success-amount');
      const addrEl = document.getElementById('success-address');
      const viewReceiptBtn = document.getElementById('btn-success-view-receipt');

      if (orderIdEl) orderIdEl.innerText = orderResult.orderId;
      if (custEl) custEl.innerText = `${orderResult.customerName} (${orderResult.phone})`;
      if (amountEl) amountEl.innerText = `₹${orderResult.totals.grandTotal.toLocaleString('en-IN')}`;
      if (addrEl) addrEl.innerText = orderResult.address;

      if (viewReceiptBtn && orderResult.invoice) {
        viewReceiptBtn.onclick = () => {
          App.closeModals();
          App.openReceiptModal(orderResult.invoice.id);
        };
      }

      this.openModal('modal-order-success');
      this.showToast(orderResult.message, 'success');
    } else {
      this.showToast(orderResult.message, 'error');
    }
  },

  // ==========================================================================
  // PRODUCT DETAIL / QUICK VIEW MODAL
  // ==========================================================================
  openProductQuickView(productId) {
    const product = window.GymDB.getProductById(productId);
    if (!product) return;

    this.currentQuickViewProduct = product;
    this.selectedQuickViewFlavor = (product.flavors && product.flavors[0]) || 'Standard';
    this.selectedQuickViewSize = (product.sizes && product.sizes[0]) || product.size;

    const imgEl = document.getElementById('quickview-image');
    const catEl = document.getElementById('quickview-category');
    const brandEl = document.getElementById('quickview-brand');
    const titleEl = document.getElementById('quickview-title');
    const ratingScore = document.getElementById('quickview-rating-score');
    const reviewsCount = document.getElementById('quickview-reviews-count');
    const priceEl = document.getElementById('quickview-price');
    const mrpEl = document.getElementById('quickview-mrp');
    const discountEl = document.getElementById('quickview-discount');
    const certEl = document.getElementById('quickview-cert');
    const proteinVal = document.getElementById('quickview-protein-val');
    const descEl = document.getElementById('quickview-desc');
    const flavorsContainer = document.getElementById('quickview-flavors-container');
    const sizesContainer = document.getElementById('quickview-sizes-container');

    if (imgEl) {
      imgEl.src = product.image;
      imgEl.onerror = () => window.handleImgError(imgEl, 'product', product.name);
    }
    if (catEl) catEl.innerText = product.category.toUpperCase();
    if (brandEl) brandEl.innerText = (product.brand || 'SUPPLEMENT').toUpperCase();
    if (titleEl) titleEl.innerText = product.name;
    if (ratingScore) ratingScore.innerText = product.rating || 4.9;
    if (reviewsCount) reviewsCount.innerText = `(${product.reviews || 1420} Reviews)`;
    if (priceEl) priceEl.innerText = `₹${product.price.toLocaleString('en-IN')}`;
    if (mrpEl) mrpEl.innerText = product.mrp ? `MRP ₹${product.mrp.toLocaleString('en-IN')}` : '';
    if (discountEl) discountEl.innerText = product.discount || 'Special Price';
    if (certEl) certEl.innerText = `🛡️ ${product.cert || '100% Genuine Labdoor Tested & Informed Choice Certified'}`;
    if (proteinVal) proteinVal.innerText = product.proteinPerServing.split('|')[0].trim();
    if (descEl) descEl.innerText = product.description;

    // Render Flavor Chips
    if (flavorsContainer) {
      const flavors = product.flavors || ['Standard'];
      flavorsContainer.innerHTML = flavors.map((f, idx) => `
        <button type="button" class="flavor-chip ${idx === 0 ? 'active' : ''}" onclick="App.selectQuickViewFlavor(this, '${f}')">
          ${f}
        </button>
      `).join('');
    }

    // Render Size Chips
    if (sizesContainer) {
      const sizes = product.sizes || [product.size];
      sizesContainer.innerHTML = sizes.map((s, idx) => `
        <button type="button" class="size-chip ${idx === 0 ? 'active' : ''}" onclick="App.selectQuickViewSize(this, '${s}')">
          ${s}
        </button>
      `).join('');
    }

    // Bind Add to Cart & Buy Now buttons
    const btnAdd = document.getElementById('btn-quickview-addcart');
    const btnBuy = document.getElementById('btn-quickview-buynow');

    if (btnAdd) {
      btnAdd.onclick = () => {
        const res = window.GymDB.addToCart(product.id, App.selectedQuickViewFlavor, App.selectedQuickViewSize, 1);
        if (res.success) {
          App.updateCartHeaderUI();
          App.showToast(res.message, 'success');
          App.closeModals();
        }
      };
    }

    if (btnBuy) {
      btnBuy.onclick = () => {
        window.GymDB.addToCart(product.id, App.selectedQuickViewFlavor, App.selectedQuickViewSize, 1);
        App.updateCartHeaderUI();
        App.closeModals();
        App.openCheckout();
      };
    }

    this.openModal('modal-product-detail');
  },

  selectQuickViewFlavor(btn, flavor) {
    document.querySelectorAll('.flavor-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.selectedQuickViewFlavor = flavor;
  },

  selectQuickViewSize(btn, size) {
    document.querySelectorAll('.size-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.selectedQuickViewSize = size;
  },

  // ==========================================================================
  // GYM GUIDE & PICTURES GALLERY CONTROLLER
  // ==========================================================================
  renderGuide() {
    const gallery = window.GymDB.getGymGallery();
    const container = document.getElementById('all-gym-gallery-grid');
    if (!container) return;

    container.innerHTML = gallery.map(item => `
      <div class="gym-gallery-card">
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="window.handleImgError(this, 'gallery', '${item.title.replace(/'/g, "\\'")}')">
        <div class="gallery-overlay">
          <span class="gallery-zone-tag">${item.zone}</span>
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');
  },

  // ==========================================================================
  // PLAN & SINGLE PRODUCT UPI CONTROLLER (LEGACY / DIRECT)
  // ==========================================================================
  currentUPI: {
    type: 'plan',
    id: '',
    cycle: 'monthly',
    amount: 0,
    title: '',
    method: 'gpay'
  },

  openPlanUPIModal(planId, cycle = 'monthly') {
    const plan = window.GymDB.getPlanById(planId);
    if (!plan) return;

    const amount = cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    this.currentUPI = {
      type: 'plan',
      id: planId,
      cycle: cycle,
      amount: amount,
      title: `${plan.name} (${cycle === 'yearly' ? 'Yearly Package' : 'Monthly Subscription'})`,
      method: 'gpay'
    };

    this.populateUPIMemberDropdown();
    this.updateUPIModalUI();
    this.openModal('modal-upi-payment');
  },

  openProductUPIModal(productId) {
    const products = window.GymDB.getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    this.currentUPI = {
      type: 'product',
      id: productId,
      cycle: '',
      amount: product.price,
      title: `${product.name} (${product.size})`,
      method: 'gpay'
    };

    this.populateUPIMemberDropdown();
    this.updateUPIModalUI();
    this.openModal('modal-upi-payment');
  },

  populateUPIMemberDropdown() {
    const select = document.getElementById('upi-member-select');
    if (!select) return;

    const members = window.GymDB.getMembers();
    select.innerHTML = `
      ${members.map(m => `
        <option value="${m.id}">${m.fullName} (${m.instagram || m.id})</option>
      `).join('')}
      <option value="GUEST-01">+ Register as Walk-in Customer</option>
    `;
  },

  switchUPITab(method) {
    this.currentUPI.method = method;
    const btnGpay = document.getElementById('tab-btn-gpay');
    const btnPhonePe = document.getElementById('tab-btn-phonepe');
    const overlay = document.getElementById('qr-brand-overlay');
    const btnTrigger = document.getElementById('btn-gpay-trigger');
    const btnText = document.getElementById('upi-instant-btn-text');

    if (method === 'gpay') {
      if (btnGpay) btnGpay.classList.add('active');
      if (btnPhonePe) btnPhonePe.classList.remove('active');
      if (overlay) {
        overlay.innerText = 'GPAY';
        overlay.style.backgroundColor = '#4285F4';
      }
      if (btnTrigger) {
        btnTrigger.style.backgroundColor = '#4285F4';
      }
      if (btnText) btnText.innerText = '⚡ Tap to Pay with Google Pay (Instant Demo)';
    } else {
      if (btnGpay) btnGpay.classList.remove('active');
      if (btnPhonePe) btnPhonePe.classList.add('active');
      if (overlay) {
        overlay.innerText = 'PHONEPE';
        overlay.style.backgroundColor = '#5f259f';
      }
      if (btnTrigger) {
        btnTrigger.style.backgroundColor = '#5f259f';
      }
      if (btnText) btnText.innerText = '⚡ Tap to Pay with PhonePe (Instant Demo)';
    }
  },

  updateUPIModalUI() {
    const titleEl = document.getElementById('upi-item-title');
    const amountEl = document.getElementById('upi-payable-amount');
    const qrImg = document.getElementById('upi-qr-image');
    const statusText = document.getElementById('upi-status-text');
    const utrInput = document.getElementById('upi-utr-input');

    if (titleEl) titleEl.innerText = this.currentUPI.title;
    if (amountEl) amountEl.innerText = `₹${this.currentUPI.amount.toLocaleString('en-IN')}`;
    if (utrInput) utrInput.value = '';
    if (statusText) statusText.innerText = `Awaiting payment of ₹${this.currentUPI.amount} on UPI network...`;

    // Dynamic QR Code encoding standard UPI string
    const upiUri = encodeURIComponent(`upi://pay?pa=titanirongym@okaxis&pn=TITAN%20IRON%20GYM&am=${this.currentUPI.amount}&cu=INR&tn=${encodeURIComponent(this.currentUPI.title)}`);
    if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${upiUri}`;

    this.switchUPITab(this.currentUPI.method);
  },

  simulateInstantUPIPayment() {
    const statusText = document.getElementById('upi-status-text');
    const methodName = this.currentUPI.method === 'gpay' ? 'Google Pay' : 'PhonePe';
    
    if (statusText) {
      statusText.innerText = `Connecting to ${methodName} UPI gateway... approval in progress...`;
    }

    setTimeout(() => {
      const refNumber = `UPI-${this.currentUPI.method.toUpperCase()}-${Math.floor(Math.random() * 899999 + 100000)}`;
      this.completeUPIPayment(refNumber, `UPI (${methodName})`);
    }, 750);
  },

  confirmManualUPIUTR() {
    const input = document.getElementById('upi-utr-input');
    const utr = input ? input.value.trim() : '';
    if (!utr || utr.length < 6) {
      this.showToast('Please enter a valid UPI Reference / UTR Number (at least 6 digits)', 'error');
      return;
    }
    const methodName = this.currentUPI.method === 'gpay' ? 'Google Pay' : 'PhonePe';
    this.completeUPIPayment(utr, `UPI (${methodName})`);
  },

  completeUPIPayment(refNumber, paymentMethod) {
    const select = document.getElementById('upi-member-select');
    const memberId = select ? select.value : 'GUEST-01';

    if (this.currentUPI.type === 'plan') {
      const res = window.GymDB.applyMembershipPlan(memberId, this.currentUPI.id, this.currentUPI.cycle, paymentMethod, refNumber);
      if (res.success) {
        this.closeModals();
        this.showToast(res.message, 'success');
        this.renderAll();
        if (res.invoice) {
          this.openReceiptModal(res.invoice.id);
        }
      } else {
        this.showToast(res.message, 'error');
      }
    } else if (this.currentUPI.type === 'product') {
      const res = window.GymDB.buyProduct(this.currentUPI.id, memberId, paymentMethod);
      if (res.success) {
        this.closeModals();
        this.showToast(res.message, 'success');
        this.renderAll();
        if (res.invoice) {
          this.openReceiptModal(res.invoice.id);
        }
      } else {
        this.showToast(res.message, 'error');
      }
    }
  },

  copyUPIId() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('titanirongym@okaxis').then(() => {
        this.showToast('UPI ID copied: titanirongym@okaxis', 'success');
      }).catch(() => {
        this.showToast('UPI ID: titanirongym@okaxis', 'info');
      });
    } else {
      this.showToast('UPI ID: titanirongym@okaxis', 'info');
    }
  },

  // ==========================================================================
  // SELECT DROPDOWNS POPULATION
  // ==========================================================================
  populateSelectDropdowns() {
    const plans = window.GymDB.getPlans();
    const trainers = window.GymDB.getTrainers();
    const members = window.GymDB.getMembers();

    // 1. Plan filter in Members view
    const filterSelect = document.getElementById('member-plan-filter');
    if (filterSelect) {
      filterSelect.innerHTML = `<option value="ALL">All Membership Tiers</option>` +
        plans.map(p => `<option value="${p.id}">${p.name} (₹${p.monthlyPrice}/mo or ₹${p.yearlyPrice}/yr)</option>`).join('');
    }

    // 2. Plan in Add Member form
    const planSelect = document.getElementById('field-plan');
    if (planSelect) {
      planSelect.innerHTML = plans.map(p => `<option value="${p.id}">${p.name} (Monthly: ₹${p.monthlyPrice} | Yearly: ₹${p.yearlyPrice})</option>`).join('');
    }

    // 3. Trainer in Add Member form
    const trainerSelect = document.getElementById('field-trainer');
    if (trainerSelect) {
      trainerSelect.innerHTML = `<option value="">No Personal Coach (General Floor Access)</option>` +
        trainers.map(t => `<option value="${t.id}">${t.name} (${t.title})</option>`).join('');
    }

    // 4. Member in Record Payment form
    const paymentMemberSelect = document.getElementById('payment-member-select');
    if (paymentMemberSelect) {
      paymentMemberSelect.innerHTML = members.map(m => `<option value="${m.id}">${m.fullName} (${m.id})</option>`).join('');
    }
  },

  // ==========================================================================
  // MODALS CONTROL
  // ==========================================================================
  openModal(modalId) {
    this.closeModals();
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  },

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  },

  // ADD / EDIT MEMBER
  openAddMemberModal() {
    document.getElementById('modal-member-title').innerText = 'Register Club Member';
    document.getElementById('member-edit-id').value = '';
    document.getElementById('field-fullname').value = '';
    const instaInput = document.getElementById('field-instagram');
    if (instaInput) instaInput.value = '';
    document.getElementById('field-phone').value = '';
    document.getElementById('field-email').value = '';
    document.getElementById('field-gender').value = 'Male';
    document.getElementById('field-dob').value = '1995-05-15';
    document.getElementById('field-billing-cycle').value = 'monthly';
    document.getElementById('field-emergency').value = '';
    document.getElementById('field-notes').value = '';
    document.getElementById('member-payment-opt-group').style.display = 'block';

    this.populateSelectDropdowns();
    this.handlePlanChange();
    this.openModal('modal-member');
  },

  openEditMemberModal(memberId) {
    const member = window.GymDB.getMembers().find(m => m.id === memberId);
    if (!member) return;

    document.getElementById('modal-member-title').innerText = `Edit Profile: ${member.fullName}`;
    document.getElementById('member-edit-id').value = member.id;
    document.getElementById('field-fullname').value = member.fullName;
    const instaInput = document.getElementById('field-instagram');
    if (instaInput) instaInput.value = member.instagram || '';
    document.getElementById('field-phone').value = member.phone;
    document.getElementById('field-email').value = member.email;
    document.getElementById('field-gender').value = member.gender || 'Male';
    document.getElementById('field-dob').value = member.dob || '1995-05-15';
    document.getElementById('field-plan').value = member.planId;
    document.getElementById('field-billing-cycle').value = member.durationCycle || 'monthly';
    document.getElementById('field-trainer').value = member.trainerId || '';
    document.getElementById('field-expiry').value = member.expiryDate;
    document.getElementById('field-emergency').value = member.emergencyContact || '';
    document.getElementById('field-notes').value = member.notes || '';
    document.getElementById('member-payment-opt-group').style.display = 'none';

    this.updatePricePreview();
    this.openModal('modal-member');
  },

  handlePlanChange() {
    this.updatePricePreview();
    this.recalcExpiryDate();
  },

  handleBillingCycleChange() {
    this.updatePricePreview();
    this.recalcExpiryDate();
  },

  updatePricePreview() {
    const planId = document.getElementById('field-plan')?.value;
    const cycle = document.getElementById('field-billing-cycle')?.value || 'monthly';
    const plan = window.GymDB.getPlanById(planId);

    const feeDesc = document.getElementById('plan-fee-description');
    const feeAmt = document.getElementById('plan-fee-amount');

    if (plan && feeDesc && feeAmt) {
      if (cycle === 'yearly') {
        feeDesc.innerText = `${plan.name} (Yearly Package)`;
        feeAmt.innerText = `₹${plan.yearlyPrice.toLocaleString('en-IN')}`;
      } else {
        feeDesc.innerText = `${plan.name} (Monthly Subscription)`;
        feeAmt.innerText = `₹${plan.monthlyPrice.toLocaleString('en-IN')}`;
      }
    }
  },

  recalcExpiryDate() {
    const cycle = document.getElementById('field-billing-cycle')?.value || 'monthly';
    const d = new Date();
    if (cycle === 'yearly') {
      d.setFullYear(d.getFullYear() + 1);
    } else {
      d.setMonth(d.getMonth() + 1);
    }
    const dateInput = document.getElementById('field-expiry');
    if (dateInput) dateInput.value = d.toISOString().split('T')[0];
  },

  handleSaveMember(e) {
    e.preventDefault();
    const editId = document.getElementById('member-edit-id').value;
    const instaField = document.getElementById('field-instagram');
    const memberData = {
      fullName: document.getElementById('field-fullname').value.trim(),
      instagram: instaField && instaField.value.trim() ? (instaField.value.trim().startsWith('@') ? instaField.value.trim() : `@${instaField.value.trim()}`) : '',
      phone: document.getElementById('field-phone').value.trim(),
      email: document.getElementById('field-email').value.trim(),
      gender: document.getElementById('field-gender').value,
      dob: document.getElementById('field-dob').value,
      planId: document.getElementById('field-plan').value,
      durationCycle: document.getElementById('field-billing-cycle').value,
      trainerId: document.getElementById('field-trainer').value,
      expiryDate: document.getElementById('field-expiry').value,
      emergencyContact: document.getElementById('field-emergency').value.trim(),
      notes: document.getElementById('field-notes').value.trim(),
      initialPaymentMethod: document.getElementById('field-initial-payment').value
    };

    if (editId) {
      window.GymDB.updateMember(editId, memberData);
      this.showToast(`Updated profile for ${memberData.fullName}`, 'success');
    } else {
      const created = window.GymDB.addMember(memberData);
      this.showToast(`Registered new Tamil fitness member: ${created.fullName} (${created.id})`, 'success');
    }

    this.closeModals();
    this.renderAll();
  },

  confirmDeleteMember(memberId) {
    const member = window.GymDB.getMembers().find(m => m.id === memberId);
    if (!member) return;

    if (confirm(`Remove member record for ${member.fullName} (${member.id})?`)) {
      window.GymDB.deleteMember(memberId);
      this.showToast(`Removed: ${member.fullName}`, 'info');
      this.renderAll();
    }
  },

  // RENEW MEMBERSHIP (INR EXACT PRICES)
  openRenewModal(memberId) {
    const member = window.GymDB.getMembers().find(m => m.id === memberId);
    if (!member) return;

    const plan = window.GymDB.getPlanById(member.planId);
    document.getElementById('renew-member-id').value = member.id;
    document.getElementById('renew-member-name').innerText = member.fullName;
    document.getElementById('renew-member-plan').innerText = `Current Plan: ${plan ? plan.name : 'Gym Tier'} (Expires ${member.expiryDate})`;
    document.getElementById('renew-cycle').value = member.durationCycle || 'monthly';

    this.updateRenewPricing();
    this.openModal('modal-renew');
  },

  updateRenewPricing() {
    const memberId = document.getElementById('renew-member-id').value;
    const cycle = document.getElementById('renew-cycle').value;
    const member = window.GymDB.getMembers().find(m => m.id === memberId);
    if (!member) return;

    const plan = window.GymDB.getPlanById(member.planId);
    let amount = 500;
    if (plan) {
      amount = cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    }

    document.getElementById('renew-calculated-amount').innerText = `₹${amount.toLocaleString('en-IN')}`;
  },

  handleConfirmRenewal(e) {
    e.preventDefault();
    const memberId = document.getElementById('renew-member-id').value;
    const cycle = document.getElementById('renew-cycle').value;
    const method = document.getElementById('renew-payment-method').value;

    const renewed = window.GymDB.renewMembership(memberId, cycle, method);
    if (renewed) {
      this.showToast(`Membership renewed (${cycle.toUpperCase()})! Valid until: ${renewed.expiryDate}`, 'success');
      this.closeModals();
      this.renderAll();
    }
  },

  // DIGITAL ID PASS
  openPassModal(memberId) {
    const member = window.GymDB.getMembers().find(m => m.id === memberId);
    if (!member) return;

    const plan = window.GymDB.getPlanById(member.planId);
    document.getElementById('pass-fullname').innerText = member.fullName;
    const passInsta = document.getElementById('pass-instagram');
    if (passInsta) passInsta.innerText = member.instagram || '@tamil_fit';
    document.getElementById('pass-member-id').innerText = member.id;
    document.getElementById('pass-plan').innerText = `${plan ? plan.name : 'Athletic Plan'} (${member.durationCycle === 'yearly' ? 'Yearly' : 'Monthly'})`;
    document.getElementById('pass-expiry').innerText = member.expiryDate;
    document.getElementById('pass-emergency').innerText = member.emergencyContact || 'None on file';
    document.getElementById('pass-barcode-text').innerText = member.id;
    
    const photoEl = document.getElementById('pass-photo');
    if (photoEl) {
      photoEl.src = member.avatar;
      photoEl.onerror = () => window.handleImgError(photoEl, 'avatar', member.fullName);
    }

    const badge = document.getElementById('pass-status-badge');
    badge.innerText = member.status.toUpperCase();
    if (member.status === 'Active') {
      badge.style.backgroundColor = '#22c55e';
    } else if (member.status === 'Expiring Soon') {
      badge.style.backgroundColor = '#f59e0b';
    } else {
      badge.style.backgroundColor = 'var(--red-primary)';
    }

    this.openModal('modal-pass');
  },

  // OFFICIAL RECEIPT MODAL (IN RUPEES)
  openReceiptModal(invoiceId) {
    const inv = window.GymDB.getInvoices().find(i => i.id === invoiceId);
    if (!inv) return;

    document.getElementById('receipt-id').innerText = inv.id;
    document.getElementById('receipt-date').innerText = inv.date;
    document.getElementById('receipt-member-name').innerText = inv.memberName;
    document.getElementById('receipt-member-id').innerText = `Member ID: ${inv.memberId}`;
    document.getElementById('receipt-description').innerText = inv.planName;
    document.getElementById('receipt-amount').innerText = `₹${inv.amount.toLocaleString('en-IN')}`;
    document.getElementById('receipt-total').innerText = `₹${inv.amount.toLocaleString('en-IN')}`;
    document.getElementById('receipt-method').innerText = inv.paymentMethod;
    document.getElementById('receipt-ref').innerText = inv.reference || 'N/A';

    const statusBadge = document.getElementById('receipt-status');
    statusBadge.innerText = inv.status.toUpperCase();
    statusBadge.className = `badge ${inv.status === 'Paid' ? 'badge-active' : 'badge-danger'}`;

    this.openModal('modal-receipt');
  },

  // RECORD MANUAL PAYMENT
  openRecordPaymentModal() {
    this.populateSelectDropdowns();
    this.openModal('modal-record-payment');
  },

  handleManualPayment(e) {
    e.preventDefault();
    const memberId = document.getElementById('payment-member-select').value;
    const desc = document.getElementById('payment-desc-input').value.trim();
    const amount = parseFloat(document.getElementById('payment-amount-input').value);
    const method = document.getElementById('payment-method-select').value;

    const member = window.GymDB.getMembers().find(m => m.id === memberId);
    if (!member) return;

    const newInv = window.GymDB.addInvoice({
      memberId: member.id,
      memberName: member.fullName,
      planName: desc,
      amount: amount,
      paymentMethod: method,
      status: 'Paid'
    });

    this.showToast(`Recorded payment of ₹${amount.toLocaleString('en-IN')} from ${member.fullName}`, 'success');
    this.closeModals();
    this.renderAll();
    this.openReceiptModal(newInv.id);
  },

  // CREATE PLAN
  handleSavePlan(e) {
    e.preventDefault();
    const planName = document.getElementById('plan-name-input').value.trim();
    const monthlyPrice = document.getElementById('plan-monthly-price-input').value;
    const yearlyPrice = document.getElementById('plan-yearly-price-input').value;
    const tag = document.getElementById('plan-tag-input').value.trim();
    const featuresRaw = document.getElementById('plan-features-input').value;
    const features = featuresRaw.split(',').map(f => f.trim()).filter(f => f.length > 0);

    const plans = window.GymDB.get(STORAGE_KEYS.PLANS);
    const newPlan = {
      id: `PLAN-${Date.now().toString().slice(-4)}`,
      name: planName,
      monthlyPrice: parseInt(monthlyPrice, 10),
      yearlyPrice: parseInt(yearlyPrice, 10),
      tag: tag,
      features: features,
      activeMembers: 0
    };
    plans.push(newPlan);
    window.GymDB.set(STORAGE_KEYS.PLANS, plans);

    this.showToast(`Created new plan: ${planName}`, 'success');
    this.closeModals();
    this.populateSelectDropdowns();
    this.renderAll();
  },

  // CREATE TRAINER
  handleSaveTrainer(e) {
    e.preventDefault();
    const name = document.getElementById('trainer-name-input').value.trim();
    const title = document.getElementById('trainer-title-input').value.trim();
    const spec = document.getElementById('trainer-spec-input').value.trim();
    const phone = document.getElementById('trainer-phone-input').value.trim();
    const exp = document.getElementById('trainer-exp-input').value.trim();

    const trainers = window.GymDB.get(STORAGE_KEYS.TRAINERS);
    const newTrainer = {
      id: `TR-${100 + trainers.length + 1}`,
      name,
      title,
      specialty: spec,
      phone: phone || '+91 98400 12345',
      email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@titangym.in`,
      location: 'Chennai, Tamil Nadu',
      experience: exp || '5+ Years',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=18181b&color=ffffff&bold=true`,
      activeClients: 0,
      status: 'Active'
    };
    trainers.push(newTrainer);
    window.GymDB.set(STORAGE_KEYS.TRAINERS, trainers);

    this.showToast(`Registered trainer/coach: ${name}`, 'success');
    this.closeModals();
    this.populateSelectDropdowns();
    this.renderAll();
  },

  // EXPORT CSV
  exportMembersCSV() {
    const members = window.GymDB.getMembers();
    let csv = "Member ID,Full Name,Instagram,Phone,Email,Plan ID,Billing Cycle,Trainer ID,Join Date,Expiry Date,Status\n";
    members.forEach(m => {
      csv += `"${m.id}","${m.fullName}","${m.instagram || ''}","${m.phone}","${m.email}","${m.planId}","${m.durationCycle || 'monthly'}","${m.trainerId}","${m.joinDate}","${m.expiryDate}","${m.status}"\n`;
    });
    this.downloadFile(csv, `Fitness_Athlete_Club_Gym_Members_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    this.showToast('Downloaded Gym Members roster CSV', 'success');
  },

  exportAttendanceCSV() {
    const logs = window.GymDB.getAttendanceLogs();
    let csv = "Log ID,Member ID,Member Name,Plan Name,Check In,Check Out,Date,Status\n";
    logs.forEach(l => {
      csv += `"${l.id}","${l.memberId}","${l.memberName}","${l.planName}","${l.checkInTime}","${l.checkOutTime}","${l.date}","${l.status}"\n`;
    });
    this.downloadFile(csv, `Titan_Gym_Attendance_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    this.showToast('Downloaded attendance log CSV', 'success');
  },

  downloadFile(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  },

  confirmResetData() {
    if (confirm("Reset system data back to default Fitness Athlete Club members (Surabi, Dolphin, Biglee, Saran, etc.) and Market Protein Powders?")) {
      window.GymDB.resetToDefaults();
      this.currentCartCoupon = '';
      this.showToast('System data successfully reset to Fitness Athlete Club members & market protein powders!', 'info');
      this.populateSelectDropdowns();
      this.updateCartHeaderUI();
      this.renderAll();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
