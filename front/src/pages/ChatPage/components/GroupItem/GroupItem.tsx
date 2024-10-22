import { FC, useState } from 'react';
import styles from './GroupItem.module.scss';
import { AppDispatch } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import { Group } from '../../../../types';
import { Input } from 'antd';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { createGroup, deleteGroup } from '../../../../redux/slice/groupSlice';

type IGroupItemProps = {
  group: Group;
  onSelect: (id: number) => void; // Пропс для выбора группы
};

const GroupItem: FC<IGroupItemProps> = ({ group, onSelect }) => {
  const [changeForm, setChangeForm] = useState<boolean>(false);
  const [name, setName] = useState<string>(group.name);

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeMessage = () => {
    setName(group.name);
    setChangeForm((prev) => !prev);
  };

  const handleChangeMessageAccept = () => {
    if (!name.trim()) return;

    dispatch(createGroup(name));
    setChangeForm(false);
  };

  const handleDeleteMessage = () => {
    dispatch(deleteGroup(group.id));
  };

  const handleSelectGroup = () => {
    onSelect(group.id); // Вызываем функцию выбора группы
  };

  return (
    <li className={styles.item} onClick={handleSelectGroup}> {/* Выбор группы */}
      {changeForm ? (
        <Input
          className={styles.changeFormInput}
          type="text"
          placeholder="Изменить группу"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <p className={styles.text}>{group.name}</p>
      )}
      <span style={{ maxHeight: '20px', gap: '5px', display: 'flex' }}>
        {changeForm ? (
          <CheckOutlined
            onClick={handleChangeMessageAccept}
            style={{
              fontSize: '20px',
              maxHeight: '20px',
              cursor: 'pointer',
            }}
          />
        ) : null}
        <EditOutlined
          onClick={handleChangeMessage}
          style={{
            fontSize: '20px',
            maxHeight: '20px',
            cursor: 'pointer',
          }}
        />
        <DeleteOutlined
          onClick={handleDeleteMessage}
          style={{
            fontSize: '20px',
            maxHeight: '20px',
            cursor: 'pointer',
          }}
        />
      </span>
    </li>
  );
};

export default GroupItem;
