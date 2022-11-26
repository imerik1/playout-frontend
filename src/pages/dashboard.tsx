import { HStack, Spinner, Textarea, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
	Form,
	HeaderWithAuth,
	Layout,
	Main,
	Button,
	H2,
	Post,
} from '~/components';
import withAuth from '~/components/hoc/withAuth';
import { User } from '~/services';

type PostCreate = {
	body: string;
};

type Data = {
	id: string;
	body: string;
	created_at: string;
	likes: number;
	liked: boolean;
	yours: boolean;
	user: {
		username: string;
		first_name: string;
		last_name: string;
		metadata: {
			image_photo: string;
		};
	};
};

const Dashboard = () => {
	const [loading, setLoading] = useState(false);
	const { data, isLoading, refetch } = useQuery<{ data: Data[] }>(
		'user/posts',
		async () => {
			return await (
				await User.getMyPosts({})
			).data;
		},
		{
			refetchOnMount: false,
			refetchOnWindowFocus: true,
			refetchInterval: undefined,
		},
	);
	const { register, handleSubmit, reset } = useForm<PostCreate>();

	const handlePostCreate = async (data: PostCreate) => {
		setLoading(true);
		await User.updateUser({
			posts: {
				create: {
					body: data.body,
				},
			},
		})
			.then((data) => {
				refetch();
				reset();
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Layout>
			<HeaderWithAuth />
			<Main justifyContent="flex-start" flexDirection="column">
				<HStack w="100%">
					<VStack></VStack>
					<VStack justify="center" flex={1}>
						<VStack w="100%">
							<H2 py={4} alignSelf="flex-start">
								Publicação
							</H2>
						</VStack>
						<Form onSubmit={handleSubmit(handlePostCreate)} w="100%">
							<Textarea
								{...register('body', {
									required: true,
								})}
								required
								maxH="200px"
								borderColor="black"
								_hover={{ border: '1px solid black', borderColor: 'black' }}
								_focus={{ border: '1px solid black', borderColor: 'black' }}
								border="1px solid black"
								placeholder="o que está jogando? quantas wins você teve hoje?"
							/>
							<Button
								isLoading={loading}
								type="submit"
								alignSelf="flex-end"
								maxW="fit-content"
								mode="primary"
							>
								publicar
							</Button>
						</Form>
						<VStack spacing={6} pt={4} w="100%">
							{isLoading && <Spinner />}
							{data?.data.map((post, index) => {
								return <Post key={`post-${index}-${post.id}`} post={post} />;
							})}
						</VStack>
					</VStack>
				</HStack>
			</Main>
		</Layout>
	);
};

export default withAuth(Dashboard);
