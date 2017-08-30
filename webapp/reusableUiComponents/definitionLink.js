import React from 'react'
import './definitionLink.less'

export default ({name, i18n}) => <div className="definition-link"
                                      onClick={() => window.open(`definitions/en/${name}`, name, 'height=640,width=360')}>
                                        {i18n.t('definition.linkLabel')}
                                  </div>
