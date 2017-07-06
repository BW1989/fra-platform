import React from 'react'
import assert from 'assert'

import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import { acceptNextInteger, acceptableAsInteger } from '../utils/numberInput'
import { handlePaste } from './paste'

const IntegerInput = ({countryIso, tableSpec, tableData, rowIdx, colIdx, tableValueChanged, tableChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <ThousandSeparatedIntegerInput integerValue={ currentValue }
                                   className="fra-table__integer-input"
                                   onChange={
                                     (evt) => {
                                       const newValue = evt.target.value
                                       // This if prevents just a useless, no-op autosave, the value wouldn't
                                       // be accepted anyway...
                                       if (acceptableAsInteger(newValue)) {
                                         tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, newValue)
                                       }
                                     }
                                   }
                                   onPaste={
                                     handlePaste(
                                       countryIso,
                                       rowIdx,
                                       colIdx,
                                       tableSpec,
                                       tableData,
                                       tableChanged,
                                       tableValueChanged)
                                   }/>
  </td>
}

const cellTypeCreators = {
  'integerInput': (cellSpec) => ({
    render: (props) => <IntegerInput {...props}/>,
    acceptValue: acceptNextInteger
  }),
  'readOnly': (cellSpec) => ({render: (props) => cellSpec.jsx}),
  'custom': (cellSpec) => ({render: (props) => cellSpec.render(props)})
}

export const getCellType = (tableSpec, rowIdx, colIdx) => {
  const cellSpec = tableSpec.rows[rowIdx][colIdx]
  assert(cellSpec, `No cellspec for ${rowIdx} ${colIdx}`)
  const cellType = cellTypeCreators[cellSpec.type]
  assert(cellType, `Unknown cell type ${cellSpec.type}`)
  return cellType(cellSpec)
}
