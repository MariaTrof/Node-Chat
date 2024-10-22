import { FC, useState } from 'react';
import styles from './MessageItem.module.scss';
import { AppDispatch } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import { Messages } from '../../../../types';
import { Input } from 'antd';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { sendMessage, updateMessage, deleteMessage } from '../../../../redux/slice/messageSlice';

type IMessageItemProps = {
	message: Messages;
};

const MessageItem: FC<IMessageItemProps> = ({ message }) => {
	const [changeForm, setChangeForm] = useState<boolean>(false);
	const [content, setContent] = useState<string>(message.content);

	const dispatch = useDispatch<AppDispatch>();

	const handleChangeMessage = () => {
		setContent(message.content);
		setChangeForm((prev) => !prev);
	};

	const handleChangeMessageAccept = () => {
		if (!content.trim()) return;

		dispatch(updateMessage({ id: message.id, content })); // Используем новый thunk
		setChangeForm(false);
	};

	const handleDeleteMessage = () => {
		dispatch(deleteMessage(message.id)); // Удаляем сообщение
	};

	return (
		<li className={styles.item}>
			{changeForm ? (
				<Input
					className={styles.changeFormInput}
					type="text"
					placeholder="Изменить сообщение"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			) : (
				<p className={styles.text}>{message.content}</p>
			)}

			<span style={{ maxHeight: '20px', gap: '5px', display: 'flex' }}>
				{changeForm ? (
					<CheckOutlined
						onClick={handleChangeMessageAccept}
						style={{ fontSize: '20px', maxHeight: '20px', cursor: 'pointer' }}
					/>
				) : null}
				<EditOutlined
					onClick={handleChangeMessage}
					style={{ fontSize: '20px', maxHeight: '20px', cursor: 'pointer' }}
				/>
				<DeleteOutlined
					onClick={handleDeleteMessage}
					style={{ fontSize: '20px', maxHeight: '20px', cursor: 'pointer' }}
				/>
			</span>
		</li>
	);
};

export default MessageItem;
