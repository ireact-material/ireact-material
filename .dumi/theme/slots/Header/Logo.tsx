import * as React from "react";
import { Link } from "dumi";

const Logo = () => (
	<h1>
		<Link className='logo' to="/">
			<img
				alt="logo"
				src="https://cdn.lovevuerk.com/plus/img/logo.92144542.png"
			/>
			<span className='logo-text'>IReact Material</span>
		</Link>
	</h1>
);

export default Logo;
