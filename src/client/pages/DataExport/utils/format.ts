import { Numbers } from '@utils/numbers'

import { CountryIso } from '@meta/area'
import { AssessmentName, AssessmentNames } from '@meta/assessment'
import { TableData } from '@meta/data'
import { Unit, UnitConverter, UnitFactors } from '@meta/dataExport'

// import { getPanEuropeanTableMapping } from '@client/pages/DataExport/utils/panEuropean'

const sections: Record<string, string> = {
  designatedManagementObjective: 'primary_designated_management_objective',
}

/**
 * Helper function to display received data correctly
 * @param {string} column - column value
 * @param {string} countryIso - selection country iso
 * @param {Object} results - result set to display in the table
 * @param {string} variable - url params: current variable
 * @returns {{columnKey: string, value: string}} - formatted column and value, from results
 */
export const formatValue = (
  column: string,
  countryIso: CountryIso,
  results: TableData,
  tableName: string,
  variable: string
): { columnKey: string; value: string } => {
  const columnKey = column

  let value = results?.[countryIso]?.[tableName]?.[columnKey]?.[variable]?.raw

  // Convert value to string and check if it's a number
  if (!Number.isNaN(+value)) value = Numbers.format(Number(value))
  if (value === 'NaN') value = ''

  return { columnKey, value }
}

export const convertValue = (value: string, base: Unit, unit: Unit): string =>
  base && base !== unit && Object.keys(UnitFactors).includes(base)
    ? UnitConverter.convertValue(value, base, unit)
    : value

/**
 * Helper function to handle datamase mapping for table names
 * @param assessmentSection
 * @param assessmentName
 * @returns {*}
 */
export const formatSection = (assessmentSection: string, assessmentName: AssessmentName): string => {
  if (assessmentName === AssessmentNames.panEuropean) {
    return AssessmentNames.panEuropean
    // TODO
    // return getPanEuropeanTableMapping(assessmentSection)
  }
  return sections[assessmentSection] ?? assessmentSection
}
