import { HStack, Spinner, Text, Textarea, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { User } from '~/services';
import { Button } from '../interactions';

type AboutRequest = {
	address?: string;
	description?: string;
};

type AboutProps = {
	self: boolean;
};

const About: React.FC<AboutProps> = ({ self }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const {
		data: about,
		isLoading,
		refetch,
	} = useQuery('/user/about', async () => {
		return (
			(
				await User.getProfile<{ about: AboutRequest }>(
					{
						about: {
							select: {
								address: true,
								description: true,
							},
						},
					},
					self
						? {}
						: {
								username: {
									equals: router.query['username'],
									mode: 'insensitive',
								},
						  },
				)
			)?.data?.data?.about || { address: null, description: null }
		);
	});

	const handleUpdate = async (e: FormEvent<HTMLDivElement>) => {
		setLoading(true);
		e.preventDefault();
		const [description] = (e.currentTarget as any)
			.elements as HTMLInputElement[];

		await User.updateUser({
			about: {
				upsert: {
					update: {
						description: description.value,
					},
					create: {
						description: description.value,
						address: '',
					},
				},
			},
		});

		refetch();
		setLoading(false);
	};

	if (isLoading || loading) {
		return (
			<HStack w="100%" h="100%" justify="center" align="center">
				<Spinner />
			</HStack>
		);
	}

	return (
		<VStack w="100%">
			<Text pb={6} alignSelf="self-start" fontSize="xl">
				Sobre
			</Text>
			{self && (
				<VStack
					as="form"
					onSubmit={handleUpdate}
					justify="flex-start"
					align="flex-start"
					spacing={4}
					w="100%"
				>
					<Textarea
						placeholder="Digite sua descrição"
						defaultValue={about?.description}
					/>
					<Button type="submit">Atualizar</Button>
				</VStack>
			)}
			{!self && <Text alignSelf="self-start">{about?.description}</Text>}
		</VStack>
	);
};

export { About };
