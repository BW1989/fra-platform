import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/serve... Remove this comment to see the full error message
import primaryDesignatedManagementObjective from '@server/traditionalTable/mappings/fra/primaryDesignatedManagementObjective'
import section from '../section'

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.primaryDesignatedManagementObjective,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'contentCheck.primaryDesignatedManagementObjective.title',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: primaryDesignatedManagementObjective.columns.map(({ name }: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: name,
        })
      ),
    }),

    ...primaryDesignatedManagementObjective.rows.names.map((variable: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `contentCheck.primaryDesignatedManagementObjective.${variable}`,
        [SectionSpec.KEYS_ROW.variableExport]: `${variable}`,
        [SectionSpec.KEYS_ROW.cols]: primaryDesignatedManagementObjective.columns.map(() =>
          SectionSpec.newColDecimal()
        ),
      })
    ),
  ],
})

export default tableSpec
