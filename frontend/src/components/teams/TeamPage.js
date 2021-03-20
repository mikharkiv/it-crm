import {observer} from "mobx-react";
import {Button, Col, message, Row, Typography} from "antd";
import {useHistory, useParams} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {useEffect, useMemo} from "react";
import {TeamStore} from "../../stores/teams/TeamStore";
import LoadingIcon from "../LoadingIcon";
import TeamEditUserBar from "./TeamEditUserBar";
import {runInAction} from "mobx";

const {Title, Text} = Typography;

const TeamPage = () => {
	const {id} = useParams();
	const teamStore = useMemo(() => new TeamStore(id), [id]);
	const rootStore = useStores().rootStore;
	const history = useHistory();

	useEffect(() => {teamStore.fetch()}, [teamStore]);


	runInAction(() => rootStore.setupHeading(true, teamStore.team.name || "...", "Команда"));

	const edit = () => {
		history.push(`/teams/${id}/edit`);
	};

	const removeCallback = () => {
		message.success("Команду успішно видалено!", 5);
		history.push('/teams/');
	}

	return (
		teamStore.state === "loading" ? (<LoadingIcon/>) : (
		<>
			<Row justify="center" style={{marginTop: "20px"}}>
				<Col span={16} style={{marginBottom: "30px"}}>
					<Title style={{marginBottom: "20px"}}>{teamStore.team.name}</Title>
					<Text>{teamStore.team.description}</Text>
				</Col>
				<Col span={16} style={{marginBottom: "30px"}}>
					<Title level={4} style={{marginBottom: "10px"}}>Учасники:</Title>
					{
						teamStore.team.hasOwnProperty('members') &&
						teamStore.team.hasOwnProperty('teamlead') &&
						teamStore.team.members.map((e) =>
						(<TeamEditUserBar name={e.full_name} id={e.id} active={teamStore.team.teamlead.id === e.id}
						                  avatar={e.image}/>))
					}
				</Col>
				<Col span={16}>
					<Button type="primary" disabled={teamStore.state === "loading"} loading={teamStore.state === "loading"}
					        onClick={() => edit()} style={{marginRight: "15px"}}>
						Редагувати
					</Button>
					<Button type="primary" danger disabled={teamStore.state === "loading"}
					        loading={teamStore.state === "loading"}
					        onClick={() => teamStore.remove(removeCallback)}>
						Видалити
					</Button>
				</Col>
			</Row>
		</>)
	);
}

export default observer(TeamPage);
