import {observer} from "mobx-react";
import {Route, Switch} from "react-router-dom";
import AdvicePage from "./AdvicePage";
import AdviceSinglePage from "./AdviceSinglePage";
import {useRouteMatch} from "react-router";
import AdviceCreatePage from "./AdviceCreatePage";

const AdviceView = () => {
	let { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}`} component={AdvicePage}/>
			<Route path={`${path}/new`} component={AdviceCreatePage}/>
			<Route path={`${path}/:id`} component={AdviceSinglePage}/>
		</Switch>
	)
};

export default observer(AdviceView);
