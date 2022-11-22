import {
	Box,
	HStack,
	Icon,
	Image,
	Input,
	Spinner,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { User } from '~/services';
import { NormalText, SmallText } from '../text';

type UserSearch = {
	first_name: string;
	last_name: string;
	username: string;
	metadata: {
		image_photo: string;
	};
};

const AutoComplete = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<UserSearch[]>([]);
	let delayTimer: string | number | NodeJS.Timeout | undefined;

	const findUsers = useCallback(
		async (username: string) => {
			setUsers([]);
			if (!username) {
				onClose();
				return;
			}
			setLoading(true);
			onOpen();
			const { data } = await User.findUsers<UserSearch>(
				{
					username: {
						contains: username.toLowerCase(),
					},
				},
				{
					first_name: true,
					last_name: true,
					username: true,
					metadata: {
						select: {
							image_photo: true,
						},
					},
				},
				{
					take: 6,
				},
			);
			setLoading(false);
			setUsers(data.data);
		},
		[delayTimer],
	);

	return (
		<Box position="relative" width="100%" maxW="400px">
			<Icon
				zIndex={1000}
				as={BsSearch}
				w={4}
				h={4}
				position="absolute"
				left={4}
				top={3}
			/>
			<Input
				pl={10}
				placeholder="pesquise por algo"
				width="100%"
				color="black"
				borderColor={'black'}
				bgColor="white"
				onChange={(e) => {
					clearTimeout(delayTimer);
					delayTimer = setTimeout(() => {
						findUsers(e.target.value);
					}, 200);
				}}
				onFocus={() => {
					if (users.length > 0) {
						onOpen();
					}
				}}
				onBlur={() => {
					onClose();
				}}
				borderTopLeftRadius={8}
				borderTopRightRadius={8}
				borderBottomRightRadius={isOpen ? 0 : 8}
				borderBottomLeftRadius={isOpen ? 0 : 8}
				_focus={{ borderColor: 'black' }}
				_active={{ borderColor: 'black' }}
				_hover={{ borderColor: 'black' }}
				_placeholder={{ color: 'black' }}
			/>
			{isOpen && (
				<VStack
					border={'1px solid black'}
					position="absolute"
					top="40px"
					left={0}
					spacing={-1}
					bgColor="white"
					zIndex={1000}
					width="100%"
				>
					{loading && (
						<VStack
							cursor="pointer"
							_hover={{ bgColor: 'primary.300' }}
							py={2}
							px={4}
							justify="center"
							align="center"
							w="100%"
						>
							<Spinner />
						</VStack>
					)}
					{users.length === 0 && !loading && (
						<VStack py={2} px={4} justify="center" align="center" w="100%">
							<NormalText>Não encontramos nenhum usuário</NormalText>
						</VStack>
					)}
					{users.map((user) => {
						return (
							<VStack
								cursor="pointer"
								_hover={{ bgColor: 'primary.300' }}
								py={2}
								px={4}
								justify="center"
								align="center"
								w="100%"
							>
								<HStack
									w="100%"
									justify="flex-start"
									align="center"
									gap={4}
									key={user.username}
								>
									<Image
										src={
											user?.metadata.image_photo.includes('playout.network')
												? `https://playout.network/${user?.metadata.image_photo}`
												: `${user?.metadata.image_photo}`
										}
										boxSize="40px"
										borderRadius="full"
									/>
									<VStack spacing={-2} justify="flex-start" align="flex-start">
										<NormalText>
											{user.first_name} {user.last_name}
										</NormalText>
										<SmallText>{user.username}</SmallText>
									</VStack>
								</HStack>
							</VStack>
						);
					})}
					<Box
						cursor="pointer"
						_hover={{ bgColor: 'primary.300' }}
						py={2}
						w="100%"
						textAlign="center"
						onClick={() => {
							onClose();
						}}
					>
						<NormalText>fechar pesquisa</NormalText>
					</Box>
				</VStack>
			)}
		</Box>
	);
};

export { AutoComplete };
