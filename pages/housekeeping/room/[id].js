import React, { useEffect, useState } from 'react'
import { RoomRecord } from '../../../components'
import { useRouter } from 'next/router'
const Room = () => {
  const router = useRouter()
  const [role, setRole] = useState()
  useEffect(() => {
    console.log(router.pathname.split('/')[1])
    setRole(router.pathname.split('/')[1])
  }, [])
  return <RoomRecord role={role} />
}

export default Room
