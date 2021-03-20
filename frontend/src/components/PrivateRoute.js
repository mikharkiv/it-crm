import {Redirect, Route} from "react-router-dom";
import {useStores} from "../hooks/use-stores";
import {observer} from "mobx-react";

function PrivateRoute ({ children, ...rest }) {
	const rootStore = useStores().rootStore;
	return (
		<Route {...rest}
			render={({ location }) =>
				rootStore.isLoggedIn ? children :
					<Redirect to={{
							pathname: "/login",
							state: { from: location }
						}}
					/>}
		/>
	);
}

export default observer(PrivateRoute);
