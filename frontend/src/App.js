import React from "react";
import './styles/App.css';
import LoginPage from "./components/LoginPage";
import {observer} from "mobx-react";
import {Switch, Route, Redirect} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import {useStores} from "./hooks/use-stores";

const App = () => {
	const rootStore = useStores().rootStore;

	return (
		<Switch>
			<Route exact path="/login" component={LoginPage}/>
			{ rootStore.isApiAvailable ? (
				rootStore.isLoggedIn ? <MainLayout /> :
					<Route path="" render={({location}) =>
				       <Redirect to={{pathname: "/login", state: { from: location }}}/>}/>
				) : (
					<div className="api-unavailable">
						Неможливо з'єднатись із сервером. Спробуйте пізніше
					</div>
			)}
		</Switch>
	);
}

export default observer(App);
