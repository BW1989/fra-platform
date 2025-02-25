import { Objects } from '@utils/index'

import { Assessment, Cycle } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { DB } from '@server/db'
import { Logger } from '@server/utils/logger'

const client = DB

afterAll(async () => {
  await DB.$pool.end()
})

describe(`Generate:`, () => {
  test(`meta cache`, async () => {
    const assessments = await client.map<Assessment>(`select * from assessment a`, [], (assessment) => ({
      ...Objects.camelize(assessment),
      metaCache: assessment.meta_cache,
    }))

    for (let i = 0; i < assessments.length; i += 1) {
      const assessment = assessments[i]
      Logger.debug(`\t---- Generating meta cache for assessment ${assessment.props.name}`)
      // eslint-disable-next-line no-await-in-loop
      const cycles = await client.many<Cycle>(`select * from assessment_cycle ac where ac.assessment_id = $1`, [
        assessment.id,
      ])

      for (let i = 0; i < cycles.length; i += 1) {
        const cycle = cycles[i]
        Logger.debug(`\t\t----\tGenerating meta cache for cycle ${cycle.name}`)
        // eslint-disable-next-line no-await-in-loop
        await AssessmentController.generateMetaCache(
          {
            assessment,
            cycle,
          },
          client
        )
      }
    }
  })
})
