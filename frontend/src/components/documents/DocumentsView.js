import {observer} from "mobx-react";
import {Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";
import DocumentsPage from "./DocumentsPage";
import DocumentCreateEditPage from "./DocumentCreateEditPage";
import DocumentPage from "./DocumentPage";

const DocumentsView = () => {
	let { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}`} component={DocumentsPage}/>
			<Route path={`${path}/new`} render={() => <DocumentCreateEditPage editMode={false} id={0} />}/>
			<Route path={`${path}/:id/edit`} render={({match}) => <DocumentCreateEditPage editMode={true} id={match.params.id} />}/>
			<Route path={`${path}/:id`} component={DocumentPage}/>
		</Switch>
	)
};

export default observer(DocumentsView);
