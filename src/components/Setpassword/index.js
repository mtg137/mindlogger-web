import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '../Base/Avatar'
import { Link, useParams, useHistory } from 'react-router-dom'
import {
  checkTemporaryPassword,
  updatePassword
} from '../../services/authentication.service'

import { Form, Alert, Button } from 'react-bootstrap'
import { Statuses } from '../../constants'

/**
 * Component for Changing Password.
 * @constructor
 */
export default function SetPassword () {
  const [status, setStatus] = useState(Statuses.READY)
  const [isValidToken, setIsValidToken] = useState(false)
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const { userId, temporaryToken } = useParams()
  const history = useHistory()
  const [token, setToken] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    handleCheckTemporaryPassword()
  }, [])

  const handleCheckTemporaryPassword = async () => {
    try {
      const response = await checkTemporaryPassword(userId, temporaryToken)
      setToken(response.authToken.token)
      setIsValidToken(true)
    } catch {
      setStatus(Statuses.ERROR)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus(Statuses.LOADING)
    try {
      await updatePassword(token, {
        oldPassword: temporaryToken,
        newPassword: passwordData.newPassword
      })
      history.push('/login')
    } catch {
      setStatus(Statuses.DECLINED)
    }
  }

  const isPasswordSame =
    passwordData.newPassword === passwordData.confirmPassword

  return (
    <div className="demo mb-3">
      {isValidToken
        ? (
        <div id="login" className="text-center mb-0">
          <div className="d-flex justify-content-center align-items-center">
            <Avatar />
          </div>
          <hr></hr>
          <h3>{t('ChangePassword.title')}</h3>
          <h5>{t('ChangePassword.cautionMessage')} </h5>
          <div className="container fluid" id="signup-Form">
            <Form onSubmit={onSubmit} className="change-pass">
              <div>
                <Form.Label>{t('ChangePassword.newPassword')}:</Form.Label>
                <Form.Control
                  type="password"
                  name="New password"
                  value={passwordData.newPassword}
                  placeholder={t('ChangePassword.newPassword')}
                  className="mb-1"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <Form.Label>{t('ChangePassword.confirmPassword')}:</Form.Label>
                <Form.Control
                  type="password"
                  name="Confirm Password"
                  value={passwordData.confirmPassword}
                  placeholder={t('ChangePassword.confirmPassword')}
                  className="mb-1"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value
                    })
                  }
                />
              </div>
              {!isPasswordSame && (
                <Alert variant={'danger'} className="error-alert">
                  {t('SignUp.passwordsUnmatched')}
                </Alert>
              )}
              <Button
                type="submit"
                variant="success"
                disabled={status === Statuses.LOADING || !isPasswordSame}
              >
                {t('ChangePassword.submit')}
              </Button>
            </Form>
          </div>
          {status === Statuses.DECLINED && (
            <div>{t('SetPassword.expiredLink')}</div>
          )}
        </div>
          )
        : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <p>
            {' '}
            {t('SetPassword.please')}
            <Link to="/login"> {t('SetPassword.login')} </Link>
            {t('SetPassword.toSeeThePage')}
          </p>
        </div>
          )}
    </div>
  )
}