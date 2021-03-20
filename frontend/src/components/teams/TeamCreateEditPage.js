import {AutoComplete, Button, Col, Form, Input, message, Row, Typography} from "antd";
import {useHistory} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {observer} from "mobx-react";
import {useMemo} from "react";
import {useEffect} from "react";
import {useState} from "react";
import {TeamCreateEditStore} from "../../stores/teams/TeamCreateEditStore";
import UserBar from "../UserBar";
import TeamEditUserBar from "./TeamEditUserBar";
import LoadingIcon from "../LoadingIcon";
import {runInAction} from "mobx";

const {Title} = Typography;
const {TextArea} = Input;
const {Option} = AutoComplete;

const TeamCreateEditPage = (props) => {
	const history = useHistory();
	const store = useMemo(() => new TeamCreateEditStore(props.id, props.editMode), []);
	const rootStore = useStores().rootStore;


	useEffect(() =>
		runInAction(() => rootStore.setupHeading(true,
		`${props.editMode ? 'Змінити':'Створити'} команду`, "")), [rootStore, props]);

	const [autocompVal, setAutocompVal] = useState("");

	const callback = (id) => {
		message.success(`Команду ${props.editMode ? 'змінено' : 'додано'}!`, 5);
		history.push(`/teams/${id}`);
	}

	const onAutocompleteSelect = (id) => {
		store.onMembersAutocompleteSelect(id);
		setAutocompVal(''); // clear
	}

	const onAutocompleteChange = (val) => {
		setAutocompVal(val);
		store.onMembersAutocompleteChange(val);
	}

	return (
		store.state === "loading" ? (<LoadingIcon/>) : (
		<Form layout="vertical" style={{margin: "10px 0 30px"}}
		      onFinish={({name, description}) => {props.editMode ? store.saveTeam(name, description, callback) : store.addTeam(name, description, callback)}}
			  initialValues={{name: store.team.name, description: store.team.description}}>
			<Row justify="center">
				<Col span={23}>
					<Title level={1} style={{marginBottom: "30px"}}>{props.editMode ?'Змінити':'Додати'} команду</Title>
					<Form.Item label="Назва" name="name" rules={[{required: true, message: 'Введіть назву'}]}>
						<Input placeholder="Назва команди..."/>
					</Form.Item>
					<Form.Item label="Опис команди" name="description" rules={[{required: true, message: 'Введіть опис команди'}]}>
						<TextArea rows={7} placeholder="Опис команди..." />
					</Form.Item>
					<Form.Item label="Додати учасника команди">
						<AutoComplete value={autocompVal} placeholder="Почніть писати, щоб побачити варіанти..."
							onSelect={onAutocompleteSelect}
							onChange={onAutocompleteChange} >
							{ store.membersToDisplayInList.map((e) => (
								<Option key={e.id} value={e.id}>
									<UserBar size="small" name={e.full_name} avatar={e.image}/>
								</Option>
							))}
						</AutoComplete>
					</Form.Item>
					<Form.Item label="Учасники команди (замальована зірочка - тімлід)" rules={[{required: true, message: 'Виберіть учасників команди'}]}>
						{ store.members.map((e) => (
							<TeamEditUserBar name={e.full_name} id={e.id} active={store.teamlead_id === e.id}
							                 avatar={e.image} onSelect={store.onMembersTeamlead} onRemove={store.onMembersRemove} />
						))}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" disabled={store.members.length === 0}>{props.editMode ?'Змінити':'Додати'} команду</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
		)
	);
}

export default observer(TeamCreateEditPage);
