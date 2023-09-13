/*
Ensures target DOM is the requistion form, and not the Requifill extension
*/
import { minimatch } from 'minimatch'

const windowURL: string = window.location.href
const expectedURL = 'https://systems.oit.uci.edu/kfs/purapRequisition.do*'
const isProperURL: boolean = minimatch(
  windowURL, expectedURL
)
export default isProperURL
