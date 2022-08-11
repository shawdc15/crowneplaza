import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import {
  ConfirmReceiptModal,
  Footer,
  Header,
  PaymentLayout,
} from '../../../components'
import { getPaymentById } from '../../../services/payment.services'
import { useRouter } from 'next/router'
import { updateStatus } from '../../../services/reservation.services'
import { postConfirmationReceipt } from '../../../services/receipt.services'
const Payment = () => {
  const router = useRouter()
  const id = router.query.id
  const [modalData, setModalData] = useState()
  const [data, setData] = useState()
  const mounted = useRef()
  useEffect(async () => {
    const load = async () => {
      const { success, data } = await getPaymentById(id)
      if (success) {
        setData(data)
      }
    }
    if (!mounted.current) {
      load()
    }
    if (id) {
      mounted.current = true
    }
  })
  const paymentHandler = async (data) => {
    console.log(data)
    const newData = {
      status: 'reserved',
    }
    const update_res = await updateStatus(id, newData)
    if (update_res.success) {
      const res = await postConfirmationReceipt(data)
      if (res.success) {
        setModalData(res.data)
      }
    }
  }
  return (
    <>
      {modalData && (
        <ConfirmReceiptModal
          total={modalData?.total}
          channel={modalData?.channel}
          reference={modalData?._id}
          name={modalData?.cardHolderName}
          status="pending"
        />
      )}
      <Head>
        <title>Payment </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="" />
      <div className="mx-auto mb-auto w-full  max-w-container">
        <div className="mb-auto px-9">
          <h1 className="mb-2 p-4 text-2xl text-slate-900">
            Payment for Reservation
          </h1>
          <PaymentLayout
            reason="none"
            action={paymentHandler}
            total={data?.total}
            id={id}
            mode="confirmation"
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Payment
