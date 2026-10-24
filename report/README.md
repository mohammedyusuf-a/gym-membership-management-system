# 📑 OOASE Academic Project Report & Documentation
### Object-Oriented Analysis & Software Engineering (OOASE) Report
**Project Name**: Gym Membership Management System (Titan Iron Gym)  
**Organization / Location**: Salem, Tamil Nadu, India  
**Live Application**: [https://gym-membership-management-system.vercel.app/](https://gym-membership-management-system.vercel.app/)  
**GitHub Repository**: [https://github.com/mohammedyusuf-a/gym-membership-management-system](https://github.com/mohammedyusuf-a/gym-membership-management-system)

---

## 📥 Direct Downloads & Links

| Document Format | Description | Quick Link |
|---|---|---|
| **📕 Official Compiled PDF** | Complete publication-ready 23-page academic report with all figures and tables | [Download PDF](https://raw.githubusercontent.com/mohammedyusuf-a/gym-membership-management-system/main/report/Fitness_Athlete_Club_OOASE_Project_Report.pdf) \| [View on GitHub](Fitness_Athlete_Club_OOASE_Project_Report.pdf) |
| **🌐 Interactive HTML Report** | High-fidelity interactive report with responsive CSS and embedded vector SVGs | [View HTML Report](OOASE_PROJECT_REPORT.html) |
| **📝 Markdown Report** | Complete GitHub Flavored Markdown report source | [View Markdown Report](OOASE_PROJECT_REPORT.md) |
| **🖼️ Report Figures & Screenshots** | 16 high-res figures (4 code architecture + 12 application output screens) | [Browse Images](images/) |

---

## 📊 Report Table of Contents

### 1. Introduction
- **1.1 Problem Statement**: Realities of manual gym record keeping, tracking renewals, and check-in bottlenecks in fitness centers.
- **1.2 Objectives & Goals**: Zero paper usage, automated fee renewals, real-time touchless QR check-in, transparent supplement store with UPI payments.
- **1.3 Project Scope & Stakeholders**: Member self-service, Master Coaches, Creator/Owner Executive operations.

### 2. System Requirements & Functional Specifications
- **2.1 Functional Requirements (FR-01 to FR-10)**:
  - FR-01: Public Authentication & Member Portal
  - FR-02: Hidden Creator Key Executive Gateway
  - FR-03: Member Profile & Persistent DP
  - FR-04: Touchless QR Member Pass
  - FR-05: Real-Time Supplement Store & Cart Drawer
  - FR-06: Simulated UPI QR & Cash/Card Payment Checkout
  - FR-07: Attendance Check-in Desk & Daily Floor Logs
  - FR-08: Membership Tier Subscriptions in INR (₹)
  - FR-09: Tamil Fitness Influencer Coach Profiles
  - FR-10: Persistent Local Storage State Engine
- **2.2 Non-Functional Requirements**: Performance (<1.2s load), Security, Reliability, Usability.

### 3. Object-Oriented Analysis & UML Modeling
Includes 7 vector diagrams rendered with clean SVG graphics:
1. **Use Case Diagram**: Actors (Member, Coach, Creator/Admin) and system use cases.
2. **Class Diagram**: Core domain model (`Member`, `Plan`, `Product`, `Order`, `AttendanceRecord`, `Coach`, `GymStore`).
3. **Sequence Diagram**: Member Fee Payment, UPI verification, and Membership Extension flow.
4. **Activity Diagram**: Member QR Scanning and Daily Floor Check-in workflow.
5. **State Machine Diagram**: Complete lifecycle of a Membership (Prospective → Active → Expiring Soon → Expired → Suspended).
6. **Component Diagram**: Architectural component decomposition (UI Layer, State Controller, Storage Adapter, Payment Simulation).
7. **Deployment Diagram**: Cloud edge infrastructure (Vercel Global CDN, HTTPS, Client Device browser environment).

### 4. System Implementation & Code Architecture
- Figure 4.1: Semantic HTML5 Structure (`index.html`)
- Figure 4.2: Data Models & Default Store Seed Data (`js/data.js`)
- Figure 4.3: Reactive State Engine & DOM Render Logic (`js/app.js`)
- Figure 4.4: Cloud Edge Deployment Pipeline (`vercel.json`)

### 5. Application Screens & Verification Outputs
- Figure 5.1: Member Authentication & Login Screen
- Figure 5.2: Creator Secret Golden Key Access Modal
- Figure 5.3: Executive Club Master Dashboard
- Figure 5.4: Member Profile, Emergency Info & Body Metrics
- Figure 5.5: Club Terms, Gym Etiquette & Health Waiver
- Figure 5.6: Gym Members Directory & Quick Filter Desk
- Figure 5.7: Tamil Celebrity Coaches & Personal Trainers
- Figure 5.8: Membership Plans in INR (`₹300` - `₹1,200`)
- Figure 5.9: Membership Plan Comparison Matrix
- Figure 5.10: Pro Supplement & Protein Store Catalog
- Figure 5.11: Real-time Slide-out Cart Drawer with Coupon Code
- Figure 5.12: Live UPI QR Code Checkout & Invoice Generation

### 6. Conclusion, Limitations & Academic References
- Summary of OOASE principles applied.
- Realistic academic limitations and prospective future roadmap.
- Formal academic citations and IEEE/ACM standard references.
