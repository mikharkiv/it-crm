import {useHistory} from "react-router";
import {useStores} from "../../hooks/use-stores";
import {Button, Col, DatePicker, Form, Input, InputNumber, message, Row, Typography, Upload} from "antd";
import LoadingIcon from "../LoadingIcon";
import {useEffect, useMemo} from "react";
import {observer} from "mobx-react";
import {TaskCreateEditStore} from "../../stores/tasks/TaskCreateEditStore";
import {runInAction} from "mobx";
import ProjectAutocomplete from "../selects/ProjectSelectBar";
import locale from "antd/es/date-picker/locale/uk_UA";
import UserAutocomplete from "../selects/UserSelectBar";
import TeamEditUserBar from "../teams/TeamEditUserBar";
const moment = require('moment');

const {Title, Text} = Typography;
const {TextArea} = Input;

const TaskCreateEditPage = (props) => {
	const history = useHistory();
	const store = useMemo(() => new TaskCreateEditStore(props.id, props.editMode), []);
	const rootStore = useStores().rootStore;

	useEffect(() =>
		runInAction(() => rootStore.setupHeading(true,
		`${props.editMode ? 'Змінити':'Створити'} задачу`, "")), [rootStore, props]);

	const callback = (id) => {
		message.success(`Задачу ${props.editMode ? 'змінено' : 'додано'}!`, 5);
		history.push(`/tasks/${id}`);
	}

	return (
		store.state === "loading" ? (<LoadingIcon/>) : (
			<Form layout="vertical" style={{margin: "10px 0 30px"}}
			      onFinish={(obj) => {props.editMode ? store.saveTask(obj, callback) : store.addTask(obj, callback)}}
			      initialValues={store.task}>
				<Row justify="center">
					<Col span={23}>
						<Title level={1} style={{marginBottom: "30px"}}>{props.editMode ?'Змінити':'Додати'} задачу</Title>
						<Form.Item label="Ім'я" name="name" rules={[{required: true, message: 'Введіть ім\'я'}]}>
							<Input placeholder="Ім'я задачі..."/>
						</Form.Item>
						<Form.Item label="Опис" name="description" rules={[{required: true, message: 'Введіть опис'}]}>
							<TextArea rows={7} placeholder="Опис задачі..."/>
						</Form.Item>
						<Form.Item label="Бюджет" name="budget" rules={[{required: true, message: 'Введіть бюджет'}]}>
							<InputNumber precision={0.01} placeholder="Бюджет задачі..."/>
						</Form.Item>
						<Form.Item label="Дедлайн" name="deadline" rules={[{required: true, message: 'Введіть дедлайн'}]}>
							<DatePicker placeholder="Дедлайн задачі..." locale={locale}
							            format={(t) => t.format('DD.MM.YYYY').toString()}
							            disabledDate={(cur) => cur.isSameOrBefore(moment().startOf('day'))} />
						</Form.Item>
						<Form.Item name="project" label="Вибрати проєкт">
							<ProjectAutocomplete onSelect={store.onProjectSelect} />
						</Form.Item>
						<Form.Item label="Прикріпити користувача">
							<UserAutocomplete onSelect={store.onUserSelect} clearAfterSelect
												variantsCallback={store.setUserVariants}/>
						</Form.Item>
						<Title level={5}>Прикріплені користувачі</Title>
						<div style={{marginBottom: "15px"}}>
							{
								store.members.map((e) => <TeamEditUserBar id={e.id} key={e.id}
								name={e.full_name} avatar={e.image} onRemove={store.onUserRemove}/>)
							}
						</div>
						<Form.Item>
							<Button type="primary" htmlType="submit" disabled={!props.editMode && !store.selectedProject}>
								{props.editMode ?'Змінити':'Додати'} задачу</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		)
	);
}

export default observer(TaskCreateEditPage);
