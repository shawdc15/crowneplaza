import React, { useRef, useState } from 'react'
import { CloseSvg } from '../Svg'
import { authRegister } from '../../services/user.services'
import { useAppContext } from '../../context/AppContext'
import ModalLayout from '../Layout/ModalLayout'

const Register = () => {
  const { state, dispatch } = useAppContext()
  const { error, isRegistered, isLoading } = state

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const contactRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const ageRef = useRef()
  const usernameRef = useRef()

  const registerHandler = async (e) => {
    dispatch({ type: 'REGISTER_REQUEST' })
    e.preventDefault()
    const credentials = {
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      contact: contactRef.current.value.trim(),
      age: ageRef.current.value.trim(),
      password: passwordRef.current.value,
      lastName: lastNameRef.current.value,
      firstName: firstNameRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    }
    setTimeout(async () => {
      const { errors } = await authRegister(credentials)
      if (errors) {
        dispatch({ type: 'REGISTER_ERROR', value: { ...errors } })
      } else {
        console.log('success')
        dispatch({ type: 'REGISTER_SUCCESS' })
      }
    }, 1000)
  }
  return (
    <>
      {state.activeModal == 'REGISTER' ? (
        <ModalLayout>
          <div>
            {!isRegistered ? (
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="py-4 text-center text-2xl">Welcome my Guest</p>
                  <button
                    className="ml-2 p-2"
                    onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                  >
                    <CloseSvg />
                  </button>
                </div>
                <form className="flex flex-col" onSubmit={registerHandler}>
                  <div className="flex flex-col lg:flex-row lg:items-end">
                    <div className="flex flex-col">
                      <span className="text-rose-500">
                        {error?.firstNameError}
                      </span>

                      <input
                        ref={firstNameRef}
                        type="text"
                        className="my-2 rounded-md border border-slate-300 px-4 py-3 lg:mr-2"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-rose-500">
                        {error?.lastNameError}
                      </span>

                      <input
                        ref={lastNameRef}
                        type="text"
                        className="my-2 rounded-md border border-slate-300 px-4 py-3 lg:ml-2"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <span className="text-rose-500">{error?.emailError}</span>

                  <input
                    ref={emailRef}
                    type="text"
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    placeholder="Email"
                  />
                  <span className="text-rose-500">{error?.usernameError}</span>

                  <input
                    ref={usernameRef}
                    type="text"
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    placeholder="Username"
                  />
                  <div className="flex flex-col lg:flex-row lg:items-end">
                    <div className="flex flex-col">
                      <span className="text-rose-500">{error?.ageError}</span>

                      <input
                        ref={ageRef}
                        type="number"
                        className="my-2 rounded-md border border-slate-300 px-4 py-3 lg:mr-2"
                        placeholder="Age"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-rose-500">
                        {error?.contactError}
                      </span>

                      <input
                        ref={contactRef}
                        type="number"
                        className="my-2 rounded-md border border-slate-300 px-4 py-3 lg:ml-2"
                        placeholder="Contact Number"
                      />
                    </div>
                  </div>
                  <span className="text-rose-500">{error?.passwordError}</span>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    placeholder="Password"
                  />
                  <span className="text-rose-500">
                    {error?.confirmPasswordError}
                  </span>
                  <input
                    type="password"
                    ref={confirmPasswordRef}
                    className="my-2 rounded-md border border-slate-300 px-4 py-3 "
                    placeholder="Confirm Password"
                  />
                  {!isLoading ? (
                    <button
                      type="submit"
                      className="my-2 rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white"
                    >
                      Register
                    </button>
                  ) : (
                    <p
                      type="submit"
                      className=" my-2 rounded-md bg-slate-900 px-4 py-4 text-center text-slate-300 hover:text-white"
                    >
                      ...
                    </p>
                  )}
                </form>
                <p>
                  Already had an account?{' '}
                  <button
                    className="cursor-pointer py-2 text-emerald-500 underline"
                    onClick={() => {
                      dispatch({ type: 'OPEN_LOGIN_MODAL' })
                    }}
                  >
                    Click to Log In
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <p className="py-4 text-center text-xl">
                    Registered Successfully!
                  </p>
                  <button
                    className="ml-2 p-2"
                    onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                  >
                    <CloseSvg />
                  </button>
                </div>
                <button
                  className="my-2 w-full rounded-md bg-slate-900 px-4 py-4 text-slate-300 hover:text-white"
                  onClick={() => dispatch({ type: 'OPEN_LOGIN_MODAL' })}
                >
                  Continue Login
                </button>
              </div>
            )}
          </div>
        </ModalLayout>
      ) : (
        <></>
      )}
    </>
  )
}

export default Register
