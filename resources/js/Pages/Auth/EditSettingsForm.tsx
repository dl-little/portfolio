import { ChangeEvent } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import FormGroup from '@/Components/FormGroup';
import styled from 'styled-components';
import variables from '../../../scss/abstracts/_shared.module.scss';
const { gap } = variables;

interface ISettings {
	github_url: string
	email: string
	linkedin_url: string
}

const Form = styled.form`
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	gap: ${gap};
`;

const EditSettingsForm: React.FC<{ values: ISettings}> = ({ values }) => {
	const { data, setData, errors, progress, post }= useForm({
		linkedin_url: values.linkedin_url,
		email: values.email,
		github_url: values.github_url
	});

	const handleInputChange = ((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const key = e.target.id;
		const value = e.target.value;

		setData(values => ({
			...values,
			[key]: value,
		}));
	});

	const handleSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		post(route('settings.store'));
	});

	return (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<label htmlFor="linkedin_url">LinkedIn Url:</label>
				<input id="linkedin_url" value={data.linkedin_url} onChange={handleInputChange} />
				<InputError message={errors.linkedin_url} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="github_url">GitHub Url:</label>
				<input id="github_url" value={data.github_url} onChange={handleInputChange} />
				<InputError message={errors.github_url} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="email">Email:</label>
				<input id="email" value={data.email} onChange={handleInputChange} />
				<InputError message={errors.email} />
			</FormGroup>
			<button type="submit">Update</button>
		</Form>
	)
}

export default EditSettingsForm;
