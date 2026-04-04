#!/usr/bin/env node

// Load environment variables first
require('dotenv').config({ path: '/Users/anil/Desktop/BalajiConstrucation/backend/.env' });

const mongoose = require('mongoose');
const Project = require('/Users/anil/Desktop/BalajiConstrucation/backend/models/Project');

const sample_projects = [
  {
    title: 'Balaji Elite Bungalows - Kharadi',
    description: 'Premium 3-4 BHK bungalows with modern amenities and spacious layouts. Designed for families looking for luxury living in a gated community. Located in prime area of Parola with excellent connectivity.',
    location: 'Parola, Dist. Jalgaon',
    type: 'Bungalow',
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
    totalUnits: 12,
    availableUnits: 5,
    soldUnits: 7,
    priceRange: '₹25 - 35 Lakh',
    currentPrice: '₹25 Lakh - ₹35 Lakh',
    futurePrice: '₹30 Lakh - ₹40 Lakh',
    reraNumber: 'PRM/MH/RERA/1001/2024',
    startDate: 'January 2024',
    completionDate: 'December 2025',
    developmentStage: '65% Complete',
    pricePerSqft: '₹4,500 per sq.ft',
    totalArea: '8,000 Sq.ft',
    noOfFloors: 2,
    noOfBedrooms: '3-4 BHK',
    noOfBathrooms: '3-4',
    balconyArea: '500 Sq.ft',
    carpetArea: '2,800 Sq.ft',
    builtUpArea: '3,200 Sq.ft',
    planningPictures: [
      'https://images.unsplash.com/photo-1541123603104-852f7e8057f0?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=400&fit=crop'
    ],
    layoutImages: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0db896d?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=400&fit=crop'
    ],
    beforeDevelopmentImages: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1582268611471-716ecbe3060e?w=500&h=400&fit=crop'
    ],
    currentSiteImages: [
      'https://images.unsplash.com/photo-1578992220575-2b9938810129?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1577005505632-d01ee1b07069?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1590136579312-94651dfd596d?w=500&h=400&fit=crop'
    ],
    completionRenderImages: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45a003537e1d?w=500&h=400&fit=crop'
    ],
    insideViewImages: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop'
    ],
    outsideViewImages: [
      'https://images.unsplash.com/photo-1504437261749-3ef45a1b9d96?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop'
    ],
    amenities: [
      'Gated Community', 'Green Landscape', 'Parking Area', '24/7 Security', 'Landscaped Gardens', 
      'Water Harvesting', 'Power Backup', 'Community Space', 'Well Planned Layout', 'Premium Finish'
    ],
    legalDocuments: [
      'https://example.com/docs/project-approval.pdf',
      'https://example.com/docs/rera-registration.pdf',
      'https://example.com/docs/layout-plan.pdf'
    ]
  },
{
  "title": "Balaji Luxury Row House",
  "description": "Stylish 1 BHK row houses with contemporary design. Perfect for investors and homebuyers seeking modern living spaces.",
  "location": "Tambe Nager, Parola",
  "type": "Row House",
  "status": "Completed",
  "image": "1LKAwd5bWGCbqRgX0ZK2FzCIXkjnFgEkn",
  "totalUnits": 3,
  "availableUnits": 2,
  "soldUnits": 1,
  "priceRange": "₹23 - 30 L",
  "currentPrice": "₹23 L - ₹30 L",
  "futurePrice": "₹27 L - ₹35 L",
  "amenities": [
    "Water Geyser",
    "Parking"
  ],
  "reraNumber": "PRM/KA/RERA/1502/2025",
  "legalDocuments": [
    "https://example.com/docs/completion-certificate.pdf"
  ],
  "startDate": "May 2025",
  "completionDate": "March 2026",
  "pricePerSqft": "₹2,000 per sq.ft",
  "developmentStage": "100% Complete",
  "planningPictures": [
    "1LKAwd5bWGCbqRgX0ZK2FzCIXkjnFgEkn"
  ],
  "layoutImages": [
    "1LKAwd5bWGCbqRgX0ZK2FzCIXkjnFgEkn"
  ],
  "beforeDevelopmentImages": [
    "1LKAwd5bWGCbqRgX0ZK2FzCIXkjnFgEkn"
  ],
  "currentSiteImages": [
    "1LKAwd5bWGCbqRgX0ZK2FzCIXkjnFgEkn"
  ],
  "completionRenderImages": [
    "1LKAwd5bWGCbqRgX0ZK2FzCIXkjnFgEkn"
  ],
  "insideViewImages": [
    "1LKAwd5bWGCbqRgX0ZK2FzCIXkjnFgEkn"
  ],
  "outsideViewImages": [
    "1LKAwd5bWGCbqRgX0ZK2FzCIXkjnFgEkn",
    "1sk8LgBD_7xRxDxlJIjG3myhRas7INoPS",
    "1raEvFZRF8iX8NxCV1hpuKy3jlc29xreJ",
    "1RMBapWeoWgod1WHl5b2Wsz_3F2Fps6QI",
    "1gRVGkMogNHtojFFD5kmUarlKBC77l3D3"
  ],
  "totalArea": "650 Sq.ft",
  "noOfFloors": 1,
  "noOfBedrooms": "1 BHK",
  "noOfBathrooms": "1",
  "balconyArea": "32 Sq.ft",
  "carpetArea": "700 Sq.ft",
  "builtUpArea": "650 Sq.ft",
  "createdAt": {
    "$date": "2026-03-26T19:22:03.438Z"
  }
},
  {
    title: 'Balaji Nagar Plots',
    description: 'Spacious residential plots in prime location of Parola. Excellent for building your dream home. Well-planned layout with all modern facilities and infrastructure.',
    location: 'Parola, Dist. Jalgaon',
    type: 'Land',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1549887534-f3bda62ae975?w=600&h=400&fit=crop',
    totalUnits: 36,
    availableUnits: 8,
    soldUnits: 28,
    priceRange: '₹30 - 50 Lakh',
    currentPrice: '₹30 Lakh - ₹50 Lakh',
    futurePrice: '₹40 Lakh - ₹60 Lakh',
    reraNumber: 'PRM/MH/RERA/3001/2023',
    startDate: 'January 2023',
    completionDate: 'June 2024',
    developmentStage: '100% Complete',
    pricePerSqft: '₹3,500 per sq.ft',
    totalArea: '1,500 Sq.ft',
    noOfFloors: 0,
    noOfBedrooms: 'N/A',
    noOfBathrooms: 'N/A',
    balconyArea: 'N/A',
    carpetArea: 'N/A',
    builtUpArea: 'N/A',
    planningPictures: [
      'https://images.unsplash.com/photo-1549887534-f3bda62ae975?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop'
    ],
    layoutImages: [
      'https://images.unsplash.com/photo-1541123603104-852f7e8057f0?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1605276374104-dee2a0db896d?w=500&h=400&fit=crop'
    ],
    beforeDevelopmentImages: [
      'https://images.unsplash.com/photo-1582268611471-716ecbe3060e?w=500&h=400&fit=crop'
    ],
    currentSiteImages: [
      'https://images.unsplash.com/photo-1549887534-f3bda62ae975?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578992220575-2b9938810129?w=500&h=400&fit=crop'
    ],
    completionRenderImages: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop'
    ],
    insideViewImages: [
      'https://images.unsplash.com/photo-1504437261749-3ef45a1b9d96?w=500&h=400&fit=crop'
    ],
    outsideViewImages: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop'
    ],
    amenities: [
      'Well-Planned Layout', 'Drainage System', 'Electric Lines', 'Water Connections', '24/7 Security',
      'Boundary Wall', 'Street Lights', 'Green Space', 'Community Center', 'Temple Area'
    ],
    legalDocuments: ['https://example.com/docs/completion-certificate.pdf', 'https://example.com/docs/rera-registration.pdf']
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connected');

    console.log('Clearing existing projects...');
    await Project.deleteMany({});
    console.log('✓ Cleared existing projects');

    console.log('Inserting sample projects...');
    const inserted = await Project.insertMany(sample_projects);
    console.log(`✓ Inserted ${inserted.length} sample projects:\n`);

    inserted.forEach((project, index) => {
      console.log(`  ${index + 1}. ${project.title} (ID: ${project._id})`);
      console.log(`     Status: ${project.status}, Units: ${project.totalUnits}`);
    });

    console.log('\n✓ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
