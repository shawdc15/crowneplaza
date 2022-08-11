import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import { useRouter } from 'next/router'
import { RoleHeader } from '../../components'
import { BackSvg } from '../../components/Svg'
import {
  addCalendarData,
  checkHousekeeping,
} from '../../services/calendar.services'
const RoomRecord = ({ role }) => {
  const router = useRouter()
  let id = router.query.id
  const [success, setSuccess] = useState()
  const mounted = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  useEffect(() => {
    const load = async () => {
      if (id) {
        const newData = {
          roomNo: id.split('-')[1],
          roomName: id.split('-')[0],
          date: moment().format('YYYY-MM-DD'),
        }
        const res = await checkHousekeeping(newData)
        if (res.success) {
          setData(res.data[0])
          setIsLoading(false)

          console.log(res.data[0])
        } else {
          router.push('/404')
        }

        mounted.current = true
      }
    }

    if (!mounted.current) {
      setIsLoading(true)
      load()
    }
  })
  const backHandler = () => {
    router.back()
  }

  const data_headers = [
    'Tasks',
    'Done',
    'Broken',
    'Repaired',
    'Out of order',
    'Notes',
  ]
  const data_items = [
    'Clean Bedroom',
    'Clean Toilet',
    'Clean Windows',
    'Clean Fridge',
    'Clean Furnitures',
    'Clean Bathtub',
    'Sweep Floor',
    'Mop Floor',
    'Empty Trash',
    'Change Bedsheets',
    'Change Pillowcase',
    'Change Blanket',
    'Change Towels',
    'Change Trashbags',
    'Replace Toiletries',
    'Replace Rugs',
  ]
  const saveHandler = async (e) => {
    setSuccess(false)

    e.preventDefault()
    let temp = []
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (field.type == 'checkbox') {
        temp[field.name] = field.checked
      } else {
        temp[field.name] = field.value
      }
    })

    const newData = {}

    for (let d of data_items) {
      newData[toCamelCase(d)] = {
        done: temp[toCamelCase(d) + '-done'],
        broken: temp[toCamelCase(d) + '-broken'],
        repaired: temp[toCamelCase(d) + '-repaired'],
        outOfOrder: temp[toCamelCase(d) + '-outOfOrder'],
        notes: temp[toCamelCase(d) + '-notes'],
      }
    }
    newData = {
      ...newData,
    }
    newData['cleaner'] = 'Nikita'
    newData['roomNo'] = id.split('-')[1]
    newData['roomFloor'] = id.split('-')[1][0]
    newData['roomName'] = id.split('-')[0]
    newData['date'] = moment().format('YYYY-MM-DD')
    if (role == 'manager') {
      newData['roomStatus'] = temp['roomStatus']
      newData['reservationStatus'] = temp['reservationStatus']
      newData['verifiedBy'] = 'John Doe'
      // newData['cleaner'] = 'Nikita'
    }
    const { success, data } = await addCalendarData(newData)
    if (success) {
      setData(data)
      setSuccess(true)
    }
  }

  function toCamelCase(str) {
    const splitName = str.split(' ')
    const firstWord = splitName[0].toLowerCase()
    return firstWord + splitName[1]
  }
  return (
    <>
      <Head>
        <title>
          {role == 'manager' ? 'Manager' : 'Housekeeping'} Room | Crowné Plaza
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoleHeader active="room" role={role} />

      <div className="mx-auto w-full max-w-container p-4">
        <div className="mb-2 flex items-center">
          <button className="" onClick={backHandler}>
            <BackSvg />
          </button>
          <h1 className=" py-2 px-4 text-2xl text-slate-900">Room {id}</h1>
        </div>
        <form method="post" onSubmit={saveHandler}>
          {success && (
            <div className="flex items-center justify-between rounded-md bg-emerald-400 px-4 py-2 text-white">
              <p className=" ">Save Successfully!</p>
              <button className="underline" onClick={() => setSuccess(false)}>
                Close
              </button>
            </div>
          )}
          <table className="mt-4 w-full table-auto">
            <thead>
              <tr className="e bg-slate-800">
                {data_headers &&
                  data_headers.map((name, index) => (
                    <th className="p-3  text-center text-white" key={index}>
                      {name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data_items &&
                data_items.map((item, index) => (
                  <tr key={index} className="border ">
                    <td className=" border-slate-100 p-2 px-4 text-slate-600">
                      {item}
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="p-2"
                        defaultChecked={
                          data && data[`${toCamelCase(item)}`]?.done
                        }
                        name={`${toCamelCase(item)}-done`}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="p-2"
                        defaultChecked={
                          data && data[`${toCamelCase(item)}`]?.broken
                        }
                        name={`${toCamelCase(item)}-broken`}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="p-2"
                        defaultChecked={
                          data && data[`${toCamelCase(item)}`]?.repaired
                        }
                        name={`${toCamelCase(item)}-repaired`}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="p-2"
                        defaultChecked={
                          data && data[`${toCamelCase(item)}`]?.outOfOrder
                        }
                        name={`${toCamelCase(item)}-outOfOrder`}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        className="p-1"
                        defaultValue={
                          data && data[`${toCamelCase(item)}`]?.notes
                        }
                        name={`${toCamelCase(item)}-notes`}
                        placeholder="Type here"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="my-4 flex  items-start justify-between rounded-md border p-4">
            <div className="text-slate-700">
              <p className="text-lg">Cleaner: {data?.cleaner}</p>
              <p className="text-lg">Verified By: {data?.verifiedBy}</p>
              <p className="text-lg">Date: {moment().format('MMM DD,YYYY')}</p>
            </div>
            {role == 'manager' && !isLoading && (
              <>
                <div>
                  <p>Reservation Status</p>
                  <select
                    defaultValue={data?.reservationStatus}
                    className="rounded-md border px-4 py-2"
                    name="reservationStatus"
                  >
                    <option value="Not Reserved">Not Reserved</option>
                    <option value="Not Available">Not Available</option>
                    <option value="Checked-Out">Checked-Out</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
                <div>
                  <p>Room Status</p>
                  <select
                    defaultValue={data?.roomStatus}
                    className="rounded-md border px-4 py-2"
                    name="roomStatus"
                  >
                    <option value="Clean">Clean</option>
                    <option value="Dirty">Dirty</option>
                    <option value="Inspected">Inspected</option>
                    <option value="Out of Order">Out of Order</option>
                  </select>
                </div>
              </>
            )}
            <button className="rounded-md bg-emerald-500 px-4 py-2 text-white">
              Save and Close
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default RoomRecord
