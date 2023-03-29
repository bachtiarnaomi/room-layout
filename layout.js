import {
  getDifference,
  getIntersection,
  getOffset,
  thicken,
  thickenEdge,
} from './clipper/clipper-tools.js';
console.log('get offset', getOffset);

const state = {
  boundary: {
    x: 50,
    y: 100,
    w: 300,
    h: 200,
  },
  rooms: [
    {
      width: 236.2204724409449,
      height: 196.8503937007874,
      name: 'Patient Lounge',
      type: 'Patient Lounge',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 30,
      targetTotal: 30,
    },
    {
      width: 215,
      height: 215,
      name: 'Workstations',
      type: 'Workstations',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 9,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 30,
      targetTotal: 30,
    },
    {
      width: 165.35433070866142,
      height: 192.91338582677167,
      name: '1 Bed Room - Bariatric',
      type: '1 Bed Room - Bariatric',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 20,
      targetTotal: 20,
    },
    {
      width: 165.35433070866142,
      height: 192.91338582677167,
      name: '1 Bed Room - Special',
      type: '1 Bed Room - Special',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 20,
      targetTotal: 20,
    },
    {
      width: 133.85826771653544,
      height: 228.3464566929134,
      name: 'Medication Room',
      type: 'Medication Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 20,
      targetTotal: 20,
    },
    {
      width: 165.35433070866142,
      height: 190.94488188976376,
      name: 'Meeting Room',
      type: 'Meeting Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 9,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 20,
      targetTotal: 20,
    },
    {
      width: 165.35433070866142,
      height: 192.91338582677167,
      name: '1 Bed Room',
      type: '1 Bed Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 18,
      targetTotal: 18,
    },
    {
      width: 165.35433070866142,
      height: 192.91338582677167,
      name: '1 Bed Room',
      type: '1 Bed Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 18,
      targetTotal: 18,
    },
    {
      width: 165.35433070866142,
      height: 192.91338582677167,
      name: '1 Bed Room',
      type: '1 Bed Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 18,
      targetTotal: 18,
    },
    {
      width: 165.35433070866142,
      height: 192.91338582677167,
      name: '1 Bed Room',
      type: '1 Bed Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 18,
      targetTotal: 18,
    },
    {
      width: 165.35433070866142,
      height: 192.91338582677167,
      name: '1 Bed Room',
      type: '1 Bed Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 18,
      targetTotal: 18,
    },
    {
      width: 165.35433070866142,
      height: 192.91338582677167,
      name: '1 Bed Room',
      type: '1 Bed Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 18,
      targetTotal: 18,
    },
    {
      width: 165.35433070866142,
      height: 137.7952755905512,
      name: 'Patient Dining',
      type: 'Patient Dining',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 15,
      targetTotal: 15,
    },
    {
      width: 102.36220472440945,
      height: 212.59842519685043,
      name: 'Staff Station',
      type: 'Staff Station',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 15,
      targetTotal: 15,
    },
    {
      width: 200.78740157480314,
      height: 116.14173228346458,
      name: 'Staff Room',
      type: 'Staff Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 9,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 15,
      targetTotal: 15,
    },
    {
      width: 118.11023622047244,
      height: 157.48031496062993,
      name: 'Consult Room',
      type: 'Consult Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 7,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 12,
      targetTotal: 12,
    },
    {
      width: 106.29921259842521,
      height: 177.16535433070868,
      name: 'Dirty Utility',
      type: 'Dirty Utility',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 12,
      targetTotal: 12,
    },
    {
      width: 125.98425196850395,
      height: 125.98425196850395,
      name: 'Clean Store',
      type: 'Clean Store',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 10,
      targetTotal: 10,
    },
    {
      width: 110.23622047244095,
      height: 145.6692913385827,
      name: 'Disposal Room',
      type: 'Disposal Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 10,
      targetTotal: 10,
    },
    {
      width: 110.23622047244095,
      height: 125.98425196850395,
      name: 'Office - Num',
      type: 'Office - Num',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 9,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 9,
      targetTotal: 9,
    },
    {
      width: 86.61417322834647,
      height: 141.73228346456693,
      name: 'Quiet Room',
      type: 'Quiet Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 7,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 8,
      targetTotal: 8,
    },
    {
      width: 86.61417322834647,
      height: 141.73228346456693,
      name: 'Quiet Room',
      type: 'Quiet Room',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 7,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 8,
      targetTotal: 8,
    },
    {
      width: 96.45669291338584,
      height: 110.23622047244095,
      name: 'Toilet - Accessible',
      type: 'Toilet - Accessible',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 7,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 7,
      targetTotal: 7,
    },
    {
      width: 74.80314960629921,
      height: 129.92125984251967,
      name: 'Ensuite - Special',
      type: 'Ensuite - Special',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 7,
      targetTotal: 7,
    },
    {
      width: 100.39370078740157,
      height: 108.26771653543308,
      name: 'Ensuite - Accessible',
      type: 'Ensuite - Accessible',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 7,
      targetTotal: 7,
    },
    {
      width: 129.92125984251967,
      height: 59.05511811023622,
      name: 'Waiting - Sub',
      type: 'Waiting - Sub',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 7,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 5,
      targetTotal: 5,
    },
    {
      width: 90.55118110236221,
      height: 90.55118110236221,
      name: 'Ensuite',
      type: 'Ensuite',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 5,
      targetTotal: 5,
    },
    {
      width: 90.55118110236221,
      height: 90.55118110236221,
      name: 'Ensuite',
      type: 'Ensuite',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 5,
      targetTotal: 5,
    },
    {
      width: 90.55118110236221,
      height: 90.55118110236221,
      name: 'Ensuite',
      type: 'Ensuite',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 5,
      targetTotal: 5,
    },
    {
      width: 90.55118110236221,
      height: 90.55118110236221,
      name: 'Ensuite',
      type: 'Ensuite',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 5,
      targetTotal: 5,
    },
    {
      width: 90.55118110236221,
      height: 90.55118110236221,
      name: 'Ensuite',
      type: 'Ensuite',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 5,
      targetTotal: 5,
    },
    {
      width: 90.55118110236221,
      height: 90.55118110236221,
      name: 'Ensuite',
      type: 'Ensuite',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 8,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 5,
      targetTotal: 5,
    },
    {
      width: 159.4488188976378,
      height: 43.30708661417324,
      name: 'Bay - Beverage',
      type: 'Bay - Beverage',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 5,
      targetTotal: 5,
    },
    {
      width: 129.92125984251967,
      height: 47.24409448818898,
      name: 'Bay - Mobile Equipment',
      type: 'Bay - Mobile Equipment',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 4,
      targetTotal: 4,
    },
    {
      width: 129.92125984251967,
      height: 47.24409448818898,
      name: 'Bay - Meal Trolley',
      type: 'Bay - Meal Trolley',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 4,
      targetTotal: 4,
    },
    {
      width: 102.36220472440945,
      height: 35.43307086614173,
      name: 'Property Bay - Staff',
      type: 'Property Bay - Staff',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 9,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 4,
      targetTotal: 4,
    },
    {
      width: 64.96062992125984,
      height: 78.74015748031496,
      name: 'Toilet - Public',
      type: 'Toilet - Public',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 7,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 3,
      targetTotal: 3,
    },
    {
      width: 129.92125984251967,
      height: 47.24409448818898,
      name: 'Bay - WOW',
      type: 'Bay - WOW',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 3,
      targetTotal: 3,
    },
    {
      width: 64.96062992125984,
      height: 78.74015748031496,
      name: 'Toilet - Staff',
      type: 'Toilet - Staff',
      count: 2,
      departmentKey: 3,
      subDepartmentKey: 9,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 3,
      targetTotal: 6,
    },
    {
      width: 64.96062992125984,
      height: 78.74015748031496,
      name: 'Toilet - Staff',
      type: 'Toilet - Staff',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 9,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 3,
      targetTotal: 3,
    },
    {
      width: 82.67716535433071,
      height: 39.37007874015748,
      name: 'Bay - Banket / Fluid Warmer',
      type: 'Bay - Banket / Fluid Warmer',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 2,
      targetTotal: 2,
    },
    {
      width: 82.67716535433071,
      height: 39.37007874015748,
      name: 'Bay - Linen',
      type: 'Bay - Linen',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 2,
      targetTotal: 2,
    },
    {
      width: 74.80314960629921,
      height: 35.43307086614173,
      name: 'Bay - Resuscitation Trolley',
      type: 'Bay - Resuscitation Trolley',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 2,
      targetTotal: 2,
    },
    {
      width: 47.24409448818898,
      height: 23.62204724409449,
      name: 'Bay - HWB',
      type: 'Bay - HWB',
      count: 1,
      departmentKey: 3,
      subDepartmentKey: 10,
      dimensionsVariance: 10,
      areaVariance: 10,
      targetArea: 2,
      targetTotal: 2,
    },
  ],
  circulation: [
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  ],
  spaces: [],
  grid: [
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  ],
};
// const state = {
//   boundary: {
//     //List of coordinates
//   },
//   rooms: {
//     // list of rooms for the department
//   },
//   circulation: {
//     //grid. Contains cols and rows information
//   },
//   spaces: {
//     // list of polygons. This is the valid spaces within the department for the rooms
//   },
// };

