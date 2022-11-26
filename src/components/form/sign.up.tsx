import moment from 'moment';
import { PropsWithChildren } from 'react';
import { Control, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';
import { Input } from '../interactions';

type SignUpProps = {
	control: Control<any, any>;
	handleSubmit: UseFormHandleSubmit<any>;
	setValue: UseFormSetValue<any>;
};

const SignUp: React.FC<PropsWithChildren<SignUpProps>> = ({
	control,
	setValue,
}) => {
	return (
		<>
			<Input
				control={control}
				name="first_name"
				inputProps={{
					type: 'text',
					placeholder: 'primeiro nome',
					required: true,
				}}
			/>
			<Input
				control={control}
				name="last_name"
				inputProps={{
					type: 'text',
					placeholder: 'sobrenome',
					required: true,
				}}
			/>
			<Input
				control={control}
				name="username"
				inputProps={{
					onChange: (e) => {
						setValue('username', e.target?.value?.toLowerCase().trim());
					},
					type: 'text',
					placeholder: 'nome de usuário',
					required: true,
				}}
			/>
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
			<Input
				control={control}
				name="confirm_password"
				inputProps={{
					type: 'password',
					placeholder: 'confirme senha',
					required: true,
				}}
			/>
			<Input
				label="data de nascimento"
				control={control}
				name="birthday"
				inputProps={{
					type: 'date',
					placeholder: 'data de nascimento',
					required: true,
					max: moment().utc().add(-14, 'year').toISOString().split('T')[0],
				}}
			/>
		</>
	);
};

export { SignUp };
