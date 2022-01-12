import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'
import './NavBar.css';

const NavBar = () => {
	const navigate = useNavigate();

	const logout = () => {
		sessionStorage.clear();
		navigate('/');
	};

	const getUserName = () => {
		const user = JSON.parse(sessionStorage.getItem('user'));
		return user.name
	}

	return (
		<header className="topbar">
			<div className="topbar__container">
				<div className="topbar__user">
					{getUserName()}
        </div>
				<div className="topbar__actions">
					<Button onClickFunc={logout} text="Logout"/>
				</div>
			</div>
		</header>
	)
}

export default NavBar;