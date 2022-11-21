import { Stack, StackProps } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const Form: React.FC<PropsWithChildren<StackProps>> = ({
	children,
	...props
}) => {
	const styles: StackProps = {
		as: 'form',
		display: 'flex',
		w: '100%',
		h: 'fit-content',
	};
	Object.assign(styles, props);
	return <Stack {...styles}>{children}</Stack>;
};

export { Form };
