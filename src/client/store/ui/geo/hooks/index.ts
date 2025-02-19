import { CountryIso } from '@meta/area'
import { ForestOptions, MapPanel, MosaicOptions } from '@meta/geo'

import { useAppSelector } from '@client/store'

export const useMosaicUrl = (countryIso: CountryIso): string =>
  useAppSelector((state) => state.geo?.mosaicUrl[countryIso])

export const useMosaicSelected = (): boolean => useAppSelector((state) => state.geo?.mosaicSelected)

export const useUiMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.ui)

export const useAppliedMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.applied)

export const useSelectedPanel = (): MapPanel => useAppSelector((state) => state.geo?.selectedPanel)

export const useForestSourceOptions = (): ForestOptions => useAppSelector((state) => state.geo?.forestOptions)
