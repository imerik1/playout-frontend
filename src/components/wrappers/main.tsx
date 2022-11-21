import { Container, ContainerProps } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const Main: React.FC<PropsWithChildren<ContainerProps>> = ({
	children,
	...props
}) => {
	const styles: ContainerProps = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		w: '100%',
		as: 'main',
		maxW: 'container.lg',
	};
	Object.assign(styles, props);
	return <Container {...styles}>{children}</Container>;
};

export { Main };
