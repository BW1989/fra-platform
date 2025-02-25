import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Users } from '@meta/user'

type Props = {
  onChange: (profilePictureFile: File) => void
  userId: number
}

const ProfilePicture = (props: Props) => {
  const { i18n } = useTranslation()
  const { userId, onChange } = props

  const profilePicture = useRef(null)
  const profilePictureFile = useRef<HTMLInputElement>(null)

  const [valid, setValid] = useState(true)

  const _onChange = () => {
    const currentFile = profilePictureFile?.current?.files[0]
    const pictureRef = profilePicture?.current

    setValid(Users.validProfilePicture(currentFile))
    onChange(currentFile)

    // preview image
    const reader = new FileReader()
    reader.onload = (e) => {
      pictureRef.src = e.target.result
    }
    reader.readAsDataURL(currentFile)
  }

  const _onClick = () => profilePictureFile?.current?.click()

  return (
    <div className={classNames('edit-user__form-item-picture', { error: !valid })}>
      <div className="edit-user__form-label" />
      <div className="edit-user__form-field validation-error-sensitive-field">
        <input ref={profilePictureFile} type="file" accept="image/*" style={{ display: 'none' }} onChange={_onChange} />
        <img alt="" ref={profilePicture} src={Users.profilePictureUri(userId)} className="edit-user__picture-img" />
        <button className="btn btn-primary btn-xs" onClick={_onClick} type="button">
          {i18n.t<string>('editUser.chooseProfilePicture')}
        </button>
        {!valid && <div className="edit-user__picture-img-invalid">{i18n.t<string>('editUser.picture1MbMax')}</div>}
      </div>
    </div>
  )
}

export default ProfilePicture
