/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* 캘린더 제작중, PR을 위해 임시로 린트 에러 막아놓았음 */
import dayjs from 'dayjs';
import React, { useState } from 'react';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/ko';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import BookedBox from '@/components/BookedBox';

dayjs.extend(isoWeek);
dayjs.locale('ko');

type Status = '예약' | '완료' | '승인';
type Reservation = {
  date: string;
  status: Status;
};
const reservations: Reservation[] = [
  { date: '2024-07-20', status: '예약' },
  { date: '2024-07-15', status: '완료' },
  { date: '2024-07-25', status: '승인' },
  { date: '2024-07-25', status: '예약' },
  // 추가 예약 데이터
];

function calendar2() {
  // PR을 위해 임시로 막음
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // startOf('month') 메서드는 currentMonth를 해당 월의 첫째 날로 설정,
  // startOf('week') 메서드는 그 날이 속한 주의 첫째 날로 설정.
  // 따라서 startDay는 현재 월의 첫째 날이 속한 주의 첫째 날을 가리킴.
  const startDay = currentMonth.startOf('month').startOf('week');
  const endDay = currentMonth.endOf('month').endOf('week');

  const days = [];
  let day = startDay.clone();

  // day가 endDay보다 이전인 동안 반복
  while (day.isBefore(endDay, 'day')) {
    // day 변수의 값을 그대로 사용하면 나중에 값이 변경될 때 문제가 생길 수 있음
    days.push(day.clone());
    day = day.add(1, 'day');
  }

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  // 임시 코드
  const getReservationsForDay = (date: string) => reservations.filter((reservation) => dayjs(reservation.date).isSame(date, 'day'));

  return (
    <div className='text-[#000] my-[1.6rem]'>
      <div className='flex flex-row items-center justify-between'>
        <button className='flex flex-row w-[2.4rem] h-[2.4rem]' type='button' onClick={prevMonth}>
          <ChevronDoubleLeftIcon />
        </button>
        <h2 className='text-[2rem] font-[700]'>{currentMonth.format('YYYY년M월')}</h2>
        <button className='flex flex-row w-[2.4rem] h-[2.4rem]' type='button' onClick={nextMonth}>
          <ChevronDoubleRightIcon />
        </button>
      </div>
      <div className='grid grid-cols-7 gap-[0.3rem]'>
        {days.map((day) => {
          const reservationsForDay = getReservationsForDay(day.format('YYYY-MM-DD'));
          return (
            <button
              type='button'
              key={day.format('YYYY-MM-DD')}
              className={`flex w-1/7 h-[8.4rem] p-[0.3rem] border flex-col ${day.isSame(currentMonth, 'month') ? '' : 'bg-gray-100'}  hover:border-blue hover:border-[0.3rem]`}
            >
              <div className='text-left w-[100%]'>
                <span className={`${day.isSame(dayjs(), 'day') ? 'flex w-[1.5rem] justify-center rounded-[0.2rem] text-white bg-blue-light' : ''}`}>{day.date()}</span>
              </div>
              <BookedBox reservations={reservationsForDay} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default calendar2;
