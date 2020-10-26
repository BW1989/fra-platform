module.exports = {
  tableName: 'table_3_3',
  schemaName: 'pan_european',
  section: 'panEuropean_3_3',
  rows: {
    names: [
      '_01st',
      '_02nd',
      '_03rd',
      '_04th',
      '_05th',
      '_06th',
      '_07th',
      '_08th',
      '_09th',
      '_10th',
      'all_other_plant_products',
      'all_other_animal_products',
      'total',
    ]
  },
  columns: [
    {name: 'name_of_groups_of_product', type: 'text'},
    {name: 'key_species', type: 'text'},
    {name: 'total_harvested_non_wood_goods_unit', type: 'text'},
    {name: 'total_harvested_non_wood_goods_quantity', type: 'numeric'},
    {name: 'market_value_1000_national_currency', type: 'numeric'},
    {name: 'nwfp_category', type: 'text'},
  ]
}
