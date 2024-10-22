import { FC, useState } from 'react';
import { AppDispatch } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import { Input, Button } from 'antd';
import styles from './AddGroup.module.scss';
import { Group_Members } from '../../../../types/group_members.interface'; // Импортируем тип
import { addUserToGroup } from '../../../../redux/slice/group_memberSlice';
import { createGroup } from '../../../../redux/slice/groupSlice'; // Импортируйте ваш action для создания группы

interface AddGroupProps {
  groupId: number | null; // Делаем groupId опциональным
}

const AddGroup: FC<AddGroupProps> = ({ groupId }) => {
  const [userId, setUserId] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;

    // Создаем новую группу
    dispatch(createGroup(groupName));
    
    setGroupName('');
  };

  const handleAddUser = () => {
    if (!userId.trim() || groupId === null) return;

    const member: Group_Members = { userId: parseInt(userId), groupId }; // формируем объект участника
    dispatch(addUserToGroup(member));
    setUserId('');
  };

  return (
    <div className={styles.addGroupContainer}>
      {groupId === null ? (
        <>
          <Input
            className={styles.input}
            type="text"
            placeholder="Имя новой группы"
            style={{ marginLeft: '8px', margin: '5px', width: '80%' }} 
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleCreateGroup}
            style={{ marginLeft: '8px', margin: '5px' }} 
          >
            Создать группу
          </Button>
        </>
      ) : (
        <>
          <Input
            className={styles.input}
            type="text"
            placeholder="Добавить пользователя (ID)"
            style={{ marginLeft: '8px', margin: '5px', width: '80%' }} 
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleAddUser}
            style={{ marginLeft: '8px', margin: '5px' }} 
          >
            Добавить
          </Button>
        </>
      )}
    </div>
  );
};

export default AddGroup;
