import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
	return (
		<div>
			<h1 className={styles.title}>Страница не найдена — 404</h1>
			<Link className={styles.link} to='/'>Вернуться на главную</Link>
		</div>
	);
};

export default NotFoundPage;