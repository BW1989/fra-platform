const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

const emptyFraForestArea = (countryIso, year) =>
  db.query('SELECT id FROM eof_fra_values WHERE country_iso = $1 and year = $2', [countryIso, year])
    .then(result => result.rows.length === 0)

module.exports.persistFraValues = (countryIso, year, fraValues) =>
  emptyFraForestArea(countryIso, year).then(isEmpty =>
    isEmpty
      ? insertFraForestArea(countryIso, year, fraValues)
      : updateFraForestArea(countryIso, year, fraValues))

const insertFraForestArea = (countryIso, year, fraValues) =>
  db.query(`INSERT INTO 
             eof_fra_values 
             (country_iso, year, forest_area, other_wooded_land, other_land, forest_area_estimated, other_wooded_land_estimated, other_land_estimated) 
             VALUES 
             ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [countryIso,
      year,
      fraValues.forestArea,
      fraValues.otherWoodedLand,
      fraValues.otherLand,
      fraValues.forestAreaEstimated,
      fraValues.otherWoodedLandEstimated,
      fraValues.otherLandEstimated])

const updateFraForestArea = (countryIso, year, fraValues) =>
  db.query(`UPDATE 
            eof_fra_values 
            SET 
             forest_area = $3,
             other_wooded_land = $4,
             other_land = $5,
             forest_area_estimated = $6, 
             other_wooded_land_estimated = $7, 
             other_land_estimated = $8
            WHERE country_iso = $1 AND year = $2`,
    [countryIso,
      year,
      fraValues.forestArea,
      fraValues.otherWoodedLand,
      fraValues.otherLand,
      fraValues.forestAreaEstimated,
      fraValues.otherWoodedLandEstimated,
      fraValues.otherLandEstimated])

const toNumberOrNull = (numericFromDb) => numericFromDb === null
  ? null
  : Number(numericFromDb)

const forestAreaReducer = (results, row, type = 'fra') => R.assoc(`fra_${row.year}`,
  {
    forestArea: toNumberOrNull(row.forest_area),
    otherWoodedLand: toNumberOrNull(row.other_wooded_land),
    otherLand: toNumberOrNull(row.other_land),
    name: row.year + '',
    type: 'fra',
    year: Number(row.year),
    forestAreaEstimated: row.forest_area_estimated || false,
    otherWoodedLandEstimated: row.other_wooded_land_estimated || false,
    otherLandEstimated: row.other_land_estimated || false
  },
  results)

module.exports.readFraForestAreas = (countryIso) =>
  db.query(
    'SELECT year, forest_area, other_wooded_land, other_land, forest_area_estimated, other_wooded_land_estimated , other_land_estimated from eof_fra_values WHERE country_iso = $1',
    [countryIso]
  ).then((result) => R.reduce(forestAreaReducer, {}, result.rows))

module.exports.readEofDescriptions = (countryIso) =>
  db.query(
    `SELECT data_sources, national_classification, original_data FROM eof_descriptions WHERE country_iso =  $1`,
    [countryIso]
  ).then(result => {
    const row = result.rows[0]
    return row ? {
      dataSources: row.data_sources,
      nationalClassification: row.national_classification,
      originalData: row.original_data
    } : null
  })
