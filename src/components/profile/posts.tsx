import { HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { User } from '~/services';
import { howLongIs } from '~/utils';

type PostsProps = {
	self: boolean;
};

type Post = {
	id: string;
	body: string;
	likes: string[];
	created_at: string;
};

const Posts: React.FC<PostsProps> = ({ self }) => {
	const router = useRouter();
	const { data: posts, isLoading } = useQuery(
		`/user/posts/${self ? 'profile' : router.query['username']}`,
		async () => {
			return (
				await User.getProfile<{ posts: Post[] }>(
					{
						posts: {
							select: {
								id: true,
								body: true,
								created_at: true,
								likes: true,
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
			).data.data.posts.sort(
				(a, b) =>
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
			);
		},
	);

	if (isLoading) {
		return (
			<HStack w="100%" align="center" justify="center">
				<Spinner />
			</HStack>
		);
	}

	return (
		<VStack w="100%">
			{(posts || []).map((post) => {
				return (
					<VStack
						key={post.id}
						justify="flex-start"
						align="flex-start"
						borderRadius={10}
						w="100%"
						p={6}
						bgColor="gray.200"
					>
						<HStack w="100%" justify="space-between">
							<Text>{post.body}</Text>
							<Text>{howLongIs(post.created_at)}</Text>
						</HStack>
						<Text>
							<b>Likes:</b> {post.likes.length}
						</Text>
					</VStack>
				);
			})}
		</VStack>
	);
};

export { Posts };
