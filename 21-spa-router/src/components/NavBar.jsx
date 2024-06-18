import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";

function NavBar() {
	return (
		<header className={classes.header}>
			<nav>
				<ul className={classes.list}>
					<li>
						<Link
							to="/"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
							end
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/products"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Products
						</Link>
					</li>
					{/* <li>
          <NavLink
            to="/newsletter"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Newsletter
          </NavLink>
        </li> */}
				</ul>
			</nav>
			{/* <NewsletterSignup /> */}
		</header>
	);
}

export default NavBar;
