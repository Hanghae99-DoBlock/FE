import Router from "./shared/Router";
import GlobalStyles from "./GlobalStyle";
import { Layout, PcVerIllustration, Toast } from "./common";
import { useSelector } from "react-redux";

function App() {
	const { isToastExist } = useSelector(state => state.toastSlice);

	return (
		<>
			<GlobalStyles />
			<PcVerIllustration />
			<Layout variant="commonLayout">
				{isToastExist ? <Toast /> : null}
				<Router />
			</Layout>
		</>
	);
}

export default App;
