import { Text, TextProps } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const H2: React.FC<PropsWithChildren<TextProps>> = ({
	children,
	...styles
}) => {
	return (
		<Text fontSize="xl" as="h2" {...styles}>
			{children}
		</Text>
	);
};

export { H2 };
