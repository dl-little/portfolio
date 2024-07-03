import { ChangeEventHandler } from "react"

export interface IInput {
	id: string
	label?: string
	min?: number
	max?: number
	step?: number
	options?: string[]
	defaultValue?: string | number
	onChange?: ChangeEventHandler<HTMLInputElement>
	onSelectchange?: ChangeEventHandler<HTMLSelectElement>
	value?: "low" | "middle" | "high"
	description?: string
}

export const Checkbox: React.FC<IInput> = (props) => {
	const { id, label, onChange } = props;
	return (
		<>
			<label htmlFor={id}>{label}:</label>
			<input type="checkbox" id={id} onChange={onChange} />
		</>
	)
}

export const Range: React.FC<IInput> = (props) => {
	const { id, label, min, max, step, onChange, defaultValue } = props;
	return (
		<>
			<label htmlFor={id}>{label}:</label>
			<input type="range" id={id} min={min} max={max} step={step} defaultValue={defaultValue} onChange={onChange} />
		</>
	)
}

export const Radio: React.FC<IInput> = (props) => {
	const { id, options, onChange, value, description } = props;
	return (
		<>
			{options?.map(option => {
				return (
					<span aria-describedby="radio-description" className={id} key={option}>
						<label htmlFor={option}>{option}:</label>
						<input name={id} type="radio" id={option} checked={option === value} onChange={onChange} />
					</span>
				)
			})}
			<p id="radio-description" className="screen-reader-text">{description}</p>
		</>
	)
}

export const Select: React.FC<IInput> = (props) => {
	const { id, label, options, defaultValue, onSelectchange } = props;
	return (
		<>
			<label htmlFor={id}>{label}:</label>
			<select id={id} defaultValue={defaultValue} onChange={onSelectchange} >
				{options?.map(option => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					)
				})}
			</select>
		</>
	)
}

export const Canvas: React.FC<IInput> = (props) => {
	const { id } = props;
	return (
		<canvas id={id} />
	)
}
