import React from "react" 
import "../styles/Navbar.css" 

function Navbar() {
	return (
	<React.Fragment>
		<nav class="nav-bar">
			<h1>LOGO</h1>
			<ul class="nav-list">
				<li>Home</li>
				<li>Shows</li>
				<li>Stat</li>
			</ul>
		
		</nav>
	</React.Fragment>
		
	);
};

export default Navbar;
