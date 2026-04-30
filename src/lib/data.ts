export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
  isVerified?: boolean;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  privacySettings?: {
    showPhone: boolean;
    showSocial: boolean;
  };
};

export type CowData = {
  id: string;
  name: string;
  weight: number;
  totalPrice: number;
  pricePerShare: number;
  totalShares: number;
  soldShares: number;
  buyers: User[];
  imageSrc: string;
  breed: string;
  location: string;
  farm: string;
  // Comprehensive Details
  healthAndShariah?: {
    ageInTeeth: number;
    isVaccinated: boolean;
    diseaseFree: boolean;
    noPhysicalDefects: boolean; // Shariah compliance
    lastCheckup: string;
  };
  physicalSpecs?: {
    heightFeet: number;
    lengthFeet: number;
    color: string;
  };
  dietAndCare?: {
    feedType: string;
    environment: string;
  };
  logistics?: {
    slaughterLocation: string;
    meatDistribution: string;
    hideDonation: string;
  };
};

export const MOCK_USERS: User[] = [
  { 
    id: '1',
    name: 'Ahmad M.',
    avatarUrl: '/avatars/avatar_man_1.png',
    isVerified: true,
    email: 'ahmad@example.com',
    phone: '+880 1711 000000',
    address: 'Gulshan 2, Dhaka',
    bio: 'Alhamdulillah, seeking rewards through Qurbani sharing.',
    socialMedia: { facebook: 'facebook.com/ahmad' },
    privacySettings: { showPhone: false, showSocial: true }
  },
  { 
    id: '2',
    name: 'Sara K.',
    avatarUrl: '/avatars/avatar_woman_1.png',
    isVerified: true,
    bio: 'Happy to participate in ethical farming.',
    privacySettings: { showPhone: false, showSocial: false }
  },
  { id: '3', name: 'Tariq H.', avatarUrl: '/avatars/avatar_man_2.png', isVerified: false },
  { 
    id: '4', 
    name: 'Omar F.', 
    avatarUrl: '/avatars/avatar_woman_2.png', 
    isVerified: true,
    socialMedia: { linkedin: 'linkedin.com/in/omarf' },
    privacySettings: { showPhone: false, showSocial: true }
  },
  { id: '5', name: 'Zaid A.', avatarUrl: '/avatars/avatar_man_1.png', isVerified: true },
  { id: '6', name: 'Ali M.', avatarUrl: '/avatars/avatar_woman_1.png', isVerified: true },
];

export const MOCK_CATTLE: CowData[] = [
  {
    id: 'c1',
    name: 'Premium Sahiwal',
    breed: 'Sahiwal',
    location: 'Rajshahi, Bangladesh',
    farm: 'Green Pastures Farm',
    weight: 450,
    totalPrice: 1015,
    pricePerShare: 145,
    totalShares: 7,
    soldShares: 4,
    buyers: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[3]],
    imageSrc: '/cattle/cow_brown.png',
    healthAndShariah: {
      ageInTeeth: 4,
      isVaccinated: true,
      diseaseFree: true,
      noPhysicalDefects: true,
      lastCheckup: '2026-04-15'
    },
    physicalSpecs: { heightFeet: 4.5, lengthFeet: 6.2, color: 'Deep Brown' },
    dietAndCare: { feedType: '100% Organic Grass & Napier', environment: 'Open pasture grazing, cage-free' },
    logistics: { slaughterLocation: 'Partner Halal Facility, Dhaka', meatDistribution: '1/3 User, 1/3 Relatives, 1/3 Poor', hideDonation: 'Edhi Foundation / Local Madrasa' }
  },
  {
    id: 'c2',
    name: 'White Brahman Cross',
    breed: 'Brahman Cross',
    location: 'Kushtia, Bangladesh',
    farm: 'Ethical Agro',
    weight: 520,
    totalPrice: 1260,
    pricePerShare: 180,
    totalShares: 7,
    soldShares: 2,
    buyers: [MOCK_USERS[0], MOCK_USERS[1]],
    imageSrc: '/cattle/cow_white.png',
    healthAndShariah: { ageInTeeth: 6, isVaccinated: true, diseaseFree: true, noPhysicalDefects: true, lastCheckup: '2026-04-20' },
    physicalSpecs: { heightFeet: 5.1, lengthFeet: 7.0, color: 'Pure White' },
    dietAndCare: { feedType: 'Corn, Grain & Fresh Grass', environment: 'Semi-intensive ventilated farm' },
    logistics: { slaughterLocation: 'Partner Halal Facility, Dhaka', meatDistribution: '1/3 User, 1/3 Relatives, 1/3 Poor', hideDonation: 'Local Orphanage' }
  },
  {
    id: 'c3',
    name: 'Black Bengal Goat',
    breed: 'Black Bengal',
    location: 'Chuadanga, Bangladesh',
    farm: 'Riverbank Farms',
    weight: 35,
    totalPrice: 200,
    pricePerShare: 200,
    totalShares: 1,
    soldShares: 0,
    buyers: [],
    imageSrc: '/cattle/goat_black.png',
    healthAndShariah: { ageInTeeth: 2, isVaccinated: true, diseaseFree: true, noPhysicalDefects: true, lastCheckup: '2026-04-25' },
    physicalSpecs: { heightFeet: 2.2, lengthFeet: 3.0, color: 'Jet Black' },
    dietAndCare: { feedType: 'Natural foraging, Jackfruit leaves', environment: 'Free-range rural farm' },
    logistics: { slaughterLocation: 'User Preference or Farm', meatDistribution: 'Full Carcass to Buyer', hideDonation: 'Local Madrasa' }
  },
  {
    id: 'c4',
    name: 'Premium White Ram',
    breed: 'Garole Sheep',
    location: 'Meherpur, Bangladesh',
    farm: 'Al-Huda Agro',
    weight: 45,
    totalPrice: 250,
    pricePerShare: 250,
    totalShares: 1,
    soldShares: 0,
    buyers: [],
    imageSrc: '/cattle/sheep_white.png',
    healthAndShariah: { ageInTeeth: 2, isVaccinated: true, diseaseFree: true, noPhysicalDefects: true, lastCheckup: '2026-04-22' },
    physicalSpecs: { heightFeet: 2.5, lengthFeet: 3.5, color: 'White Fleece' },
    dietAndCare: { feedType: 'Dry hay and grain mix', environment: 'Covered pen' },
    logistics: { slaughterLocation: 'Farm Facility', meatDistribution: 'Full Carcass to Buyer', hideDonation: 'Local Madrasa' }
  }
];
