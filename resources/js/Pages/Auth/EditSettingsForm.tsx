import { ChangeEvent } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import FormGroup from '@/Components/FormGroup';
import styled from 'styled-components';
import { ISetting } from '../Settings';
import variables from '../../../scss/abstracts/_shared.module.scss';
const { gap } = variables;

const Form = styled.form`
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	gap: ${gap};
`;

const EditSettingsForm: React.FC<{ values: ISetting }> = ({ values }) => {
	const { data, setData, errors, progress, post }= useForm({
		linkedin_url: values.linkedin_url,
		email: values.email,
		github_url: values.github_url,
		home_big: values.home_big,
		home_little: values.home_little,
		home_nouns: values.home_nouns
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
			<FormGroup>
				<label htmlFor="home_big">Home Big Text:</label>
				<input id="home_big" value={data.home_big} onChange={handleInputChange} />
				<InputError message={errors.home_big} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="home_little">Home Little Text:</label>
				<input id="home_little" value={data.home_little} onChange={handleInputChange} />
				<InputError message={errors.home_little} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="home_nouns">Home Nouns:</label>
				<textarea rows={20} cols={90} id="home_nouns" value={data.home_nouns} onChange={handleInputChange} />
				<InputError message={errors.home_nouns} />
			</FormGroup>
			<button type="submit">Update</button>
		</Form>
	)
}

export default EditSettingsForm;
