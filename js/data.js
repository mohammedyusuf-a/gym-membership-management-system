/**
 * TITAN IRON GYM - DATA LAYER & LOCALSTORAGE STORE (VERSION 6)
 * - 100% Tamil Gym Fitness Influencers & Creators (Surabi, Dolphin, Biglee Murali, Saran, Kabilan, Danell, etc.)
 * - 100% Tamil Nadu Certified Coaches & Masters
 * - Real Market Protein Powders (Optimum Nutrition, MuscleBlaze, Dymatize, Ultimate Nutrition, Avvatar, As-It-Is, MyProtein)
 * - Full E-Commerce Real-Time Shopping Cart & Multi-Payment Checkout
 * - Built-in Fail-Safe Image Fallback System
 */

// Image Fallback Handler so no image ever looks broken or invisible
window.handleImgError = function(img, type = 'avatar', label = 'TG') {
  if (!img) return;
  img.onerror = null; // Prevent loop
  const cleanLabel = (label || 'TG').replace(/[^\w\s]/gi, '').trim();
  const initials = cleanLabel.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'TG';
  
  if (type === 'avatar') {
    img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23121217"/><circle cx="100" cy="100" r="72" fill="%231c1c24" stroke="%23e50914" stroke-width="4"/><text x="100" y="112" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="44" font-weight="900" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text><text x="100" y="150" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="11" font-weight="700" fill="%23e50914" text-anchor="middle" letter-spacing="1">TAMIL FITNESS</text></svg>`;
  } else if (type === 'product') {
    img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23111116"/><rect x="130" y="60" width="140" height="190" rx="16" fill="%231a1a23" stroke="%23e50914" stroke-width="3"/><rect x="155" y="38" width="90" height="28" rx="6" fill="%23e50914"/><text x="200" y="145" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="16" font-weight="800" fill="%23ffffff" text-anchor="middle">${initials} PROTEIN</text><text x="200" y="170" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="11" font-weight="600" fill="%23e50914" text-anchor="middle">100% GENUINE LABDOOR</text><text x="200" y="195" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="10" fill="%2371717a" text-anchor="middle">AUTHENTIC SUPPLEMENT</text></svg>`;
  } else {
    img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350"><rect width="600" height="350" fill="%23121217"/><rect x="20" y="20" width="560" height="310" rx="8" fill="%23181820" stroke="%23272732" stroke-width="2"/><text x="300" y="170" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="24" font-weight="900" fill="%23e50914" text-anchor="middle">FITNESS ATHLETE CLUB</text><text x="300" y="205" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="14" fill="%23a1a1aa" text-anchor="middle">Elite Athletic Training Arena</text></svg>`;
  }
};

const STORAGE_KEYS = {
  MEMBERS: 'iron_gym_members_v8',
  PLANS: 'iron_gym_plans_v8',
  TRAINERS: 'iron_gym_trainers_v8',
  ATTENDANCE: 'iron_gym_attendance_v8',
  INVOICES: 'iron_gym_invoices_v8',
  CLASSES: 'iron_gym_classes_v8',
  PRODUCTS: 'iron_gym_products_v8',
  SETTINGS: 'iron_gym_settings_v8',
  AUTH: 'iron_gym_auth_v9',
  CART: 'iron_gym_cart_v8',
  USERS: 'iron_gym_users_v9'
};

// Exact pricing requested by user in INR (₹)
const DEFAULT_PLANS = [
  {
    id: 'PLAN-STD',
    name: 'Standard Fitness',
    monthlyPrice: 300,
    yearlyPrice: 2000,
    tag: 'Popular for Beginners',
    features: [
      'Access to main gym floor & cardio deck',
      'Standard locker room & shower access',
      'Free RO water & hydration station',
      'General fitness orientation'
    ],
    activeMembers: 0
  },
  {
    id: 'PLAN-PRO',
    name: 'Pro Strength & Conditioning',
    monthlyPrice: 500,
    yearlyPrice: 6000,
    tag: 'Most Chosen in Chennai',
    features: [
      'All Standard Fitness privileges',
      'Olympic weightlifting & power racks',
      'Access to CrossFit functional turf',
      'Steam & recovery bath access',
      'Monthly body fat & weight assessment'
    ],
    activeMembers: 0
  },
  {
    id: 'PLAN-ELITE',
    name: 'Elite Athlete Plan',
    monthlyPrice: 700,
    yearlyPrice: 8999,
    tag: 'High Performance',
    features: [
      'All Pro Strength privileges',
      'Unlimited group fitness & combat classes',
      'Priority locker with personal towel service',
      'Custom macro & diet consultation',
      '2 Guest workout passes per month'
    ],
    activeMembers: 0
  },
  {
    id: 'PLAN-VIP',
    name: 'VIP Personal Coaching',
    monthlyPrice: 1000,
    yearlyPrice: 11999,
    tag: 'Celebrity & Influencer Tier',
    features: [
      'All Elite Athlete privileges',
      '1-on-1 Dedicated certified personal trainer',
      'Customized hypertrophy & shredding diet plan',
      'Private VIP lounge & recovery zone',
      'Priority scheduling & complimentary gym kit'
    ],
    activeMembers: 0
  }
];

// 100% Certified Tamil Coaches, Masters & Influencer Trainers
const DEFAULT_TRAINERS = [
  {
    id: 'TR-101',
    name: 'Surabi Trainer',
    title: 'Celebrity Tamil Women Coach & Reels Sensation',
    specialty: 'Women Hypertrophy, Glute Mechanics & Tamil Calorie Diets',
    experience: '8+ Years (480K+ Instagram)',
    phone: '+91 98402 11990',
    email: 'surabi.trainer@titangym.in',
    location: 'Anna Nagar / Coimbatore, Tamil Nadu',
    avatar: 'assets/influencers/surabi.png',
    activeClients: 19,
    status: 'Active',
    instagram: '@surabi_trainer'
  },
  {
    id: 'TR-102',
    name: 'Dolphin Rathinam',
    title: 'Founder Dolphin Gym & Tamil Hardcore Bodybuilding Icon',
    specialty: 'Heavy Compound Overload, Stage Prep & Mr. Tamil Nadu Coaching',
    experience: '22+ Years (Dolphin Fitness)',
    phone: '+91 98401 99221',
    email: 'dolphin.fitness@titangym.in',
    location: 'Royapettah, Chennai, Tamil Nadu',
    avatar: 'assets/influencers/dolphin.png',
    activeClients: 24,
    status: 'Active',
    instagram: '@dolphin_fitness_tamil'
  },
  {
    id: 'TR-103',
    name: 'Kabilan Bodybuilder',
    title: 'Mr. South India Champion & Chennai Hypertrophy Coach',
    specialty: 'Heavy Dumbbell Bench, Trap & Delt Sculpting, Contest Conditioning',
    experience: '12 Years (Mr. South India)',
    phone: '+91 98403 44552',
    email: 'kabilan.coach@titangym.in',
    location: 'T. Nagar, Chennai, Tamil Nadu',
    avatar: 'assets/influencers/kabilan.png',
    activeClients: 16,
    status: 'Active',
    instagram: '@kabilan_fitness_official'
  },
  {
    id: 'TR-104',
    name: 'Biglee Murali',
    title: 'Former Mr. Tamil Nadu & Biomechanics Master Coach',
    specialty: 'Scientific Hypertrophy, Powerlifting & Natural Bodybuilding',
    experience: '18+ Years (Former Mr. Tamil Nadu)',
    phone: '+91 98401 55678',
    email: 'biglee.murali@titangym.in',
    location: 'Anna Nagar, Chennai, Tamil Nadu',
    avatar: 'assets/influencers/biglee_murali.png',
    activeClients: 18,
    status: 'Active',
    instagram: '@bigleemurali'
  },
  {
    id: 'TR-105',
    name: 'Saran Fitness',
    title: 'Elite Tamil Transformation Coach & Reels Creator',
    specialty: 'High-Velocity Fat Shredding, Fast Metabolism & Calisthenics',
    experience: '9+ Years (720K+ Instagram)',
    phone: '+91 98841 88992',
    email: 'saran.fit@titangym.in',
    location: 'Velachery, Chennai, Tamil Nadu',
    avatar: 'assets/influencers/saran.png',
    activeClients: 17,
    status: 'Active',
    instagram: '@saranfitness_tamil'
  },
  {
    id: 'TR-106',
    name: 'Rakesh "Rock" Selvam',
    title: 'CrossFit & Combat Strength Head Coach',
    specialty: 'High-Velocity HIIT, Olympic Racks & Striking Conditioning',
    experience: '11 Years (Chennai Combat)',
    phone: '+91 94441 77665',
    email: 'rakesh.rock@titangym.in',
    location: 'T. Nagar, Chennai, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    activeClients: 14,
    status: 'Active',
    instagram: '@rakesh_rock_fitness'
  },
  {
    id: 'TR-107',
    name: 'Master K. Arumugam',
    title: 'Traditional Tamil Karlakattai & Malyutham Master',
    specialty: 'Tamil Karlakattai (Clubbells), Brass Gada & Akhada Kushti',
    experience: '24 Years (Madurai Akhada)',
    phone: '+91 94420 88123',
    email: 'arumugam.karlakattai@titangym.in',
    location: 'Madurai / Chennai, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    activeClients: 13,
    status: 'Active',
    instagram: '@arumugam_karlakattai_tn'
  },
  {
    id: 'TR-108',
    name: 'Dr. Swetha Devaraj',
    title: 'CrossFit Level 2 & Athletic Performance Director',
    specialty: 'Olympic Snatch, Clean & Jerk, Cardiovascular Endurance & Recovery',
    experience: '10 Years (CrossFit Certified)',
    phone: '+91 98409 33221',
    email: 'swetha.d@titangym.in',
    location: 'Adyar, Chennai, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
    activeClients: 15,
    status: 'Active',
    instagram: '@swethadevaraj'
  }
];

function getDateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// 100% Authentic Tamil Gym Fitness Influencers (Surabi, Dolphin, Biglee, Saran, Kabilan, Danell, Shiva, etc.)
const DEFAULT_MEMBERS = [
  {
    id: 'GYM-1000',
    fullName: 'Md Yusuf',
    instagram: '@md_yusuf_fitness',
    email: 'yusuf@fitnessathlete.com',
    phone: '+91 98401 99887',
    gender: 'Male',
    location: 'Anna Nagar West, Chennai',
    dob: '2001-08-15',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-101',
    joinDate: getDateOffset(-60),
    expiryDate: getDateOffset(305),
    status: 'Active',
    emergencyContact: '+91 98400 55443 (Brother - Tariq)',
    notes: 'Elite club athlete. Height: 178cm, Weight: 76.5kg. Focus: Hypertrophy & Olympic Powerlifting.',
    avatar: 'assets/influencers/saran.png',
    dpImage: ''
  },
  {
    id: 'GYM-1001',
    fullName: 'Surabi (Surabhi Trainer)',
    instagram: '@surabi_trainer',
    email: 'surabi.fit@tamilcreators.in',
    phone: '+91 98402 11990',
    gender: 'Female',
    location: 'Anna Nagar, Chennai / Coimbatore',
    dob: '1995-03-24',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-101',
    joinDate: getDateOffset(-120),
    expiryDate: getDateOffset(245),
    status: 'Active',
    emergencyContact: 'Trainer Management - +91 98402 11991',
    notes: 'Tamil Nadu female fitness icon & reels educator. 480K+ followers. Barbell hip thrust (180kg) and women transformation workshops.',
    avatar: 'assets/influencers/surabi.png'
  },
  {
    id: 'GYM-1002',
    fullName: 'Dolphin Rathinam (Dolphin Gym)',
    instagram: '@dolphin_fitness_tamil',
    email: 'dolphin.chennai@dolphingym.in',
    phone: '+91 98401 99221',
    gender: 'Male',
    location: 'Royapettah, Chennai, Tamil Nadu',
    dob: '1982-10-14',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-102',
    joinDate: getDateOffset(-180),
    expiryDate: getDateOffset(185),
    status: 'Active',
    emergencyContact: 'Dolphin Admin Desk - +91 98401 99222',
    notes: 'Legendary Dolphin Gym founder & hardcore Tamil bodybuilding motivator. 620K+ followers on Instagram. Mentored 40+ Mr. Tamil Nadu medalists.',
    avatar: 'assets/influencers/dolphin.png'
  },
  {
    id: 'GYM-1003',
    fullName: 'Kabilan Bodybuilder',
    instagram: '@kabilan_fitness_official',
    email: 'kabilan.fit@chennaipump.in',
    phone: '+91 98403 44552',
    gender: 'Male',
    location: 'T. Nagar, Chennai, Tamil Nadu',
    dob: '1993-08-22',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-103',
    joinDate: getDateOffset(-140),
    expiryDate: getDateOffset(225),
    status: 'Active',
    emergencyContact: 'Venkatesh Kabilan - +91 98403 44553',
    notes: 'Mr. South India Champion & Chennai hypertrophy influencer with 390K+ followers. Massive chest press and contest conditioning specialist.',
    avatar: 'assets/influencers/kabilan.png'
  },
  {
    id: 'GYM-1004',
    fullName: 'Biglee Murali',
    instagram: '@bigleemurali',
    email: 'murali.biglee@biomechanics.in',
    phone: '+91 98401 55678',
    gender: 'Male',
    location: 'Anna Nagar, Chennai, Tamil Nadu',
    dob: '1984-06-18',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-104',
    joinDate: getDateOffset(-150),
    expiryDate: getDateOffset(215),
    status: 'Active',
    emergencyContact: 'Deepa Murali (Wife) - +91 98401 55679',
    notes: 'Former Mr. Tamil Nadu, celebrity trainer & fitness author. 550K+ followers on Instagram & YouTube. Science-based hypertrophy pioneer.',
    avatar: 'assets/influencers/biglee_murali.png'
  },
  {
    id: 'GYM-1005',
    fullName: 'Saran (Saran Fitness Tamil)',
    instagram: '@saranfitness_tamil',
    email: 'saran.transform@tamilfit.in',
    phone: '+91 98841 88992',
    gender: 'Male',
    location: 'Velachery, Chennai, Tamil Nadu',
    dob: '1996-08-11',
    planId: 'PLAN-PRO',
    durationCycle: 'monthly',
    trainerId: 'TR-105',
    joinDate: getDateOffset(-28),
    expiryDate: getDateOffset(2),
    status: 'Expiring Soon',
    emergencyContact: 'Saravanan S (Brother) - +91 98841 88993',
    notes: 'Tamil fitness reels sensation with 720K+ followers. Viral for explaining calorie deficits and high-energy natural transformations in colloquial Tamil.',
    avatar: 'assets/influencers/saran.png'
  },
  {
    id: 'GYM-1006',
    fullName: 'Danell Raj',
    instagram: '@danell_fitness_chennai',
    email: 'danell.power@velacherygym.in',
    phone: '+91 98842 66774',
    gender: 'Male',
    location: 'Velachery, Chennai, Tamil Nadu',
    dob: '1994-02-14',
    planId: 'PLAN-PRO',
    durationCycle: 'yearly',
    trainerId: 'TR-105',
    joinDate: getDateOffset(-80),
    expiryDate: getDateOffset(285),
    status: 'Active',
    emergencyContact: 'Clara Danell - +91 98842 66775',
    notes: 'Chennai powerlifting icon & heavy squat specialist with 240K+ followers. 250kg raw squat record and Tamil powerlifting community builder.',
    avatar: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1007',
    fullName: 'Shiva (Shiva Fitness Tamil)',
    instagram: '@shivafitnesstamil',
    email: 'shiva.tamilfit@maduraigym.in',
    phone: '+91 97911 44550',
    gender: 'Male',
    location: 'Madurai / Chennai, Tamil Nadu',
    dob: '1995-12-04',
    planId: 'PLAN-PRO',
    durationCycle: 'monthly',
    trainerId: 'TR-104',
    joinDate: getDateOffset(-20),
    expiryDate: getDateOffset(10),
    status: 'Active',
    emergencyContact: 'Gopal Shiva (Father) - +91 97911 44551',
    notes: 'Major Tamil fitness YouTuber & Instagram creator with 610K+ followers. Expert in low-cost Tamil gym diets, raw eggs/soya nutrition and home workouts.',
    avatar: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1008',
    fullName: 'Dr. Swetha Devaraj',
    instagram: '@swethadevaraj',
    email: 'swetha.d@crossfitchennai.in',
    phone: '+91 98409 33221',
    gender: 'Female',
    location: 'Adyar, Chennai, Tamil Nadu',
    dob: '1992-07-16',
    planId: 'PLAN-ELITE',
    durationCycle: 'yearly',
    trainerId: 'TR-108',
    joinDate: getDateOffset(-100),
    expiryDate: getDateOffset(265),
    status: 'Active',
    emergencyContact: 'Devaraj V - +91 98409 33222',
    notes: 'CrossFit Level 2 athlete, vascular surgeon & Tamil fitness role model with 320K+ followers. Marathon runner and women barbell strength mentor.',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1009',
    fullName: 'Ramya Subramanian (VJ Ramya)',
    instagram: '@ramyasub',
    email: 'ramya.sub@fitnessmedia.in',
    phone: '+91 98402 99881',
    gender: 'Female',
    location: 'Nungambakkam, Chennai, Tamil Nadu',
    dob: '1986-07-30',
    planId: 'PLAN-ELITE',
    durationCycle: 'monthly',
    trainerId: 'TR-101',
    joinDate: getDateOffset(-25),
    expiryDate: getDateOffset(5),
    status: 'Expiring Soon',
    emergencyContact: 'Subramanian R - +91 98402 99882',
    notes: 'Tamil media icon, author of Stop Weighting & State Senior Powerlifting Medalist with 1.1M+ followers. 150kg deadlift competitor.',
    avatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1010',
    fullName: 'Coach Arun Prasath',
    instagram: '@coacharunprasath',
    email: 'arun.prasath@tnfatloss.in',
    phone: '+91 98404 33112',
    gender: 'Male',
    location: 'Coimbatore / Chennai, Tamil Nadu',
    dob: '1993-05-15',
    planId: 'PLAN-PRO',
    durationCycle: 'yearly',
    trainerId: 'TR-104',
    joinDate: getDateOffset(-70),
    expiryDate: getDateOffset(295),
    status: 'Active',
    emergencyContact: 'Prasath M - +91 98404 33113',
    notes: 'Metabolic conditioning & fat-loss coach with 310K+ followers. Renowned for fixing posture, desk-worker stiffness and insulin resistance in Tamil.',
    avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1011',
    fullName: 'Deepak Raj',
    instagram: '@deepak_fitness_chennai',
    email: 'deepak.raj@chennaifit.in',
    phone: '+91 98401 22881',
    gender: 'Male',
    location: 'Anna Nagar, Chennai, Tamil Nadu',
    dob: '1995-04-18',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-103',
    joinDate: getDateOffset(-120),
    expiryDate: getDateOffset(245),
    status: 'Active',
    emergencyContact: 'Rajendran (Father) - +91 98401 22882',
    notes: 'Chennai coach & progressive overload advocate with 210K+ followers. 220kg deadlift specialist and hypertrophy mentor.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1012',
    fullName: 'Kavitha Manikandan',
    instagram: '@kavitha_ironwoman_tn',
    email: 'kavitha.power@tnstrength.in',
    phone: '+91 97911 22334',
    gender: 'Female',
    location: 'Mylapore, Chennai, Tamil Nadu',
    dob: '1993-05-19',
    planId: 'PLAN-ELITE',
    durationCycle: 'yearly',
    trainerId: 'TR-101',
    joinDate: getDateOffset(-110),
    expiryDate: getDateOffset(255),
    status: 'Active',
    emergencyContact: 'Manikandan R - +91 97911 22335',
    notes: 'Tamil Nadu Senior State Women Powerlifting Gold Medalist with 150K+ followers. 195kg Deadlift record holder and barbell mentor.',
    avatar: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1013',
    fullName: 'Vignesh "FitVicky"',
    instagram: '@fitvicky_tamil',
    email: 'vignesh.fit@velachery.in',
    phone: '+91 98840 99112',
    gender: 'Male',
    location: 'Velachery, Chennai, Tamil Nadu',
    dob: '1997-01-22',
    planId: 'PLAN-STD',
    durationCycle: 'monthly',
    trainerId: 'TR-104',
    joinDate: getDateOffset(-35),
    expiryDate: getDateOffset(-5),
    status: 'Expired',
    emergencyContact: 'Subramanian S - +91 98840 99113',
    notes: 'Athletic HIIT, jump rope athlete & transformation reels creator with 230K+ followers. Lapsed 5 days ago, renewal link generated.',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1014',
    fullName: 'Abishek "Beast" Kumar',
    instagram: '@abishek_beastfit',
    email: 'abishek.beast@chennaicali.in',
    phone: '+91 98402 88192',
    gender: 'Male',
    location: 'Kilpauk, Chennai, Tamil Nadu',
    dob: '1996-03-14',
    planId: 'PLAN-PRO',
    durationCycle: 'yearly',
    trainerId: 'TR-105',
    joinDate: getDateOffset(-60),
    expiryDate: getDateOffset(305),
    status: 'Active',
    emergencyContact: 'Kishore Kumar - +91 98402 88193',
    notes: 'Chennai Calisthenics champion with 175K+ followers. Front lever, maltese on gymnastics rings and weighted dips master.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1015',
    fullName: 'Manikandan (Mr. TN)',
    instagram: '@mani_mrtn_official',
    email: 'mani.bodybuilder@chennaifit.in',
    phone: '+91 97910 88221',
    gender: 'Male',
    location: 'Tambaram, Chennai, Tamil Nadu',
    dob: '1995-06-14',
    planId: 'PLAN-PRO',
    durationCycle: 'monthly',
    trainerId: 'TR-107',
    joinDate: getDateOffset(-20),
    expiryDate: getDateOffset(10),
    status: 'Active',
    emergencyContact: 'Kavitha Mani (Sister) - +91 97910 88222',
    notes: 'Tamil Nadu Men’s Physique Gold Medalist with 210K+ followers. Renowned for razor-sharp waist conditioning and V-taper stage presence.',
    avatar: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1016',
    fullName: 'Master K. Arumugam',
    instagram: '@arumugam_karlakattai_tn',
    email: 'arumugam.madurai@titangym.in',
    phone: '+91 94420 88123',
    gender: 'Male',
    location: 'Madurai / Chennai, Tamil Nadu',
    dob: '1976-02-12',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-106',
    joinDate: getDateOffset(-200),
    expiryDate: getDateOffset(165),
    status: 'Active',
    emergencyContact: 'Maruthu Arumugam - +91 94420 88124',
    notes: 'Preserver of traditional Tamil Karlakattai (Indian clubbells) with 180K+ followers. Gada mace swings and ancient Indian wrestling conditioning.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1017',
    fullName: 'Divya Ganesh',
    instagram: '@divya_strength_coach',
    email: 'divya.g@thiruvanmiyurfit.in',
    phone: '+91 98405 77662',
    gender: 'Female',
    location: 'Thiruvanmiyur, Chennai, Tamil Nadu',
    dob: '1994-06-19',
    planId: 'PLAN-PRO',
    durationCycle: 'yearly',
    trainerId: 'TR-101',
    joinDate: getDateOffset(-45),
    expiryDate: getDateOffset(320),
    status: 'Active',
    emergencyContact: 'Ganesh Nathan - +91 98405 77663',
    notes: 'Women functional strength & posture coach with 140K+ followers. Heavy barbell squats, PCOS strength routines and kettlebell conditioning in Tamil.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1018',
    fullName: 'Aravind Swaminathan',
    instagram: '@aravind_calisthenics_chn',
    email: 'aravind.cali@marinabeach.in',
    phone: '+91 98406 22114',
    gender: 'Male',
    location: 'Marina Beach / Triplicane, Chennai',
    dob: '1995-12-08',
    planId: 'PLAN-PRO',
    durationCycle: 'monthly',
    trainerId: 'TR-105',
    joinDate: getDateOffset(-20),
    expiryDate: getDateOffset(10),
    status: 'Active',
    emergencyContact: 'Swaminathan S - +91 98406 22115',
    notes: 'Marina Beach Calisthenics community leader with 120K+ followers. 360 bar spins, strict muscle-ups and weekend community training.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1019',
    fullName: 'Suriya Sivakumar',
    instagram: '@actorsuriya',
    email: 'suriya.fitness@2d.in',
    phone: '+91 98410 77881',
    gender: 'Male',
    location: 'T. Nagar, Chennai, Tamil Nadu',
    dob: '1975-07-23',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-103',
    joinDate: getDateOffset(-180),
    expiryDate: getDateOffset(185),
    status: 'Active',
    emergencyContact: 'Jyothika Suriya (Wife) - +91 98410 77882',
    notes: 'Kollywood cinema fitness pioneer who introduced the first six-pack physique in Tamil cinema. Functional athletic circuits and clean Tamil diets.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'GYM-1020',
    fullName: 'Arya (Jamshad)',
    instagram: '@aryaoffl',
    email: 'arya.triathlete@theshow.in',
    phone: '+91 98402 11223',
    gender: 'Male',
    location: 'Anna Nagar, Chennai, Tamil Nadu',
    dob: '1980-12-11',
    planId: 'PLAN-VIP',
    durationCycle: 'yearly',
    trainerId: 'TR-105',
    joinDate: getDateOffset(-90),
    expiryDate: getDateOffset(275),
    status: 'Active',
    emergencyContact: 'Sayyeshaa Arya (Wife) - +91 98402 11224',
    notes: 'Tamil cinema triathlete, London-Edinburgh century cyclist & boxing champion (Sarpatta Parambarai). Heavy squats and endurance powerhouse.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];

const DEFAULT_ATTENDANCE = [
  {
    id: 'ATT-901',
    memberId: 'GYM-1001',
    memberName: 'Surabi (Surabhi Trainer)',
    planName: 'VIP Personal Coaching',
    checkInTime: '05:30 AM',
    checkOutTime: '07:00 AM',
    date: getDateOffset(0),
    status: 'Completed'
  },
  {
    id: 'ATT-902',
    memberId: 'GYM-1002',
    memberName: 'Dolphin Rathinam (Dolphin Gym)',
    planName: 'VIP Personal Coaching',
    checkInTime: '06:00 AM',
    checkOutTime: '07:30 AM',
    date: getDateOffset(0),
    status: 'Completed'
  },
  {
    id: 'ATT-903',
    memberId: 'GYM-1003',
    memberName: 'Kabilan Bodybuilder',
    planName: 'VIP Personal Coaching',
    checkInTime: '06:30 AM',
    checkOutTime: 'Active (On Floor)',
    date: getDateOffset(0),
    status: 'In Gym'
  },
  {
    id: 'ATT-904',
    memberId: 'GYM-1004',
    memberName: 'Biglee Murali',
    planName: 'VIP Personal Coaching',
    checkInTime: '07:00 AM',
    checkOutTime: 'Active (On Floor)',
    date: getDateOffset(0),
    status: 'In Gym'
  },
  {
    id: 'ATT-905',
    memberId: 'GYM-1005',
    memberName: 'Saran (Saran Fitness Tamil)',
    planName: 'Pro Strength & Conditioning',
    checkInTime: '07:30 AM',
    checkOutTime: 'Active (On Floor)',
    date: getDateOffset(0),
    status: 'In Gym'
  },
  {
    id: 'ATT-906',
    memberId: 'GYM-1006',
    memberName: 'Danell Raj',
    planName: 'Pro Strength & Conditioning',
    checkInTime: '08:00 AM',
    checkOutTime: 'Active (On Floor)',
    date: getDateOffset(0),
    status: 'In Gym'
  }
];

// Invoices in Rupees (₹)
const DEFAULT_INVOICES = [
  {
    id: 'INV-2026-101',
    memberId: 'GYM-1001',
    memberName: 'Surabi (Surabhi Trainer)',
    planName: 'VIP Personal Coaching (Yearly)',
    amount: 11999,
    paymentMethod: 'UPI (Google Pay)',
    date: getDateOffset(-15),
    status: 'Paid',
    reference: 'UPI-GPAY-9928174'
  },
  {
    id: 'INV-2026-102',
    memberId: 'GYM-1002',
    memberName: 'Dolphin Rathinam (Dolphin Gym)',
    planName: 'VIP Personal Coaching (Yearly)',
    amount: 11999,
    paymentMethod: 'UPI (PhonePe)',
    date: getDateOffset(-12),
    status: 'Paid',
    reference: 'UPI-PHONEPE-44819'
  },
  {
    id: 'INV-2026-103',
    memberId: 'GYM-1003',
    memberName: 'Kabilan Bodybuilder',
    planName: 'VIP Personal Coaching (Yearly)',
    amount: 11999,
    paymentMethod: 'UPI (Google Pay)',
    date: getDateOffset(-10),
    status: 'Paid',
    reference: 'UPI-GPAY-772911'
  },
  {
    id: 'INV-2026-104',
    memberId: 'GYM-1004',
    memberName: 'Biglee Murali',
    planName: 'VIP Personal Coaching (Yearly)',
    amount: 11999,
    paymentMethod: 'UPI (Google Pay)',
    date: getDateOffset(-10),
    status: 'Paid',
    reference: 'UPI-GPAY-662910'
  },
  {
    id: 'INV-2026-105',
    memberId: 'GYM-1005',
    memberName: 'Saran (Saran Fitness Tamil)',
    planName: 'Pro Strength - Monthly Renewal Due',
    amount: 500,
    paymentMethod: 'Pending GPay',
    date: getDateOffset(0),
    status: 'Unpaid',
    reference: 'UPI-PENDING-04'
  },
  {
    id: 'INV-2026-106',
    memberId: 'GYM-1013',
    memberName: 'Vignesh "FitVicky"',
    planName: 'Standard Fitness - Overdue Dues',
    amount: 300,
    paymentMethod: 'Overdue Notice',
    date: getDateOffset(-5),
    status: 'Overdue',
    reference: 'OVERDUE-VKY-01'
  }
];

// Classes led by 100% Tamil coaches
const DEFAULT_CLASSES = [
  {
    id: 'CLS-01',
    title: 'Dawn Heavy Power Rack Lifts',
    coach: 'Biglee Murali',
    time: '06:00 AM - 07:15 AM',
    days: 'Mon / Wed / Fri',
    room: 'Power Arena Zone A',
    capacity: 12,
    enrolled: 11,
    category: 'Strength'
  },
  {
    id: 'CLS-02',
    title: 'Tamil Karlakattai & Gada Swings',
    coach: 'Master K. Arumugam',
    time: '07:00 AM - 08:15 AM',
    days: 'Daily (Mon-Sat)',
    room: 'Traditional Akhada Turf',
    capacity: 15,
    enrolled: 14,
    category: 'Desi Strength'
  },
  {
    id: 'CLS-03',
    title: 'Dolphin Hardcore Mass Hypertrophy',
    coach: 'Dolphin Rathinam',
    time: '06:30 PM - 07:45 PM',
    days: 'Mon / Wed / Fri',
    room: 'Free Weight Dungeon',
    capacity: 16,
    enrolled: 15,
    category: 'Mass Building'
  },
  {
    id: 'CLS-04',
    title: 'Women Strength & Glute Mechanics',
    coach: 'Surabi Trainer',
    time: '08:30 AM - 09:45 AM',
    days: 'Tue / Thu / Sat',
    room: 'Athletic Studio 1',
    capacity: 14,
    enrolled: 13,
    category: 'Hypertrophy'
  },
  {
    id: 'CLS-05',
    title: 'Tamil Youth Shred & Calisthenics',
    coach: 'Saran Fitness',
    time: '05:30 PM - 06:45 PM',
    days: 'Tue / Thu / Sat',
    room: 'Functional Turf Zone',
    capacity: 15,
    enrolled: 14,
    category: 'Fat Loss'
  },
  {
    id: 'CLS-06',
    title: 'CrossFit & Combat Conditioning',
    coach: 'Rakesh "Rock" Selvam',
    time: '07:30 AM - 08:45 AM',
    days: 'Mon / Wed / Sat',
    room: 'Combat Mat Arena',
    capacity: 15,
    enrolled: 13,
    category: 'Combat'
  },
  {
    id: 'CLS-07',
    title: 'Mr. South India Hypertrophy & Chest Pump',
    coach: 'Kabilan Bodybuilder',
    time: '04:00 PM - 05:15 PM',
    days: 'Mon / Wed / Fri',
    room: 'Hypertrophy Deck',
    capacity: 12,
    enrolled: 10,
    category: 'Hypertrophy'
  }
];

// REAL MARKET PROTEIN POWDERS & GYM SUPPLEMENTS
// Authentic brands currently sold in Chennai and Indian fitness markets
const DEFAULT_PRODUCTS = [
  // 1. Whey Isolate & Hydrolyzed
  {
    id: 'PRD-ON-01',
    name: 'Optimum Nutrition (ON) Gold Standard 100% Whey',
    brand: 'Optimum Nutrition',
    category: 'Whey Isolate',
    price: 3299,
    mrp: 4299,
    discount: '23% OFF',
    rating: 4.9,
    reviews: 1420,
    size: '2 kg (4.4 lbs)',
    proteinPerServing: '24g Protein | 5.5g BCAA',
    tag: 'World & TN #1',
    stock: 35,
    flavors: ['Double Rich Chocolate', 'Extreme Milk Chocolate', 'Vanilla Ice Cream', 'Cafe Mocha'],
    sizes: ['1 kg (2.2 lbs)', '2 kg (4.4 lbs)', '4 kg (8.8 lbs)'],
    cert: 'Informed Choice Certified',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=500&q=80',
    description: 'The world gold standard whey isolate blend. 24g pure whey peptides & micro-filtered isolate, 5.5g naturally occurring BCAAs, 4g glutamine with instant mixability in water or milk.'
  },
  {
    id: 'PRD-MB-02',
    name: 'MuscleBlaze Biozyme Performance Whey Protein',
    brand: 'MuscleBlaze',
    category: 'Whey Isolate',
    price: 2799,
    mrp: 3699,
    discount: '24% OFF',
    rating: 4.8,
    reviews: 2180,
    size: '2 kg (4.4 lbs)',
    proteinPerServing: '25g Protein | 5.51g BCAA',
    tag: 'Enhanced Absorption',
    stock: 42,
    flavors: ['Rich Chocolate', 'Magical Mango', 'Cafe Mocha', 'Kesar Kulfi'],
    sizes: ['1 kg (2.2 lbs)', '2 kg (4.4 lbs)', '4 kg (8.8 lbs)'],
    cert: 'Informed Choice UK & Labdoor USA',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=500&q=80',
    description: 'Clinically tested for Indian bodies: 50% higher protein absorption and 60% lower stomach discomfort. 25g pure protein per scoop with 11.75g EAAs. Rigorously tested by Labdoor.'
  },
  {
    id: 'PRD-DYM-03',
    name: 'Dymatize ISO 100 Hydrolyzed 100% Whey Isolate',
    brand: 'Dymatize',
    category: 'Whey Isolate',
    price: 6899,
    mrp: 8499,
    discount: '19% OFF',
    rating: 4.9,
    reviews: 890,
    size: '2.3 kg (5 lbs)',
    proteinPerServing: '25g Hydrolyzed Isolate',
    tag: 'Ultra-Pure Pro Tier',
    stock: 18,
    flavors: ['Gourmet Chocolate', 'Peanut Butter', 'Fruity Pebbles', 'Cookies & Cream'],
    sizes: ['1.1 kg (2.5 lbs)', '2.3 kg (5 lbs)'],
    cert: '100% Hydrolyzed Isolate',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80',
    description: 'Fast-absorbing hydrolyzed whey isolate. Less than 1g of sugar and fat per serving. Zero lactose, zero bloating. The premier choice for contest prep bodybuilders and athletes.'
  },
  {
    id: 'PRD-UN-04',
    name: 'Ultimate Nutrition Prostar 100% Whey Protein',
    brand: 'Ultimate Nutrition',
    category: 'Whey Isolate',
    price: 3699,
    mrp: 4999,
    discount: '26% OFF',
    rating: 4.7,
    reviews: 740,
    size: '2.39 kg (5.28 lbs)',
    proteinPerServing: '25g Protein | 6g BCAA',
    tag: 'Gym Classic',
    stock: 24,
    flavors: ['Chocolate Creme', 'Cocoa Mocha', 'Vanilla', 'Banana'],
    sizes: ['1 kg (2.2 lbs)', '2.39 kg (5.28 lbs)'],
    cert: 'Micro & Ultra Filtered',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
    description: 'Micro and ultra-filtered cold-processed whey isolate and concentrate blend. High in essential amino acids (6g BCAAs) for rapid post-workout muscle repair and sustained growth.'
  },
  {
    id: 'PRD-AVV-05',
    name: 'Avvatar 100% Whey Protein (Fresh Cow Milk)',
    brand: 'Avvatar',
    category: 'Whey Isolate',
    price: 2599,
    mrp: 3399,
    discount: '24% OFF',
    rating: 4.8,
    reviews: 1120,
    size: '2 kg (4.4 lbs)',
    proteinPerServing: '24g Protein | 5.4g BCAA',
    tag: 'Fresh Farm Milk',
    stock: 30,
    flavors: ['Belgian Chocolate', 'Malai Kulfi', 'Cafe Latte', 'Unflavored'],
    sizes: ['1 kg (2.2 lbs)', '2 kg (4.4 lbs)'],
    cert: '100% Indian Cow Milk',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=500&q=80',
    description: 'Manufactured in India within 24 hours of milking fresh cows. Packed with naturally occurring bioactive whey fractions, free from artificial fillers, with authentic Malai Kulfi and Belgian Chocolate taste.'
  },
  {
    id: 'PRD-ASIT-06',
    name: 'As-It-Is Nutrition Pure Whey Isolate 90%',
    brand: 'As-It-Is',
    category: 'Whey Isolate',
    price: 2199,
    mrp: 2899,
    discount: '24% OFF',
    rating: 4.8,
    reviews: 1650,
    size: '1 kg (2.2 lbs)',
    proteinPerServing: '27g Pure Protein / Scoop',
    tag: 'Zero Additives',
    stock: 50,
    flavors: ['Pure Raw Unflavored'],
    sizes: ['1 kg (2.2 lbs)', '2.5 kg (5.5 lbs)'],
    cert: 'Labdoor USA Tested',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=500&q=80',
    description: 'Raw unflavored 90% whey protein isolate. Zero sweeteners, zero coloring agents, zero emulsifiers. Maximum pure protein per rupee for athletes who like custom mixing.'
  },
  {
    id: 'PRD-MYP-07',
    name: 'MyProtein Impact Whey Isolate',
    brand: 'MyProtein',
    category: 'Whey Isolate',
    price: 3499,
    mrp: 4599,
    discount: '24% OFF',
    rating: 4.7,
    reviews: 980,
    size: '1 kg (2.2 lbs)',
    proteinPerServing: '23g Protein | 0.1g Fat',
    tag: 'European Grade',
    stock: 22,
    flavors: ['Chocolate Smooth', 'Salted Caramel', 'Strawberry Cream', 'Matcha'],
    sizes: ['1 kg (2.2 lbs)', '2.5 kg (5.5 lbs)'],
    cert: 'Grade A Tested',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80',
    description: 'Purified through expert cross-flow micro-filtration to deliver 90% protein ratio with virtually zero carbohydrates and fats. Ideal for ultra-lean calorie-restricted cutting.'
  },
  {
    id: 'PRD-MT-08',
    name: 'MuscleTech NitroTech 100% Whey Gold',
    brand: 'MuscleTech',
    category: 'Whey Blends',
    price: 3899,
    mrp: 5199,
    discount: '25% OFF',
    rating: 4.8,
    reviews: 870,
    size: '2.27 kg (5 lbs)',
    proteinPerServing: '24g Whey Peptides & Isolate',
    tag: 'Ultra-Pure Peptide',
    stock: 28,
    flavors: ['Double Rich Chocolate', 'French Vanilla Creme', 'Cookies and Cream'],
    sizes: ['1 kg (2.2 lbs)', '2.27 kg (5 lbs)'],
    cert: 'Cold-Filtered Peptide Tech',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80',
    description: 'Features highest biological value whey peptides and micro-filtered whey isolate. Supports superior recovery and high amino acid retention for intense weightlifters.'
  },
  {
    id: 'PRD-GNC-09',
    name: 'GNC Pro Performance 100% Whey Protein',
    brand: 'GNC',
    category: 'Whey Blends',
    price: 2899,
    mrp: 3999,
    discount: '27% OFF',
    rating: 4.6,
    reviews: 640,
    size: '2 kg (4.4 lbs)',
    proteinPerServing: '24g 100% Whey | 5.5g BCAA',
    tag: 'American Heritage',
    stock: 32,
    flavors: ['Chocolate Supreme', 'Creamy Strawberry', 'Vanilla'],
    sizes: ['1 kg (2.2 lbs)', '2 kg (4.4 lbs)'],
    cert: 'World Anti-Doping Compliant',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=500&q=80',
    description: 'Quick-digesting whey blend enriched with digestive enzymes (DigeZyme) for smooth absorption. Tested for over 220 banned substances by LGC Science.'
  },
  {
    id: 'PRD-TWT-10',
    name: 'The Whole Truth 100% Whey Protein Isolate',
    brand: 'The Whole Truth',
    category: 'Whey Isolate',
    price: 3199,
    mrp: 3999,
    discount: '20% OFF',
    rating: 4.9,
    reviews: 1350,
    size: '1 kg (2.2 lbs)',
    proteinPerServing: '26g Pure Protein | Zero Sucralose',
    tag: '100% Clean Label',
    stock: 25,
    flavors: ['Dark Chocolate', 'Raw Cocoa Cold Coffee', 'Unflavored'],
    sizes: ['1 kg (2.2 lbs)'],
    cert: 'Zero Artificial Additives',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=80',
    description: 'Cleanest protein in India: Sweetened only with real cocoa and monk fruit. No sucralose, no acesulfame potassium, no artificial emulsifiers or thickeners.'
  },

  // 2. Plant Protein & Mass Gainers
  {
    id: 'PRD-FAU-11',
    name: 'Fast&Up 100% Plant Protein Isolate',
    brand: 'Fast&Up',
    category: 'Plant Protein',
    price: 2299,
    mrp: 2999,
    discount: '23% OFF',
    rating: 4.7,
    reviews: 580,
    size: '1 kg (2.2 lbs)',
    proteinPerServing: '30g Plant Protein | 6g BCAA',
    tag: 'Vegan Champion',
    stock: 20,
    flavors: ['Rich Cocoa', 'Cafe Mocha', 'Mango'],
    sizes: ['1 kg (2.2 lbs)'],
    cert: 'Informed Choice Certified',
    image: 'https://images.unsplash.com/photo-1584947921538-26798a728a31?auto=format&fit=crop&w=500&q=80',
    description: 'Golden Pea and Brown Rice protein isolate blend delivering 30g pure vegan protein with added turmeric extract and digestive enzymes for zero vegan bloating.'
  },
  {
    id: 'PRD-MBG-12',
    name: 'MuscleBlaze Super Gainer XXL Mass Gainer',
    brand: 'MuscleBlaze',
    category: 'Mass Gainers',
    price: 2199,
    mrp: 2999,
    discount: '27% OFF',
    rating: 4.7,
    reviews: 1890,
    size: '3 kg (6.6 lbs)',
    proteinPerServing: '22.5g Protein | 462 Calories',
    tag: 'Hardgainer Bulking',
    stock: 35,
    flavors: ['Chocolate', 'Cookies & Cream', 'Banana'],
    sizes: ['1 kg', '3 kg', '5 kg'],
    cert: 'High Calorie Complex Carbs',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=500&q=80',
    description: 'Formulated with complex carbohydrates and slow/fast releasing proteins. 1:5 protein-to-carb ratio with 27 vital vitamins and minerals for putting on lean muscle mass.'
  },

  // 3. Creatine, Pre-Workout & Peanut Butter
  {
    id: 'PRD-CRE-13',
    name: 'Optimum Nutrition (ON) Micronized Creatine Monohydrate',
    brand: 'Optimum Nutrition',
    category: 'Creatine & Pre-workout',
    price: 899,
    mrp: 1299,
    discount: '31% OFF',
    rating: 4.9,
    reviews: 2450,
    size: '250 g (83 Servings)',
    proteinPerServing: '3g 100% Pure Creatine',
    tag: 'ATP Energy',
    stock: 60,
    flavors: ['Unflavored Micronized Powder'],
    sizes: ['250 g (83 Servings)', '400 g (133 Servings)'],
    cert: 'Creapure Micronized',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=500&q=80',
    description: 'Ultra-micronized 200-mesh pharmaceutical grade creatine. Maximizes muscle ATP output, improves sprint power, and stimulates cell volumization during heavy lifts.'
  },
  {
    id: 'PRD-MBC-14',
    name: 'MuscleBlaze CreAMP Creatine Monohydrate',
    brand: 'MuscleBlaze',
    category: 'Creatine & Pre-workout',
    price: 799,
    mrp: 1099,
    discount: '27% OFF',
    rating: 4.8,
    reviews: 1720,
    size: '250 g (83 Servings)',
    proteinPerServing: '3g CreAMP / Scoop',
    tag: 'Zero Clumping',
    stock: 45,
    flavors: ['Fruit Punch', 'Watermelon', 'Unflavored'],
    sizes: ['100 g', '250 g', '400 g'],
    cert: 'Biozyme CreAMP Tech',
    image: 'https://images.unsplash.com/photo-1622484216258-005bf90ba1f6?auto=format&fit=crop&w=500&q=80',
    description: 'Enriched with MB absorption accelerator to prevent creatine breakdown in stomach acid. Helps build strength for 1-rep maximum deadlifts and squats.'
  },
  {
    id: 'PRD-PIN-15',
    name: 'Pintola All-Natural High Protein Peanut Butter',
    brand: 'Pintola',
    category: 'Peanut Butter & Snacks',
    price: 449,
    mrp: 599,
    discount: '25% OFF',
    rating: 4.9,
    reviews: 3100,
    size: '1 kg Tub',
    proteinPerServing: '30g Protein / 100g',
    tag: 'Zero Palm Oil',
    stock: 55,
    flavors: ['Dark Chocolate Crunchy', 'Classic Creamy', 'All-Natural Crunchy'],
    sizes: ['1 kg Tub', '2.5 kg Bucket'],
    cert: '100% Roasted Peanuts',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=80',
    description: 'Made with 100% slow-roasted premium Saurashtra peanuts infused with organic dark chocolate. Zero hydrogenated oils, zero cholesterol, delicious clean calorie surplus.'
  },

  // 4. Gym Tools & Lifting Gear
  {
    id: 'PRD-BELT-16',
    name: 'Titan 10mm Heavy Leather Lever Powerlifting Belt',
    brand: 'Titan Iron',
    category: 'Gym Tools & Gear',
    price: 2499,
    mrp: 3499,
    discount: '29% OFF',
    rating: 4.9,
    reviews: 420,
    size: 'S / M / L / XL',
    proteinPerServing: 'Heavy Cowhide Leather',
    tag: 'IPF Spec',
    stock: 20,
    flavors: ['Matte Black Lever', 'Chrome Steel Lever'],
    sizes: ['Small (26-32)', 'Medium (30-36)', 'Large (34-40)', 'XL (38-44)'],
    cert: 'Cast Alloy Quick-Release Lever',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80',
    description: 'Indestructible 10mm genuine top-grain leather powerlifting belt with matte black cast-alloy quick-release lever buckle. Extreme intra-abdominal pressure for 200kg+ squats.'
  },
  {
    id: 'PRD-SLV-17',
    name: 'Titan 7mm Heavy Neoprene Compression Knee Sleeves',
    brand: 'Titan Iron',
    category: 'Gym Tools & Gear',
    price: 1499,
    mrp: 2199,
    discount: '32% OFF',
    rating: 4.8,
    reviews: 380,
    size: 'Pair (M / L / XL)',
    proteinPerServing: '7mm High-Density SBR',
    tag: 'Squat Protection',
    stock: 25,
    flavors: ['Stealth Black', 'Crimson Red Trim'],
    sizes: ['Medium', 'Large', 'Extra Large'],
    cert: 'Heavy Reinforced Seams',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80',
    description: 'Competition grade 7mm neoprene knee sleeves providing high warmth, joint lubrication, and spring-out tension at the bottom of heavy squats and leg presses.'
  },
  {
    id: 'PRD-SHK-18',
    name: 'Titan Insulated Stainless Steel 750ml Shaker',
    brand: 'Titan Iron',
    category: 'Gym Tools & Gear',
    price: 799,
    mrp: 1199,
    discount: '33% OFF',
    rating: 4.9,
    reviews: 610,
    size: '750 ml Capacity',
    proteinPerServing: '304 Food-Grade Steel',
    tag: '24h Ice Cold',
    stock: 40,
    flavors: ['Matte Stealth Black', 'Gunmetal Steel'],
    sizes: ['750 ml'],
    cert: 'BPA-Free Vacuum Double Wall',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80',
    description: 'Double-walled vacuum insulated steel shaker. Built-in silent blending wire, leakproof flip cap, zero odor retention. Keeps your protein shake chilled in Chennai summer.'
  },
  {
    id: 'PRD-WRP-19',
    name: 'Titan Heavy Wrist Wraps + Deadlift Straps Kit',
    brand: 'Titan Iron',
    category: 'Gym Tools & Gear',
    price: 649,
    mrp: 999,
    discount: '35% OFF',
    rating: 4.8,
    reviews: 520,
    size: '18 Inch Tournament Kit',
    proteinPerServing: 'Dual Reinforced Cotton',
    tag: 'Grip & Joint Lock',
    stock: 50,
    flavors: ['Titan Red / Black Stripe'],
    sizes: ['Universal Heavy Kit'],
    cert: 'Neoprene Wrist Padding',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80',
    description: 'Thumb-loop tournament wrist wraps paired with heavy cotton webbing deadlift straps with neoprene wrist padding for 200kg+ rack pulls and deadlifts.'
  },
  {
    id: 'PRD-CHK-20',
    name: 'Titan Pure Magnesium Carbonate Gym Chalk Block',
    brand: 'Titan Iron',
    category: 'Gym Tools & Gear',
    price: 199,
    mrp: 299,
    discount: '33% OFF',
    rating: 4.9,
    reviews: 790,
    size: '100 g Solid Block',
    proteinPerServing: '100% Pure MgCO3',
    tag: 'Zero Slip Grip',
    stock: 80,
    flavors: ['Pure White Block'],
    sizes: ['100 g Single Block', 'Pack of 4 (400g)'],
    cert: 'Pure Grip Tech',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=500&q=80',
    description: 'Moisture absorbing pure gym chalk block for heavy deadlifts, knurled Olympic bars, gymnastics rings, and pull-up bar grips. Zero fillers.'
  }
];

// Gym Pictures Gallery for Guide Page
const DEFAULT_GYM_GALLERY = [
  {
    title: 'Olympic Heavy Powerlifting Dungeon',
    zone: 'Zone A - Free Weights',
    desc: 'Eleiko calibrated competition steel plates, Texas power bars & heavy squat monolifts.',
    image: 'assets/gym_arena_luxury.jpg'
  },
  {
    title: 'Chennai Skyline Cardio Deck',
    zone: 'Zone B - Conditioning',
    desc: 'Assault air-bikes, Concept2 Rowers, and curved woodway treadmills with panoramic city view.',
    image: 'assets/gym_skydeck_luxury.jpg'
  },
  {
    title: 'Pro Dumbbell Rack (Up to 70kg)',
    zone: 'Zone C - Hypertrophy',
    desc: 'Full range urethane dumbbells, incline Olympic benches & hammer strength iso-lateral machines.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Traditional Tamil Akhada Turf',
    zone: 'Zone D - Heritage Athletic',
    desc: 'Traditional teak Karlakattai clubbells, heavy brass Gada maces & climbing Manila ropes.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Combat MMA & Striking Octagon',
    zone: 'Zone E - Combat Arena',
    desc: 'Professional tatami mat floor, 6ft Fairtex heavy tear bags & competition striking ring.',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Recovery Steam Bath & Protein Counter',
    zone: 'Zone F - Recovery & Fuel',
    desc: 'Post-workout eucalyptus steam rooms, ice plunge tubs & freshly blended whey shake bar.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80'
  }
];

// Default System Users for Sign In & Role Access
const DEFAULT_USERS = [
  {
    id: 'USR-ADMIN',
    name: 'Titan Admin Master',
    email: 'titan@gmail.com',
    phone: '+91 98401 22334',
    password: 'titan123',
    role: 'Administrator',
    avatar: 'AD'
  },
  {
    id: 'USR-YUSUF',
    name: 'Md Yusuf',
    email: 'yusuf@fitnessathlete.com',
    phone: '+91 98401 99887',
    password: 'member123',
    role: 'Gym Member',
    avatar: 'MY',
    dpImage: '',
    dob: '2001-08-15',
    height: '178',
    weight: '76.5',
    targetWeight: '82.0',
    bodyFat: '13.5',
    fitnessGoal: 'Hypertrophy & Muscle Building',
    experience: 'Intermediate (1-3 Years)',
    trainer: 'Saran Fitness',
    planName: 'Gold Elite Yearly',
    planExpiry: '2027-10-24',
    emergencyContact: '+91 98400 55443 (Brother - Tariq)',
    address: 'Plot 45, 5th Main Road, Anna Nagar West, Chennai, Tamil Nadu',
    termsAccepted: true
  },
  {
    id: 'USR-102',
    name: 'Dolphin',
    email: 'dolphin@fitnessathlete.com',
    phone: '+91 98402 33445',
    password: 'member123',
    role: 'Gym Member',
    avatar: 'DP'
  },
  {
    id: 'USR-TR-01',
    name: 'Saran Fitness',
    email: 'saran@fitnessathlete.com',
    phone: '+91 98404 66778',
    password: 'coach123',
    role: 'Personal Trainer',
    avatar: 'SR'
  }
];

// Unified Gym State Manager
class GymStore {
  constructor() {
    this.init();
  }

  init() {
    // If not existing or still on old version, reset
    if (!localStorage.getItem(STORAGE_KEYS.MEMBERS) || !localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      this.resetToDefaults();
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
  }

  // Registered Users Manager
  getUsers() {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USERS);
      return u ? JSON.parse(u) : DEFAULT_USERS;
    } catch (e) {
      return DEFAULT_USERS;
    }
  }

  getUserProfile(emailOrId) {
    const users = this.getUsers();
    const clean = (emailOrId || '').trim().toLowerCase();
    let found = users.find(u => (u.email && u.email.toLowerCase() === clean) || u.id === emailOrId);
    if (!found) {
      found = users.find(u => u.id === 'USR-YUSUF') || users[0];
    }
    return found;
  }

  updateUserProfile(emailOrId, data) {
    const users = this.getUsers();
    const clean = (emailOrId || '').trim().toLowerCase();
    const index = users.findIndex(u => (u.email && u.email.toLowerCase() === clean) || u.id === emailOrId);
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      if (data.dpImage) {
        localStorage.setItem('FITNESS_CLUB_USER_DP_' + clean, data.dpImage);
        localStorage.setItem('FITNESS_CLUB_ACTIVE_DP', data.dpImage);
      } else if (data.dpImage === '') {
        localStorage.removeItem('FITNESS_CLUB_USER_DP_' + clean);
        localStorage.removeItem('FITNESS_CLUB_ACTIVE_DP');
      }

      const currentAuth = this.getAdminAuth();
      if (currentAuth && (currentAuth.email.toLowerCase() === clean || currentAuth.id === emailOrId)) {
        const updatedAuth = {
          ...currentAuth,
          name: users[index].name,
          email: users[index].email,
          avatar: users[index].avatar,
          dpImage: users[index].dpImage || localStorage.getItem('FITNESS_CLUB_USER_DP_' + clean) || ''
        };
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updatedAuth));
      }
      return { success: true, user: users[index] };
    }
    return { success: false, message: 'User not found' };
  }

  // User Authentication & Session
  getAdminAuth() {
    try {
      const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (!auth) {
        return { isAuthenticated: false, email: '', name: 'Guest', role: 'Guest', avatar: 'GU' };
      }
      return JSON.parse(auth);
    } catch (e) {
      return { isAuthenticated: false, email: '', name: 'Guest', role: 'Guest', avatar: 'GU' };
    }
  }

  loginUser(email, password) {
    const users = this.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check against registered users
    const matched = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPass);
    if (matched) {
      const savedDP = matched.dpImage || localStorage.getItem('FITNESS_CLUB_USER_DP_' + cleanEmail) || localStorage.getItem('FITNESS_CLUB_ACTIVE_DP') || '';
      const auth = {
        isAuthenticated: true,
        id: matched.id,
        email: matched.email,
        name: matched.name,
        role: matched.role,
        avatar: matched.avatar || matched.name.substring(0, 2).toUpperCase(),
        dpImage: savedDP,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
      return { success: true, message: `Welcome back, ${matched.name}!`, user: auth };
    }

    // Default admin check fallback
    if (cleanEmail === 'titan@gmail.com' && cleanPass === 'titan123') {
      const auth = {
        isAuthenticated: true,
        id: 'USR-ADMIN',
        email: 'titan@gmail.com',
        name: 'Titan Admin Master',
        role: 'Administrator',
        avatar: 'AD',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
      return { success: true, message: 'Welcome back, Titan Admin Master!', user: auth };
    }

    return { success: false, message: 'Invalid credentials! Try email: titan@gmail.com / password: titan123' };
  }

  registerUser(name, email, phone, role, password) {
    const users = this.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email already exists. Please sign in.' };
    }

    const initials = name.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'GA';
    const newUser = {
      id: `USR-${1000 + users.length + 1}`,
      name: name.trim(),
      email: cleanEmail,
      phone: (phone || '').trim(),
      role: role || 'Gym Member',
      password: (password || '').trim(),
      avatar: initials
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Auto-login newly registered user
    const auth = {
      isAuthenticated: true,
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      avatar: newUser.avatar,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));

    return { success: true, message: `Account created! Welcome to Fitness Athlete Club, ${newUser.name}.`, user: auth };
  }

  loginAdmin(email, password) {
    return this.loginUser(email, password);
  }

  logoutAdmin() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  isAuthenticated() {
    const auth = this.getAdminAuth();
    return auth && auth.isAuthenticated === true;
  }

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(DEFAULT_PLANS));
    localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(DEFAULT_TRAINERS));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(DEFAULT_MEMBERS));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(DEFAULT_ATTENDANCE));
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(DEFAULT_INVOICES));
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(DEFAULT_CLASSES));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      gymName: 'TITAN IRON GYM',
      tagline: 'PREMIER FITNESS ATHLETE CLUB',
      currency: '₹',
      upiId: 'titanirongym@okaxis',
      phone: '+91 98400 12345',
      address: 'Plot 42, Anna Salai, Chennai, Tamil Nadu 600002'
    }));

    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({
      isAuthenticated: true,
      email: 'titan@gmail.com',
      name: 'Titan Admin Master',
      role: 'Administrator'
    }));
  }

  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`Error loading key ${key}`, e);
      return [];
    }
  }

  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  // MEMBERS (100% Tamil Influencers)
  getMembers() {
    const members = this.get(STORAGE_KEYS.MEMBERS);
    const today = new Date().toISOString().split('T')[0];
    
    return members.map(m => {
      const expDate = new Date(m.expiryDate);
      const now = new Date(today);
      const diffDays = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));
      
      let computedStatus = m.status;
      if (diffDays < 0) {
        computedStatus = 'Expired';
      } else if (diffDays <= 7) {
        computedStatus = 'Expiring Soon';
      } else {
        computedStatus = 'Active';
      }
      return { ...m, status: computedStatus, daysLeft: diffDays };
    });
  }

  addMember(memberData) {
    const members = this.get(STORAGE_KEYS.MEMBERS);
    const nextNum = 1000 + members.length + 1;
    const newId = `GYM-${nextNum}`;
    
    const newMember = {
      id: newId,
      fullName: memberData.fullName,
      instagram: memberData.instagram || `@${memberData.fullName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      email: memberData.email,
      phone: memberData.phone,
      gender: memberData.gender || 'Male',
      location: memberData.location || 'Chennai, Tamil Nadu',
      dob: memberData.dob || '',
      planId: memberData.planId,
      durationCycle: memberData.durationCycle || 'monthly',
      trainerId: memberData.trainerId || '',
      joinDate: memberData.joinDate || new Date().toISOString().split('T')[0],
      expiryDate: memberData.expiryDate,
      status: 'Active',
      emergencyContact: memberData.emergencyContact || 'None provided',
      notes: memberData.notes || '',
      avatar: memberData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(memberData.fullName)}&background=18181b&color=ffffff&bold=true`
    };

    members.unshift(newMember);
    this.set(STORAGE_KEYS.MEMBERS, members);

    // Auto-generate invoice in ₹ (Rupees)
    const plan = this.getPlanById(newMember.planId);
    if (plan) {
      const price = newMember.durationCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
      this.addInvoice({
        memberId: newMember.id,
        memberName: newMember.fullName,
        planName: `${plan.name} (${newMember.durationCycle === 'yearly' ? 'Yearly Package' : 'Monthly Subscription'})`,
        amount: price,
        paymentMethod: memberData.initialPaymentMethod || 'UPI (Google Pay)',
        status: 'Paid',
        reference: `UPI-INIT-${Date.now().toString().slice(-6)}`
      });
    }

    return newMember;
  }

  updateMember(id, updatedFields) {
    const members = this.get(STORAGE_KEYS.MEMBERS);
    const index = members.findIndex(m => m.id === id);
    if (index !== -1) {
      members[index] = { ...members[index], ...updatedFields };
      this.set(STORAGE_KEYS.MEMBERS, members);
      return members[index];
    }
    return null;
  }

  deleteMember(id) {
    let members = this.get(STORAGE_KEYS.MEMBERS);
    members = members.filter(m => m.id !== id);
    this.set(STORAGE_KEYS.MEMBERS, members);
    return true;
  }

  renewMembership(id, cycle = 'monthly', paymentMethod = 'UPI (Google Pay)') {
    const members = this.get(STORAGE_KEYS.MEMBERS);
    const member = members.find(m => m.id === id);
    if (!member) return null;

    const currentExp = new Date(member.expiryDate);
    const today = new Date();
    const baseDate = currentExp > today ? currentExp : today;
    
    const monthsToAdd = cycle === 'yearly' ? 12 : 1;
    baseDate.setMonth(baseDate.getMonth() + monthsToAdd);
    member.expiryDate = baseDate.toISOString().split('T')[0];
    member.durationCycle = cycle;
    member.status = 'Active';

    this.set(STORAGE_KEYS.MEMBERS, members);

    const plan = this.getPlanById(member.planId);
    let amount = 500;
    if (plan) {
      amount = cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    }

    this.addInvoice({
      memberId: member.id,
      memberName: member.fullName,
      planName: `${plan ? plan.name : 'Gym Plan'} (${cycle === 'yearly' ? '1 Year Extension' : '1 Month Extension'})`,
      amount: amount,
      paymentMethod: paymentMethod,
      status: 'Paid',
      reference: `RNW-${Date.now().toString().slice(-6)}`
    });

    return member;
  }

  // PLANS
  getPlans() {
    const plans = this.get(STORAGE_KEYS.PLANS);
    const members = this.get(STORAGE_KEYS.MEMBERS);
    return plans.map(p => {
      const count = members.filter(m => m.planId === p.id && m.status !== 'Expired').length;
      return { ...p, activeMembers: count };
    });
  }

  getPlanById(id) {
    const plans = this.get(STORAGE_KEYS.PLANS);
    return plans.find(p => p.id === id);
  }

  // TRAINERS
  getTrainers() {
    const trainers = this.get(STORAGE_KEYS.TRAINERS);
    const members = this.get(STORAGE_KEYS.MEMBERS);
    return trainers.map(t => {
      const activeClients = members.filter(m => m.trainerId === t.id && m.status === 'Active').length;
      return { ...t, activeClients };
    });
  }

  // PRODUCTS & E-COMMERCE SUPPLEMENT STORE
  getProducts() {
    return this.get(STORAGE_KEYS.PRODUCTS);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }

  // REAL-TIME SHOPPING CART SYSTEM
  getCart() {
    return this.get(STORAGE_KEYS.CART) || [];
  }

  saveCart(cart) {
    this.set(STORAGE_KEYS.CART, cart);
  }

  addToCart(productId, selectedFlavor = '', selectedSize = '', qty = 1) {
    const product = this.getProductById(productId);
    if (!product) return { success: false, message: 'Product not found.' };

    const cart = this.getCart();
    const flavor = selectedFlavor || (product.flavors && product.flavors[0]) || 'Standard';
    const size = selectedSize || product.size;
    const cartItemId = `${productId}-${flavor}-${size}`.replace(/\s+/g, '_');

    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        cartItemId,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        mrp: product.mrp,
        image: product.image,
        flavor: flavor,
        size: size,
        proteinPerServing: product.proteinPerServing,
        qty: qty
      });
    }

    this.saveCart(cart);
    return { 
      success: true, 
      message: `Added ${qty}x ${product.name} (${flavor}) to Cart!`, 
      cartCount: this.getCartCount(),
      cartTotal: this.getCartTotals().grandTotal
    };
  }

  updateCartQty(cartItemId, newQty) {
    let cart = this.getCart();
    if (newQty <= 0) {
      cart = cart.filter(item => item.cartItemId !== cartItemId);
    } else {
      const item = cart.find(i => i.cartItemId === cartItemId);
      if (item) item.qty = newQty;
    }
    this.saveCart(cart);
    return this.getCartTotals();
  }

  removeCartItem(cartItemId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    this.saveCart(cart);
    return this.getCartTotals();
  }

  clearCart() {
    this.saveCart([]);
  }

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  getCartTotals(couponCode = '') {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const mrpTotal = cart.reduce((sum, item) => sum + ((item.mrp || item.price * 1.3) * item.qty), 0);
    const productSavings = Math.max(0, mrpTotal - subtotal);

    // Free shipping threshold above ₹999
    const shippingFee = (subtotal === 0 || subtotal >= 999) ? 0 : 99;

    // Coupon discount logic
    let couponDiscount = 0;
    let couponApplied = null;
    const cleanCoupon = (couponCode || '').trim().toUpperCase();

    if (cleanCoupon === 'TAMILFIT10') {
      couponDiscount = Math.round(subtotal * 0.10);
      couponApplied = { code: 'TAMILFIT10', discountPct: 10, note: '10% Tamil Fitness Special Discount' };
    } else if (cleanCoupon === 'DOLPHIN15') {
      couponDiscount = Math.round(subtotal * 0.15);
      couponApplied = { code: 'DOLPHIN15', discountPct: 15, note: '15% Dolphin Gym Fan Discount' };
    } else if (cleanCoupon === 'TITAN20') {
      couponDiscount = Math.round(subtotal * 0.20);
      couponApplied = { code: 'TITAN20', discountPct: 20, note: '20% Titan Club VIP Discount' };
    }

    const grandTotal = Math.max(0, subtotal + shippingFee - couponDiscount);

    return {
      itemCount: this.getCartCount(),
      subtotal,
      mrpTotal,
      productSavings,
      shippingFee,
      couponDiscount,
      couponApplied,
      grandTotal,
      items: cart
    };
  }

  // Real-time Checkout Process
  checkoutCart({ customerName, phone, address, city, pincode, paymentMethod = 'UPI (Google Pay)', utrReference = '', couponCode = '' }) {
    const cart = this.getCart();
    if (cart.length === 0) {
      return { success: false, message: 'Your shopping cart is empty!' };
    }

    const totals = this.getCartTotals(couponCode);
    const orderId = `ORD-TN-${Date.now().toString().slice(-6)}`;
    const products = this.get(STORAGE_KEYS.PRODUCTS);

    // Deduct inventory stock
    cart.forEach(cartItem => {
      const p = products.find(prod => prod.id === cartItem.productId);
      if (p && p.stock > 0) {
        p.stock = Math.max(0, p.stock - cartItem.qty);
      }
    });
    this.set(STORAGE_KEYS.PRODUCTS, products);

    // Format item summary for invoice
    const itemSummary = cart.map(i => `${i.qty}x ${i.name} [${i.flavor}]`).join(', ');

    // Create official Tax Invoice in gym billing
    const inv = this.addInvoice({
      memberId: 'STORE-CUSTOMER',
      memberName: `${customerName || 'Tamil Gym Customer'} (${phone || 'Walk-in'})`,
      planName: `Shop: ${itemSummary.length > 55 ? itemSummary.slice(0, 52) + '...' : itemSummary}`,
      amount: totals.grandTotal,
      paymentMethod: paymentMethod,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      reference: utrReference || `SHOP-UPI-${Math.floor(Math.random() * 899999 + 100000)}`
    });

    // Clear cart after successful checkout
    this.clearCart();

    return {
      success: true,
      message: `Order #${orderId} placed successfully! Real-time payment verified.`,
      orderId,
      customerName,
      phone,
      address: `${address || 'Gym Floor Express Counter'}, ${city || 'Chennai'} - ${pincode || '600002'}`,
      totals,
      itemsPurchased: cart,
      invoice: inv
    };
  }

  // Instant 1-Click Product Buy
  buyProduct(productId, memberId, paymentMethod = 'UPI (Google Pay)') {
    const products = this.get(STORAGE_KEYS.PRODUCTS);
    const product = products.find(p => p.id === productId);
    if (!product) return { success: false, message: 'Product not found.' };

    if (product.stock <= 0) {
      return { success: false, message: `${product.name} is currently out of stock.` };
    }

    product.stock -= 1;
    this.set(STORAGE_KEYS.PRODUCTS, products);

    const members = this.getMembers();
    const member = members.find(m => m.id === memberId) || { fullName: 'Counter Walk-in Athlete', id: 'GUEST-01' };

    const inv = this.addInvoice({
      memberId: member.id,
      memberName: member.fullName,
      planName: `Pro Shop: ${product.name}`,
      amount: product.price,
      paymentMethod: paymentMethod,
      status: 'Paid',
      reference: `SHOP-${Date.now().toString().slice(-6)}`
    });

    return { success: true, message: `Purchased ${product.name} for ₹${product.price.toLocaleString('en-IN')}. Receipt generated!`, invoice: inv };
  }

  // ATTENDANCE & CHECK-IN
  getAttendanceLogs() {
    return this.get(STORAGE_KEYS.ATTENDANCE);
  }

  checkInMember(query) {
    const members = this.getMembers();
    const q = query.trim().toLowerCase();
    const member = members.find(m => 
      m.id.toLowerCase() === q || 
      (m.instagram && m.instagram.toLowerCase().includes(q)) ||
      m.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, '')) || 
      m.email.toLowerCase() === q ||
      m.fullName.toLowerCase().includes(q)
    );

    if (!member) {
      return { success: false, message: 'Member not found. Check ID, Name, Instagram (@handle) or Phone number.' };
    }

    if (member.status === 'Expired') {
      return { 
        success: false, 
        message: `Access Denied: ${member.fullName}'s membership expired on ${member.expiryDate}. Renewal required!`, 
        member 
      };
    }

    const attendance = this.get(STORAGE_KEYS.ATTENDANCE);
    const today = new Date().toISOString().split('T')[0];
    
    const ongoing = attendance.find(a => a.memberId === member.id && a.date === today && a.checkOutTime.includes('Active'));
    if (ongoing) {
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      ongoing.checkOutTime = nowTime;
      ongoing.status = 'Completed';
      this.set(STORAGE_KEYS.ATTENDANCE, attendance);
      return { 
        success: true, 
        message: `${member.fullName} checked out at ${nowTime}. Great workout!`, 
        type: 'checkout', 
        member 
      };
    }

    const plan = this.getPlanById(member.planId);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const log = {
      id: `ATT-${Date.now().toString().slice(-4)}`,
      memberId: member.id,
      memberName: member.fullName,
      planName: plan ? plan.name : 'Gym Member',
      checkInTime: nowTime,
      checkOutTime: 'Active (On Floor)',
      date: today,
      status: 'In Gym'
    };

    attendance.unshift(log);
    this.set(STORAGE_KEYS.ATTENDANCE, attendance);
    return { 
      success: true, 
      message: `Welcome, ${member.fullName}! Verified & Checked in at ${nowTime}.`, 
      type: 'checkin', 
      member, 
      log 
    };
  }

  // INVOICES & REVENUE
  getInvoices() {
    return this.get(STORAGE_KEYS.INVOICES);
  }

  addInvoice(inv) {
    const invoices = this.get(STORAGE_KEYS.INVOICES);
    const nextId = `INV-2026-${String(invoices.length + 101).padStart(3, '0')}`;
    const newInvoice = {
      id: inv.id || nextId,
      memberId: inv.memberId,
      memberName: inv.memberName,
      planName: inv.planName,
      amount: parseFloat(inv.amount),
      paymentMethod: inv.paymentMethod || 'UPI (Google Pay)',
      date: inv.date || new Date().toISOString().split('T')[0],
      status: inv.status || 'Paid',
      reference: inv.reference || `REF-${Math.floor(Math.random() * 899999 + 100000)}`
    };
    invoices.unshift(newInvoice);
    this.set(STORAGE_KEYS.INVOICES, invoices);
    return newInvoice;
  }

  getClasses() {
    return this.get(STORAGE_KEYS.CLASSES);
  }

  getGymGallery() {
    return DEFAULT_GYM_GALLERY;
  }

  applyMembershipPlan(memberId, planId, cycle = 'monthly', paymentMethod = 'UPI (Google Pay)', reference = '') {
    const members = this.get(STORAGE_KEYS.MEMBERS);
    const plan = this.getPlanById(planId);
    if (!plan) return { success: false, message: 'Membership plan not found.' };

    let member = members.find(m => m.id === memberId);
    if (!member) {
      // Auto-create walk-in customer profile
      const nextNum = 1000 + members.length + 1;
      member = {
        id: `GYM-${nextNum}`,
        fullName: 'Counter Walk-in Athlete',
        instagram: '@tamil_fitness_athlete',
        email: 'athlete@titanfitness.in',
        phone: '+91 98401 55667',
        gender: 'Male',
        location: 'Chennai, Tamil Nadu',
        dob: '1998-01-01',
        planId: planId,
        durationCycle: cycle,
        trainerId: 'TR-101',
        joinDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        notes: 'Enrolled via instant UPI checkout',
        avatar: `https://ui-avatars.com/api/?name=Walkin+Athlete&background=18181b&color=ffffff&bold=true`
      };
      members.unshift(member);
    }

    const price = cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    const addDays = cycle === 'yearly' ? 365 : 30;

    let baseDate = new Date();
    const currentExp = new Date(member.expiryDate);
    if (currentExp > baseDate) {
      baseDate = currentExp;
    }
    baseDate.setDate(baseDate.getDate() + addDays);
    const newExpiry = baseDate.toISOString().split('T')[0];

    member.planId = planId;
    member.durationCycle = cycle;
    member.expiryDate = newExpiry;
    member.status = 'Active';

    this.set(STORAGE_KEYS.MEMBERS, members);

    const inv = this.addInvoice({
      memberId: member.id,
      memberName: member.fullName,
      planName: `${plan.name} (${cycle === 'yearly' ? 'Yearly Package' : 'Monthly Subscription'})`,
      amount: price,
      paymentMethod: paymentMethod,
      status: 'Paid',
      reference: reference || `UPI-${Date.now().toString().slice(-6)}`
    });

    return {
      success: true,
      message: `Successfully applied ${plan.name} (${cycle.toUpperCase()}) for ${member.fullName}! Valid till ${newExpiry}.`,
      member,
      invoice: inv
    };
  }

  getSettings() {
    return this.get(STORAGE_KEYS.SETTINGS) || {
      gymName: 'TITAN IRON GYM',
      tagline: 'PREMIER FITNESS ATHLETE CLUB',
      currency: '₹',
      upiId: 'titanirongym@okaxis'
    };
  }
}

// Global Singleton Instance
window.GymDB = new GymStore();
