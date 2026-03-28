// Seed script to populate database with sample projects
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Project = require('./models/Project');

const sample_projects = [
  {
    title: 'Balaji Bungalows - Phase 1',
    description: 'Premium 5 BHK bungalows with modern amenities and spacious layouts. Designed for families looking for luxury living in a gated community.',
    location: 'Whitefield, Bangalore',
    type: 'Bungalow',
    status: 'Ongoing',
    image: 'https://picsum.photos/600/400?random=proj1',
    totalUnits: 12,
    availableUnits: 5,
    soldUnits: 7,
    priceRange: '₹2.5 - 3.5 Cr',
    currentPrice: '₹2.5 Cr - ₹3.5 Cr',
    futurePrice: '₹3.0 Cr - ₹4.0 Cr',
    reraNumber: 'PRM/KA/RERA/1001/2020',
    startDate: 'January 2022',
    completionDate: 'December 2024',
    developmentStage: '65% Complete',
    pricePerSqft: '₹12,000 per sq.ft',
    totalArea: '15,000 Sq.ft',
    noOfFloors: 2,
    noOfBedrooms: '5 BHK',
    noOfBathrooms: '6',
    balconyArea: '800 Sq.ft',
    carpetArea: '4,800 Sq.ft',
    builtUpArea: '5,500 Sq.ft',
    planningPictures: [
      'https://picsum.photos/500/400?random=plan1',
      'https://picsum.photos/500/400?random=plan2'
    ],
    layoutImages: [
      'https://picsum.photos/500/400?random=layout1',
      'https://picsum.photos/500/400?random=layout2',
      'https://picsum.photos/500/400?random=layout3'
    ],
    beforeDevelopmentImages: [
      'https://picsum.photos/500/400?random=before1',
      'https://picsum.photos/500/400?random=before2'
    ],
    currentSiteImages: [
      'https://picsum.photos/500/400?random=current1',
      'https://picsum.photos/500/400?random=current2',
      'https://picsum.photos/500/400?random=current3'
    ],
    completionRenderImages: [
      'https://picsum.photos/500/400?random=render1',
      'https://picsum.photos/500/400?random=render2'
    ],
    insideViewImages: [
      'https://picsum.photos/500/400?random=inside1',
      'https://picsum.photos/500/400?random=inside2'
    ],
    outsideViewImages: [
      'https://picsum.photos/500/400?random=outside1',
      'https://picsum.photos/500/400?random=outside2'
    ],
    amenities: [
      'Gated Community',
      'Swimming Pool',
      'Gym & Yoga Center',
      'Community Hall',
      '24/7 Security',
      'Landscaped Gardens',
      'Car Parking',
      'Power Backup',
      'Water Harvesting',
      'Solar Panels'
    ],
    legalDocuments: [
      'https://example.com/docs/project-approval.pdf',
      'https://example.com/docs/rera-registration.pdf',
      'https://example.com/docs/layout-plan.pdf'
    ]
  },

  {
    title: 'Balaji Row Houses - Premium Series',
    description: 'Stylish 3 & 4 BHK row houses with contemporary design. Perfect for investors and homebuyers seeking modern living spaces.',
    location: 'Navrangpura, Ahmedabad',
    type: 'Row House',
    status: 'Upcoming',
    image: 'https://picsum.photos/600/400?random=proj2',
    totalUnits: 24,
    availableUnits: 18,
    soldUnits: 6,
    priceRange: '₹80 - 120 Lakh',
    currentPrice: '₹80 Lakh - ₹120 Lakh',
    futurePrice: '₹95 Lakh - ₹140 Lakh',
    reraNumber: 'PRM/GJ/RERA/2001/2023',
    startDate: 'Coming Soon - June 2024',
    completionDate: 'June 2026',
    developmentStage: 'Planning Phase',
    pricePerSqft: '₹8,000 per sq.ft',
    totalArea: '2,500 Sq.ft',
    noOfFloors: 2,
    noOfBedrooms: '3-4 BHK',
    noOfBathrooms: '3-4',
    balconyArea: '300 Sq.ft',
    carpetArea: '1,500 Sq.ft',
    builtUpArea: '1,800 Sq.ft',
    planningPictures: [
      'https://picsum.photos/500/400?random=plan3',
      'https://picsum.photos/500/400?random=plan4'
    ],
    layoutImages: [
      'https://picsum.photos/500/400?random=layout4',
      'https://picsum.photos/500/400?random=layout5'
    ],
    beforeDevelopmentImages: [
      'https://picsum.photos/500/400?random=before3'
    ],
    currentSiteImages: [],
    completionRenderImages: [
      'https://picsum.photos/500/400?random=render3',
      'https://picsum.photos/500/400?random=render4'
    ],
    insideViewImages: [
      'https://picsum.photos/500/400?random=inside3'
    ],
    outsideViewImages: [
      'https://picsum.photos/500/400?random=outside3'
    ],
    amenities: [
      'Gated Society',
      'Landscaping',
      'Car Parking',
      '24/7 Security',
      'Water Storage',
      'Community Spaces'
    ],
    legalDocuments: [
      'https://example.com/docs/project-approval.pdf'
    ]
  },

  {
    title: 'Balaji Luxury Apartments',
    description: 'Sophisticated 2, 3 & 4 BHK apartments with premium finishes. Located in a prime location with excellent connectivity.',
    location: 'Indiranagar, Bangalore',
    type: 'Mixed',
    status: 'Completed',
    image: 'https://picsum.photos/600/400?random=proj3',
    totalUnits: 36,
    availableUnits: 0,
    soldUnits: 36,
    priceRange: '₹1.2 - 2.5 Cr',
    currentPrice: '₹1.2 Cr - ₹2.5 Cr',
    futurePrice: 'Sold Out',
    reraNumber: 'PRM/KA/RERA/1502/2019',
    startDate: 'March 2019',
    completionDate: 'August 2023',
    developmentStage: '100% Complete',
    pricePerSqft: '₹10,000 per sq.ft',
    totalArea: '2,200 Sq.ft',
    noOfFloors: 20,
    noOfBedrooms: '2-4 BHK',
    noOfBathrooms: '2-4',
    balconyArea: '400 Sq.ft',
    carpetArea: '1,200 Sq.ft',
    builtUpArea: '1,600 Sq.ft',
    planningPictures: [
      'https://picsum.photos/500/400?random=plan5',
      'https://picsum.photos/500/400?random=plan6'
    ],
    layoutImages: [
      'https://picsum.photos/500/400?random=layout6',
      'https://picsum.photos/500/400?random=layout7'
    ],
    beforeDevelopmentImages: [
      'https://picsum.photos/500/400?random=before4'
    ],
    currentSiteImages: [
      'https://picsum.photos/500/400?random=current4'
    ],
    completionRenderImages: [
      'https://picsum.photos/500/400?random=render5',
      'https://picsum.photos/500/400?random=render6'
    ],
    insideViewImages: [
      'https://picsum.photos/500/400?random=inside4',
      'https://picsum.photos/500/400?random=inside5'
    ],
    outsideViewImages: [
      'https://picsum.photos/500/400?random=outside4',
      'https://picsum.photos/500/400?random=outside5'
    ],
    amenities: [
      'Swimming Pool',
      'Gym',
      'Yoga Center',
      'Community Hall',
      '24/7 Security',
      'Video Intercom',
      'Power Backup',
      'Parking',
      'Landscape Garden',
      'Sewage Treatment Plant'
    ],
    legalDocuments: [
      'https://example.com/docs/completion-certificate.pdf',
      'https://example.com/docs/rera-registration.pdf'
    ]
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing projects
    await Project.deleteMany({});
    console.log('✓ Cleared existing projects');

    // Insert sample projects
    const inserted = await Project.insertMany(sample_projects);
    console.log(`✓ Inserted ${inserted.length} sample projects`);

    inserted.forEach(project => {
      console.log(`  - ${project.title} (${project.status})`);
    });

    console.log('\n✓ Database seeding completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
