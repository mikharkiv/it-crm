import {observer} from "mobx-react";
import {Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";
import ClientsPage from "./ClientsPage";
import ClientPage from "./ClientPage";
import ClientCreateEditPage from "./ClientCreateEditPage";

const ClientsView = () => {
	let { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}`} component={ClientsPage}/>
			<Route path={`${path}/new`} render={() => <ClientCreateEditPage editMode={false} id={0} />}/>
			<Route path={`${path}/:id/edit`} render={({match}) => <ClientCreateEditPage editMode={true} id={match.params.id} />}/>
			<Route path={`${path}/:id`} component={ClientPage}/>
		</Switch>
	)
};

export default observer(ClientsView);
