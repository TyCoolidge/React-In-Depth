import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";

// NOTE OLD Way of routing

// const routeDefinitions = createRoutesFromElements(
// 	<Route>
// 		<Route path="/" element={<Home />} />
// 		<Route path="/products" element={<ProductsPage />} />
// 	</Route>
// );

// const router = createBrowserRouter(routeDefinitions);

// NOTE New Way of routing

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/products", element: <ProductsPage /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
