import React from 'react';
import { Conference } from '../../../../types';

interface ConfItemProps {
  conference: Conference;
  onDelete: (id: number) => void;
}

const ConfItem: React.FC<ConfItemProps> = ({ conference, onDelete }) => {
  return (
    <div className="conf-item">
      <h3>{conference.title}</h3>
      <p>{conference.description}</p>
      <p>
        Время: {new Date(conference.startTime).toLocaleString()} -{' '}
        {new Date(conference.endTime).toLocaleString()}
      </p>
      <button onClick={() => onDelete(conference.id)}>Удалить</button>
    </div>
  );
};

export default ConfItem;
