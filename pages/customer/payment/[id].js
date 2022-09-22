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
import {
  postConfirmationReceipt,
  sendReceipt,
} from '../../../services/receipt.services'
const Payment = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const id = router.query.id
  const [modalData, setModalData] = useState()
  const [data, setData] = useState()
  const mounted = useRef()
  useEffect(async () => {
    const load = async () => {
      const { success, data } = await getPaymentById(id)
      if (success) {
        setData(data)
        if (data.status == 'reserved') {
          router.push('/customer/reservation')
        }
        console.log(data)
      }
    }
    if (!mounted.current) {
      load()
    }
    if (id) {
      mounted.current = true
    }
  })
  const paymentHandler = async (receiptData) => {
    setIsLoading(true)
    console.log(receiptData)
    const newData = {
      status: 'reserved',
    }

    const update_res = await updateStatus(id, newData)
    if (update_res.success) {
      const res = await postConfirmationReceipt(receiptData)
      console.log({
        ...receiptData,
        reference: res?.data._id,
        subject: 'confirmation',
        name: data?.name,
        email: data?.email,
      })
      const result = await sendReceipt({
        ...receiptData,
        reference: res?.data._id,
        subject: 'confirmation',
        name: data?.name,
        email: data?.email,
      })
      if (res.success) {
        setModalData(res.data)
      }
      setIsLoading(false)
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
            action={paymentHandler}
            total={data?.total}
            metaData={{
              roomType: data?.roomType,
              preferredRoom: data?.preferredRoom,
            }}
            id={id}
            isLoading={isLoading}
            mode="confirmation"
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Payment
