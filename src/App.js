import Router from "./shared/Router";
import GlobalStyles from "./GlobalStyle";
import { Layout, Toast } from "./common";
import { useSelector } from "react-redux";

function App() {
	const { isToastExist } = useSelector(state => state.toastSlice);

	return (
		<>
			<GlobalStyles />
			<Layout variant="commonLayout">
				{isToastExist ? <Toast /> : null}
				<Router />
			</Layout>
		</>
	);
}

export default App;
