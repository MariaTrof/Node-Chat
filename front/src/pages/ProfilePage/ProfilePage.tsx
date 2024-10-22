import styles from "./ProfilePage.module.scss";
import { FC, useState, useEffect } from "react";
import { Button, Input, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateUser, fetchUser } from "../../redux/slice/userSlice";
import { User } from "../../types";

const ProfilePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user) as User;
  const loading = useSelector((state: RootState) => state.user.loading);
  
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Состояние для отслеживания режима редактирования

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        message.error("Не удалось загрузить данные пользователя.");
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handlePasswordChange = () => {
    if (!newPassword) {
      message.error("Пароль не может быть пустым");
      return;
    }

    // Проверка на существование user перед использованием user.id
    if (!user) {
      message.error("Не удалось изменить пароль: пользователь не найден.");
      return;
    }

    dispatch(updateUser({ userId: user.id, user_password: newPassword }))
      .then(() => {
        message.success("Пароль успешно изменен");
        setNewPassword("");
      })
      .catch((error) => {
        console.error("Ошибка при изменении пароля:", error);
        message.error("Ошибка при изменении пароля");
      });
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const uploadProfilePicture = async () => {
    // Проверка на существование profilePicture и user
    if (!profilePicture) {
      message.error("Пожалуйста, выберите изображение для загрузки");
      return;
    }
    
    if (!user) {
      message.error("Не удалось загрузить изображение: пользователь не найден.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", profilePicture);

    try {
      await dispatch(
        updateUser({ userId: user.id, profile_picture: formData })
      );
      message.success("Изображение профиля успешно обновлено");
      setProfilePicture(null);
    } catch (error) {
      console.error("Ошибка при загрузке изображения профиля:", error);
      message.error("Ошибка при загрузке изображения профиля");
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Условный рендеринг с учетом загрузки и наличия пользователя
  if (loading) {
    return <Spin size="large" />;
  }

  if (!user) {
    return <p>Пользователь не найден.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User: {user.user_name}</h1>
      {isEditing ? (
        <div className={styles.content}>
          <Input.Password
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={handlePasswordChange} className={styles.btn}>
            Сохранить пароль
          </Button>
          <div className={styles.btn_container}>
            <p className={styles.small_title}>Изменить изображение профиля:</p>
            <Input
              type="file"
              onChange={handleProfilePictureChange}
              className={styles.inpt}
            />
            <Button onClick={uploadProfilePicture} className={styles.btn}>
              Загрузить изображение
            </Button>
            <Button onClick={toggleEditMode} className={styles.btn}>
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <p className={styles.small_title}>Пароль: **********</p>
          <p className={styles.small_title}>Изображение профиля:</p>
          <img alt="Профиль" src={user.profile_picture} className={styles.img} />
          <Button onClick={toggleEditMode} className={styles.btn}>
            Изменить
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
