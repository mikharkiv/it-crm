import React from "react";
import './styles/App.css';
import LoginPage from "./components/LoginPage";
import {observer} from "mobx-react";
import {Switch, Route} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<Switch>
			<Route exact path="/login" component={LoginPage}/>
			<PrivateRoute path="">
				<MainLayout/>
			</PrivateRoute>
		</Switch>
	);
}

export default observer(App);
