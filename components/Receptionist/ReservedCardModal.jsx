import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import moment from 'moment'
import ModalLayout from '../Layout/ModalLayout'
import {
  getReservationById,
  updateStatus,
} from '../../services/reservation.services'
const ReservedCardModal = ({ setData, data, id, setModal }) => {
  const [selectedData, setSelectedData] = useState()
  useEffect(async () => {
    const res = await getReservationById(id)
    if (res.success) {
      setSelectedData([res.data])
      console.log(res.data)
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
      // setData(newData)
      setModal(false)
    }
  }
  const checkOutHandler = async () => {
    const res = await updateStatus(id, { status: 'checkedOut' })
    if (res.success) {
      const newData = data.filter((item) => item._id != id)
      // setData(newData)
      setModal(false)
    }
  }
  const approveHandler = async () => {
    const res = await updateStatus(id, { status: 'approved' })
    if (res.success) {
      const newData = data.filter((item) => item._id != id)
      setData(newData)
      setModal(false)
    }
  }
  const declineHandler = async () => {
    const res = await updateStatus(id, { status: 'declined' })
    if (res.success) {
      const newData = data.filter((item) => item._id != id)
      setData(newData)
      setModal(false)
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
                status,
                purposeOfStay,
              },
              index
            ) => (
              <>
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
                        <p>
                          Check-out: {moment(checkOut).format('MMM DD YYYY')}
                        </p>
                        <p>No of Guests: {noOfGuest}</p>
                        <p>Adult: {noOfAdult}</p>
                        <p>Children: {noOfChildren}</p>
                      </div>
                      <div className="p-2 text-slate-600">
                        <p>No of extra beds: {noOfExtraBed}</p>
                        {/* <p>Voucher: {voucherCode}</p> */}
                        <p>Purpose of Stay: {purposeOfStay}</p>
                        <p>Remarks: {remarks}</p>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-4">
                          {vaccination &&
                            vaccination.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                className="h-24 w-24 object-cover"
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="p-2 text-lg">Balance: {formatTotal(total)}</p>
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
                      ) : (
                        status == 'requested' && (
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
                        )
                      )}
                    </div>
                  </div>
                </ModalLayout>
              </>
            )
          )}
      </div>
    </>
  )
}

export default ReservedCardModal
