export type WatchCategory = 'Perpetual Dress' | 'Chronograph' | 'Openworked' | 'Sport Diver';

export interface WatchReference {
  id: string;
  reference: string;
  name: string;
  subtitle: string;
  category: WatchCategory;
  caliber: string;
  powerReserve: string;
  frequency: string;
  diameter: string;
  thickness: string;
  caseMaterial: string;
  waterResistance: string;
  jewels: number;
  price: number;
  editionNote: string;
  image: string;
  description: string;
  strapOptions: string[];
  highlights: string[];
}

export const WATCH_CATALOG: WatchReference[] = [
  {
    id: 'sovereign-platinum-i',
    reference: 'HK-01-PT',
    name: 'Sovereign Automatic I',
    subtitle: '950 Platinum · Anthracite Sunray',
    category: 'Perpetual Dress',
    caliber: 'Caliber HK-01 Automatic',
    powerReserve: '72 Hours',
    frequency: '28,800 vph (4 Hz)',
    diameter: '40.0 mm',
    thickness: '8.9 mm',
    caseMaterial: 'Solid 950 Platinum',
    waterResistance: '50 m',
    jewels: 31,
    price: 48500,
    editionNote: 'Flagship Reference',
    image: '/src/assets/images/watch_sovereign_platinum_1794891531950.jpg',
    description:
      'The cornerstone of Home of King’s. Hand-finished in solid 950 platinum with a deep anthracite sunray dial, recessed small-seconds register, and twin-barrel automatic architecture engineered for three full days of autonomous precision.',
    strapOptions: ['Obsidian Alligator · PT950 Clasp', 'Slate Matte Calfskin', '950 Platinum Integrated Link'],
    highlights: [
      'Solid 950 platinum stepped bezel with hand-chamfered lugs',
      'Bidirectional tungsten-platinum micro-rotor winding system',
      'Free-sprung balance wheel regulated across six positions (-1/+2 s/day)',
    ],
  },
  {
    id: 'monarch-chronograph',
    reference: 'HK-04-CHR',
    name: 'Monarch Flyback Chronograph',
    subtitle: '950 Platinum · Twin-Register Slate',
    category: 'Chronograph',
    caliber: 'Caliber HK-04 Column-Wheel',
    powerReserve: '68 Hours',
    frequency: '36,000 vph (5 Hz)',
    diameter: '41.5 mm',
    thickness: '11.4 mm',
    caseMaterial: 'Brushed 950 Platinum',
    waterResistance: '100 m',
    jewels: 38,
    price: 62000,
    editionNote: '5 Hz High-Beat',
    image: '/src/assets/images/watch_monarch_chronograph_1794891531515.jpg',
    description:
      'An integrated column-wheel automatic flyback chronograph sculpted from brushed 950 platinum. Twin guilloché subdials and knurled rectangular pushers deliver effortless tenth-of-a-second mechanical actuation.',
    strapOptions: ['Charcoal Hand-Stitched Alligator', 'Anthracite Cordovan', '950 Platinum Brushed Bracelet'],
    highlights: [
      'Vertical clutch and column-wheel architecture for zero-jump start',
      'Instantaneous flyback reset via single pusher depression',
      'High-frequency 5 Hz escapement for chronometric stability',
    ],
  },
  {
    id: 'regent-openworked',
    reference: 'HK-07-SKL',
    name: 'Regent Openworked Automatic',
    subtitle: '950 Platinum · Skeletonized Bridges',
    category: 'Openworked',
    caliber: 'Caliber HK-07 Architectural',
    powerReserve: '70 Hours',
    frequency: '28,800 vph (4 Hz)',
    diameter: '41.0 mm',
    thickness: '9.6 mm',
    caseMaterial: '950 Platinum · Integrated Bracelet',
    waterResistance: '50 m',
    jewels: 29,
    price: 78500,
    editionNote: 'Limited Atelier Run',
    image: '/src/assets/images/watch_regent_skeleton_1794891532597.jpg',
    description:
      'Architectural transparency meets sovereign mass. Every rhodium-plated bridge in the Caliber HK-07 is hand-beveled with 45-degree interior angles, exposing the full automatic winding train and oscillating balance.',
    strapOptions: ['950 Platinum Integrated Bracelet', 'Obsidian Vulcanized Rubber', 'Slate Alligator Strap'],
    highlights: [
      '142 hand-chamfered interior angles across mainplate and bridges',
      'Peripheral 950 platinum winding ring preserving unobstructed dial view',
      'Sapphire front and exhibition back with double anti-reflective coating',
    ],
  },
  {
    id: 'imperator-perpetual',
    reference: 'HK-09-PER',
    name: 'Imperator Perpetual Calendar',
    subtitle: '950 Platinum · Smoked Silver Moonphase',
    category: 'Perpetual Dress',
    caliber: 'Caliber HK-09 Perpetual',
    powerReserve: '72 Hours',
    frequency: '21,600 vph (3 Hz)',
    diameter: '40.5 mm',
    thickness: '10.2 mm',
    caseMaterial: 'Polished 950 Platinum',
    waterResistance: '30 m',
    jewels: 41,
    price: 94000,
    editionNote: 'Grand Complication',
    image: '/src/assets/images/watch_imperator_perpetual_1794891533229.jpg',
    description:
      'Mechanically programmed until the year 2100. The Imperator pairs a smoked rhodium-grey dial with an astronomical moonphase accurate to one day in 122 years and an intuitive power-reserve arc.',
    strapOptions: ['Black Mississippiensis Alligator', 'Midnight Slate Calfskin'],
    highlights: [
      'Automatic perpetual calendar with leap-year and 122-year moonphase',
      'Recessed case correctors for effortless single-stylus adjustment',
      'Hand-engraved solid platinum rotor visible through sapphire caseback',
    ],
  },
  {
    id: 'crown-diver-300',
    reference: 'HK-05-DIV',
    name: 'Crown Diver Automatic 300M',
    subtitle: '950 Platinum · Ceramic Unidirectional',
    category: 'Sport Diver',
    caliber: 'Caliber HK-05 Marine',
    powerReserve: '72 Hours',
    frequency: '28,800 vph (4 Hz)',
    diameter: '41.0 mm',
    thickness: '11.8 mm',
    caseMaterial: 'Brushed 950 Platinum & Ceramic',
    waterResistance: '300 m',
    jewels: 28,
    price: 54000,
    editionNote: '300M Certified',
    image: '/src/assets/images/watch_crown_diver_1794891533772.jpg',
    description:
      'Rare 950 platinum engineered for deep immersion. A 120-click matte black ceramic bezel, tri-gasket screw-down crown, and anti-magnetic silicon hairspring ensure unwavering reliability from boardroom to fathom line.',
    strapOptions: ['950 Platinum Oyster-Style Bracelet', 'Matte Black FKM Marine Strap'],
    highlights: [
      'Silicon hairspring with 15,000-gauss magnetic resistance',
      'Micro-adjusting platinum diver clasp with 6 mm tool-free extension',
      'Super-LumiNova BGW9 indices set in platinum surrounds',
    ],
  },
  {
    id: 'atelier-dress-38',
    reference: 'HK-02-ATL',
    name: 'Atelier Ultrathin 38mm',
    subtitle: '950 Platinum · Vertical Brushed Silver',
    category: 'Perpetual Dress',
    caliber: 'Caliber HK-02 Micro-Rotor',
    powerReserve: '65 Hours',
    frequency: '28,800 vph (4 Hz)',
    diameter: '38.0 mm',
    thickness: '7.4 mm',
    caseMaterial: '950 Platinum',
    waterResistance: '30 m',
    jewels: 29,
    price: 44500,
    editionNote: '7.4 mm Ultrathin',
    image: '/src/assets/images/watch_atelier_dress_1794891534787.jpg',
    description:
      'Pure proportion in 38 millimeters. Its vertical hand-brushed silver-platinum dial catches ambient light like silk, powered by an ultra-slim micro-rotor automatic caliber that slips effortlessly beneath a bespoke cuff.',
    strapOptions: ['Slate French Calfskin · PT950 Pin Buckle', 'Obsidian Alligator'],
    highlights: [
      '7.4 mm total case height housing a full automatic micro-rotor movement',
      'Vertical satin-brushed solid silver dial with diamond-cut hands',
      'Hallmarked 950 platinum tang buckle sculpted in-house',
    ],
  },
];

