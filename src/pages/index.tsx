import * as Yup from 'yup';

import {
	Button,
	Checkbox,
	Column,
	Form,
	H1,
	H2,
	Input,
	Layout,
	Main,
	NormalText,
	SignUp,
	useToast,
} from '~/components';

import { NextPage } from 'next';
import { PLAYOUT_JWT, REGEX_PASSWORD } from '~/utils/contants';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	StackDivider,
	useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResponseError, User } from '~/services';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import withoutAuth from '~/components/hoc/withoutAuth';
import moment from 'moment';
import { useState } from 'react';
import { setCookie } from 'cookies-next';

type Auth = {
	email: string;
	password: string;
	keep_connected: boolean;
};

type SignUp = {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	birthday: string;
	password: string;
	confirm_password: string;
};

const authSchema = Yup.object().shape({
	email: Yup.string()
		.required('o e-mail é obrigatório')
		.email('o e-mail deve ser válido'),
	password: Yup.string()
		.required('a senha é obrigatória')
		.min(8, 'a senha deve ter no mínimo 8 caracteres')
		.max(16, 'a senha deve ter no máximo 16 caracteres')
		.matches(REGEX_PASSWORD, {
			message:
				'a senha deve ter no mínimo 8 caracteres sendo eles no mínimo 1 número, 1 caracter especial, 1 letra maiúscula e 1 letra minúscula',
		}),
	keep_connected: Yup.bool().notRequired(),
});

const IndexPage: NextPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const toast = useToast();

	const userCreateSchema = Yup.object().shape({
		first_name: Yup.string().required('o primeiro nome é obrigatório'),
		last_name: Yup.string().required('o segundo nome é obrigatório'),
		username: Yup.string()
			.required('o nome de usuário é obrigatório')
			.test(
				'username-valid',
				'o nome de usuário já está em uso',
				async (value) => {
					setLoading(true);
					const { data } = await User.findUsers<{ username: string }>(
						{ username: value },
						{ username: true },
					);
					setLoading(false);
					return data.data.length === 0;
				},
			),
		password: Yup.string()
			.required('a senha é obrigatória')
			.min(8, 'a senha deve ter no mínimo 8 caracteres')
			.max(16, 'a senha deve ter no máximo 16 caracteres')
			.matches(REGEX_PASSWORD, {
				message:
					'a senha deve ter no mínimo 8 caracteres sendo eles no mínimo 1 número, 1 caracter especial, 1 letra maiúscula e 1 letra minúscula',
			}),
		confirm_password: Yup.string()
			.required('a senha de confirmação é obrigatória')
			.oneOf([Yup.ref('password'), null], 'as senhas devem ser iguais'),
		email: Yup.string()
			.required('o e-mail é obrigatório')
			.email('o e-mail deve ser válido')
			.test('email-valid', 'o e-mail já está em uso', async (value) => {
				setLoading(true);
				const { data } = await User.findUsers<{ data: { email: string }[] }>(
					{ email: value },
					{ email: true },
				);
				setLoading(false);
				return data.data.length === 0;
			}),
		birthday: Yup.string()
			.required('A data de nascimento é obrigatória')
			.test(
				'valid-birthday',
				'a data de nascimento deve ser válida',
				async (value) => {
					const isValid = moment(value).isValid();
					return isValid;
				},
			)
			.test(
				'older-age-birthday',
				'você deve ser maior de 14 anos',
				async (value) => {
					const birthdayMoment = moment(Date.parse(value!)).utc();
					const nowMinus14 = moment().utc().add(-14, 'year');
					const isValid = birthdayMoment.isBefore(nowMinus14);
					return isValid;
				},
			),
	});

	const { control: controlSignUp, handleSubmit: handleSubmitSignUp } =
		useForm<SignUp>({
			mode: 'onBlur',
			resolver: yupResolver(userCreateSchema),
		});

	const { control, reset, handleSubmit, getValues, setError } = useForm<Auth>({
		mode: 'onBlur',
		resolver: yupResolver(authSchema),
	});

	const handleLogin = async (auth: Auth) => {
		setLoading(true);
		User.signIn(auth, !auth.keep_connected).then((err) => {
			if (err instanceof AxiosError<ResponseError>) {
				toast({
					title: 'não conseguimos te identificar',
					description:
						err.response?.data.message + ', você confirmou a conta?' || '',
				});
				return;
			}
			setTimeout(() => {
				router.push('/dashboard', undefined, {
					shallow: true,
				});
			}, 800);
		});
		setLoading(false);
	};

	const handleSignUp = async (user: SignUp) => {
		setLoading(true);
		user.birthday = moment(user.birthday).toISOString();
		User.signUp(user)
			.then(() => {
				toast({
					title: 'GG! conta criada',
					description: 'você receberá um e-mail para confirmar sua conta!',
				});
				onClose();
				reset();
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const forgotPassword = async () => {
		const email = getValues('email');
		setLoading(true);
		User.forgotPassword(email)
			.then(() => {
				toast({
					title: 'troca de senha solicitada',
					description:
						'caso o e-mail informado exista, você receberá um link para a troca',
				});
			})
			.catch((err: AxiosError<ResponseError>) => {
				setError('email', {
					message: err.response?.data.message,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Layout>
			<Main alignContent="center" flexWrap="wrap" gap={6}>
				<Column maxW="md">
					<H1 fontWeight="bold" color="primary.900">
						playout network
					</H1>
					<H2 color="black">
						nós te ajudaremos a encontrar os melhores jogadores do mercado.
					</H2>
				</Column>
				<Form
					onSubmit={handleSubmit(handleLogin)}
					gap={4}
					flex={1}
					minW="200"
					maxW="md"
				>
					<Input
						control={control}
						name="email"
						inputProps={{
							type: 'email',
							placeholder: 'e-mail',
							required: true,
						}}
					/>
					<Input
						control={control}
						name="password"
						inputProps={{
							type: 'password',
							placeholder: 'senha',
							required: true,
						}}
					/>
					<Checkbox
						control={control}
						label="Mantenha-me conectado"
						name="keep_connected"
						inputProps={{
							id: 'keep_connected',
						}}
					/>
					<Button isLoading={loading} type="submit">
						entrar
					</Button>
					{!loading && (
						<NormalText
							tabIndex={0}
							role="link"
							cursor="pointer"
							alignSelf="center"
							w="fit-content"
							color="black"
							_hover={{ textDecoration: 'underline' }}
							onClick={forgotPassword}
						>
							esqueceu sua senha?
						</NormalText>
					)}
					<StackDivider bgColor="black" w="100%" h="1px" />
					<Button isLoading={loading} onClick={onOpen} mode="secondary">
						criar nova conta
					</Button>
				</Form>
				<Modal isCentered isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<Form onSubmit={handleSubmitSignUp(handleSignUp)}>
							<ModalHeader>criar uma conta</ModalHeader>
							{!loading && <ModalCloseButton />}
							<ModalBody display="flex" flexDirection="column" gap={4}>
								<SignUp
									handleSubmit={handleSubmitSignUp}
									control={controlSignUp}
								/>
							</ModalBody>
							<ModalFooter display="flex" justifyContent="space-between">
								<Button
									isLoading={loading}
									mode="secondary"
									mr={3}
									onClick={onClose}
								>
									fechar
								</Button>
								<Button isLoading={loading} type="submit" mode="primary">
									criar conta
								</Button>
							</ModalFooter>
						</Form>
					</ModalContent>
				</Modal>
			</Main>
		</Layout>
	);
};

export default withoutAuth(IndexPage);
