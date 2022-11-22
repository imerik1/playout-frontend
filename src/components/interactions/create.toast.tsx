import {
	Box,
	CloseButton,
	HStack,
	RenderProps,
	Text,
	useToast as useT,
	UseToastOptions,
} from '@chakra-ui/react';

const useToast = (props?: UseToastOptions) => {
	return useT({
		...props,
		isClosable: true,
		duration: 3500,
		position: 'top-right',
		render: createToast,
	});
};

const createToast = (props: RenderProps) => {
	return (
		<Box
			borderRadius="2xl"
			border="1px solid black"
			p={4}
			bgColor="primary.900"
			maxW="420px"
		>
			<HStack justify="space-between" align="center">
				<Text color="black" fontWeight="bold" fontSize="lg">
					{props.title}
				</Text>
				<CloseButton />
			</HStack>
			<Text color="black" fontSize="sm">
				{props.description}
			</Text>
		</Box>
	);
};

export { createToast, useToast };
