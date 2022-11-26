import moment from 'moment';

const howLongIs = (isoString: string) => {
	const now = moment().utc();
	const date = moment(isoString);

	const diffMonth = now.diff(date, 'month');
	const diffDay = now.diff(date, 'day');
	const diffHour = now.diff(date, 'hour');
	const diffMinute = now.diff(date, 'minute');
	const diffSecond = now.diff(date, 'second');

	if (diffSecond <= 60) {
		return diffSecond === 1
			? 'Há 1 segundo atrás'
			: `Há ${diffSecond} segundos atrás`;
	}

	if (diffMinute <= 60) {
		return diffMinute === 1
			? 'Há 1 minuto atrás'
			: `Há ${diffMinute} minutos atrás`;
	}

	if (diffHour <= 24) {
		return diffHour === 1 ? 'Há 1 hora atrás' : `Há ${diffHour} horas atrás`;
	}

	if (diffDay <= 30) {
		return diffDay === 1 ? 'Há 1 dia atrás' : `Há ${diffDay} dias atrás`;
	}

	if (diffMonth <= 12) {
		return diffMonth === 1 ? 'Há 1 mês atrás' : `Há ${diffMonth} meses atrás`;
	}

	return 'Há alguns anos';
};

export { howLongIs };
