import React, { useEffect } from 'react'
import Head from 'next/head'
import { AdminSidebar } from '../../components'
import AdminTable from '../../components/Admin/AdminTable'
import AdminHeader from '../../components/Admin/AdminHeader'
import { useRouter } from 'next/router'
const Admin = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/admin/guests')
  }, [])
  return <></>
}

export default Admin
