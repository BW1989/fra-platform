// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = FRA.sections['6'].children.a
const variableMappings = {
  policiesSFM: SectionSpec.VARIABLES.policies_supporting_SFM,
  legislationsSFM: SectionSpec.VARIABLES.legislations_supporting_SFM,
  stakeholderParticipation: SectionSpec.VARIABLES.platform_for_stakeholder_participation,
  existenceOfTraceabilitySystem: SectionSpec.VARIABLES.existence_of_traceability_system,
}

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestPolicy,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['national', 'subnational'],
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestPolicy.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestPolicy.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestPolicy.national',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestPolicy.subnational',
        }),
      ],
    }),

    ...['policiesSFM', 'legislationsSFM', 'stakeholderParticipation', 'existenceOfTraceabilitySystem'].map((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `forestPolicy.${variable}`,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        [SectionSpec.KEYS_ROW.variableExport]: variableMappings[variable],
        [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColSelectYesNo(), SectionSpec.newColSelectYesNo()],
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const forestPolicy = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
  },
})

export default forestPolicy
