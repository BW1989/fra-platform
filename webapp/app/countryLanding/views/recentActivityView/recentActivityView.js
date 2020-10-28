import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import { useCountryIso, useI18n } from '@webapp/components/hooks'

import * as FRA from '@common/assessment/fra'
import * as LandingState from '@webapp/app/countryLanding/landingState'
import { fetchAuditFeed } from '@webapp/app/components/audit/actions'

import RecentActivityItem from './recentActivityItem'

const RecentActivityView = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const feedItems = useSelector(LandingState.getFeed)

  useEffect(() => {
    dispatch(fetchAuditFeed(countryIso))
  }, [countryIso])

  if (!feedItems) {
    return null
  }

  return (
    <div className="landing__page-container">
      {feedItems.length > 0 ? (
        feedItems.map((feedItem, i) => (
          <RecentActivityItem key={`${feedItem.sectionName}_${feedItem.editTime}_${i + 1}`} feedItem={feedItem} />
        ))
      ) : (
        <div className="landing__activity-empty">
          <img src="/img/tucan.svg" height="72" alt="tucan" />
          <p className="landing__activity-empty-title">{i18n.t('landing.recentActivity.noRecentActivityTitle')}</p>
          <p>{i18n.t('landing.recentActivity.noRecentActivityBody')}</p>
          <Link className="btn-s btn-primary" to={BasePaths.getAssessmentHomeLink(countryIso, FRA.type)}>
            {i18n.t('landing.recentActivity.getStarted')}
          </Link>
        </div>
      )}
    </div>
  )
}

export default RecentActivityView
