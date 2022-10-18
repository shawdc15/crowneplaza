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
import moment from 'moment'
import Link from 'next/link'
const Payment = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const id = router.query.id
  const [modalData, setModalData] = useState()
  const [data, setData] = useState()
  const [expired, setExpired] = useState(false)
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
        if (
          moment(data.end_expiration).clone().format('YYYY-MM-DD HH:mm') <
          moment().clone().format('YYYY-MM-DD HH:mm')
        ) {
          await updateStatus(id, { status: 'declined' })
          setExpired(true)
        }
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
    if (
      moment(data.end_expiration).clone().format('YYYY-MM-DD HH:mm') <
      moment().clone().format('YYYY-MM-DD HH:mm')
    ) {
      await updateStatus(id, { status: 'declined' })
      setExpired(true)
      return
    }
    setIsLoading(true)
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
        {data &&
          (!expired ? (
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
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="mt-10 text-center text-2xl font-semibold">
                Payment for this reservation is automatically cancelled, because
                you did not make a payment on a given time.
              </p>
              <Link href="/customer/reservation">
                <button className="mt-4 rounded-lg bg-emerald-500 p-4 py-2 text-white">
                  Back to Reservation History
                </button>
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </>
  )
}

export default Payment
