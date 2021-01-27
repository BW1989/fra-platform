import React from 'react'
import { useDispatch } from 'react-redux'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'
import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { PercentInput } from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import { pasteNationalClassValues, updateNationalClassValue } from '../../../actions'
import useClassNameComments from '../useClassNameComments'
import useValidationNationalClass from '../useValidationNationalClass'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' },
]
type Props = {
  canEditData: boolean
  index: number
  odp: any
}
const ExtentOfForestRow = (props: Props) => {
  const { canEditData, index, odp } = props
  const { nationalClasses, odpId } = odp
  const nationalClass = nationalClasses[index]
  const { className, area, forestPercent, otherWoodedLandPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'value']
  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const classNameRowComments = useClassNameComments(target)
  const validationStatus = useValidationNationalClass(index)
  const classNamePercentageValidation = validationStatus.validEofPercentage === false ? 'error' : ''
  const classNameAreaValidation = validationStatus.validArea === false ? 'error' : ''
  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{className}</th>
      <td className={`fra-table__cell fra-table__divider ${classNameAreaValidation}`}>
        <ThousandSeparatedDecimalInput
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean; numberValue: any; onCha... Remove this comment to see the full error message
          disabled={!canEditData}
          numberValue={area}
          onChange={(event: any) => {
            dispatch(updateNationalClassValue(index, 'area', area, event.target.value))
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 0,
                columns,
              })
            )
          }}
        />
      </td>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean; numberValue: any; onCha... Remove this comment to see the full error message
          disabled={!canEditData}
          numberValue={forestPercent}
          onChange={(event: any) => {
            dispatch(updateNationalClassValue(index, 'forestPercent', forestPercent, event.target.value))
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 1,
                columns,
              })
            )
          }}
        />
      </td>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean; numberValue: any; onCha... Remove this comment to see the full error message
          disabled={!canEditData}
          numberValue={otherWoodedLandPercent}
          onChange={(event: any) => {
            dispatch(
              updateNationalClassValue(index, 'otherWoodedLandPercent', otherWoodedLandPercent, event.target.value)
            )
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 2,
                columns,
              })
            )
          }}
        />
      </td>
      <td className="fra-table__calculated-cell">
        {NumberUtils.formatNumber(NumberUtils.sub(100, NumberUtils.add(forestPercent, otherWoodedLandPercent)))}
        <span style={{ marginLeft: '8px' }}>%</span>
      </td>
      <td className="fra-table__row-anchor-cell">
        {odp.odpId && canEditData && (
          <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator
              // @ts-expect-error ts-migrate(2322) FIXME: Type '{ section: string; title: any; target: any[]... Remove this comment to see the full error message
              section="odp"
              title={(i18n as any).t('nationalDataPoint.forestCategoriesLabel')}
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value']}
              countryIso={countryIso}
            />
          </div>
        )}
      </td>
    </tr>
  )
}
export default ExtentOfForestRow
