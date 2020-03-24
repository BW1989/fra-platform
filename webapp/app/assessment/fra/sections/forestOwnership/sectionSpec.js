import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as ForestOwnershipState from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipState'
import * as ForestOwnershipValidatorState from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipValidatorState'

const section = FRA.sections['4'].children.a
const { years } = ForestOwnershipState

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestOwnership,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestOwnership.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestOwnership.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map(year =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
        })
      ),
    }),

    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.privateOwnership',
      [SectionSpec.KEYS_ROW.variableNo]: 'a',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.ofWhichIndividuals',
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.ofWhichPrivateBusinesses',
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.ofWhichCommunities',
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.publicOwnership',
      [SectionSpec.KEYS_ROW.variableNo]: 'b',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.otherOrUnknown',
      [SectionSpec.KEYS_ROW.variableNo]: 'c',
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: ForestOwnershipState.getOtherOrUnknown,
        })
      ),
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const forestOwnership = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default forestOwnership
