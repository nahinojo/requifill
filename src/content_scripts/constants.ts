import { minimatch } from 'minimatch'

/*
Verifies webpage in order to prevent content_script from manipulating popup DOM
*/
const windowURL: string = window.location.href
const expectedURL = 'https://systems.oit.uci.edu/kfs/purapRequisition.do*'
export const isProperURL = minimatch(windowURL, expectedURL)
