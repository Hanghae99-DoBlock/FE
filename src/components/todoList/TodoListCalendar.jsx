import moment from "moment/moment";
import { useState } from "react";
import { Calendar } from "react-calendar";
import { Box } from "../../common";
import "../todoList/style/style.css";
import ListingTodos from "./ListingTodos";
import TodoListHeader from "./TodoListHeader";

const TodoListCalendar = () => {
	const [value, onChange] = useState(new Date());
	const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
	const week = WEEKDAY[value.getDay()];
	console.log(value.getDate(), week);

	return (
		<>
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
			<Box variant="todoListArea">
				<TodoListHeader
					year={moment(value).format("YYYY")}
					month={moment(value).format("MM")}
					date={moment(value).format("DD")}
					day={week}
				/>
			</Box>
		</>
	);
};

export default TodoListCalendar;
