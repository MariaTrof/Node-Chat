import { FC, useState } from 'react';
import styles from './RegisterPage.module.scss';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { register, setError } from '../../redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

const RegisterPage: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [error, setLocalError] = useState<boolean>(false);
	const { loading, isAuth } = useSelector((state: RootState) => state.auth);

const handleRegister = async ({
		user_name,
		user_password,
		passwordConfirm,
	}: {
		user_name: string;
		user_password: string;
		passwordConfirm: string;
	}) => {
		if (user_password !== passwordConfirm) {
			setLocalError(true);
		} else {
			dispatch(register({ user_name: user_name, user_password: user_password }))
				.then(() => {
					setError(null);
					navigate('/');
				})
				.catch((err) => {
					setError(err.message);
					setLocalError(true);
				});
		}
	};
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>Регистрация</h2>
                {isAuth ? (
                    <>
                        <p>Вы уже вошли в систему</p>
                        <Link className={styles.link} to="/">Главная</Link>
                    </>
                ) : (
                    <Form
                        name="normal_register"
                        className={styles.registerForm}
                        initialValues={{ remember: true }}
                        onFinish={handleRegister}
                    >
                        <Form.Item
                            name="user_name"
                            rules={[{ required: true, message: 'Введите имя пользователя!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Имя пользователя"
                            />
                        </Form.Item>
                        <Form.Item
                            name="user_password"
                            rules={[{ required: true, message: 'Введите пароль!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Пароль"
                            />
                        </Form.Item>
                        <Form.Item
                            name="passwordConfirm"
                            rules={[{ required: true, message: 'Подтвердите пароль!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Подтвердите пароль"
                            />
                        </Form.Item>
						{error && <Form.Item>Некорректные данные</Form.Item>}
                        {loading && <Form.Item>Запрос идет...</Form.Item>}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.registrationFormButton}>
                                Зарегистрироваться
                            </Button>
                            <Link to="/login" className={styles.links}>Войти</Link>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
