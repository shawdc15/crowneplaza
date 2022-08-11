import React, { useState, useEffect } from 'react'
import { RoleHeader } from '../../components'
import Head from 'next/head'
import moment from 'moment'
import { getCalendarDataByDate } from '../../services/calendar.services'
const HouseKeeping = ({ role }) => {
  const [data, setData] = useState()
  useEffect(async () => {
    const { success, data } = await getCalendarDataByDate({
      date: moment().format('YYYY-MM-DD'),
    })
    if (success) {
      setData(data)
    }
  })

  const data_headers = [
    { name: 'Room No.', key: 'roomNo' },
    { name: 'Room Type', key: 'roomName' },
    { name: 'Room Floor', key: 'roomFloor' },
    { name: 'Room Status', key: 'roomStatus' },
    { name: 'Reservation Status', key: 'reservationStatus' },
  ]
  return (
    <>
      <Head>
        <title>Manager Housekeeping | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoleHeader active="housekeepings" role={role} />
      <div className="mx-auto w-full max-w-container p-4">
        <table className="mt-4 w-full table-auto">
          <thead>
            <tr className=" bg-slate-800">
              {data_headers &&
                data_headers.map(({ name }, index) => (
                  <th className="p-3 text-center text-white" key={index}>
                    {name}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item, index) => (
                <tr key={index}>
                  {data_headers &&
                    data_headers.map(({ key }, sub_index) => (
                      <td
                        className={`border-2 border-slate-100 p-4 text-center text-slate-600 ${
                          key == 'roomStatus' && item[key] == 'Clean'
                            ? 'bg-cyan-400'
                            : key == 'roomStatus' && item[key] == 'Dirty'
                            ? 'bg-rose-400'
                            : key == 'roomStatus' && item[key] == 'Out of Order'
                            ? 'bg-slate-400'
                            : key == 'roomStatus' && item[key] == 'Inspected'
                            ? 'bg-emerald-400'
                            : key == 'reservationStatus' &&
                              item[key] == 'Reserved'
                            ? 'bg-orange-400'
                            : key == 'reservationStatus' &&
                              item[key] == 'Checked-Out'
                            ? 'bg-yellow-400'
                            : key == 'reservationStatus' &&
                              item[key] == 'Not Available' &&
                              'bg-violet-400'
                        }`}
                        key={sub_index}
                      >
                        {item[key]}
                      </td>
                    ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={data_headers.length}>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default HouseKeeping
