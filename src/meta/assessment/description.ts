import { CycleUuid } from './cycle'

export type DataSourceColumn =
  | 'referenceToTataSource'
  | 'typeOfDataSource'
  | 'fraVariable'
  | 'variable'
  | 'yearForDataSource'
  | 'comments'

export interface AnalysisAndProcessingDescription {
  estimationAndForecasting: boolean
  reclassification: boolean
}

export interface NationalDataDataSourceDescription {
  table?: { columns: Array<DataSourceColumn> }
  text?: { readOnly?: boolean }
}

export interface NationalDataDescription {
  dataSources?: NationalDataDataSourceDescription
  nationalClassification?: boolean
  originalData?: boolean
}

export interface Description {
  analysisAndProcessing?: AnalysisAndProcessingDescription
  nationalData?: NationalDataDescription

  comments?: boolean
  introductoryText?: boolean
}

export type Descriptions = Record<CycleUuid, Description>
