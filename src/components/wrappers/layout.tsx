import { Stack, StackProps } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren<StackProps>> = ({
	children,
	...props
}) => {
	const styles: StackProps = {
		display: 'flex',
		flexDirection: 'column',
		justify: 'center',
		align: 'center',
		bgColor: 'white',
		minH: '100vh',
		w: '100%',
	};
	Object.assign(styles, props);
	return <Stack {...styles}>{children}</Stack>;
};

export { Layout };
