// =============================================
//   DEFAULT DATA — Seeds storage on first load
// =============================================

const DEFAULT_CATEGORIES = [
  { id:'bearings',   name:'Bearings',           icon:'🔩' },
  { id:'vbelts',     name:'V-Belts & Chains',   icon:'🔄' },
  { id:'tools',      name:'Power Tools',         icon:'🔧' },
  { id:'handtools',  name:'Hand Tools',          icon:'🪛' },
  { id:'electrical', name:'Electrical',          icon:'⚡' },
  { id:'fasteners',  name:'Fasteners',           icon:'🔗' },
  { id:'pneumatic',  name:'Pneumatic',           icon:'💨' },
  { id:'safety',     name:'Safety Equipment',    icon:'🦺' },
];

const DEFAULT_PRODUCTS = [
  // BEARINGS
  {
    id:1, code:'BRG-6205-ZZ', name:'Deep Groove Ball Bearing 6205 ZZ',
    brand:'SKF / NSK', category:'bearings', icon:'🔩', price:'₹120', badge:'POPULAR',
    tags:['25x52x15','Double Shield','Chrome Steel'],
    description:'High-quality deep groove ball bearing with double metal shield (ZZ). Suitable for electric motors, gearboxes, and general machinery. Low noise, long life.',
    specs:[
      {label:'Bore Diameter',value:'25 mm'},{label:'Outer Diameter',value:'52 mm'},
      {label:'Width',value:'15 mm'},{label:'Type',value:'Deep Groove, Double Shield'},
      {label:'Speed Rating',value:'12,000 RPM'},{label:'Material',value:'Chrome Steel GCr15'},
    ],
    image:null, sizeChart:null
  },
  {
    id:2, code:'BRG-NU205', name:'Cylindrical Roller Bearing NU205',
    brand:'FAG / NTN', category:'bearings', icon:'🔩', price:'₹380', badge:'',
    tags:['25x52x15','Heavy Load','Single Row'],
    description:'Single row cylindrical roller bearing for high radial loads. Ideal for pumps, compressors, and heavy machinery.',
    specs:[
      {label:'Bore Diameter',value:'25 mm'},{label:'Outer Diameter',value:'52 mm'},
      {label:'Width',value:'15 mm'},{label:'Load Rating',value:'22.4 kN Dynamic'},
    ],
    image:null, sizeChart:null
  },
  {
    id:3, code:'BRG-30305', name:'Tapered Roller Bearing 30305',
    brand:'Timken', category:'bearings', icon:'🔩', price:'₹560', badge:'HEAVY DUTY',
    tags:['25x62x17','Tapered','Axial Load'],
    description:'Tapered roller bearing for combined radial and axial loads. Widely used in automotive gearboxes and industrial machinery.',
    specs:[
      {label:'Bore Diameter',value:'25 mm'},{label:'Outer Diameter',value:'62 mm'},
      {label:'Width',value:'17 mm'},{label:'Contact Angle',value:'12°'},
    ],
    image:null, sizeChart:null
  },
  // V-BELTS
  {
    id:4, code:'VB-A-SERIES', name:'V-Belt A-Series (Classical)',
    brand:'Gates / Fenner / Bando', category:'vbelts', icon:'🔄', price:'₹85–₹420',
    badge:'ALL SIZES',
    tags:['A-Section','Classical','Industrial'],
    description:'Classical A-section V-belts for light to medium duty industrial drives. All standard sizes available. Please specify belt number when ordering.',
    specs:[
      {label:'Section',value:'A (13 × 8 mm)'},{label:'Material',value:'Rubber + Polyester Cord'},
      {label:'Temperature Range',value:'-30°C to +80°C'},{label:'Standard',value:'IS:1370 / DIN 2215'},
    ],
    image:null,
    sizeChart:{
      columns:['Belt No.','Outside Length (mm)','Inside Length (mm)','Price (₹)'],
      rows:[
        ['A-20','533','508','85'],['A-22','584','559','90'],['A-24','635','610','95'],
        ['A-26','686','660','100'],['A-28','737','711','105'],['A-30','787','762','110'],
        ['A-32','838','813','115'],['A-34','889','864','120'],['A-36','940','914','125'],
        ['A-38','991','965','130'],['A-40','1041','1016','135'],['A-42','1092','1067','140'],
        ['A-44','1143','1118','148'],['A-46','1194','1168','155'],['A-48','1245','1219','162'],
        ['A-50','1295','1270','168'],['A-52','1346','1321','175'],['A-54','1397','1372','182'],
        ['A-56','1448','1422','190'],['A-58','1499','1473','198'],['A-60','1549','1524','205'],
        ['A-68','1753','1727','240'],['A-72','1854','1829','265'],['A-78','2007','1981','295'],
        ['A-80','2057','2032','310'],['A-90','2311','2286','360'],['A-96','2464','2438','395'],
        ['A-100','2565','2540','420'],
      ]
    }
  },
  {
    id:5, code:'VB-B-SERIES', name:'V-Belt B-Series (Classical)',
    brand:'Gates / Fenner / Bando', category:'vbelts', icon:'🔄', price:'₹110–₹620',
    badge:'ALL SIZES',
    tags:['B-Section','Classical','Medium Duty'],
    description:'Classical B-section V-belts for medium to heavy duty drives. Higher power transmission than A-section. Available in all standard sizes.',
    specs:[
      {label:'Section',value:'B (17 × 11 mm)'},{label:'Material',value:'Rubber + Polyester Cord'},
      {label:'Power Range',value:'Higher than A-Series'},{label:'Standard',value:'IS:1370 / DIN 2215'},
    ],
    image:null,
    sizeChart:{
      columns:['Belt No.','Outside Length (mm)','Inside Length (mm)','Price (₹)'],
      rows:[
        ['B-30','787','762','110'],['B-32','838','813','118'],['B-34','889','864','126'],
        ['B-36','940','914','134'],['B-38','991','965','142'],['B-40','1041','1016','150'],
        ['B-42','1092','1067','158'],['B-44','1143','1118','166'],['B-46','1194','1168','175'],
        ['B-48','1245','1219','184'],['B-50','1295','1270','193'],['B-52','1346','1321','202'],
        ['B-54','1397','1372','211'],['B-56','1448','1422','220'],['B-60','1549','1524','238'],
        ['B-64','1651','1626','257'],['B-68','1753','1727','278'],['B-72','1854','1829','299'],
        ['B-78','2007','1981','330'],['B-80','2057','2032','345'],['B-84','2159','2134','370'],
        ['B-90','2311','2286','410'],['B-96','2464','2438','455'],['B-100','2565','2540','490'],
        ['B-105','2667','2642','530'],['B-110','2819','2794','560'],['B-120','3073','3048','620'],
      ]
    }
  },
  {
    id:6, code:'VB-C-SERIES', name:'V-Belt C-Series (Classical)',
    brand:'Gates / Fenner', category:'vbelts', icon:'🔄', price:'₹220–₹1100',
    badge:'HEAVY DUTY',
    tags:['C-Section','Classical','Heavy Duty'],
    description:'C-section V-belts for heavy duty industrial drives with high power requirements. Suitable for compressors, pumps, and large motors.',
    specs:[
      {label:'Section',value:'C (22 × 14 mm)'},{label:'Material',value:'Rubber + Steel Cord'},
      {label:'Application',value:'Heavy Industrial Drives'},{label:'Standard',value:'IS:1370'},
    ],
    image:null,
    sizeChart:{
      columns:['Belt No.','Outside Length (mm)','Inside Length (mm)','Price (₹)'],
      rows:[
        ['C-40','1041','1016','220'],['C-42','1092','1067','235'],['C-45','1168','1143','255'],
        ['C-48','1245','1219','275'],['C-50','1295','1270','290'],['C-54','1397','1372','320'],
        ['C-60','1549','1524','365'],['C-68','1753','1727','420'],['C-72','1854','1829','455'],
        ['C-78','2007','1981','505'],['C-80','2057','2032','525'],['C-90','2311','2286','600'],
        ['C-96','2464','2438','650'],['C-100','2565','2540','685'],['C-105','2667','2642','730'],
        ['C-112','2870','2845','790'],['C-120','3073','3048','855'],['C-128','3277','3251','920'],
        ['C-136','3480','3454','985'],['C-144','3683','3658','1060'],['C-150','3835','3810','1100'],
      ]
    }
  },
  // POWER TOOLS
  {
    id:7, code:'PT-DRL-13', name:'13mm Impact Drill Machine 750W',
    brand:'Bosch / Makita', category:'tools', icon:'🔧', price:'₹2,800', badge:'BESTSELLER',
    tags:['750W','Impact','Variable Speed'],
    description:'Heavy-duty 13mm impact drill with variable speed trigger and forward/reverse function. Suitable for drilling through concrete, wood, and metal.',
    specs:[
      {label:'Power',value:'750 W'},{label:'No-load Speed',value:'0–2800 RPM'},
      {label:'Chuck Size',value:'13 mm'},{label:'Voltage',value:'230V / 50Hz'},
      {label:'Weight',value:'2.1 kg'},
    ],
    image:null, sizeChart:null
  },
  {
    id:8, code:'PT-AG-100', name:'4" Angle Grinder 850W',
    brand:'Bosch / Dewalt', category:'tools', icon:'🔧', price:'₹1,950', badge:'',
    tags:['850W','100mm','11000 RPM'],
    description:'Compact 4-inch angle grinder for cutting, grinding, and polishing. Ergonomic side handle with spindle lock for fast disc changes.',
    specs:[
      {label:'Power',value:'850 W'},{label:'Disc Diameter',value:'100 mm (4")'},
      {label:'Speed',value:'11,000 RPM'},{label:'Weight',value:'1.7 kg'},
    ],
    image:null, sizeChart:null
  },
  // ELECTRICAL
  {
    id:9, code:'EL-MCB-32A', name:'MCB 32A Single Pole C-Curve',
    brand:'Legrand / Siemens', category:'electrical', icon:'⚡', price:'₹220', badge:'FAST MOVING',
    tags:['32A','Single Pole','6kA'],
    description:'Single pole MCB 32A C-curve for overload and short circuit protection. IS/IEC 60898 certified.',
    specs:[
      {label:'Current Rating',value:'32 A'},{label:'Poles',value:'1 Pole'},
      {label:'Curve',value:'C-Curve'},{label:'Breaking Capacity',value:'6 kA'},
      {label:'Voltage',value:'240V AC'},
    ],
    image:null, sizeChart:null
  },
  {
    id:10, code:'EL-CONT-25A', name:'Contactor 25A 3-Pole AC3',
    brand:'L&T / Schneider', category:'electrical', icon:'⚡', price:'₹840', badge:'',
    tags:['25A','3-Phase','Motor Control'],
    description:'3-pole AC contactor 25A for motor control and power switching. Suitable for DOL starters and star-delta starters.',
    specs:[
      {label:'Current Rating',value:'25 A'},{label:'Poles',value:'3 Pole'},
      {label:'Coil Voltage',value:'230V / 415V AC'},{label:'Aux Contact',value:'1NO + 1NC'},
    ],
    image:null, sizeChart:null
  },
  // FASTENERS
  {
    id:11, code:'FT-HB-M12', name:'Hex Bolt M12×50 Grade 8.8',
    brand:'Unbrako / Generic', category:'fasteners', icon:'🔗', price:'₹18/pc', badge:'',
    tags:['M12×50','Grade 8.8','HDG Coated'],
    description:'M12×50mm hex bolt, Grade 8.8 high tensile with hot-dip galvanized coating. Available loose or in bulk packs.',
    specs:[
      {label:'Size',value:'M12 × 50 mm'},{label:'Grade',value:'8.8 High Tensile'},
      {label:'Finish',value:'Hot Dip Galvanized'},{label:'Thread Pitch',value:'1.75 mm'},
    ],
    image:null, sizeChart:null
  },
  // SAFETY
  {
    id:12, code:'SF-HELM-01', name:'Safety Helmet IS:2925 Certified',
    brand:'3M / Karam', category:'safety', icon:'🦺', price:'₹185', badge:'PPE',
    tags:['IS:2925','ABS Shell','Ratchet'],
    description:'Industrial safety helmet with high-impact ABS shell and ratchet adjustment system. Meets IS:2925 and EN 397 standards.',
    specs:[
      {label:'Standard',value:'IS:2925 / EN 397'},{label:'Shell',value:'ABS High Impact'},
      {label:'Adjustment',value:'Ratchet 51–62 cm'},{label:'Colors',value:'White, Yellow, Orange, Blue'},
    ],
    image:null, sizeChart:null
  },
];

// ---- INIT: Seed data on first ever load ----
function initData() {
  if (!Storage.getCategories()) {
    Storage.saveCategories(DEFAULT_CATEGORIES);
  }
  if (!Storage.getProducts()) {
    Storage.saveProducts(DEFAULT_PRODUCTS);
  }
}

function resetAllData() {
  Storage.resetAll();
  Storage.saveCategories(DEFAULT_CATEGORIES);
  Storage.saveProducts(DEFAULT_PRODUCTS);
}

initData();
