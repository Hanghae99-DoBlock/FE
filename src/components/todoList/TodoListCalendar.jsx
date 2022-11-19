import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { useDispatch } from "react-redux";
import { updateSelectedDate } from "../../redux/modules/todoListSlice";
import "../todoList/style/calendar.css";

const TodoListCalendar = () => {
	const dispatch = useDispatch();

	const [value, onChange] = useState(new Date());

	useEffect(() => {
		// 선택된 날짜
		const selectedDate = {
			year: parseInt(moment(value).format("YYYY")),
			month: parseInt(moment(value).format("MM")),
			day: parseInt(moment(value).format("DD")),
			dayOfTheWeek: ["일", "월", "화", "수", "목", "금", "토"][value.getDay()],
		};

		// 선택된 날짜를 리듀서에 업데이트
		dispatch(updateSelectedDate(selectedDate));
	}, [dispatch, value]);

	return (
		<div>
			<Calendar
				onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
				formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
				calendarType="US" // 캘린더 타입 변경
				value={value}
				minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
				maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
				navigationLabel={({ date, label, locale, view }) =>
					`${date.getFullYear()}. ${date.getMonth() + 1}`
				}
				showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
			/>
		</div>
	);
};

export default TodoListCalendar;
