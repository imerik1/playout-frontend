import { HStack, Image, Textarea, VStack } from '@chakra-ui/react';
import { Form, HeaderWithAuth, Layout, Main, Button, H2 } from '~/components';
import withAuth from '~/components/hoc/withAuth';

const Dashboard = () => {
	return (
		<Layout>
			<HeaderWithAuth containerProps={{ gap: 6 }} />
			<Main justifyContent="flex-start" flexDirection="column">
				<HStack w="100%">
					<VStack></VStack>
					<VStack flex={1}>
						<VStack w="100%">
							<H2 py={4} alignSelf="flex-start">
								Publicação
							</H2>
						</VStack>
						<Form w="100%">
							<Textarea
								borderColor="black"
								_hover={{ border: '1px solid black', borderColor: 'black' }}
								_focus={{ border: '1px solid black', borderColor: 'black' }}
								border="1px solid black"
								placeholder="o que está jogando? quantas wins você teve hoje?"
							/>
							<Button alignSelf="flex-end" maxW="fit-content" mode="primary">
								publicar
							</Button>
						</Form>
					</VStack>
				</HStack>
			</Main>
		</Layout>
	);
};

export default withAuth(Dashboard);
