import { Button as B, ButtonProps, Spinner } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

type Props = ButtonProps & {
	mode?: 'primary' | 'secondary';
};

const Button: React.FC<PropsWithChildren<Props>> = ({
	children,
	mode = 'primary',
	disabled,
	...props
}) => {
	return (
		<B disabled={props.isLoading} variant={mode} {...props}>
			{props.isLoading ? <Spinner /> : children}
		</B>
	);
};

export { Button };
