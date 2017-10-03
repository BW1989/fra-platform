import React from 'react'
import * as R from 'ramda'

const decimalInputColumns = R.times(() => ({type: 'decimalInput'}), 9)

const fillerCell = {
  type: 'readOnly',
  jsx: <td className="fra-table__filler-cell"/>
}
const lastFillerCell = {
  type: 'readOnly',
  jsx: <td className="fra-table__filler-cell" style={{borderRight: '1px solid #d5d5d5'}}/>
}

const readOnlyColumns = R.pipe(
  R.map(() => fillerCell),
  R.append(lastFillerCell)
)(R.range(1, 9))

export const header = (i18n, type) => (<thead>
<tr>
  <th className="fra-table__header-cell" rowSpan="2">{i18n.t('carbonStock.categoryHeader')}</th>
  <th className="fra-table__header-cell-middle" colSpan="9">{i18n.t(`carbonStock.${type}TableHeader`)}</th>
</tr>
<tr>
  <td className="fra-table__header-cell-right">1990</td>
  <td className="fra-table__header-cell-right">2000</td>
  <td className="fra-table__header-cell-right">2010</td>
  <td className="fra-table__header-cell-right">2015</td>
  <td className="fra-table__header-cell-right">2016</td>
  <td className="fra-table__header-cell-right">2017</td>
  <td className="fra-table__header-cell-right">2018</td>
  <td className="fra-table__header-cell-right">2019</td>
  <td className="fra-table__header-cell-right">2020</td>
</tr>
</thead>)

export const rows = (i18n, type) => [
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_forest`} className="fra-table__row-header-continued-with-fillers">{i18n.t('fraClass.forest')}</td>
  },
    ...readOnlyColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_forest_above_ground_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonAboveGroundBiomass')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_forest_below_ground_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonBelowGroundBiomass')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_forest_deadwood_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonDeadwood')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_forest_litter_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonLitter')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_forest_soil_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonSoil')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_other_wooded_land`}
             className="fra-table__row-header-continued-with-fillers">{i18n.t('fraClass.otherWoodedLand')}</td>
  },
    ...readOnlyColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_other_wooded_land_above_ground_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonAboveGroundBiomass')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_other_wooded_land_below_ground_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonBelowGroundBiomass')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_other_wooded_land_deadwood_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonDeadwood')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_other_wooded_land_litter_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonLitter')}</td>
  },
    ...decimalInputColumns
  ],
  [{
    type: 'readOnly',
    jsx: <td key={`carbon_other_wooded_land_soil_${type}`}
             className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonSoil')}</td>
  },
    ...decimalInputColumns
  ],
]

export const valueSlice = {
  columnStart: 1
}
