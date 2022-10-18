import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import moment from 'moment'
import ModalLayout from '../Layout/ModalLayout'
import {
  getReservationById,
  updateStatus,
} from '../../services/reservation.services'
import { declinedReceipt } from '../../services/receipt.services'
const ReservedCardModal = ({ setData, data, id, setModal, receipt }) => {
  console.log(id)
  console.log(data)
  const reasonref = useRef()

  const [selectedData, setSelectedData] = useState()
  const [selectedLargeImage, setSelectedLargeImage] = useState(null)
  useEffect(async () => {
    const res = await getReservationById(id)
    if (res.success) {
      setSelectedData([res.data])
    }
  }, [])
  const formatTotal = (x = 0) => {
    const xx = parseFloat(x).toFixed(2)
    return xx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const checkInHandler = async () => {
    const res = await updateStatus(id, { status: 'checkedIn' })
    if (res.success) {
      const newData = data.filter((item) => item._id != id)
      setData(newData)
      setModal(false)
    }
  }
  const checkOutHandler = async () => {
    const res = await updateStatus(id, { status: 'checkedOut' })
    if (res.success) {
      const newData = data.filter((item) => item._id != id)
      setData(newData)
      setModal(false)
    }
  }
  const approveHandler = async () => {
    const res = await updateStatus(id, {
      status: 'approved',
      end_expiration: moment().clone().add(15, 'm'),
    })
    if (res.success) {
      const reservationData = data.filter((item) => item._id == id)
      if (reservationData[0]?.email?.length > 0) {
        const emailData = {
          email: reservationData[0]?.email,
          subject: 'approved_request',
          name: reservationData[0]?.name,
        }
        await declinedReceipt(emailData)
      }
      const newData = data.filter((item) => item._id != id)
      setData(newData)
      setModal(false)
    }
  }
  const declineHandler = async () => {
    const res = await updateStatus(id, { status: 'declined' })
    if (res.success) {
      const backUpMessage =
        'Your request for booking is declined due to unreasonable agenda. We are sorry for the inconvenience and we hope you’ll understand.'
      const reservationData = data.filter((item) => item._id == id)
      if (reservationData[0]?.email?.length > 0) {
        const emailData = {
          email: reservationData[0]?.email,
          subject: 'declined_request',
          message: reasonref.current?.value || backUpMessage,
          name: reservationData[0]?.name,
        }
        await declinedReceipt(emailData)
      }
      const newData = data.filter((item) => item._id != id)
      setData(newData)
      setModal(false)
    }
  }
  const cancelledHandler = async (status) => {
    const res = await updateStatus(id, { status })
    let backUpMessage = ''
    if (res.success) {
      if (status == 'approve_cancellation') {
        backUpMessage =
          'Your request for cancellation is approved. The promise amount will be returned to your account, please wait for a while. Thank you.'
      } else {
        backUpMessage =
          'Your request for booking is declined due to unreasonable agenda. We are sorry for the inconvenience and we hope you’ll understand.'
      }
      const reservationData = data.filter((item) => item._id == id)
      if (reservationData[0]?.email?.length > 0) {
        const emailData = {
          email: reservationData[0]?.email,
          subject: 'approved_cancel',
          message:
            status == 'approve_cancellation'
              ? backUpMessage
              : reasonref.current?.value || backUpMessage,
          name: `${data.name}`,
        }
        await declinedReceipt(emailData)
      }
      const newData = data.filter((item) => item._id != id)
      setData(newData)
      setModal(false)
    }
  }
  const receiptHandler = (id) => {
    for (let r in receipt) {
      if (receipt[r].reservation_id == id) {
        return receipt[r].reason
      }
    }
  }
  return (
    <>
      <div className="mx-auto w-full max-w-container">
        {selectedData &&
          selectedData?.map(
            (
              {
                _id,
                name,
                checkIn,
                checkOut,
                vaccination,
                total,
                roomType,
                preferredRoom,
                noOfExtraBed,
                noOfChildren,
                noOfGuest,
                noOfAdult,
                voucherCode,
                remarks,
                contact,
                status,
                purposeOfStay,
              },
              index
            ) => (
              <ModalLayout key={index}>
                <div className="flex flex-col ">
                  <div>
                    <p className="p-2 text-lg font-semibold">{roomType}</p>
                  </div>
                  <div className="grid grid-cols-1 items-center lg:grid-cols-2 ">
                    <div className="px-2 text-slate-600">
                      <p className="pt-1 text-lg font-semibold text-slate-900">
                        {data?.name}
                      </p>
                      <p className="pt-1 text-lg font-semibold text-emerald-500">
                        Room #{preferredRoom}
                      </p>
                      <p>Check-in: {moment(checkIn).format('MMM DD YYYY')}</p>
                      <p>Check-out: {moment(checkOut).format('MMM DD YYYY')}</p>
                      <p>No of Guests: {noOfGuest}</p>
                      <p>Adult: {noOfAdult}</p>
                      <p>Children: {noOfChildren}</p>
                      {contact && <p>Contact: {contact}</p>}
                    </div>
                    <div className="p-2 text-slate-600">
                      <p>No of extra beds: {noOfExtraBed}</p>
                      {/* <p>Voucher: {voucherCode}</p> */}
                      <p>Purpose of Stay: {purposeOfStay}</p>
                      <p>Remarks: {remarks}</p>
                      {receipt && <p>Reason: {receiptHandler(_id)}</p>}
                    </div>
                    <div>
                      <div className="mx-2 flex flex-wrap gap-4">
                        {vaccination &&
                          vaccination.map((url, index) => (
                            <img
                              onClick={() => setSelectedLargeImage(url)}
                              key={index}
                              src={url}
                              className="h-24 w-24 cursor-zoom-in object-cover"
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                {status != 'request cancellation' && status != 'checkedIn' ? (
                  <>
                    <p className="p-2 text-lg">
                      Down Payment: &#8369; {formatTotal(total / 2)}
                    </p>
                    <p className="p-2 text-lg">
                      Balance: &#8369; {formatTotal(total / 2)}
                    </p>
                  </>
                ) : (
                  <p className="p-2 text-lg">
                    Total Paid: &#8369; {formatTotal(total)}
                  </p>
                )}
                {(status == 'request cancellation' ||
                  status == 'requested') && (
                  <textarea
                    ref={reasonref}
                    placeholder="Indicate the reason why you decline"
                    className="mx-2 w-full rounded-md border border-slate-300 p-2"
                  ></textarea>
                )}
                <div className="mt-4 flex justify-between gap-4 p-2">
                  <button
                    onClick={() => setModal(false)}
                    className="rounded-md bg-slate-100 px-4 py-2"
                  >
                    Go Back
                  </button>
                  <div className="flex gap-4">
                    {status == 'checkedIn' ? (
                      <button
                        onClick={checkOutHandler}
                        className="rounded-md bg-emerald-500 px-4 py-2 text-white"
                      >
                        Check Out
                      </button>
                    ) : status == 'reserved' ? (
                      <button
                        onClick={checkInHandler}
                        className="rounded-md bg-emerald-500 px-4 py-2 text-white"
                      >
                        Mark as paid and Check-in
                      </button>
                    ) : status == 'requested' ? (
                      <>
                        <button
                          onClick={declineHandler}
                          className="rounded-md bg-slate-500 px-4 py-2 text-white"
                        >
                          Decline
                        </button>
                        <button
                          onClick={approveHandler}
                          className="rounded-md bg-emerald-500 px-4 py-2 text-white"
                        >
                          Approve
                        </button>
                      </>
                    ) : (
                      status == 'request cancellation' && (
                        <>
                          <button
                            onClick={() => cancelledHandler('reserved')}
                            className="rounded-md bg-slate-500 px-4 py-2 text-white"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() =>
                              cancelledHandler('approve_cancellation')
                            }
                            className="rounded-md bg-emerald-500 px-4 py-2 text-white"
                          >
                            Approve
                          </button>
                        </>
                      )
                    )}
                  </div>
                </div>
                {selectedLargeImage != null && (
                  <div
                    onClick={() => setSelectedLargeImage(null)}
                    className="absolute top-0 left-0 flex h-full w-full cursor-zoom-out items-center justify-center"
                  >
                    <img
                      className="z-50 max-h-imageLg w-imageLg bg-white object-cover"
                      src={selectedLargeImage}
                    />
                  </div>
                )}
              </ModalLayout>
            )
          )}
      </div>
    </>
  )
}

export default ReservedCardModal
