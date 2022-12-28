import React from "react";

import Logo from "./Logo";

import "./index.scss";

const Header: React.FC = () => (
	<div className='header-wrapper'>
		<div className='header'>
			<Logo />
		</div>
	</div>
);

export default Header;
