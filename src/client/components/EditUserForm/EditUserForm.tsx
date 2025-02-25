import './EditUserForm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Collaborator, RoleName, User, UserRole, Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useUser } from '@client/store/user'
import { useCountryIso, useOnUpdate } from '@client/hooks'

import CollaboratorPermissions from './CollaboratorPermissions'
// import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import TextInputField from './TextInputField'
import TitleField from './TitleField'
import UserRolePropsFields from './UserRolePropsFields'

type Props = {
  user: User
  canEditRoles?: boolean
}

const EditUserForm: React.FC<Props> = ({ user, canEditRoles }) => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const userInfo = useUser()
  const { t } = useTranslation()

  const [profilePicture, setProfilePicture] = useState<File>(null)
  const [userToEdit, setUserToEdit] = useState<User>(user)
  const [roleToEdit, setRoleToEdit] = useState<UserRole<any, any>>(Users.getRole(user, countryIso, cycle))

  const changeUser = (name: string, value: string) => setUserToEdit({ ...user, [name]: value })

  const changeUserProp = (name: string, value: any) =>
    setUserToEdit({ ...user, props: { ...user.props, [name]: value } })

  const changeUserRoleProp = (name: string, value: string) =>
    setRoleToEdit({ ...roleToEdit, props: { ...roleToEdit.props, [name]: value } })

  useOnUpdate(() => {
    dispatch(
      UserManagementActions.updateRoleProps({
        id: userInfo.id,
        assessmentName: assessment?.props?.name,
        cycleName: cycle?.name,
        role: roleToEdit,
        countryIso,
      })
    )
  }, [roleToEdit])

  useOnUpdate(() => {
    dispatch(
      UserManagementActions.updateUser({
        assessmentName: assessment?.props?.name,
        cycleName: cycle?.name,
        user: userToEdit,
        profilePicture,
        countryIso,
      })
    )
  }, [profilePicture, userToEdit])

  if (!user) return null

  const userRole = Users.getRole(user, countryIso, cycle)

  const enabled = Users.isAdministrator(userInfo) || user.id === userInfo?.id

  return (
    <div className="edit-user__form-container">
      <ProfilePicture onChange={(profilePicture: File) => setProfilePicture(profilePicture)} userId={user.id} />

      <TextInputField
        name="email"
        value={user.email}
        onChange={changeUser}
        validator={Users.validEmail}
        enabled={enabled}
        mandatory
      />

      <TitleField name="title" value={user.props.title} onChange={changeUserProp} enabled={enabled} mandatory />

      <TextInputField name="name" value={user.props.name} onChange={changeUserProp} enabled={enabled} mandatory />

      <TextInputField name="surname" value={user.props.surname} onChange={changeUserProp} enabled={enabled} mandatory />

      {[RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR].includes(
        userRole?.role
      ) && <UserRolePropsFields role={roleToEdit} onChange={changeUserRoleProp} enabled={enabled} />}

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('editUser.mandatoryFields')}</div>
      </div>

      {canEditRoles && userRole?.role === RoleName.COLLABORATOR && (
        <CollaboratorPermissions userRole={userRole as Collaborator} />
      )}

      {/* {canEditRoles && <CountryRoles user={user} />} */}
    </div>
  )
}

EditUserForm.defaultProps = {
  canEditRoles: false,
}

export default EditUserForm
