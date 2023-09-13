const validPeopleReadonly = [
  'John',
  'Sam',
  'Martha',
  'Frank'
] as const

export type ValidPeople = typeof validPeopleReadonly
let validPeople: string[] = []
for (let i = 0; i < validPeopleReadonly.length; i++) {
  validPeople = validPeople.concat(validPeopleReadonly[i])
}
export default validPeople
