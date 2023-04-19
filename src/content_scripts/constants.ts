/*
Constants utilized by other content scripts.
*/
import { minimatch } from 'minimatch'

const windowURL: string = window.location.href
const expectedURL = 'https://systems.oit.uci.edu/kfs/purapRequisition.do*'
export const isProperURL = minimatch(windowURL, expectedURL)

export const syncStorage: browser.storage.StorageAreaSync = browser.storage.sync
