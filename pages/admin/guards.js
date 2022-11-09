import React, { useEffect } from 'react'
import Head from 'next/head'
import { AdminMain } from '../../components'
import { useAppContext } from '../../context/AppContext'
import { getAllStaff } from '../../services/staff.services'

const Guards = () => {
  const { state, dispatch } = useAppContext()

  const data_headers = [
    {
      name: 'ID No#',
      key: '_id',
    },
    {
      name: 'Email',
      key: 'email',
    },
    {
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Contact',
      key: 'contact',
    },
    {
      name: 'Shift',
      key: 'shift',
    },
    {
      name: 'Status of Employment',
      key: 'statusofemployment',
    },
  ]
  useEffect(async () => {
    dispatch({ type: 'CLEAR_SELECTED_DATA' })
    const { success, data } = await getAllStaff('guards')
    if (success) {
      dispatch({ type: 'SET_SELECTED_DATA', value: data })
    }
  }, [])
  return (
    <>
      <Head>
        <title>Guards | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminMain
        searchKey="email"
        title="Guards"
        data_headers={data_headers}
        data_items={state.selectedData}
      />
    </>
  )
}

export default Guards
