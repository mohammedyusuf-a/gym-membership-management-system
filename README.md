# 🏋️‍♂️ TITAN IRON GYM - GYM MEMBERSHIP MANAGEMENT SYSTEM
### Salem's Premier Olympic Athletic Club & Member Management System

[![Live Demo on Vercel](https://img.shields.io/badge/⚡_LIVE_DEMO-fitness--athlete--club.vercel.app-E50914?style=for-the-badge&logo=vercel&logoColor=white)](https://fitness-athlete-club.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohammedyusuf-a/gym-membership-management-system)
[![Report PDF](https://img.shields.io/badge/📑_PROJECT_REPORT-PDF_Download-2563EB?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://raw.githubusercontent.com/mohammedyusuf-a/gym-membership-management-system/main/report/Fitness_Athlete_Club_OOASE_Project_Report.pdf)
[![Location](https://img.shields.io/badge/Location-Salem%2C%20Tamil%20Nadu-10b981?style=for-the-badge)](https://fitness-athlete-club.vercel.app/)
[![Status](https://img.shields.io/badge/Status-100%25%20Live%20%26%20Active-success?style=for-the-badge)](https://fitness-athlete-club.vercel.app/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20v8.3-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](http://localhost:5000/api/status)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](http://localhost:5000)

---

## ⚡ Full-Stack Architecture (Frontend + Backend + MongoDB)

The project has been separated into clean **Backend** and **Frontend** layers with permanent **MongoDB** database storage:

```
OOASE project/
├── backend/
│   ├── config/db.js          # Mongoose MongoDB connection & health check
│   ├── models/               # MongoDB Schemas (Member, User, Plan, Trainer, Attendance, Invoice, Product, Class, Setting)
│   ├── routes/               # Express REST APIs (/api/members, /api/auth, /api/attendance, /api/invoices, etc.)
│   ├── data/                 # Seed dataset with authentic Tamil fitness influencers
│   ├── scripts/seed.js       # Database seeder script
│   ├── server.js             # Express server (Serves REST API + Frontend on port 5000)
│   └── .env                  # PORT=5000, MONGO_URI=mongodb://127.0.0.1:27017/gym_management
│
├── frontend/
│   ├── assets/               # Influencer images, luxury gym arena photos
│   ├── css/styles.css        # Responsive dark-theme styling + MongoDB live status pill
│   ├── js/api.js             # Client API service communicating with backend
│   ├── js/data.js            # GymStore (real-time sync with MongoDB + offline fallback)
│   ├── js/app.js             # UI Controller
│   └── index.html            # Main Single-Page Application
│
└── package.json              # Unified project run scripts
```

### 🚀 Running the Project:

```bash
# 1. Start Full-Stack App (Backend API + Frontend on http://localhost:5000):
npm start

# 2. Or run backend explicitly:
npm run backend

# 3. Re-seed MongoDB with initial Tamil fitness influencers & default data:
npm run seed
```

---

## 🚀 Quick Access & About Links

- 🌐 **Live Website (Vercel)**: **[https://fitness-athlete-club.vercel.app/](https://fitness-athlete-club.vercel.app/)**
- 📁 **GitHub Source Code**: **[https://github.com/mohammedyusuf-a/gym-membership-management-system](https://github.com/mohammedyusuf-a/gym-membership-management-system)**
- 📕 **Official Project Report (PDF)**: **[Download PDF](https://raw.githubusercontent.com/mohammedyusuf-a/gym-membership-management-system/main/report/Fitness_Athlete_Club_OOASE_Project_Report.pdf)** | **[View on GitHub](report/Fitness_Athlete_Club_OOASE_Project_Report.pdf)**
- 🌐 **Interactive HTML Report**: **[Live Web Report](https://fitness-athlete-club.vercel.app/report/OOASE_PROJECT_REPORT.html)** | **[Source File](report/OOASE_PROJECT_REPORT.html)**
- 📝 **Markdown Report Source**: **[report/OOASE_PROJECT_REPORT.md](report/OOASE_PROJECT_REPORT.md)**
- 👤 **Creator & Lead Developer**: **Md Yusuf** (`yusuf@fitnessathlete.com` | Salem, Tamil Nadu, India)
- 📍 **Location**: Salem, Tamil Nadu, India • 24/7 Access
- 🔐 **Demo Credentials**:
  - Member Sign-In: `yusuf@fitnessathlete.com` / `member123`
  - Creator Master Admin Key: `titan@gmail.com` / `titan123`

### ⚙️ GitHub Repository "About" Section Configuration:
To set the official "About" section on your GitHub repository page:
1. Go to **[https://github.com/mohammedyusuf-a/gym-membership-management-system](https://github.com/mohammedyusuf-a/gym-membership-management-system)**
2. Click the **⚙️ (Gear Icon)** next to the **About** header on the right sidebar.
3. Fill in:
   - **Description**: `Salem's Premier Olympic Athletic Club & Member Management System (OOASE) - Full-Stack Express + MongoDB / Vanilla JS`
   - **Website**: `https://fitness-athlete-club.vercel.app/`
   - **Topics**: `gym`, `management-system`, `vercel`, `mongodb`, `express`, `javascript`, `fullstack`, `academic-project`, `ooase`
4. Click **Save changes**.

---

## 📑 Academic Project Report (OOASE)

This repository includes a comprehensive, publication-grade academic report formatted according to university standards for **Object-Oriented Analysis & Software Engineering (OOASE)**.

### 📌 Document Access:
- **Download Official PDF (23 Pages, Print-Ready)**: [Fitness_Athlete_Club_OOASE_Project_Report.pdf](https://raw.githubusercontent.com/mohammedyusuf-a/gym-membership-management-system/main/report/Fitness_Athlete_Club_OOASE_Project_Report.pdf)
- **Interactive HTML Report with Scalable Vector Diagrams**: [report/OOASE_PROJECT_REPORT.html](report/OOASE_PROJECT_REPORT.html)
- **Report Documentation Index**: [report/README.md](report/README.md)

### 📐 7 UML Architectural Diagrams Included:
1. **Use Case Diagram**: System interactions between Members, Master Coaches, and the Creator/Admin.
2. **Class Diagram**: Object-oriented domain entities (`Member`, `Plan`, `Product`, `Order`, `AttendanceRecord`, `Coach`, `GymStore`).
3. **Sequence Diagram**: Member Fee Payment, UPI verification, and Membership Extension flow.
4. **Activity Diagram**: Member QR Scanning and Daily Floor Check-in workflow.
5. **State Machine Diagram**: Full lifecycle of a Membership (Prospective → Active → Expiring Soon → Expired → Suspended).
6. **Component Diagram**: Architectural layering (UI Presentation, State Controller, LocalStorage Adapter, UPI Simulator).
7. **Deployment Diagram**: Cloud edge infrastructure (Vercel Global CDN, HTTPS, Client Web Browser).

### 📸 Verification Figures:
- **4 Code Architecture Figures**: Semantic HTML5, Data Models, Reactive State Engine, and Deployment Config.
- **12 Output Application Figures**: Login, Dashboard, Members, Fee Management, Attendance Scanner, Add Member, Profile, Diet Plans, Workout Engine, Reports, and UPI QR Modal.

---

## 📂 Project Directory Structure

```tree
gym-membership-management-system/
├── index.html                   # Core single-page athletic application & semantic views
├── package.json                 # Project metadata and local development scripts
├── vercel.json                  # Vercel Edge configuration & routing headers
├── README.md                    # Project overview, quick links, architecture & structure
├── .gitignore                   # Git ignore specifications
│
├── .vscode/
│   └── launch.json              # VSCode debugging & local launch configuration
│
├── assets/                      # High-resolution media assets
│   ├── gym_arena_luxury.jpg     # Olympic arena high-resolution background
│   ├── gym_skydeck_luxury.jpg   # Luxury skydeck gym ambient visual
│   └── influencers/             # Tamil fitness influencers & master coach avatars
│       ├── biglee_murali.png    # Biglee Murali (Celebrity Fitness Master)
│       ├── dolphin.png          # Dolphin (Athletic Coach)
│       ├── kabilan.png          # Kabilan (Strength Specialist)
│       ├── saran.png            # Saran Fitness (Powerlifting & Hypertrophy Coach)
│       └── surabi.png           # Surabi (Fitness Athlete & Coach)
│
├── css/
│   └── styles.css               # Design system: obsidian dark theme, CSS grid & animations
│
├── js/
│   ├── app.js                   # Application state engine, DOM rendering, cart & checkout logic
│   └── data.js                  # Initial seed data: members, tiers, coaches, supplements
│
└── report/                      # Academic Project Report (OOASE Submission)
    ├── README.md                # Report documentation guide & table of contents
    ├── Fitness_Athlete_Club_OOASE_Project_Report.pdf # Complete 23-page compiled PDF report (~7.3 MB)
    ├── OOASE_PROJECT_REPORT.html # Interactive HTML report with 7 SVG UML diagrams
    ├── OOASE_PROJECT_REPORT.md   # Full GitHub Flavored Markdown report source
    ├── code_preview.html        # Code architecture preview showcase
    └── images/                  # High-resolution verification figures & screenshots
        ├── fig4_1_code_index.png          # Code: Semantic HTML5 Structure
        ├── fig4_2_code_data.png           # Code: Data Models & Default Store
        ├── fig4_3_code_app.png            # Code: Reactive State Engine
        ├── fig4_4_code_deploy.png         # Code: Cloud Edge Deployment Pipeline
        ├── fig5_1_login_screen.png        # Screen: Member Authentication
        ├── fig5_2_creator_modal.png       # Screen: Creator Secret Key Modal
        ├── fig5_3_master_dashboard.png    # Screen: Executive Master Dashboard
        ├── fig5_4_member_profile.png      # Screen: Member Profile & Body Metrics
        ├── fig5_5_terms_waiver.png        # Screen: Club Terms & Health Waiver
        ├── fig5_6_gym_members.png         # Screen: Gym Members Directory
        ├── fig5_7_trainers_coaches.png    # Screen: Tamil Celebrity Coaches
        ├── fig5_8_membership_plans.png    # Screen: Membership Plans in INR
        ├── fig5_9_plan_matrix.png         # Screen: Plan Comparison Matrix
        ├── fig5_10_supplement_store.png   # Screen: Pro Supplement Store
        ├── fig5_11_cart_drawer.png        # Screen: Real-Time Cart Drawer
        └── fig5_12_upi_checkout.png       # Screen: Live UPI QR Checkout
```

---

## ⚡ Key Highlights & Features

### 1. 👤 Customer / Member Profile & Fitness Dashboard
- **Profile Photo (DP) Upload**: Instant custom photo upload with live preview and remove option (`localStorage` persistence across sessions).
- **Fast Check-in QR Pass**: Touchless athletic QR code pass (`TG-MEMBER-001`, Gold Elite Tier) for instant reception scanning.
- **Personal & Contact Information**:
  - Full Name: `Md Yusuf`
  - Email: `yusuf@fitnessathlete.com`
  - Phone: `+91 98401 99887`
  - Date of Birth (DOB): `15-08-2001`
  - Emergency Contact: `+91 98400 55443 (Brother - Tariq)`
  - Residential Address: Anna Nagar, Tamil Nadu
- **Fitness & Body Metrics Upload / Update**:
  - Height: `178 cm`
  - Current Weight: `76.5 kg`
  - Target Weight: `82.0 kg`
  - Body Fat: `13.5%`
  - Primary Fitness Goal: Hypertrophy & Muscle Building (Bulking)
  - Experience Level & Assigned Master Coach (`Saran Fitness`)
- **Club Terms & Safety Waiver**: Interactive Gym Etiquette, Safety Rules, and Health Liability Waiver with agreement checkbox.
- **Direct Member Logout**: Single-click logout returning safely to the login screen.

---

### 2. 🔐 Creator & Owner Secret Key Access
- **Separated from Public Login**: General users only see Member Sign In & Sign Up. Admin portal is strictly hidden from standard public login cards.
- **Dedicated Creator Key Icon**:
  - Floating Golden Key icon button (`🔑`) at the bottom-left corner of the screen.
  - Topbar Golden `Creator Key` button.
  - Sidebar Golden Lock icon.
- **Creator Master Credentials**:
  - Email: `titan@gmail.com`
  - Passcode: `titan123`

---

### 3. 🏪 Real-Time Pro Supplement & Protein Store
- **Authentic Brand Catalog**: Optimum Nutrition (Gold Standard Whey), MuscleBlaze (Biozyme Performance), MyProtein (Impact Whey), Dymatize ISO 100, and Creatine Monohydrate.
- **Live Shopping Cart**: Floating cart counter, coupon code discounts (`TITAN20` for 20% off), interactive flavor & size pickers.
- **Real-Time Payment Simulation**:
  - Instant Google Pay (GPay) & PhonePe UPI QR scanner.
  - Cash on Delivery (COD) / Gym Reception counter pickup.
  - Credit/Debit Cards with automated printable tax invoice generation.

---

### 4. 🥇 Tamil Gym Members & Elite Coaches
- Featuring iconic Tamil athletes & coaches:
  - **Surabi** (Fitness Athlete & Coach)
  - **Dolphin** (Athletic Coach)
  - **Biglee Murali** (Celebrity Fitness Master)
  - **Saran Fitness** (Powerlifting & Hypertrophy Coach)
  - **Kabilan** (Strength Specialist)
  - **Md Yusuf** (Gold Elite Member)

---

### 5. 🏛️ Executive Club Operations & Terminal
- **Executive Dashboard**: Real-time KPI counters, revenue metrics, live floor attendance stream.
- **Barcode / ID Fast Check-in Desk**: Instant member lookup and daily attendance logs with CSV export.
- **Membership Tiers in INR**: Exact pricing in Indian Rupees (`₹300` Standard, `₹500` Pro, `₹800` Elite, `₹1,200` VIP) with 44% yearly savings.
- **Class Timetable**: Schedule for Olympic Weightlifting, High-Intensity Conditioning, and Turfs.

---

## 🎨 Design Philosophy
- **Aesthetic**: Premium Dark Mode with Obsidian Black (`#0B0B0E`), Slate Cards (`#18181E`), and Gym Red Accents (`#E50914`).
- **Typography**: Google Fonts `Inter` (high-readability UI text) and `Oswald` (bold condensed athletic titles).
- **Responsive**: Fully optimized for mobile phones, tablets, laptops, and ultra-wide displays.

---

## 💻 Tech Stack
- **Frontend**: Semantic HTML5, Vanilla JavaScript (ES6+), Modern Vanilla CSS3
- **Storage**: Browser LocalStorage with versioned auto-seeding
- **Hosting**: Vercel Edge Network
- **Version Control**: Git & GitHub

---

## 🏃 Local Development
```bash
# Clone the repository
git clone https://github.com/mohammedyusuf-a/gym-membership-management-system.git

# Navigate into directory
cd gym-membership-management-system

# Start local server
npx http-server . -p 8080 -c-1
```
Open `http://localhost:8080` in your web browser.

---

Developed for **TITAN IRON GYM - Gym Membership Management System** • Salem, Tamil Nadu, India.
