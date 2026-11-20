import AuthLayout from '~/layouts/auth'
import { Form, Link } from '@adonisjs/inertia/react'

export default function Signup() {
  return (
    <>
      <h1 className="auth__title">Create your account</h1>
      <p className="auth__sub">Start building with the starter kit.</p>

      <Form route="new_account.store">
        {({ errors, processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="field__input"
                autoComplete="name"
                placeholder="Ada Lovelace"
                aria-invalid={errors.fullName ? 'true' : 'false'}
              />
              {errors.fullName && <span className="field__error">{errors.fullName}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="field__input"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <span className="field__error">{errors.email}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="field__input"
                autoComplete="new-password"
                placeholder="••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && <span className="field__error">{errors.password}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="passwordConfirmation">
                Confirm password
              </label>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                className="field__input"
                autoComplete="new-password"
                placeholder="••••••••"
                aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
              />
              {errors.passwordConfirmation && (
                <span className="field__error">{errors.passwordConfirmation}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={processing}
              style={{ marginTop: 4 }}
            >
              {processing ? 'One moment…' : 'Create account'}
            </button>
          </div>
        )}
      </Form>

      <p className="auth__foot">
        Already have an account?{' '}
        <Link route="session.create" className="il">
          Sign in
        </Link>
      </p>
    </>
  )
}

Signup.layout = [AuthLayout]
