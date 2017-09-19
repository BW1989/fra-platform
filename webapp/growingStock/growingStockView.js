import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import CommentableDescriptions from '../description/commentableDescription'
import GrowingStockTable from './growingStockTable'
import { rows } from './growingStock'

import { fetch, updateValue, updateValues } from './actions'

const GrowingStock = (props) =>
  <div className='nde__data-input-component'>
    <div className="nde__data-page-header">
      <h2 className="headline">{props.i18n.t('growingStock.growingStock')}</h2>
    </div>
    <GrowingStockTable
      section="growingStock"
      header={props.i18n.t('growingStock.fra2020Categories')}
      avgTableHeader={props.i18n.t('growingStock.avgTableHeader')}
      totalTableHeader={props.i18n.t('growingStock.totalTableHeader')}
      rows={rows}
      {...props}
    />
    <CommentableDescriptions
      section='growingStock'
      name="growingStock"
      countryIso={props.countryIso}
      i18n={props.i18n}
    />
  </div>

class GrowingStockView extends Component {

  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetch(countryIso)
  }

  render () {
    return R.isEmpty(this.props.growingStock)
      ? null
      : <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
        <GrowingStock
          areaValues={this.props.growingStock.areaValues}
          countryIso={this.props.match.params.countryIso}
          values={this.props.growingStock.values}
          {...this.props}/>
      </LoggedInPageTemplate>
  }

}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  growingStock: state.growingStock,
  'openCommentThread': state.review.openThread
})

export default connect(mapStateToProps, {fetch, updateValue, updateValues})(GrowingStockView)
