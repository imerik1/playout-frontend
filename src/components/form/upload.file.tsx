import {
	Box,
	FormLabel,
	HStack,
	Icon,
	Input,
	useDisclosure,
} from '@chakra-ui/react';
import { FormEvent, PropsWithChildren } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { User } from '~/services';

type UploadFileProps = {
	id: string;
	refetch?: any;
};

const MaskClick = () => {
	const { isOpen, onClose, onOpen } = useDisclosure({
		defaultIsOpen: false,
	});
	return (
		<HStack
			position="absolute"
			left={0}
			top={0}
			align="center"
			justify="center"
			w="100%"
			h="100%"
			zIndex={10000}
			onMouseOver={onOpen}
			onMouseLeave={onClose}
			bgColor={isOpen ? 'blackAlpha.700' : 'transparent'}
			borderRadius="full"
			_hover={{ cursor: 'pointer' }}
		>
			{isOpen && <Icon color="white" as={AiFillCamera} h={8} w={8} />}
		</HStack>
	);
};

const UploadFile: React.FC<PropsWithChildren<UploadFileProps>> = ({
	children,
	id,
	refetch,
}) => {
	const handleChangeFile = async (e: FormEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files;

		if (!files || files.length < 1) return;

		const file = files[0];

		await User.uploadPhoto(file)
			.then((e) => {
				console.log(e);
			})
			.catch((err) => console.error(err));

		if (refetch) {
			refetch();
		}
	};

	return (
		<Box position="relative" h="fit-content" w="fit-content">
			<FormLabel as="label" mb={0} m={0} htmlFor={id}>
				<MaskClick />
				{children}
			</FormLabel>
			<Input
				onChange={handleChangeFile}
				accept="image/jpeg, image/png, image/png"
				visibility="hidden"
				position="absolute"
				top={0}
				w="100%"
				h="100%"
				type="file"
				id={id}
				name={id}
				zIndex={0}
			/>
		</Box>
	);
};

export { UploadFile };
