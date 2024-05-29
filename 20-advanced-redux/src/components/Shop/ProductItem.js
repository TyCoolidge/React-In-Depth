import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cart-slice";

const ProductItem = (props) => {
	const { title, price, description } = props;
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.cart);
	console.log("🚀 ~ ProductItem ~ items:", items);

	const handleAddToCart = () => {
		dispatch(cartActions.addToCart({ id: 1, price: 10 }));
	};

	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{title}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={handleAddToCart}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
