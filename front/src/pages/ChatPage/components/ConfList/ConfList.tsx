import React, { useEffect } from 'react';
import { endConference, getConferencesByGroup } from '../../../../redux/slice/confSlice';
import ConfItem from '../ConfItem/ConfItem';
import { Conference } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { RootState } from '../../../../redux/store';


interface ConfListProps {
  groupId: number;
}

const ConfList: React.FC<ConfListProps> = ({ groupId }) => {
  const dispatch = useAppDispatch();
  
  // Получаем данные о конференциях
  const { conferences, loading, error } = useAppSelector((state: RootState) => state.conf); 

  useEffect(() => {
    dispatch(getConferencesByGroup(groupId));
  }, [dispatch, groupId]);

  const handleDelete = (id: number) => {
    dispatch(endConference(id));
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div className="conf-list">
      {conferences.length > 0 ? (
        conferences.map((conference: Conference) => (
          <ConfItem 
            key={conference.id} 
            conference={conference} 
            onDelete={handleDelete} 
          />
        ))
      ) : (
        <p>Нет конференций для отображения.</p>
      )}
    </div>
  );
};

export default ConfList;