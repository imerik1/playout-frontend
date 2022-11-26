import {
	Box,
	Container,
	ContainerProps,
	HStack,
	Icon,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	StackProps,
	VStack,
} from '@chakra-ui/react';
import { Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Layout, Main, NormalText } from '~/components';
import withAuth from '~/components/hoc/withAuth';
import { User } from '~/services';
import {
	IoIosArrowDropdownCircle,
	IoMdHome,
	IoMdNotifications,
} from 'react-icons/io';

import { PropsWithChildren } from 'react';
import { AutoComplete, Notifications } from '../interactions';
import { SmallText } from '../text';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Link from 'next/link';

type HeaderProps = StackProps & {
	containerProps?: ContainerProps;
};

type Profile = {
	metadata: {
		image_photo: string;
	};
};

type Notification = {
	id: string;
	message: string;
	read: boolean;
	created_at: string;
	type: string;
	link: string;
};

const HeaderWithAuth: React.FC<PropsWithChildren<HeaderProps>> = ({
	children,
	containerProps,
	...props
}) => {
	const styles: StackProps = {
		display: 'flex',
		as: 'header',
		w: '100%',
		h: 'fit-content',
		bgColor: 'primary.900',
		py: 2,
		border: '1px solid black',
		px: 4,
	};
	const containerStyles: StackProps = {
		maxW: 'container.lg',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	};
	Object.assign(styles, props);
	Object.assign(containerStyles, containerProps);

	const router = useRouter();
	const [profile, setProfile] = useState<Profile | null>();
	const { isLoading, error, data, refetch } = useQuery(
		'user/notifications',
		async () => {
			return (
				await User.getProfile<Notification[]>({
					notifications: {
						select: {
							id: true,
							message: true,
							read: true,
							created_at: true,
							type: true,
							link: true,
						},
					},
				})
			).data;
		},
		{
			refetchInterval: 5000,
		},
	);

	const handleSignOut = async () => {
		await User.signOut();
		router.push('/');
	};

	useEffect(() => {
		const getProfile = async () => {
			const {
				data: { data },
			} = await User.getProfile<Profile>({
				metadata: {
					select: {
						image_photo: true,
					},
				},
			});
			setProfile(data);
		};
		getProfile();
	}, []);

	return (
		<Stack {...styles}>
			<Container gap={6} {...containerStyles}>
				<Link passHref href="/">
					<IconButton
						_hover={{ bgColor: 'transparent' }}
						_focus={{ bgColor: 'transparent' }}
						_active={{ bgColor: 'transparent' }}
						bgColor="transparent"
						h={8}
						w={8}
						aria-label=""
						as={IoMdHome}
					/>
				</Link>
				<AutoComplete />
				<Box h="50px" flex={1}></Box>
				<HStack>
					<Popover>
						<PopoverTrigger>
							<VStack position="relative" cursor="pointer" spacing={-1}>
								<Box
									bgColor="white"
									h="15px"
									w="15px"
									zIndex={1000}
									position="absolute"
									borderRadius="full"
									display="flex"
									justifyContent="center"
									alignItems="center"
									right={5}
									border="1px solid black"
									top={-2}
									pb={0.4}
									fontSize="xs"
									color="black"
									fontWeight="bold"
								>
									{data?.data?.filter((notification) => !notification.read)
										.length || 0}
								</Box>
								<Icon as={IoMdNotifications} w={6} h={6} />
								<SmallText>Notificações </SmallText>
							</VStack>
						</PopoverTrigger>
						<PopoverContent py={0} px={0} border="1px solid black">
							<PopoverArrow />
							<PopoverBody py={0} px={0}>
								<Notifications
									refetch={refetch}
									notifications={data?.data || []}
								/>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</HStack>
				<Menu>
					<MenuButton cursor="pointer" position="relative" as={Box}>
						<Icon
							w={6}
							h={6}
							as={IoIosArrowDropdownCircle}
							position="absolute"
							right={-2}
							bottom={0}
							color="white"
						/>
						<Image
							boxSize="40px"
							borderRadius="full"
							alt="Sua imagem"
							src={
								profile?.metadata.image_photo.includes('wilcity')
									? profile?.metadata.image_photo
									: `/${profile?.metadata.image_photo}`
							}
						/>
					</MenuButton>
					<MenuList>
						<Link passHref href="/profile">
							<MenuItem>Meu perfil</MenuItem>
						</Link>
						<Link passHref href="/configuration">
							<MenuItem>Configurações</MenuItem>
						</Link>
						<MenuItem onClick={handleSignOut}>Sair</MenuItem>
					</MenuList>
				</Menu>
			</Container>
		</Stack>
	);
};

const Header: React.FC<PropsWithChildren<HeaderProps>> = ({
	children,
	containerProps,
	...props
}) => {
	const styles: StackProps = {
		display: 'flex',
		as: 'header',
		w: '100%',
		h: 'fit-content',
		bgColor: 'primary.900',
		py: 2,
		border: '1px solid black',
		px: 4,
	};
	const containerStyles: StackProps = {
		maxW: 'container.lg',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	};
	Object.assign(styles, props);
	Object.assign(containerStyles, containerProps);
	return (
		<Stack {...styles}>
			<Container {...containerStyles}>{children}</Container>
		</Stack>
	);
};

export { Header, HeaderWithAuth };
