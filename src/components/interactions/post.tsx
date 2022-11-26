import { HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { User } from '~/services';
import { howLongIs } from '~/utils';

type Data = {
	id: string;
	body: string;
	created_at: string;
	likes: number | string[];
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

type Props = {
	post: Data;
};

const Post: React.FC<Props> = ({ post }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { data, isLoading, refetch } = useQuery(
		`user/likes/${post.id}`,
		async () => {
			return (
				await User.findUsers<Data[]>(
					{
						posts: {
							some: {
								id: post.id,
							},
						},
					},
					{
						posts: {
							select: {
								likes: true,
							},
							where: {
								id: post.id,
							},
						},
					},
				)
			).data.data[0][0];
		},
	);

	const handleLike = async () => {
		setLoading(true);
		await User.likePost(post.id)
			.then((e) => {
				refetch();
			})
			.catch((f) => console.error(f));
		setLoading(false);
	};

	return (
		<VStack
			w="100%"
			justify="flex-start"
			align="flex-start"
			bgColor="gray.100"
			p={4}
			borderRadius={10}
		>
			<HStack gap={4} w="100%" align="flex-start" justify="flex-start">
				<Image
					alt={`Foto do ${post.user.username}`}
					src={
						post.user.metadata.image_photo.includes('wilcity')
							? post.user.metadata.image_photo
							: `/${post.user.metadata.image_photo}`
					}
					boxSize="70"
					borderRadius="full"
					onClick={() => {
						router.push(
							post.yours ? '/profile' : `/user/${post.user.username}`,
						);
					}}
				/>
				<VStack
					pt={1}
					justify="flex-start"
					align="flex-start"
					spacing={-2}
					h="100%"
				>
					<Text
						onClick={() => {
							router.push(
								post.yours ? '/profile' : `/user/${post.user.username}`,
							);
						}}
					>
						{post.user.first_name} {post.user.last_name}
					</Text>
					<Text
						onClick={() => {
							router.push(
								post.yours ? '/profile' : `/user/${post.user.username}`,
							);
						}}
					>
						@{post.user.username}
					</Text>
					<Text pt={2} fontSize="xs">
						{howLongIs(post.created_at)}
					</Text>
				</VStack>
			</HStack>
			<Text pb={4}>{post.body}</Text>
			<HStack
				onClick={() => {
					if (!loading) {
						handleLike();
					}
				}}
				align="center"
				cursor="pointer"
			>
				<Text>{data?.likes}</Text>
				<Icon as={data?.liked ? AiFillLike : AiOutlineLike} h={4} w={4} />
			</HStack>
		</VStack>
	);
};

export { Post };
