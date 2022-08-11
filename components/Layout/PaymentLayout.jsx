import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { confirmationReceipt } from '../../services/receipt.services'
const PaymentLayout = ({ mode, action, reason, total, id }) => {
  const [accordion, setAccordion] = useState(0)
  const [error, setError] = useState(false)
  const [receipt, setReceipt] = useState(false)
  const paymentMethodRef = useRef()
  const cardHolderNameRef = useRef()

  const cardNumberRef = useRef()

  const validateError = () => {
    if (
      !paymentMethodRef.current.value ||
      !cardHolderNameRef.current.value ||
      !cardNumberRef.current.value ||
      !reason
    ) {
      return true
    }
    return false
  }
  const cancellationHandler = async () => {
    const isError = validateError()
    const newData = {
      receiptFor: mode,
      reason: reason,
      paymentMethod: paymentMethodRef.current.value,
      cardHolderName: cardHolderNameRef.current.value,
      creditCardNumber: cardNumberRef.current.value,
      channel: 'Credit Card',
      reservation_id: id,
      total: total,
      status: mode == 'confirmation' ? 'paid' : 'refund',
    }
    if (!isError) {
      setError(false)
      action(newData)
    } else {
      setError(true)
    }
  }

  const confirmationHandler = async () => {
    const isError = validateError()
    const newData = {
      receiptFor: mode,
      reason: reason,
      paymentMethod: paymentMethodRef.current.value,
      cardHolderName: cardHolderNameRef.current.value,
      creditCardNumber: cardNumberRef.current.value,
      channel: 'Credit Card',
      reservation_id: id,
      total: total,
      status: mode == 'confirmation' ? 'paid' : 'refund',
    }

    if (!isError) {
      setError(false)
      action(newData)
    } else {
      setError(true)
    }
  }
  return (
    <div>
      {error && (
        <div className="mb-4 flex items-center justify-between rounded-md bg-rose-500 p-4 text-white transition-all delay-75">
          <p>Please fill up the form!</p>
          <span
            onClick={() => setError(false)}
            className="cursor-pointer text-white underline"
          >
            Close
          </span>
        </div>
      )}
      <div>
        <p
          className="cursor-pointer overflow-hidden bg-gray-200 p-4 text-slate-900"
          onClick={() => (accordion == 1 ? setAccordion(0) : setAccordion(1))}
        >
          Credit/Debit Card
        </p>
        <div
          className={` overflow-hidden transition-all ${
            accordion == 0 ? 'h-0' : accordion == 1 ? 'h-auto' : 'h-0'
          }`}
        >
          <input
            ref={paymentMethodRef}
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Select payment method"
          />
          <input
            ref={cardHolderNameRef}
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Card Holder Name"
          />
          <input
            ref={cardNumberRef}
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="number"
            placeholder="Credit/Card Number"
          />
        </div>
      </div>
      <div>
        <p
          className="cursor-pointer overflow-hidden bg-gray-200 p-4 text-slate-900"
          onClick={() => (accordion == 2 ? setAccordion(0) : setAccordion(2))}
        >
          E-Wallet/Digital Payment
        </p>
        {/* <div
          className={`overflow-hidden transition-all ${
            accordion == 0 ? 'h-0' : accordion == 2 ? 'h-auto' : 'h-0'
          }`}
        >
          <input
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Select payment method"
          />
          <input
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Card Holder Name"
          />
          <input
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Credit/Number Card Number"
          />
        </div> */}
      </div>
      <div>
        <p
          className="cursor-pointer overflow-hidden bg-gray-200 p-4 text-slate-900"
          onClick={() => (accordion == 3 ? setAccordion(0) : setAccordion(3))}
        >
          Counter Payment
        </p>
        {/* <div
          className={`overflow-hidden transition-all ${
            accordion == 0 ? 'h-0' : accordion == 3 ? 'h-auto' : 'h-0'
          }`}
        >
          <input
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Select payment method"
          />
          <input
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Card Holder Name"
          />
          <input
            className="my-1 w-full rounded-md border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Credit/Number Card Number"
          />
        </div> */}
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
        {mode != 'confirmation' && (
          <Link
            href={
              mode != 'cancel'
                ? '/customer/reservation'
                : '/customer/accommodation'
            }
          >
            <button className="my-2 rounded-md bg-slate-200 px-4 py-4 text-slate-900 disabled:bg-slate-600">
              Back
            </button>
          </Link>
        )}
        <button
          onClick={
            mode == 'confirmation' ? confirmationHandler : cancellationHandler
          }
          className="my-2 rounded-md bg-gray-900 px-4 py-4 text-slate-100 disabled:bg-slate-600"
        >
          Proceed
        </button>
      </div>
    </div>
  )
}

export default PaymentLayout
