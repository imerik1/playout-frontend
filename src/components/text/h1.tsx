import { Text, TextProps } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const H1: React.FC<PropsWithChildren<TextProps>> = ({
	children,
	...styles
}) => {
	return (
		<Text fontSize="4xl" as="h1" {...styles}>
			{children}
		</Text>
	);
};

export { H1 };
