import { Box, HStack, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { User } from '~/services';
import { howLongIs } from '~/utils';
import { NormalText } from '../text';

type Notification = {
	id: string;
	message: string;
	read: boolean;
	created_at: string;
	type: string;
	link: string;
};

const Notifications: React.FC<{
	notifications: Notification[];
	refetch: any;
}> = ({ notifications, refetch }) => {
	const router = useRouter();
	return (
		<VStack
			overflow="auto"
			maxH="300px"
			scrollSnapType="both"
			scrollSnapAlign="start"
		>
			{notifications.map((notification) => {
				const goTo = async () => {
					if (!notification.link) return;
					router.push(`/${notification.link}`, undefined, {
						shallow: true,
					});
				};

				const markAsRead = async () => {
					if (notification.read) return;
					await User.updateUser({
						notifications: {
							update: {
								data: {
									read: true,
								},
								where: {
									id: notification.id,
								},
							},
						},
					})
						.then(() => {})
						.catch((err) => console.error(err))
						.finally(() => {
							refetch();
						});
				};

				return (
					<VStack
						as={Box}
						justify="center"
						align="flex-start"
						spacing={-1}
						key={notification.id}
						zIndex={10000}
						onClick={goTo}
						onMouseOver={markAsRead}
						w="100%"
						bgColor={notification.read ? 'gray.100' : 'white'}
						_hover={{ bgColor: 'gray.100' }}
						py={2}
						px={2}
						cursor="pointer"
					>
						<HStack>
							<NormalText fontWeight="bold" fontSize="sm">
								{notification.message}
							</NormalText>
							{!notification.read && (
								<NormalText color="red" fontSize="sm">
									*
								</NormalText>
							)}
						</HStack>
						{notification.link && (
							<NormalText pt={4} fontSize="sm">
								clique para ver
							</NormalText>
						)}
						<NormalText fontSize="sm">
							{howLongIs(notification.created_at)}
						</NormalText>
					</VStack>
				);
			})}
		</VStack>
	);
};

export { Notifications };
