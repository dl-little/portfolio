import { ChangeEvent } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import FormGroup from '@/Components/FormGroup';
import styled from 'styled-components';
import variables from '../../../../scss/abstracts/_shared.module.scss'
import RenderIf from '@/Components/RenderIf';
const { gap } = variables;

const Form = styled.form`
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	gap: ${gap};
`;

const CreateProjectForm = () => {
	const { data, setData, post, processing, errors, progress }= useForm({
		title: '',
		image: undefined,
		github_url: '',
		keywords: '',
		description: ''
	});

	const handleFileUpload = ((e: ChangeEvent<HTMLInputElement>) => {
		const key = e.currentTarget.id;
		const value = !! e.currentTarget.files ? e.currentTarget.files[0] : undefined;
		setData(values => ({
			...values,
			[key]: value,
		}));
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
		post(route('projects.store'));
	});

	return (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<label htmlFor="title">Title:</label>
				<input id="title" value={data.title} onChange={handleInputChange} />
				<InputError message={errors.title} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="image">Image:</label>
				<input id="image" type="file" defaultValue={data.image} onChange={handleFileUpload} />
				<RenderIf isTrue={!!progress}>
					<progress value={progress?.percentage} max="100">
						{progress?.percentage}%
					</progress>
				</RenderIf>
				<InputError message={errors.image} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="github_url">Github URL:</label>
				<input id="github_url" value={data.github_url} onChange={handleInputChange} />
				<InputError message={errors.github_url} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="keywords">Keywords:</label>
				<input id="keywords" value={data.keywords} onChange={handleInputChange} />
				<InputError message={errors.keywords} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="description">Description:</label>
				<textarea id="description" value={data.description} onChange={handleInputChange} />
				<InputError message={errors.description} />
			</FormGroup>
			<button type="submit">Store</button>
		</Form>
	)
}

export default CreateProjectForm;