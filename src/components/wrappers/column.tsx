import { Stack, StackProps } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const Column: React.FC<PropsWithChildren<StackProps>> = ({
	children,
	...props
}) => {
	const styles: StackProps = {
		display: 'flex',
		direction: 'column',
	};
	Object.assign(styles, props);
	return <Stack {...styles}>{children}</Stack>;
};

export { Column };
