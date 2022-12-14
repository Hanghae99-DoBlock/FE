import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Svg } from "../../common";
import {
	checkTodoHandler,
	choiceTodo,
} from "../../redux/modules/feed/feedSlice";
import { StCheckBox } from "./ChoiceTodoModal";

const ChoiceTodo = ({ todo }) => {
	const dispatch = useDispatch();
	const [checked, setChecked] = useState(false);
	const boastTodo = useSelector(state => state.feed.checkedList);

	const changeCheckedHandler = e => {
		setChecked(!checked);
		dispatch(
			choiceTodo({
				id: todo.todoId,
				todoContent: e.target.value,
				isChecked: e.target.checked,
			}),
		);
		//3개 이상 체크하지 못하도록 막음
		if (boastTodo.length >= 3) {
			setChecked(false);
		}
	};

	return (
		<Flex
			wd="231px"
			mht="29px"
			jc="flex-start"
			ai="flex-start"
			gap="8px"
			fs="14"
			bb="1px solid #F2F2F5"
		>
			<label className="checkbox-wrap">
				{!checked ? <Svg variant="nonCheck" /> : <Svg variant="check" />}

				<StCheckBox
					onClick={changeCheckedHandler}
					type="checkbox"
					name="todo"
					value={todo.todoContent}
				/>
			</label>
			<Flex jc="flex-start" ai="flex-start" fs="14" lh="22">
				{todo.todoContent}
			</Flex>
		</Flex>
	);
};

export default ChoiceTodo;
