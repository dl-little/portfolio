import { ChangeEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { FormDataConvertible, Inertia } from '@inertiajs/inertia';
import InputError from '@/Components/InputError';
import FormGroup from '@/Components/FormGroup';
import styled from 'styled-components';
import variables from '../../../../scss/abstracts/_shared.module.scss'
import RenderIf from '@/Components/RenderIf';
import { IProject } from '../Index';
const { gap } = variables;

const Form = styled.form`
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	gap: ${gap};
`;

const EditProjectForm: React.FC<{ project: IProject }> = ({ project }) => {
	const { description, github_url, id, keywords, title, is_hosted } = project;
	const { data, setData, errors, progress }= useForm({
		title: title,
		image: undefined,
		github_url: github_url || '',
		keywords: keywords || '',
		description: description || '',
		is_hosted: is_hosted
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

	const handleCheckboxChange = ((e: ChangeEvent<HTMLInputElement>) => {
		const key = e.target.id;
		const value = e.target.checked;
		console.log(value);
		setData(values => ({
			...values,
			[key]: value ? 1 : 0,
		}));
	});

	const handleSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		Inertia.post(`/projects/${id}`, {
			_method: "put",
			title: data.title,
			image: data.image || '',
			github_url: data.github_url,
			keywords: data.keywords,
			description: data.description,
			is_hosted: data.is_hosted
		});
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
				<input id="image" type="file" accept="image/png, image/jpeg" defaultValue={data.image} onChange={handleFileUpload} />
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
			<FormGroup>
				<label htmlFor="is_hosted">Is Hosted:</label>
				<input type="checkbox" id="is_hosted" value={data.is_hosted} checked={!!data.is_hosted} onChange={handleCheckboxChange} />
			</FormGroup>
			<button type="submit">Update</button>
		</Form>
	)
}

export default EditProjectForm;
