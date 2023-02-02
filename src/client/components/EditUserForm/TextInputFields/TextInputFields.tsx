import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User, Users } from '@meta/user'
import { UserProps } from '@meta/user/user'

import { useUser } from '@client/store/user'
import TextInput from '@client/components/TextInput'

type TextInputFieldProps = {
  key: string
  onlySelf?: boolean
  validator?: (partial: Partial<User> | Partial<UserProps>) => boolean
  isProperty?: boolean
}

const textInputFields: Array<TextInputFieldProps> = [
  { key: 'email', validator: Users.validEmail },
  { key: 'title', isProperty: true, onlySelf: true },
  { key: 'name', isProperty: true, onlySelf: true },
  { key: 'surname', isProperty: true, onlySelf: true },
]

type Props = {
  onChange: (user: User) => void
  user: User
}

const TextInputFields = (props: Props) => {
  const { onChange, user } = props
  const { t } = useTranslation()
  const userInfo = useUser()

  return (
    <>
      {textInputFields.map((inputField) => {
        const value = inputField.isProperty
          ? user?.props[inputField.key as keyof UserProps]
          : user?.[inputField.key as keyof User]

        const valid = inputField.validator?.({ [inputField.key]: value }) ?? true

        const enabled =
          !inputField.onlySelf ||
          Users.isAdministrator(userInfo) ||
          (inputField.onlySelf === true && user?.id === userInfo?.id)

        return (
          <div className="edit-user__form-item" key={inputField.key}>
            <div className="edit-user__form-label">{t(`editUser.${inputField.key}`)}</div>
            <div className={classNames(`edit-user__form-field${enabled ? '' : '-disabled'}`, { error: !valid })}>
              <TextInput
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  inputField.isProperty
                    ? onChange({ ...user, props: { ...user.props, [inputField.key]: e.target.value } })
                    : onChange({ ...user, [inputField.key]: e.target.value })
                }
                disabled={!enabled}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TextInputFields
