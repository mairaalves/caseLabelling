import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';


const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const loginUser = async (credentials) => {
		return fetch('http://localhost:5000/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		}).then(data => data.json());
	}

	const handleSubmit = async e => {
		e.preventDefault();
		const response = await loginUser({
			email,
			password
		});

		sessionStorage.setItem('token', response.token);
		sessionStorage.setItem('user', JSON.stringify(response.user));
		navigate('/home');

	}

	return (
		<div className="container" id="container">
			<div className="form-container sign-in-container">
				<form onSubmit={handleSubmit}>
					<h1>Sign in</h1>
					<input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
					<input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
					<button type="submit">Sign In</button>
				</form>
			</div>
			<div className="overlay-container">
				<div className="overlay">
					<div className="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>Enter your email and password to label medic cases</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;