export function offsetEdges(indexes, state) {
  // state.spaces = [];
  const { boundary } = state;
  const { x, y, w, h } = boundary;
  const boundaryCoordinates = [
    { x: x, z: y },
    { x: x + w, z: y },
    { x: x + w, z: y + h },
    { x: x, z: y + h },
  ];
  // const boundaryCoordinates = [
  //   [x, y],
  //   [x + w, y],
  //   [x + w, y + h],
  //   [x, y + h],
  // ];
  let prevSpace = [];
  let spaces = [];
  for (let i = 0; i < indexes.length - 1; i++) {
    console.log('!!!!!!!!!!!!!');
    const edge = [];
    edge.push(boundaryCoordinates[indexes[i]]);
    edge.push(boundaryCoordinates[indexes[i + 1]]);
    // console.log('polyline', polyline);
    console.log('EDGE', edge);
    const thickened = thicken(edge, 400);
    console.log('thickened', thickened);
    let space = getIntersection(thickened, boundaryCoordinates);
    console.log('intersected', space);
    // const space = getDifference(intersected, prevSpace);
    // console.log('the space', space);
    // state.spaces = [];
    console.log('space', space);
    space = reorderPoints(space);
    const converted = {
      x: space[0].x,
      y: space[0].z,
      w: space[1].x - space[0].x,
      h: space[2].z - space[1].z,
    };
    spaces.push(converted);
    console.log('spaces', spaces);
  }
  state.spaces = spaces;
  // update state.spaces
}

function getCirculation(state) {
  const { spaces, boundary } = state;
  // update state.circulation
  state.circulation = [];
}

offsetEdges([0, 1, 2], state);
function extendCirculation({ circulation, boundary }) {
  // update circulation
}

function divideSpaceIntoRooms({ spaces, rooms }) {
  // assign room.polygon
}

function getRemainingSpace({ spaces, circulation, boundary }) {
  // boolean difference. boundary - (spaces + circulation)
}

function divideSpace({ space }) {
  // split the space if it is too long.
  //updates state.space and state.circulation
}

// helper functions
function reorderPoints(points) {
  points.sort((p1, p2) => p1.z - p2.z);
  // points.sort((p1, p2) => p1.z - p2.);
  console.log('points', points);
  return points;
}
