import React from "react";
import {ToastContainer} from 'react-toastify';
import {Router} from 'react-router-dom';
import history from './services/history';

import Routes from "./routes";

const App = () => {
	return (
		<Router history={history}>
			<Routes />
          	<ToastContainer />
		</Router>
	)
}
export default App;