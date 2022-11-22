import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Control, Controller } from 'react-hook-form';
import {
	FormControl,
	FormLabel,
	Input as I,
	Checkbox as C,
	CheckboxProps as CP,
	InputProps as IP,
	Icon,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { InputHTMLAttributes, PropsWithChildren } from 'react';

type InputProps = {
	control: Control<any, any>;
	label?: string;
	inputProps: IP & InputHTMLAttributes<HTMLInputElement>;
	name: string;
};

type CheckboxProps = {
	control: Control<any, any>;
	label?: string;
	inputProps: CP & InputHTMLAttributes<HTMLInputElement>;
	name: string;
};

const Checkbox: React.FC<PropsWithChildren<CheckboxProps>> = ({
	children,
	control,
	label,
	inputProps: { type, id, ...inputProps },
	name,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={false}
			render={({ field: { onChange, value, ref } }) => {
				return (
					<FormControl
						position="relative"
						display="flex"
						alignItems="center"
						alignContent="center"
						as="fieldset"
						gap={2}
					>
						<C
							title={inputProps.placeholder}
							ref={ref}
							isChecked={value}
							onChange={(e) => {
								if (inputProps.onChange) {
									inputProps.onChange(e);
								}
								onChange(e);
							}}
							color="black"
							borderColor={'black'}
							_focus={{ borderColor: 'primary.900' }}
							_active={{ borderColor: 'primary.900' }}
							_hover={{ borderColor: 'primary.900' }}
							inputProps={{
								id,
							}}
						/>
						{label && (
							<FormLabel m={0} p={0} fontSize="sm" htmlFor={id}>
								{label}
							</FormLabel>
						)}
					</FormControl>
				);
			}}
		/>
	);
};

const Input: React.FC<PropsWithChildren<InputProps>> = ({
	children,
	control,
	label,
	inputProps: { type, ...inputProps },
	name,
}) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, ...field }, fieldState: { error } }) => {
				return (
					<FormControl
						position="relative"
						as="fieldset"
						aria-errormessage={error?.message || ''}
					>
						{label && <FormLabel>{label}</FormLabel>}
						<I
							title={inputProps.placeholder}
							onChange={(e) => {
								if (inputProps.onChange) {
									inputProps.onChange(e);
								}
								onChange(e);
							}}
							{...field}
							type={
								type !== 'password'
									? type
									: type === 'password' && isOpen
									? 'text'
									: type
							}
							pr={type === 'password' ? 9 : 4}
							pl={4}
							color="black"
							borderColor={error?.message ? 'red' : 'black'}
							_focus={{ borderColor: error?.message ? 'red' : 'primary.900' }}
							_active={{ borderColor: error?.message ? 'red' : 'primary.900' }}
							_hover={{ borderColor: error?.message ? 'red' : 'primary.900' }}
							_placeholder={{ color: 'black' }}
							{...inputProps}
							defaultValue=""
						/>
						{type === 'password' && (
							<Icon
								position="absolute"
								color="black"
								right={3}
								top={3}
								cursor="pointer"
								onClick={isOpen ? onClose : onOpen}
								zIndex={1000}
								as={isOpen ? AiFillEye : AiFillEyeInvisible}
							/>
						)}
						{error?.message && (
							<Text color="red" py={2} fontSize="sm">
								{error.message}
							</Text>
						)}
					</FormControl>
				);
			}}
		/>
	);
};

export { Input, Checkbox };
