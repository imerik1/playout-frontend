import { Text, TextProps } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const SmallText: React.FC<PropsWithChildren<TextProps>> = ({
	children,
	...styles
}) => {
	return (
		<Text fontSize="xs" as="small" {...styles}>
			{children}
		</Text>
	);
};

export { SmallText };
