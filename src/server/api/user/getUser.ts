import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getUser = async (req: CycleRequest<{ id: string }>, res: Response) => {
  try {
    const { assessmentName, cycleName, id } = req.query

    let cycleUuid = null
    if (assessmentName && cycleName) {
      const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
      cycleUuid = cycle.uuid
    }

    const user = await UserController.getOne({ id: Number(id), cycleUuid })

    Requests.sendOk(res, user)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
