import * as Yup from 'yup';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import {
	Button,
	Form,
	H1,
	Input,
	Layout,
	Main,
	NormalText,
	useToast,
} from '~/components';
import { REGEX_PASSWORD } from '~/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ResponseError, User } from '~/services';
import { AxiosError } from 'axios';
import { StackDivider, useControllableState } from '@chakra-ui/react';
import Link from 'next/link';

type ForgotPasswordForm = {
	password: string;
	confirm_password: string;
};

const forgotPasswordSchema = Yup.object().shape({
	password: Yup.string()
		.required('a senha é obrigatória')
		.min(8, 'a senha deve ter no mínimo 8 caracteres')
		.max(16, 'a senha deve ter no máximo 16 caracteres')
		.matches(REGEX_PASSWORD, {
			message:
				'a senha deve ter no mínimo 8 caracteres sendo eles no mínimo 1 número, 1 caracter especial, 1 letra maiúscula e 1 letra minúscula',
		}),
	confirm_password: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'as senhas devem ser iguais',
	),
});

const ForgotPassword: NextPage = () => {
	const [loading, setLoading] = useControllableState({
		defaultValue: false,
	});
	const toast = useToast();
	const router = useRouter();
	const { control, handleSubmit } = useForm<ForgotPasswordForm>({
		resolver: yupResolver(forgotPasswordSchema),
	});

	const handleChangePassword = (data: ForgotPasswordForm) => {
		const { id: forgot_password_id = '' } = router.query as { id: string };
		setLoading(true);
		User.changePassword({ ...data, forgot_password_id })
			.then(() => {
				toast({
					title: 'troca efetuada',
					description:
						'sua senha foi atualizada, você será redirecionado em breve!',
				});
				setTimeout(() => {
					router.push('/');
				}, 3000);
			})
			.catch((err: AxiosError<ResponseError>) => {
				toast({
					title: 'houve um erro',
					description: err.response?.data.message || '',
				});
			});
		setLoading(false);
	};

	return (
		<Layout>
			<Main maxW="container.lg" flexWrap="wrap" gap={6}>
				<Form
					onSubmit={handleSubmit(handleChangePassword)}
					gap={4}
					flex={1}
					maxW="md"
					align="center"
				>
					<H1>Redefinição de senha</H1>
					<Input
						control={control}
						name="password"
						inputProps={{
							type: 'password',
							placeholder: 'nova senha',
							required: true,
						}}
					/>
					<Input
						control={control}
						name="confirm_password"
						inputProps={{
							type: 'password',
							placeholder: 'confirme sua senha',
							required: true,
						}}
					/>
					<Button isLoading={loading} type="submit">
						alterar senha
					</Button>
					<StackDivider bgColor="black" w="100%" h="1px" />
					<Link href="/" passHref>
						<NormalText
							tabIndex={0}
							cursor="pointer"
							w="fit-content"
							color="black"
							_hover={{ textDecoration: 'underline' }}
						>
							voltar a página inicial
						</NormalText>
					</Link>
				</Form>
			</Main>
		</Layout>
	);
};

export default ForgotPassword;
