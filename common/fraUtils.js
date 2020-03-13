const R = require('ramda')
const FRA = require('./assessment/fra')

const fraYears = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

const filterFraYears = R.filter(d => R.includes(Number(d.year), FRA.years))

const hasData = R.pipe(R.reject(R.all(R.or(R.isNil, R.isEmpty))), R.isEmpty, R.not)

module.exports = {
  fraYears,
  filterFraYears,
  hasData,
}
