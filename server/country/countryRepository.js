const R = require('ramda')
const db = require('../db/db')
const camelize = require('camelize')

/*
 * Determine the "overall status" from multiple statuses.
 * For example, one review is enough to determine that overall
 * the whole country is in review.
 * If all statuses are in accepted, we determine that country is in
 * accepted status.
 */
const determineCountryAssessmentStatus = (type, statuses) => R.pipe(
    R.filter(R.propEq('type', type)),
    R.head,
    R.defaultTo({status: 'editing'}), //Initially, there are no rows for country's assessment,
                                      //this is also considered to be 'editing' status
    R.prop('status')
  )(statuses)

const determineRole = (countryIso, role) =>
  R.pipe(R.filter(R.propEq('countryIso', countryIso)), R.head, R.prop('role'))(role)

const getStatuses = groupedRows =>
  R.pipe(
    R.map(R.pick(['type', 'status'])),
    R.filter(R.identity)
  )(groupedRows)

const handleCountryResult = roles => result => {
  const grouped = R.groupBy(row => row.countryIso, camelize(result.rows))
  return R.pipe(
    R.toPairs,
    R.map(
      ([countryIso, vals]) => {
        return {
          countryIso,
          name: vals[0].name,
          annualAssesment: determineCountryAssessmentStatus('annuallyReported', getStatuses(vals)),
          fiveYearAssesment: determineCountryAssessmentStatus('fiveYearCycle', getStatuses(vals)),
          role: determineRole(countryIso, roles)
        }
      }),
    R.groupBy(R.prop('role'))
  )(grouped)
}

const getAllCountries = () =>
  db.query(`SELECT c.country_iso, c.name, a.type, a.status
            FROM country c
            LEFT OUTER JOIN assessment a ON c.country_iso = a.country_iso 
            ORDER BY name ASC`)
    .then(handleCountryResult([]))

module.exports.getAllowedCountries = (roles) => {
      console.log('roles', roles)
  const hasRole = (role) => R.find(R.propEq('role', role), roles)
  // Either of these give access to full country list
  if (hasRole('REVIEWER_ALL') || hasRole('NATIONAL_CORRESPONDENT_ALL')) {
    return getAllCountries()
  } else {
    const allowedCountryIsos = R.pipe(R.map(R.prop('countryIso')), R.reject(R.isNil))(roles)
    const allowedIsoQueryPlaceholders = R.range(1, allowedCountryIsos.length + 1).map(i => '$' + i).join(',')
    return db.query(`SELECT c.country_iso, c.name, a.type, a.status 
                     FROM country c
                     LEFT OUTER JOIN assessment a ON c.country_iso = a.country_iso
                     WHERE c.country_iso in (${allowedIsoQueryPlaceholders})
                     ORDER BY name ASC`,
      allowedCountryIsos)
      .then(handleCountryResult(roles))
  }
}
