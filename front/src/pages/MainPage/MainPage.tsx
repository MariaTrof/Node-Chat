import { FC } from "react";
import styles from "./MainPage.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Button } from "antd";
import { logout } from "../../redux/slice/authSlice";

const MainPage: FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      {isAuth ? (
        <div className={styles.list}>
          <Link to="/chat" className={styles.title}>
            Перейти на страницу чата
          </Link>
          <Link to="/profile" className={styles.title}>
            Перейти в профиль
          </Link>

          <div>Выйти из аккаунта</div>
          <Button
            className={styles.logout}
            type="primary"
            danger
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </Button>
        </div>
      ) : (
         <div className={styles.list}>
          <Link className={styles.title} to="/login">
            Войти
          </Link>
          <p>или</p>
          <Link className={styles.title} to="/register">
            Зарегистрироваться
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainPage;
