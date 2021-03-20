import {observer} from "mobx-react";
import {Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";
import TeamsPage from "./TeamsPage";
import TeamCreateEditPage from "./TeamCreateEditPage";
import TeamPage from "./TeamPage";

const TeamsView = () => {
	let { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}`} component={TeamsPage}/>
			<Route path={`${path}/new`} render={() => <TeamCreateEditPage editMode={false} id={0} />}/>
			<Route path={`${path}/:id/edit`} render={({match}) => <TeamCreateEditPage editMode={true} id={match.params.id} />}/>
			<Route path={`${path}/:id`} component={TeamPage}/>
		</Switch>
	)
};

export default observer(TeamsView);
