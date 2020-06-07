/**
 * This file contains formatting helpers for dataExport
 * Everything from table, column mappings to formatting received data and keys
 * "hotfix"
 */
import * as NumberUtils from '@common/bignumberUtils'

export const regex = {
  yearRange: /\d{4}-\d{4}/,
  yearRangeUnderscore: /\d{4}_\d{4}/,
  yearWithWord: /\d{4}_\w{4}/,
}

export const isYearRange = (range) => regex.yearRange.test(range)
export const yearRangeToUnderscore = (range) => range.replace('-', '_')

export const isYearWithWord = (column) => regex.yearWithWord.test(column)
export const splitYearWithWord = (column) => column.split('_')

const columnI18nMappings = {
  common_name: 'commonName',
  scientific_name: 'scientificName',
  national: 'national',
  subnational: 'subnational',
}

export const getColumnLabel = (column, section) =>
  columnI18nMappings[column] ? `${section}.${columnI18nMappings[column]}` : String(column)

/**
 * Returns the possible i18n mapping
 * @param column - column value
 * @param section - url params: current section
 * @returns {array} - i18n keys
 */
export const getI18nKey = (column, section) => {
  if (isYearWithWord(column)) {
    const [year, word] = splitYearWithWord(column)
    return [year, `${section}.${word}`]
  }
  return [`${getColumnLabel(column, section)}`]
}

// View specific
// forestPolicy
export const forestPolicy = {
  national: 'national_yes_no',
  subnational: 'sub_national_yes_no',
  national_yes_no: 'national',
  sub_national_yes_no: 'subnational',
}

const isForestPolicySection = (section) => section.includes('forestPolicy')

/**
 * Helper function to map to correct database columns
 * @param column - column value
 * @param section - url params: current section
 * @returns {*}
 */
export const formatColumn = (column, section) => {
  // /forestPolicy/ has specific mappings
  if (isForestPolicySection(section)) {
    return forestPolicy[column]
  }

  if (isYearRange(column)) {
    return column.replace('-', '_')
  }
  return column
}

/**
 * Helper function to display received data correctly
 * @param {string} column - column value
 * @param {string} countryIso - selection country iso
 * @param {Object} results - result set to display in the table
 * @param {string} section - url params: current section
 * @returns {{columnKey: *, value: *}} - formatted column and value, from results
 */
export const getValue = (column, countryIso, results, section) => {
  let columnKey = column

  if (isForestPolicySection(section)) columnKey = forestPolicy[column]
  if (isYearRange(column)) columnKey = yearRangeToUnderscore(column)

  let value = results[countryIso] && results[countryIso][columnKey]
  // Convert value to string and check if it's a number
  if (!Number.isNaN(+value)) value = NumberUtils.formatNumber(value)
  if (value === 'NaN') value = ''

  return { columnKey, value }
}

const sections = {
  designatedManagementObjective: 'primary_designated_management_objective',
}

/**
 * Helper function to handle datamase mapping for table names
 * @param section
 * @returns {*}
 */
export const formatSection = (section) => (sections[section] ? sections[section] : section)
