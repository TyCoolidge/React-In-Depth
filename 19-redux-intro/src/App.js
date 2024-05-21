import Counter from "./components/Counter";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import UserProfile from "./components/UserProfile";

function App() {
	const { isAuthenticated } = useSelector((state) => state.authReducer);

	return (
		<>
			{isAuthenticated ? <Header /> : <Auth />}
			{isAuthenticated && <UserProfile />}
			<Counter />
		</>
	);
}

export default App;
