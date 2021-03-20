import {observer} from "mobx-react";
import {Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";
import ProjectPage from "./ProjectPage";
import ProjectCreateEditPage from "./ProjectCreateEditPage";
import ProjectsPage from "./ProjectsPage";

const ContactsView = () => {
	let { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}`} component={ProjectsPage}/>
			<Route path={`${path}/new`} render={() => <ProjectCreateEditPage editMode={false} id={0} />}/>
			<Route path={`${path}/:id/edit`} render={({match}) => <ProjectCreateEditPage editMode={true} id={match.params.id} />}/>
			<Route path={`${path}/:id`} component={ProjectPage}/>
		</Switch>
	)
};

export default observer(ContactsView);
