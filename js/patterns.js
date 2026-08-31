function statusRow(light){
  return '<div class="ds-status"' + (light ? ' style="color:#fff"' : '') + '>' +
    '<span>9:41</span><span class="si"><i class="ti ti-antenna-bars-5"></i>' +
    '<i class="ti ti-wifi"></i><i class="ti ti-battery-3"></i></span></div>';
}

const PATTERNS = {

  login: {
    title: 'Login',
    desc: 'Hero gradient carries the brand; everything below is calm and task-focused. Error state keeps both field values, names the failing field and counts remaining attempts. Loading locks the CTA — never block the whole screen.',
    uses: ['textfield', 'button', 'alerts', 'selection'],
    states: ['Default', 'Error', 'Loading'],
    render(state){
      const err = state === 'Error';
      const loading = state === 'Loading';
      return `
      <div class="login-hero">
        ${statusRow(true)}
        <div class="lh-top" style="margin-top:8px">
          <span class="lh-eyebrow">GLOBALDS DEMO</span>
          <span class="lh-logo">ICICI Bank</span>
        </div>
        <h2>Welcome back</h2>
        <p>Sign in to Internet Banking</p>
      </div>
      <div class="screen-pad">
        ${err ? `<div class="ds-alert error" style="max-width:none"><i class="ti ti-alert-circle"></i><div class="ds-alert-body"><strong>We couldn't sign you in</strong>Check your details and try again.</div></div>` : ''}
        <div class="ds-field${err ? ' is-error' : ''}" style="width:100%">
          <label>User ID</label>
          <div class="ds-input"><i class="ti ti-user"></i><input value="deep.h" readonly></div>
        </div>
        <div class="ds-field${err ? ' is-error' : ''}" style="width:100%">
          <label>Password</label>
          <div class="ds-input"><i class="ti ti-lock"></i><input type="password" value="password" readonly><i class="ti ti-eye"></i></div>
          ${err ? '<span class="ds-help">Incorrect password. 2 attempts remaining.</span>' : ''}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="ds-ctl-row" style="font-size:13px"><span class="ds-check checked"></span> Remember me</span>
          <span class="linkline">Forgot password?</span>
        </div>
        <button class="ds-btn primary lg block"${loading ? ' disabled' : ''}>${loading ? '<span class="ds-spinner"></span> Signing in…' : 'Sign in securely'}</button>
        <button class="ds-btn secondary md block"><i class="ti ti-face-id"></i> Sign in with Face ID</button>
        <div class="mt-auto" style="text-align:center;padding-bottom:4px">
          <span style="font-size:12.5px;color:var(--gray-500)">New to ICICI Bank Canada? <span class="linkline">Register</span></span>
        </div>
      </div>`;
    }
  },

  otp: {
    title: 'OTP verification',
    desc: 'The verification gate for sign-in and high-value transfers. Code auto-advances and auto-submits on the last digit. Error shakes once, clears, and refocuses the first box. Resend unlocks only after the timer — and the timer survives navigation.',
    uses: ['otp', 'button', 'alerts'],
    states: ['Default', 'Typing', 'Error', 'Success'],
    render(state){
      let boxes = '';
      const sep = '<span class="ds-otp-sep"></span>';
      if (state === 'Default') {
        boxes = '<div class="ds-otp-box active"></div>' + '<div class="ds-otp-box"></div>'.repeat(2) + sep + '<div class="ds-otp-box"></div>'.repeat(3);
      } else if (state === 'Typing') {
        boxes = '<div class="ds-otp-box dot filled"></div><div class="ds-otp-box dot filled"></div><div class="ds-otp-box filled">5</div>' + sep + '<div class="ds-otp-box active"></div><div class="ds-otp-box"></div><div class="ds-otp-box"></div>';
      } else if (state === 'Error') {
        boxes = ['7','2','9'].map(d => '<div class="ds-otp-box error">' + d + '</div>').join('') + sep + ['1','4','4'].map(d => '<div class="ds-otp-box error">' + d + '</div>').join('');
      } else {
        boxes = ['3','1','0'].map(d => '<div class="ds-otp-box success">' + d + '</div>').join('') + sep + ['9','2','7'].map(d => '<div class="ds-otp-box success">' + d + '</div>').join('');
      }
      const alert =
        state === 'Error' ? '<div class="ds-alert error" style="max-width:none"><i class="ti ti-alert-circle"></i><div class="ds-alert-body"><strong>That code didn\'t match</strong>Check the latest SMS — 2 attempts remaining.</div></div>' :
        state === 'Success' ? '<div class="ds-alert success" style="max-width:none"><i class="ti ti-circle-check"></i><div class="ds-alert-body"><strong>Verified</strong>Taking you to your accounts…</div></div>' : '';
      const resend = state === 'Error'
        ? '<div class="resend"><span class="linkline">Resend code</span></div>'
        : '<div class="resend">Resend code in <b>00:24</b></div>';
      const cta = state === 'Success'
        ? '<button class="ds-btn primary lg block"><span class="ds-spinner"></span> Continue</button>'
        : '<button class="ds-btn primary lg block"' + (state === 'Default' || state === 'Typing' ? ' disabled' : '') + '>Continue</button>';
      return `
      ${statusRow(false)}
      <div class="ds-appbar" style="border-bottom:none"><i class="ti ti-chevron-left"></i><b>Verification</b><span class="spacer"></span></div>
      <div class="screen-pad">
        <div class="screen-title">Verify it's you</div>
        <p class="screen-sub">Enter the 6-digit code we sent to <b>+1 ••• ••• 4821</b></p>
        ${alert}
        <div class="ds-otp" style="justify-content:center;margin-top:6px">${boxes}</div>
        ${resend}
        <div class="mt-auto"></div>
        ${cta}
        <div style="text-align:center;padding-bottom:4px"><span class="linkline" style="font-size:12.5px">Try another way</span></div>
      </div>`;
    }
  },

  transfer: {
    title: 'Transfer review',
    desc: 'The confirmation gate before money moves. Amount is the hero; everything the customer must verify sits in one card. Processing keeps the screen — only the CTA changes, so nothing jumps. Success is a fresh screen with the reference number front and center.',
    uses: ['cards', 'tiles', 'button', 'alerts', 'navigation'],
    states: ['Review', 'Processing', 'Success'],
    render(state){
      if (state === 'Success') {
        return `
        ${statusRow(false)}
        <div class="screen-pad">
          <div class="success-wrap">
            <div class="check-big"><i class="ti ti-check"></i></div>
            <div class="screen-title">Transfer sent</div>
            <p class="screen-sub" style="margin-top:0">Sarah will get an email with deposit instructions within minutes.</p>
          </div>
          <div class="detail-card" style="margin-top:10px">
            <div class="detail-row"><span>Amount</span><b>CA$ 1,250.00</b></div>
            <div class="detail-row"><span>To</span><b>Sarah Chen</b></div>
            <div class="detail-row"><span>Reference</span><b>INT-88412-CA</b></div>
            <div class="detail-row"><span>Date</span><b>12 Jun 2026, 09:41</b></div>
          </div>
          <div class="mt-auto"></div>
          <button class="ds-btn secondary md block"><i class="ti ti-share"></i> Share receipt</button>
          <button class="ds-btn primary lg block">Done</button>
        </div>`;
      }
      const processing = state === 'Processing';
      return `
      ${statusRow(false)}
      <div class="ds-appbar"><i class="ti ti-chevron-left"></i><b>Review transfer</b><i class="ti ti-help-circle"></i></div>
      <div class="screen-pad" style="background:var(--gray-50)">
        <div style="text-align:center;padding:10px 0 2px">
          <div class="amount-big">CA$ 1,250.00</div>
          <span class="ds-badge brand" style="margin-top:8px"><i class="ti ti-bolt" style="font-size:12px"></i> Interac e-Transfer</span>
        </div>
        <div class="payee">
          <span class="av">SC</span>
          <div style="flex:1;min-width:0"><b>Sarah Chen</b><small>sarah.chen@gmail.com</small></div>
          <i class="ti ti-chevron-right" style="color:var(--gray-400)"></i>
        </div>
        <div class="detail-card">
          <div class="detail-row"><span>From</span><b>Savings ···· 8472</b></div>
          <div class="detail-row"><span>Fee</span><b style="color:var(--succ-600)">No fee</b></div>
          <div class="detail-row"><span>Arrives</span><b>In minutes</b></div>
          <div class="detail-row"><span>Security question</span><b>Set <i class="ti ti-check" style="color:var(--succ-600);font-size:13px"></i></b></div>
        </div>
        <div class="ds-alert info" style="max-width:none"><i class="ti ti-info-circle"></i><div class="ds-alert-body">You can cancel this transfer until Sarah deposits it.</div></div>
        <div class="mt-auto"></div>
        <button class="ds-btn primary lg block"${processing ? ' disabled' : ''}>${processing ? '<span class="ds-spinner"></span> Sending…' : 'Confirm & send'}</button>
      </div>`;
    }
  },

  dashboard: {
    title: 'Accounts home',
    desc: 'The landing screen after sign-in. One gradient account card maximum; quick actions mirror the four most common tasks per geography. Recent activity shows three transactions, then hands off to the full list.',
    uses: ['cards', 'tiles', 'badges', 'navigation'],
    states: ['Default'],
    render(){
      return `
      ${statusRow(false)}
      <div class="screen-pad" style="background:var(--gray-50);padding-bottom:0">
        <div style="display:flex;align-items:center;gap:11px">
          <span class="av" style="width:38px;height:38px;border-radius:50%;background:var(--brand-100);color:var(--brand-700);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px">DH</span>
          <div style="flex:1"><small style="font-size:11.5px;color:var(--gray-500)">Good morning</small><b style="display:block;font-size:15px">Deep Harshdeep</b></div>
          <i class="ti ti-bell" style="font-size:20px;color:var(--gray-600)"></i>
        </div>
        <div class="ds-account-card" style="width:100%">
          <div class="ac-top"><span>Savings · CAD</span><i class="ti ti-eye" style="font-size:15px"></i></div>
          <div class="ac-bal">CA$ 24,580.32</div>
          <div class="ac-num">003501 ···· 8472</div>
          <div class="ac-foot"><span>Available CA$ 23,100.00</span><span>Details <i class="ti ti-chevron-right" style="font-size:11px"></i></span></div>
        </div>
        <div class="ds-quick-grid" style="width:100%">
          <div class="ds-quick"><i class="ti ti-send"></i>Send</div>
          <div class="ds-quick"><i class="ti ti-receipt"></i>Pay bills</div>
          <div class="ds-quick"><i class="ti ti-file-download"></i>Statement</div>
          <div class="ds-quick"><i class="ti ti-dots"></i>More</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">
          <b style="font-size:14.5px">Recent activity</b><span class="linkline" style="font-size:12.5px">View all</span>
        </div>
        <div style="border:1px solid var(--gray-200);border-radius:12px;overflow:hidden;background:#fff">
          <div class="ds-tile" style="width:100%">
            <div class="ds-tile-ic"><i class="ti ti-arrow-down-left"></i></div>
            <div class="ds-tile-body"><b>Salary — TechCorp Inc.</b><small>Today, 09:12</small></div>
            <span class="ds-amount credit">+ CA$ 4,200.00</span>
          </div>
          <div class="ds-tile" style="width:100%">
            <div class="ds-tile-ic"><i class="ti ti-arrow-up-right"></i></div>
            <div class="ds-tile-body"><b>Interac e-Transfer · Sarah</b><small>Yesterday</small></div>
            <span class="ds-amount debit">− CA$ 250.00</span>
          </div>
          <div class="ds-tile" style="width:100%">
            <div class="ds-tile-ic"><i class="ti ti-clock"></i></div>
            <div class="ds-tile-body"><b>Hydro-Québec</b><small>Bill payment</small></div>
            <span class="ds-badge warning">Pending</span>
          </div>
        </div>
      </div>
      <div class="ds-bottomnav">
        <div class="bn-item active"><i class="ti ti-home"></i>Home</div>
        <div class="bn-item"><i class="ti ti-send"></i>Payments</div>
        <div class="bn-item"><i class="ti ti-chart-pie"></i>Insights</div>
        <div class="bn-item"><i class="ti ti-user"></i>Profile</div>
      </div>`;
    }
  }
};
