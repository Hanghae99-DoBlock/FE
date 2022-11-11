import Router from "./shared/Router";
import GlobalStyles from "./GlobalStyle";
import { Layout } from "./common";
import { ModalAddTodo, ModalDetailTodo } from "./components";

function App() {
	return (
		<>
			<GlobalStyles />
			<Layout variant="commonLayout">
				<ModalAddTodo />
				<ModalDetailTodo />
				<Router />
			</Layout>
		</>
	);
}

export default App;
