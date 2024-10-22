import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import GroupItem from '../GroupItem/GroupItem';
import AddGroup from '../AddGroup/AddGroup';
import styles from './GroupList.module.scss';

type GroupListProps = {
  onGroupSelect: (groupId: number) => void; 
};

const GroupList: React.FC<GroupListProps> = ({ onGroupSelect }) => {
  const groups = useSelector((state: RootState) => state.group.groups);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const handleGroupSelect = (groupId: number) => {
    setSelectedGroupId(groupId);
    onGroupSelect(groupId);
  };

  return (
    <div className={styles.groupList}>
    <AddGroup groupId={selectedGroupId} />
      <ul className={styles.list}>
        {groups.length > 0 ? (
          groups.map((group) => (
            <GroupItem key={group.id} group={group} onSelect={handleGroupSelect} /> 
          ))
        ) : (
          <p className={styles.text}>Нет доступных групп.</p>
        )}
      </ul>
    </div>
  );
};

export default GroupList;

