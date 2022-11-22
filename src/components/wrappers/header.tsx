import {
	Box,
	Container,
	ContainerProps,
	HStack,
	Icon,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	StackProps,
	VStack,
} from '@chakra-ui/react';
import { Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Layout, Main, NormalText } from '~/components';
import withAuth from '~/components/hoc/withAuth';
import { User } from '~/services';
import { IoIosArrowDropdownCircle, IoMdNotifications } from 'react-icons/io';

import { PropsWithChildren } from 'react';
import { AutoComplete } from '../interactions';
import { SmallText } from '../text';
import { useRouter } from 'next/router';

type HeaderProps = StackProps & {
	containerProps?: ContainerProps;
};

type Profile = {
	metadata: {
		image_photo: string;
	};
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
			<Container {...containerStyles}>
				<AutoComplete />
				<Box h="50px" flex={1}></Box>
				<HStack>
					<VStack cursor="pointer" spacing={-1}>
						<Icon as={IoMdNotifications} w={6} h={6} />
						<SmallText>Notificações</SmallText>
					</VStack>
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
								profile?.metadata.image_photo.includes('playout.network')
									? `https://playout.network/${profile?.metadata.image_photo}`
									: `${profile?.metadata.image_photo}`
							}
						/>
					</MenuButton>
					<MenuList>
						<MenuItem>Meu Perfil</MenuItem>
						<MenuItem>Configurações</MenuItem>
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
