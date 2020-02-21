import { IShift } from "../types"


export const usershifts = <IShift[]>[
  {
    start: '0600',
    end: '1000'
  },
  {
    start: '1600',
    end: '2000'
  }
];

export const globalShiftList = <IShift[]>[
  {
    start: '0000',
    end: '2359'
  },
  {
    start: '0600',
    end: '1800'
  },
  {
    start: '0000',
    end: '1200'
  },
  {
    start: '0600',
    end: '1200'
  },
  {
    start: '1800',
    end: '2359'
  },
  {
    start: '0000',
    end: '0600'
  },
  {
    start: '1200',
    end: '2359'
  },
  {
    start: '1200',
    end: '1800'
  }
];