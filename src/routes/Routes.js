import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";


export default function RouteWrapper({
	component: Component,
	isPrivate = false,
	...rest
}) {
	if(!isAuthenticated() && isPrivate) {
		return <Redirect to="/" />;
	}

	if(isAuthenticated() && !isPrivate) {
		return <Redirect to="/dragons" />;
	}

	return (
		<Route
			{...rest}
			render={props => (
				<Component {...props} />
			)}
		/>
	);
}