import {observer} from "mobx-react";
import {Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";
import ContactsPage from "./ContactsPage";
import ContactPage from "./ContactPage";
import ContactCreateEditPage from "./ContactCreateEditPage";

const ContactsView = () => {
	let { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}`} component={ContactsPage}/>
			<Route path={`${path}/new`} render={() => <ContactCreateEditPage editMode={false} id={0} />}/>
			<Route path={`${path}/:id/edit`} render={({match}) => <ContactCreateEditPage editMode={true} id={match.params.id} />}/>
			<Route path={`${path}/:id`} component={ContactPage}/>
		</Switch>
	)
};

export default observer(ContactsView);
