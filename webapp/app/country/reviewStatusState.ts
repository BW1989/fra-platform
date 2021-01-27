/**
 * This is a sub state of CountryState
 */

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import * as CountryState from '@webapp/app/country/countryState'

export const keys = {
  issuesCount: 'issuesCount',
  lastCommentUserId: 'lastCommentUserId',
  issueStatus: 'issueStatus',
  hasUnreadIssues: 'hasUnreadIssues',
}

export const keysIssueStatus = {
  opened: 'opened',
}

const defaultSectionStatus = { [keys.issuesCount]: 0 }

export const getStatusSection = (name: any) =>
  R.pipe(CountryState.getReviewStatus, R.propOr(defaultSectionStatus, name))

export const getStatusSectionChildren = (section: any) => (state: any) =>
  R.pipe(
    R.propOr({}, 'children'),
    R.values,
    R.reduce((statuses: any, child: any) => {
      const status = getStatusSection(child.name)(state)
      const issuesCount = R.prop(keys.issuesCount)(status)
      const issueStatus = R.prop(keys.issueStatus)(status)
      // filtering all opened statuses
      if (!(issuesCount === 0 || issueStatus !== keysIssueStatus.opened)) {
        statuses.push(status)
      }
      return statuses
    }, []),
    // checking if there's an open status with unread issues
    R.or(R.find(R.propEq(keys.hasUnreadIssues), true), R.head),
    R.defaultTo({})
  )(section)
