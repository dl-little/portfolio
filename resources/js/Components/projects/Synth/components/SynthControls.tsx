import styled from "styled-components";
import FieldSet from "./FieldSet";
import controls from '../controls.json';

const Controls = styled.section`
	flex: 2;
	width: 100%;
	box-sizing: border-box;
	padding: 15px;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: flex-start;
`;

export const SynthControls = () => {
	return (
		<Controls>
			{Object.entries(controls).map(([k,v]) => {
				return (
					<FieldSet key={k} title={k} controlGroups={v.controlGroups} />
				)
			})}
		</Controls>
	)
}
