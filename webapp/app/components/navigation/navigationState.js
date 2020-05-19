import * as R from 'ramda'

export const stateKey = 'navigation'

const keys = {
  visible: 'visible',
}

const getState = R.prop(stateKey)

const _getVisible = R.propOr(true, keys.visible)

export const isVisible = R.pipe(getState, _getVisible)

export const toggleVisible = (state) => R.assoc(keys.visible, !_getVisible(state))(state)
