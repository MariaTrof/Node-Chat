import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { fetchMessages, setPage } from '../../../../redux/slice/messageSlice';
import styles from './MessageList.module.scss';
import AddMessage from '../AddMessage/AddMessage';
import { Pagination } from 'antd';
import MessageItem from '../MessageItem/MessageItem';

interface MessageListProps {
  groupId: number; 
}

const MessageList: FC<MessageListProps> = ({ groupId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const messages = useSelector((state: RootState) => state.message.messages);
  const count = useSelector((state: RootState) => state.message.count);
  const page = useSelector((state: RootState) => state.message.page);

  useEffect(() => {
    const limit = 5;
    const offset = (page - 1) * limit;
    dispatch(fetchMessages({ groupId, limit, offset }));
  }, [dispatch, page, groupId]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
  <ul className={styles.list}>
    {Array.isArray(messages) && messages.length > 0 ? (
      <>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        {count > 5 && (
          <Pagination
            current={page}
            total={count}
            pageSize={5}
            onChange={handlePageChange}
          />
        )}
        <AddMessage groupId={groupId} />
      </>
    ) : (
      <>
        <p>У вас нет сообщений</p>
        <AddMessage groupId={groupId} />
      </>
    )}
  </ul>
);

};

export default MessageList;
