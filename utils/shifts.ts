import { IShift, OptionObject } from "../types"
/**
 * Function that will return available shifts to user
 * @param userShifts
 * @param allShifts
 */

export function getAvailableShifts(userShifts: IShift[], allShifts: IShift[]): IShift[] {
  let availableShifts = []
  
  // we loop through the user shifts and compare start and end times
  userShifts.forEach((userShift, userIndex) => {
    const userStartDate = Number(userShift.start)
    const userEndDate = Number(userShift.end)

    
    allShifts.forEach((globalShift) => {
      const globalShiftStart = Number(globalShift.start)
      const globalShiftEnd = Number(globalShift.end)
      // the condition is if (user)startDate is smaller than (global)endDate AND (user)endDate is bigger than (global)startDate then there's conflict
      if(!(userStartDate < globalShiftEnd && userEndDate > globalShiftStart)) {
        // we are saving the available shifts per block in an object to later compare if there is one or many that the user can select from
        availableShifts.push(globalShift)
      }
    })
  })
  
  // availableShiftObj contains all available shifts and how many times were they selected 
  const availableShiftsObj = availableShifts.reduce((acc, currShift) => {
    let stringifyShift = JSON.stringify(currShift)
    // if current shift is in the final object add 1 else add it to object with the value of one
    acc[stringifyShift] = Boolean(acc[stringifyShift]) ? acc[stringifyShift] + 1 : 1;
    return acc
  }, {})

  // we loop through the object and get the actual availble shifts
  let finalShifts = []

  Object.keys(availableShiftsObj).forEach(shift => {
    if(availableShiftsObj[shift] === userShifts.length) {
      finalShifts.push(JSON.parse(shift))
    }
  })
  return finalShifts
}

export function getShiftOptions(availableShifts: IShift[]): OptionObject[] {
  return availableShifts.map((shift, index) => {
    return {
      key: index + '',
      label: `From ${shift.start} To ${shift.end}`
    }
  })
}