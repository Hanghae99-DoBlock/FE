import Router from "./shared/Router";
import GlobalStyles from "./GlobalStyle";
import { Layout } from "./common";

function App() {
	return (
		<>
			<GlobalStyles />
			<Layout variant="commonLayout">
				<Router />
			</Layout>
		</>
	);
}

export default App;
