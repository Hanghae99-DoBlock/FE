import moment from "moment/moment";
import { useState } from "react";
import { Calendar } from "react-calendar";
import "../todoList/style/style.css";

const TodoListCalendar = () => {
	const [value, onChange] = useState(new Date());
	// const [dot, setDot] = useState(["2022-11-09", "2022-11-10"]);
	// const [tri, setTri] = useState(["2022-11-09", "2022-11-04"]);

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
