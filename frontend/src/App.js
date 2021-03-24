import React from "react";
import './styles/App.css';
import LoginPage from "./components/LoginPage";
import {observer} from "mobx-react";
import {Switch, Route, Redirect} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import {useStores} from "./hooks/use-stores";
import LoadingIcon from "./components/LoadingIcon";
import MainDeveloperLayout from "./components/MainDeveloperLayout";

const App = () => {
	const rootStore = useStores().rootStore;

	return (
		<Switch>
			<Route exact path="/login" component={LoginPage}/>
			{ rootStore.isApiAvailable ? (
				rootStore.isLoggedIn ? (
					rootStore.state === "done" ?
						(rootStore.me.position === 'MA' ? <MainLayout /> : <MainDeveloperLayout />)
						: <LoadingIcon />
					) :
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
