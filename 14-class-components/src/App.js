import UserFinder from "./components/UserFinder";
import Users from "./components/Users";
import UsersContext from "./store/users-context";

function App() {
	const DUMMY_USERS = [
		{ id: "u1", name: "Max" },
		{ id: "u2", name: "Manuel" },
		{ id: "u3", name: "Julie" },
	];
	const userContext = {
		users: DUMMY_USERS,
	};
	return (
		<UsersContext.Provider value={userContext}>
			<UserFinder />
		</UsersContext.Provider>
	);
}

export default App;
