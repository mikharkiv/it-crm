import {observer} from "mobx-react";
import {useRef, useMemo, useState} from "react";
import {Avatar, Button, Comment, Form, Input, List, message, Typography} from "antd";
import {useStores} from "../../hooks/use-stores";
import {TaskCommentsStore} from "../../stores/tasks/TaskCommentsStore";
import LoadingIcon from "../LoadingIcon";
import "../../styles/tasks/TaskComments.css";
import {runInAction} from "mobx";

const {TextArea} = Input;
const {Text, Title} = Typography;

const TaskComments = (props) => {
	const rootStore = useStores().rootStore;
	const listRef = useRef(null);
	const [form] = Form.useForm();
	const store = useMemo(() => new TaskCommentsStore(props.id, props.isProject), []);

	const onListScroll = (e) => {
		console.log(e);
		if (e.target.scrollTop > (e.target.scrollHeight - e.target.clientHeight) * 0.9) store.fetchNextPage();
	};

	const onCommentFormSubmit = (data) => {
		store.addComment(data.text, addCommentsCallback);
		form.resetFields();
	}

	const addCommentsCallback = () => {
		message.success('Коментар додано!', 5);
	};

	return (
		<div className="task-comments">
			<Title level={5}>Коментарі</Title>
			<List onScroll={onListScroll} ref={listRef}
			       className="task-comments-list">
				{ store.state === 'loading' && (<LoadingIcon style={{display: 'block', margin: '20px auto'}}/>)}
				{store.comments.length > 0 ?
					(store.comments.map((c) =>
						(<Comment avatar={<Avatar src={c.author.image} alt={c.author.full_name} />} author={c.author.full_name}
						datetime={c.created_at} content={c.text}/>))) :
					(<Text>Немає коментарів</Text>)
				}
			</List>
			<div className="task-comments-add">

				{ props.isProject ? (
						<div className="task-comments-no-add">
							<Text strong>Коментар можна додати тільки до завдання</Text>
						</div>
					) : (
						<Form form={form} className="task-comments-form" layout={'horizontal'} onFinish={onCommentFormSubmit}>
							<div className="task-comments-form-top">
								<Avatar size={36} className="task-comments-avatar" src={rootStore.me.image}/>
								<Form.Item className="task-comments-input" name="text" required={[{required: true}]}>
									<TextArea placeholder="Введіть коментар..." rows={4}/>
								</Form.Item>
							</div>
							<Form.Item>
								<Button className="task-comments-submit" type="primary" htmlType="submit">Відправити</Button>
							</Form.Item>
						</Form>)}
			</div>
		</div>
	);
}

export default observer(TaskComments);
