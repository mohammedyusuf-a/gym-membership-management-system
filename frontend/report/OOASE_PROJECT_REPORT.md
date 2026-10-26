# Gym Membership Management System (Titan Iron Gym)
## Object Oriented Analysis and Software Engineering (OOASE) – Project Report
*Salem, Tamil Nadu • Live Web Application Deployment*  
*Live Demo:* [https://fitness-athlete-club.vercel.app/](https://fitness-athlete-club.vercel.app/)  
*GitHub Repository:* [https://github.com/mohammedyusuf-a/gym-membership-management-system](https://github.com/mohammedyusuf-a/gym-membership-management-system)

---

## 1. Introduction

### 1.1 Overview
Fitness Athlete Club (operating as Titan Iron Gym) is an advanced, high-performance web-based athletic club and gymnasium management system specifically engineered for Olympic powerlifting facilities, strength academies, and commercial gymnasiums in Salem, Tamil Nadu. The system centralizes member registration, athletic progress tracking, fast touchless QR/barcode attendance scanning, personal coach assignments, Indian Rupee (INR ₹) tier billing, and a real-time e-commerce supplement store.

The software guarantees robust role-based security by strictly separating normal customer/member portals from the restricted Creator & Master Admin portal. While public users log in to their personalized Member Profile to upload profile pictures (DP), update body metrics (height, weight, body fat percentage), and accept club safety liability waivers, the website creator exercises full administrative control over member rosters, coach assignments, financial revenue reports, and facility operations through a discreet master key portal.

### 1.2 Problem Statement
Conventional athletic clubs and private gyms often rely on manual paper logbooks, isolated spreadsheets, and unmonitored counter transactions, leading to critical operational bottlenecks:
- **Unrestricted Entry & Expired Memberships:** Lack of real-time check-in validation allows expired or unauthorized members onto the training floor.
- **Scattered Athlete Data:** Personal contact info, health waivers, height/weight logs, and training goals are kept across loose paper forms.
- **Exposed Administrative Controls:** Traditional gym sites display master admin login inputs on the public login page, risking credential theft by regular visitors.
- **Absence of Digital Identity:** Members lack digital photo identification and touchless check-in passes.
- **Disconnected Nutrition Sales:** Protein powders and gym supplements are sold manually without inventory tracking, shopping cart calculation, or instant UPI payment verification.
- **Lack of Real-Time Reporting:** Attendance rates, expiring memberships, and daily collection figures require hours of manual calculation.

### 1.3 Objectives
- Centralize athletic member directories, certified coaches, membership tiers, and pro shop products in an integrated web platform.
- Provide a dedicated **Customer Profile & Fitness Dashboard** where athletes can upload profile pictures (DP) that stay permanently saved, log fitness body metrics, track workout streaks, and agree to club health waivers.
- Implement a **Restricted Creator Admin Master Key** accessed solely via discreet golden key triggers, completely shielded from standard member login pages.
- Enable real-time **Touchless Barcode / QR Code Check-in** with instantaneous access grant or expiry denial.
- Deliver an authentic **Pro Supplement Shop** with real-time cart drawer, coupon application, and Google Pay (GPay) / PhonePe UPI payment simulation.
- Model the complete system architecture using standard object-oriented UML diagrams.
- Deploy the production application globally with automated CI/CD on Vercel: `https://fitness-athlete-club.vercel.app/`.

### 1.4 Scope of the Project
- **Included:** Member registration and authentication, customer profile dashboard, permanent DP photo upload, fitness body metrics tracking, club safety and medical waiver acceptance, member directory with search and status filters, printable digital ID passes, 1-click renewal with automated invoice generation, certified trainer profiles (featuring leading Tamil fitness athletes such as Surabi, Dolphin, Biglee Murali, Saran Fitness, and Kabilan), pro shop with real-time cart, UPI QR code generation, CSV data export, and dark-mode athletic user interface.
- **Not included:** Native mobile app stores (built as a mobile-first progressive web responsive app), hardware biometric turnstiles, and bank credit card merchant accounts requiring physical POS swipe hardware.

### 1.5 Technologies Used
| Layer / Function | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | HTML5, Modern Vanilla CSS3 | Responsive single-page layout, athletic dark mode (Obsidian Black & Gym Red), Google Fonts (Inter & Oswald). |
| **Logic & Router** | Vanilla JavaScript (ES6+) | Single Page Application (SPA) view router, form validation, modal controls, real-time clock, and DOM controller. |
| **State & Storage** | HTML5 LocalStorage Engine (GymStore) | Persistent client-side data store with versioned schema seeding, instant CRUD operations, and permanent DP image persistence. |
| **Security & Auth** | Role-Based Access Control (RBAC) | Separation of Customer/Member sessions from Creator Master Key access; discreet master modal unlock. |
| **File Reader** | HTML5 FileReader API | Client-side binary-to-Base64 image encoding with 3MB file limits for permanent DP uploads. |
| **E-Commerce & UPI** | JavaScript Cart & QRServer API | Dynamic price calculation, cart drawer, discount coupon parsing, and dynamic UPI QR code rendering for GPay / PhonePe. |
| **Version Control** | Git, GitHub | Source code repository, branch tracking, and commit history (`mohammedyusuf-a/gym-membership-management-system`). |
| **Hosting & CI/CD** | Vercel Edge Platform | High-speed global CDN deployment with automated push-to-deploy pipeline. |
| **OOASE Modeling** | UML (Unified Modeling Language) | Visual software architecture models: Use Case, Class, Sequence, Activity, State Chart, Component, and Deployment. |

---

## 2. Requirement Analysis

### 2.1 User Roles
- **Website Creator & Master Admin:** Sole system owner possessing absolute administrative control. Accesses the facility via discreet master key (`titan@gmail.com` / `titan123`); manages member accounts, registers new coaches, edits membership fees, inspects billing ledgers, exports CSV rosters, and resets demo datasets.
- **Gym Member / Athlete:** Registered club subscriber (e.g. Md Yusuf). Signs in to Member Portal; uploads and updates permanent profile picture (DP); manages fitness metrics (height, weight, body fat); views fast check-in QR pass; agrees to club terms & waivers; shops for protein powders; logs out.
- **Certified Trainer / Coach:** Athletic trainers (e.g. Saran, Biglee, Kabilan). Supervises assigned client athletes, reviews specialized training targets, and guides fitness objectives.
- **Guest Athlete:** Prospective athlete or non-registered visitor. Explores club training facilities, reviews membership tier pricing, browses authentic supplement inventory, and registers a new account.

### 2.2 Functional Requirements
| ID | Requirement Description | Module |
| :--- | :--- | :--- |
| **FR-01** | Allow member sign-in and new account registration with input validation. | Authentication |
| **FR-02** | Provide a clean public login page without exposing administrative portal credentials. | Security |
| **FR-03** | Provide dedicated, discreet Creator Admin master key triggers leading to restricted PIN authorization. | Admin Portal |
| **FR-04** | Provide a dedicated Member Profile Dashboard for logged-in athletes. | Member Portal |
| **FR-05** | Allow members to upload a profile picture (DP) using FileReader Base64, persisting it permanently across reloads and sessions. | Profile & Media |
| **FR-06** | Allow members to update personal details (Full Name, Email, Phone, DOB, Emergency Contact, Address). | Profile Management |
| **FR-07** | Allow members to upload and track athletic body metrics (Height, Weight, Target Weight, Body Fat %, Goal, Coach). | Fitness Metrics |
| **FR-08** | Present an interactive Club Terms, Gym Safety Rules & Medical Waiver scroll box with agreement checkbox. | Legal & Compliance |
| **FR-09** | Display a touchless Digital Fast Check-in QR pass on the member profile card. | Check-in / Identity |
| **FR-10** | Provide single-click member logout returning cleanly to the public login gateway. | Session Control |
| **FR-11** | Display executive dashboard KPIs (Active Members, Today's Check-ins, Expiring Members, Monthly Revenue). | Executive Dashboard |
| **FR-12** | Provide a header-mounted barcode/ID scanner for instant 1-click check-in and checkout. | Attendance |
| **FR-13** | Maintain searchable members directory with plan and status filters. | Members Directory |
| **FR-14** | Display printable Digital Athletic ID cards with photo, barcode, and emergency contact. | Digital ID Badge |
| **FR-15** | Enable 1-click membership renewal with automated invoice and receipt generation. | Billing & Renewal |
| **FR-16** | Support real-time Pro Supplement Shop with category filtering and interactive quick-view modal. | Pro Shop |
| **FR-17** | Maintain a persistent real-time shopping cart with discount coupon support (`TITAN20`). | Shopping Cart |
| **FR-18** | Render dynamic UPI QR codes for instant Google Pay (GPay) and PhonePe checkout. | Payments |
| **FR-19** | Allow administrators to export member rosters and attendance records as CSV files. | Reports & Export |
| **FR-20** | Support light/dark athletic UI theme switching with real-time digital clock display. | System / UX |

---

## 3. UML Diagrams

### 3.1 Overview
The Unified Modeling Language (UML) provides standard structural, behavioral, and architectural diagrams to specify software systems.

- **Figure 3.1: Use Case Diagram:** Defines relationships between Creator Admin, Gym Member, and Guest Actors within the system boundary.
- **Figure 3.2: Class Diagram:** Details class hierarchies (`User` parent class, `Member` and `CreatorAdmin` subclasses), attributes, methods, and multiplicities.
- **Figure 3.3: Sequence Diagram:** Traces permanent Base64 profile photo upload, localStorage key synchronization, and multi-component UI rendering.
- **Figure 3.4: Activity Diagram:** Models operational branching between Creator Master Key authorization and Member Profile onboarding.
- **Figure 3.5: State Chart Diagram:** Illustrates membership state transitions (`Active` -> `Expiring Soon` -> `Expired`) and entry terminal validation states (`Access Granted` vs `Access Denied`).
- **Figure 3.6: Component Diagram:** Represents the decoupled Single-Page Presentation UI, Router Controller, and GymStore Data Engine.
- **Figure 3.7: Deployment Diagram:** Shows the client browser execution environment communicating over secure HTTPS (Port 443) with the Vercel Edge Serverless Cloud.

*(Full vector visual diagrams are embedded in `report/OOASE_PROJECT_REPORT.html`)*

---

## 4. Project Coding and Architecture

### 4.1 Architecture Overview
The system follows a three-tier decoupled client-side Single-Page Application (SPA) architecture:
1. **Presentation Tier (`index.html`, `css/styles.css`):** Semantic, high-contrast dark athletic UI with Gym Red accents (`#E50914`).
2. **Logic & Controller Tier (`js/app.js`):** Client-side view routing, modal dialog lifecycles, real-time cart manipulation, and FileReader Base64 image encoding.
3. **Data Tier (`js/data.js`):** `GymStore` engine managing local persistence, seed mock dataset, and dedicated profile DP storage keys.

### 4.2 Code and Configuration Figures
- **Figure 4.1:** Application Entry Point & View Router Architecture (`index.html`) — *`report/images/fig4_1_code_index.png`*
- **Figure 4.2:** GymStore State Engine & Permanent DP Persistence (`js/data.js`) — *`report/images/fig4_2_code_data.png`*
- **Figure 4.3:** Application Controller & Image FileReader Pipeline (`js/app.js`) — *`report/images/fig4_3_code_app.png`*
- **Figure 4.4:** Deployment Configuration & Clean URL Routing (`vercel.json`) — *`report/images/fig4_4_code_deploy.png`*

---

## 5. Website Output Screenshots

The following high-resolution screenshots document the live production system deployed at `https://fitness-athlete-club.vercel.app/`:

- **Figure 5.1:** Clean Public Member Login Gateway (`report/images/fig5_1_login_screen.png`)
- **Figure 5.2:** Restricted Creator & Owner Admin Portal Modal (`report/images/fig5_2_creator_modal.png`)
- **Figure 5.3:** Executive Master Dashboard & Salem Luxury Facility Showcase (`report/images/fig5_3_master_dashboard.png`)
- **Figure 5.4:** Customer Profile & Fitness Dashboard with Permanent Photo (`report/images/fig5_4_member_profile.png`)
- **Figure 5.5:** Club Terms, Safety Rules & Medical Liability Waiver (`report/images/fig5_5_terms_waiver.png`)
- **Figure 5.6:** Gym Members Directory & Tamil Fitness Athletes Roster (`report/images/fig5_6_gym_members.png`)
- **Figure 5.7:** Certified Trainers & Elite Coaches Showcase (`report/images/fig5_7_trainers_coaches.png`)
- **Figure 5.8:** Membership Subscription Tiers in Indian Rupees (`report/images/fig5_8_membership_plans.png`)
- **Figure 5.9:** Membership Tier Feature Comparison Matrix (`report/images/fig5_9_plan_matrix.png`)
- **Figure 5.10:** Pro Supplement & Protein Store Catalog (`report/images/fig5_10_supplement_store.png`)
- **Figure 5.11:** Real-Time Sliding Shopping Cart Drawer (`report/images/fig5_11_cart_drawer.png`)
- **Figure 5.12:** Real-Time Google Pay (GPay) & PhonePe UPI Payment Modal (`report/images/fig5_12_upi_checkout.png`)

---

## 6. Conclusion, Limitations and References

### 6.1 Conclusion
The Fitness Athlete Club project proves that Object-Oriented Analysis and Software Engineering (OOASE) standards can be effectively applied to develop a modern, production-grade gym management and athletic training system. The architectural isolation of public member portals from restricted creator access, paired with permanent profile picture persistence, touchless QR attendance verification, and real-time UPI e-commerce, establishes a comprehensive digital operating system for Salem's premier athletic club.

### 6.2 References
1. Booch, G., Rumbaugh, J., and Jacobson, I., *The Unified Modeling Language User Guide*, Addison-Wesley.
2. Sommerville, I., *Software Engineering*, Pearson Education.
3. Pressman, R. S., *Software Engineering: A Practitioner's Approach*, McGraw-Hill.
4. MDN Web Docs, *HTML5 Web Storage API & FileReader API Documentation*.
5. Vercel Platform Documentation, *Static Sites and Clean Rewrites*.
