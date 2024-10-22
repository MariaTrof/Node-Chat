import { FC, useState } from "react";
import styles from "./LogInPage.module.scss";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login, setError } from "../../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [localError, setLocalError] = useState<string | null>(null);
  const { loading, isAuth } = useSelector((state: RootState) => state.auth);

const handleLogin = async (values: {
    user_name: string;
    user_password: string;
}) => {
    try {
        await dispatch(login(values)).unwrap();
        navigate("/");
    } catch (err: any) {
        const errorMessage = err?.message || "Произошла ошибка при входе.";
        setLocalError(errorMessage);
    }
};

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Вход</h2>
        {isAuth ? (
          <>
            <p>Вы уже вошли в систему</p>
            <Link className={styles.link} to="/">
              Главная
            </Link>
          </>
        ) : (
          <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="user_name"
              className={styles.loginForm}
              rules={[{ required: true, message: "Введите имя пользователя!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Имя пользователя"
              />
            </Form.Item>
            <Form.Item
              name="user_password"
              className={styles.loginForm}
              rules={[{ required: true, message: "Введите пароль!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Пароль"
              />
            </Form.Item>
            {localError && <Form.Item>{localError}</Form.Item>}
            {loading && <Form.Item>Запрос идет...</Form.Item>}
            <Form.Item className={styles.box}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Войти
              </Button>
              <Link to="/register" className={styles.links}>
                Зарегистрироваться
              </Link>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
