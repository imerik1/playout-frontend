const REGEX_PASSWORD =
	/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\@\])(?=.*[a-zA-Z]).{8,16}$/gm;

const PLAYOUT_SESSION_KEY = 'PWNSN';
const PLAYOUT_JWT = 'PWNUTH';

export { REGEX_PASSWORD, PLAYOUT_JWT, PLAYOUT_SESSION_KEY };
