import {useHistory} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {Button, Col, Form, Input, message, Row, Typography} from "antd";
import LoadingIcon from "../LoadingIcon";
import {useEffect, useMemo} from "react";
import {observer} from "mobx-react";
import {ProjectCreateEditStore} from "../../stores/projects/ProjectCreateEditStore";
import TeamAutocomplete from "../selects/TeamSelectBar";
import ClientAutocomplete from "../selects/ClientSelectBar";
import {runInAction} from "mobx";

const {Title} = Typography;

const ContactCreateEditPage = (props) => {
	const history = useHistory();
	const store = useMemo(() => new ProjectCreateEditStore(props.id, props.editMode), []);
	const rootStore = useStores().rootStore;

	useEffect(() =>
		runInAction(() => rootStore.setupHeading(true,
		`${props.editMode ? 'Змінити':'Створити'} проєкт`, "")), [rootStore, props]);

	const callback = (id) => {
		message.success(`Проєкт ${props.editMode ? 'змінено' : 'додано'}!`, 5);
		history.push(`/projects/${id}`);
	}

	return (
	store.state === "loading" ? (<LoadingIcon/>) : (
	<Form layout="vertical" style={{margin: "10px 0 30px"}}
	      onFinish={(obj) => {props.editMode ? store.saveProject(obj, callback) : store.addProject(obj, callback)}}
	      initialValues={store.project}>
		<Row justify="center">
			<Col span={23}>
				<Title level={1} style={{marginBottom: "30px"}}>{props.editMode ?'Змінити':'Додати'} проєкт</Title>
				<Form.Item label="Назва" name="name" rules={[{required: true, message: 'Введіть назву'}]}>
					<Input placeholder="Назва проєкту..."/>
				</Form.Item>
				<Form.Item label="Опис" name="description" rules={[{required: true, message: 'Введіть опис'}]}>
					<Input placeholder="Опис проєкту..."/>
				</Form.Item>
				<Form.Item name="client" label="Вибрати клієнта"  rules={[{required: true, message: 'Виберіть клієнта'}]}>
					<ClientAutocomplete onSelect={store.onClientSelect} />
				</Form.Item>
				<Form.Item name="team" label="Вибрати команду"  rules={[{required: true, message: 'Виберіть команду'}]}>
					<TeamAutocomplete onSelect={store.onTeamSelect} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit"
					        disabled={!props.editMode && (!store.selectedClient || !store.selectedTeam)}>
						{props.editMode ?'Змінити':'Додати'} проєкт</Button>
				</Form.Item>
			</Col>
		</Row>
	</Form>
	));
}

export default observer(ContactCreateEditPage);
