import {Avatar, Button, Col, Form, Row, Input} from "antd";
import {observer} from "mobx-react";
import {useState} from "react";
import {useStores} from "../../hooks/use-stores";

const { TextArea } = Input;

const AdviceCommentEditor = ({adviceStore}) => {
	const [text, setText] = useState('');
	const rootStore = useStores().rootStore;

	return (
		<Row justify="center">
			<Col span={1}>
				<Avatar size={38} src={rootStore.me && rootStore.me.image}/>
			</Col>
			<Col span={16} align="right" style={{marginBottom: "40px"}}>
				<Form.Item>
					<TextArea rows={5} placeholder="Ваш коментар..." value={text} onChange={(e) => setText(e.target.value)} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="sumbit" disabled={!text} loading={adviceStore.commentSubmitting} onClick={
						() => {
							adviceStore.doCommentPublishing(text)
							setText('');
						}
					}>Відправити</Button>
				</Form.Item>
			</Col>
		</Row>
	);
}

export default observer(AdviceCommentEditor);
