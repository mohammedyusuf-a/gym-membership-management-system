# TITAN IRON GYM - Membership Management System

A high-performance, athletic **Gym Membership Management System** built with a classic **Black & White theme with Gym Red accents** (`#E50914`), featuring clean, athletic typography (`Inter` and `Oswald`) without any AI/sci-fi gimmicks.

---

## ⚡ Core Features

### 1. Executive Dashboard & Metrics
- **Real-Time KPIs**: Total Active Members, Today's Check-ins, Expiring Memberships (< 7 Days), and Monthly Verified Revenue.
- **Fast Check-in Bar**: Header-mounted instant scanner / ID lookup with 1-click check-in and checkout.
- **Live Floor Stream**: Tracks members currently on the gym floor with one-click log-out.
- **Expiring Membership Alerts**: Immediate alert list with 1-click renewal action.
- **Membership Tier Distribution**: Visual breakdown of subscriber count per plan.

### 2. Club Members Directory
- Comprehensive data table with member photo avatars, Member IDs (`GYM-1001`), phone numbers, email, plan badges, assigned personal coaches, and expiry dates with days remaining.
- Real-time search by Name, Member ID, Phone, or Email.
- Filter by Plan Tier and Membership Status (`Active`, `Expiring Soon`, `Expired`).
- **Actions per member**:
  - **Instant Check-in / Checkout**
  - **Digital ID Pass**: Printable athletic gym card with photo, barcode, and emergency contact
  - **Renew Membership**: Extend membership by 1, 3, 6, or 12 months with automated invoice generation
  - **Edit Profile**: Update phone, emergency contact, assigned coach, notes, or tier
  - **Delete Record**: Remove member with confirmation safeguards
- **Export to CSV**: Download complete membership rosters with one click.

### 3. Check-in Desk & Entry Terminal
- Dedicated barcode / Member ID verification terminal simulator.
- Automatic verification: Grants entry for active members; triggers **Access Denied** alert with renewal prompt for expired memberships.
- Complete daily attendance logs with check-in/out timestamps and CSV export.

### 4. Membership Subscription Tiers
- Plan cards: **Standard Fitness** ($30/mo), **Pro Strength & Conditioning** ($55/mo), **Elite Athlete** ($85/mo), and **VIP Personal Coaching** ($130/mo).
- Feature breakdown, active subscriber count, and **+ Create New Plan** modal.

### 5. Personal Coaches & Trainers
- Certified trainer profiles with headshots, job title, specialization, experience badge, direct phone, and active client roster counts.
- **+ Add Coach** modal.

### 6. Billing & Invoices
- Lifetime financial summary: Total Revenue Collected, Pending Dues, and Total Invoices.
- Complete transaction log with invoice numbers, payment methods (Credit Card, Cash, UPI, Bank Wire), status badges (`Paid`, `Unpaid`, `Overdue`).
- **Official Payment Receipt Modal**: Formatted printable receipt with gym details, itemized breakdown, tax/total, and reference code.
- **Record Manual Payment**: Instant billing for walk-ins and renewal fees.

### 7. Group Class Schedule
- Timetable for heavy lifting, CrossFit, mobility, boxing conditioning, and hypertrophy sessions with coach assignments and capacity progress bars.

---

## 🎨 Design Philosophy
- **Colors**: Deep obsidian black (`#0B0B0E`), dark card surfaces (`#18181E`), pure white text (`#FFFFFF`), and punchy athletic Gym Red (`#E50914`).
- **Fonts**: Google Fonts `Inter` (high-readability, clean, standard font) and `Oswald` (bold, athletic, condensed uppercase titles).
- **Zero AI Sci-Fi Gimmicks**: No glowing purple/cyan neon, no glassmorphism blur, no robotic fonts.

---

## 🚀 How to Run Locally

### Option 1: Open Directly in Any Browser
Simply double-click `index.html` in Windows File Explorer or open it in Google Chrome, Microsoft Edge, or Firefox.

### Option 2: Run with Local Web Server
```powershell
npx http-server . -p 5173
```
Then visit: `http://localhost:5173`

---

## 📂 Project Architecture
```
OOASE project/
├── index.html        # Main semantic SPA layout & modal dialogues
├── css/
│   └── styles.css    # High-contrast Black, White & Gym Red athletic design system
├── js/
│   ├── data.js       # LocalStorage state manager & seed mock dataset
│   └── app.js        # UI routing, check-in logic, CRUD operations & receipt generator
└── README.md         # Documentation
```
