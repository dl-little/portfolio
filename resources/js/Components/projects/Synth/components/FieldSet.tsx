import styled from "styled-components";
import React, { ChangeEvent, PropsWithChildren, useContext, useCallback, useEffect } from "react";
import {
	IInput,
	Checkbox,
	Range,
	Radio,
	Select,
	Canvas
} from "./inputs";
import { SynthContext } from "./SynthContextProvider";

const Field = styled.fieldset`
	display:flex;
	flex-flow:row wrap;
	justify-content: space-between;
	align-items: flex-start;
	min-width: 15%;
	margin: 0 0 15px;

	&:last-child {
		margin-bottom: 0;
	}
`;

const ControlGroupsWrap = styled.div`
`

const ControlGroup = styled.span`
	margin: 15px;
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start; 
	align-items: flex-start;
`;

interface IControlGroup {
	name: string
	id: string
	type: string
	options?: string[]
	min?: number
	max?: number
	step?: number
	defaultValue?: string | number
}

interface IFieldSet extends PropsWithChildren{
	title: string
	controlGroups: IControlGroup[]
}

const FieldSet: React.FC<IFieldSet> = (props) => {
	const { title, controlGroups } = props;
	/* @ts-expect-error: TODO: Provide default in definition of context. */
	const { setOctave, setKeyboardLetters, setMute, setLowpass, setWaveForm, setLowpassFrequency, setLowpassGain, setGain, setDecay, mute } = useContext(SynthContext);

	const handleRadioChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setOctave(e.target.id);
	}, [])

	const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		switch (e.target.id) {
			case 'keyboardLetters':
				setKeyboardLetters(e.target.checked);
				break;
			case 'mute':
				setMute(e.target.checked);
				break;
			case 'lowpass':
				setLowpass(e.target.checked);
				break;
		}
	}, [])

	const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		setWaveForm(e.target.value);
	}, [])

	const handleRangeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		switch (e.target.id) {
			case 'lowpassFrequency':
				setLowpassFrequency(Number(e.target.value));
				break;
			case 'lowpassGain':
				setLowpassGain(Number(e.target.value));
				break;
			case 'gain':
				setGain(Number(e.target.value));
				break;
			case 'decay':
				setDecay(Number(e.target.value));
				break;
		}
	}, [])

	return (
		<Field>
			<legend>{title}</legend>
			<ControlGroupsWrap id={`${title}-group`}>
				{controlGroups.map(group => {
					let InputGroup: React.FC<IInput>;
					let props: IInput = {
						id: group.id
					};
					switch (group.type) {
						case "checkbox":
							InputGroup = Checkbox;
							props = {
								...props,
								label: group.name,
								onChange: handleCheckboxChange
							}
							break;
						case "range":
							InputGroup = Range
							props = {
								...props,
								defaultValue: group.defaultValue,
								label: group.name,
								min: group.min,
								max: group.max,
								step: group.step,
								onChange: handleRangeChange
							}
							break;
						case "radio":
							InputGroup = Radio
							props = {
								...props,
								options: group.options,
								defaultValue: group.defaultValue,
								onChange: handleRadioChange
							}
							break;
						case "select":
							InputGroup = Select
							props = {
								...props,
								label: group.name,
								options: group.options,
								defaultValue: group.defaultValue,
								onSelectchange: handleSelectChange
							}
							break;
						default:
							InputGroup = Canvas
					}
					return (
						<ControlGroup key={group.id} className={`${group.type}-group`}>
							<InputGroup {...props} />
						</ControlGroup>
					)
				})}
			</ControlGroupsWrap>
		</Field>
	)
}

export default React.memo(FieldSet);
