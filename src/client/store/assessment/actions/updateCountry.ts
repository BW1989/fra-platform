import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Country, CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export const updateCountry = createAsyncThunk<
  Country,
  {
    assessmentName: AssessmentName
    country: Country
    countryIso: CountryIso
    cycleName: string
    message?: string
    notifyUsers?: boolean
  }
>('assessment/post/country', async ({ country, countryIso, assessmentName, cycleName, notifyUsers, message }) => {
  const { data } = await axios.post(
    ApiEndPoint.Area.country(),
    { country, message },
    {
      params: {
        assessmentName,
        countryIso,
        cycleName,
        notifyUsers,
      },
    }
  )
  return data
})
