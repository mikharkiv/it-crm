import {observer} from "mobx-react";
import {Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";
import TasksPage from "./TasksPage";
import TaskCreateEditPage from "./TaskCreateEditPage";
import TaskPage from "./TaskPage";

const TasksView = () => {
	let { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}`} component={TasksPage}/>
			<Route path={`${path}/new`} render={() => <TaskCreateEditPage editMode={false} id={0} />}/>
			<Route path={`${path}/:id/edit`} render={({match}) => <TaskCreateEditPage editMode={true} id={match.params.id} />}/>
			<Route path={`${path}/:id`} component={TaskPage}/>
		</Switch>
	)
};

export default observer(TasksView);
