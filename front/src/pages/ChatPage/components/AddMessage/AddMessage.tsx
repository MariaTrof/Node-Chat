import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../../redux/slice/messageSlice';
import { AppDispatch } from '../../../../redux/store';

const AddMessage: FC<{ groupId: number }> = ({ groupId }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [messageForm, setMessageForm] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const toggleAddForm = () => {
		setMessageForm((prev) => !prev);
		setMessage('');
	};

	const handleAddMessage = () => {
		if (!message.trim()) return; // Проверка на пустое сообщение

		dispatch(sendMessage({ groupId, content: message })); // Передача корректного объекта
		setMessageForm(false);
		setMessage('');
	};

	return (
		<div>
			<button onClick={toggleAddForm}>
				{messageForm ? 'Скрыть форму' : 'Добавить сообщение'}
			</button>
			{messageForm && (
				<div>
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Введите сообщение"
					/>
					<button onClick={handleAddMessage}>Отправить</button>
				</div>
			)}
		</div>
	);
};

export default AddMessage;
