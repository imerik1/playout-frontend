import { Text, TextProps } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const NormalText: React.FC<PropsWithChildren<TextProps>> = ({
	children,
	...styles
}) => {
	return (
		<Text fontSize="md" as="span" {...styles}>
			{children}
		</Text>
	);
};

export { NormalText };
