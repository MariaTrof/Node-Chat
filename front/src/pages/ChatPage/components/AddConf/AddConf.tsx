import React, { useState } from 'react';
import { Input, Button, DatePicker, Form, message } from 'antd';
import { useAppDispatch } from '../../../../redux/hooks/hooks';
import { createConference } from '../../../../redux/slice/confSlice';
import dayjs from 'dayjs';

const { TextArea } = Input;

const AddConference: React.FC<{ groupId: number }> = ({ groupId }) => {
  const dispatch = useAppDispatch();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleAddConference = async () => {
    if (!title || !startTime || !endTime || !groupId) {
      message.error('Пожалуйста, заполните все поля');
      return;
    }

    const resultAction = await dispatch(createConference({
      title,
      description,
      groupId,
      startTime,
      endTime,
    }));

    if (createConference.fulfilled.match(resultAction)) {
      message.success('Конференция добавлена успешно');
      setTitle('');
      setDescription('');
      setStartTime(null);
      setEndTime(null);
    } else {
      message.error('Ошибка при добавлении конференции');
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Название конференции">
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Введите название" 
        />
      </Form.Item>

      <Form.Item label="Описание конференции">
        <TextArea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Введите описание" 
          rows={4} 
        />
      </Form.Item>

      <Form.Item label="Время начала">
        <DatePicker 
          showTime 
          value={startTime ? dayjs(startTime) : null} 
          onChange={(date) => setStartTime(date?.toDate() ?? null)} 
          placeholder="Выберите время начала" 
        />
      </Form.Item>

      <Form.Item label="Время окончания">
        <DatePicker 
          showTime 
          value={endTime ? dayjs(endTime) : null} 
          onChange={(date) => setEndTime(date?.toDate() ?? null)} 
          placeholder="Выберите время окончания" 
        />
      </Form.Item>

      <Button type="primary" onClick={handleAddConference}>
        Добавить конференцию
      </Button>
    </Form>
  );
};

export default AddConference;
