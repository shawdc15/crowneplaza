import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import {
  daysOfCurrentMonth,
  getCalendarDataByDate,
} from '../../services/calendar.services'
import { ArrowLeftSvg, ArrowRightSvg } from '../Svg'
const Calendar = () => {
  const data_headers = [
    {
      name: 'Room Type',
      key: 'roomName',
    },
    {
      name: 'Floor',
      key: 'roomFloor',
    },
    {
      name: 'Cleaner',
      key: 'cleaner',
    },
    {
      name: 'Room No',
      key: 'roomNo',
    },
    {
      name: 'Room Status',
      key: 'roomStatus',
    },
  ]
  const dateHandler = async (date) => {
    const newData = {
      date,
    }
    const { success, data } = await getCalendarDataByDate(newData)
    if (success) {
      setData(data)
    }
  }
  const selectedDateNo = useRef(moment().format('DD') - 1)
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD')
  )
  const [currentMonth, setCurrentMonth] = useState(moment())
  const daysRef = useRef(daysOfCurrentMonth())
  const [data, setData] = useState()
  useEffect(async () => {
    const newData = {
      date: moment().clone().format('YYYY-MM-DD'),
    }
    const { success, data } = await getCalendarDataByDate(newData)
    if (success) {
      setData(data)
    }
  }, [])
  const navigateHandler = (arrow) => {
    if (arrow == 'next') {
      let nextNewData = moment(currentMonth).add(1, 'M')
      daysRef.current = daysOfCurrentMonth(nextNewData)
      setCurrentMonth(nextNewData)
    } else {
      let previousNewData = moment(currentMonth).add(-1, 'M')
      daysRef.current = daysOfCurrentMonth(previousNewData)
      setCurrentMonth(previousNewData)
    }
  }

  const { year, month, days, startDay, weekdays, monthNo } = daysRef?.current
  const start = `gridColumn-${startDay + 1}`
  return (
    <>
      <div className="flex gap-4">
        <div>
          <div className="flex items-center justify-between p-4">
            <p className="text-xl">
              {month} {year}
            </p>
            <div>
              <button
                className="p-2 text-slate-700 "
                onClick={() => navigateHandler('previous')}
              >
                <ArrowLeftSvg />
              </button>
              <button
                className="p-2 text-slate-700 "
                onClick={() => {
                  navigateHandler('next')
                }}
              >
                <ArrowRightSvg />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 place-items-center">
            {weekdays &&
              weekdays.map((item) => (
                <span key={item} className="mb-2 p-4 text-center text-xs">
                  {item}
                </span>
              ))}
            {days.map((item, index) => (
              <div
                onClick={() => {
                  selectedDateNo.current = item
                  dateHandler(
                    moment(`${year}-${monthNo}-${item + 1}`)
                      .clone()
                      .format('YYYY-MM-DD')
                  )
                  setSelectedDate(
                    moment(`${year}-${monthNo}-${item + 1}`)
                      .clone()
                      .format('YYYY-MM-DD')
                  )
                }}
                className={`${
                  item == 0 ? start : ''
                } flex aspect-square w-full cursor-pointer flex-col items-center ${
                  selectedDateNo.current == item &&
                  selectedDate ==
                    `${year}-${monthNo}-${
                      item + 1 < 10 ? `0${item + 1}` : item + 1
                    }` &&
                  'bg-emerald-400'
                }  justify-center border border-slate-100 text-sm text-slate-700 `}
                key={`${month}${index}`}
              >
                {item + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full px-4">
          <table className="mt-4 w-full table-auto">
            <thead>
              <tr className=" bg-slate-800">
                {data_headers.map(({ name }, index) => (
                  <th key={index} className="p-3 text-center text-white">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.length ? (
                data.map((item, index) => (
                  <tr key={index}>
                    {data_headers.map(({ key }, id) => (
                      <td
                        key={id}
                        className={` 
                        ${
                          key == 'roomStatus' && item[key] == 'Clean'
                            ? 'bg-cyan-400'
                            : key == 'roomStatus' && item[key] == 'Dirty'
                            ? 'bg-rose-400'
                            : key == 'roomStatus' && item[key] == 'Out of Order'
                            ? 'bg-slate-400'
                            : key == 'roomStatus' &&
                              item[key] == 'Inspected' &&
                              'bg-emerald-400'
                        } border-2 border-slate-100 p-4 text-center text-slate-600`}
                      >
                        {item[key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className=" border-2 border-slate-100 p-4 text-center text-slate-600"
                    colSpan={data_headers.length}
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Calendar