export const HERO_IMAGE = '/src/assets/images/hero_sovereign_platinum_1794891531410.jpg';
export const CALIBER_MACRO_IMAGE = '/src/assets/images/caliber_macro_movement_1794891557791.jpg';

export interface CaliberPillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export const CALIBER_PILLARS: CaliberPillar[] = [
  {
    id: 'platinum-case',
    index: '01',
    title: '950 Platinum Metallurgy',
    subtitle: 'Cold-forged sovereign density',
    description:
      'Every Home of King’s case is machined from 95% pure platinum alloyed with ruthenium for heightened surface hardness. Mirror-polished chamfers meet satin-brushed flanks—demanding three times the CNC and hand-lap hours of 18k gold.',
    metrics: [
      { label: 'Alloy Purity', value: '950 Pt / 50 Ru' },
      { label: 'Specific Density', value: '21.45 g/cm3' },
      { label: 'Case Finishing', value: '34 Hand Hours' },
      { label: 'Tarnish Resistance', value: 'Perpetual' },
    ],
  },
  {
    id: 'twin-barrel',
    index: '02',
    title: 'Twin-Barrel Automatic Rotor',
    subtitle: '72-hour constant-torque reserve',
    description:
      'Our proprietary bidirectional winding architecture channels wrist motion through ceramic ball bearings into twin series-coupled mainspring barrels, flattening torque delivery so amplitude stays rock-steady across a full weekend off the wrist.',
    metrics: [
      { label: 'Autonomy', value: '72 Hours' },
      { label: 'Beat Rate', value: '28,800 vph' },
      { label: 'Daily Variance', value: '-1 / +2 sec' },
      { label: 'Winding Mass', value: '950 Pt Sector' },
    ],
  },
  {
    id: 'guilloche-dial',
    index: '03',
    title: 'Engine-Turned Dial Craft',
    subtitle: 'Micro-faceted light modulation',
    description:
      'Rather than flat printed surfaces, our dials undergo traditional rose-engine guilloché and vertical satin brushing before galvanic anthracite or silver-rhodium plating—creating living shadows that never appear identical twice.',
    metrics: [
      { label: 'Dial Base', value: 'Solid 925 Ag' },
      { label: 'Facet Angle', value: '45 deg Diamond' },
      { label: 'Lume Grade', value: 'BGW9 Platinum' },
      { label: 'Crystal', value: 'Box Sapphire' },
    ],
  },
  {
    id: 'exhibition-bridge',
    index: '04',
    title: 'Geneva-Striped Exhibition Bridge',
    subtitle: 'Unobstructed mechanical theatre',
    description:
      'Through the screw-down sapphire caseback, Côtes de Genève ribbing radiates across rhodium-plated German silver bridges alongside flame-blued steel screws, gold chatons, and a free-sprung balance wheel with Breguet overcoil.',
    metrics: [
      { label: 'Bridge Metal', value: 'Maillechort' },
      { label: 'Jewel Bearings', value: '29 to 41 Rubies' },
      { label: 'Interior Angles', value: 'Hand Beveled' },
      { label: 'Adjustment', value: '6 Positions' },
    ],
  },
];
