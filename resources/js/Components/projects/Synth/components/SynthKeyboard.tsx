import Key from './Key';
import frequencies from '../frequencies.json';
import triggerData from '../triggers.json';
import styled from "styled-components";
import { SynthContext } from './SynthContextProvider';
import { useContext } from 'react';

const Keyboard = styled.section`
	flex: 1;
	width: 100%;
	border-top: 3px inset #222222;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: flex-start;
	position: relative;
	min-height: 160px;

	& > button:nth-of-type(2) {
		left:calc(11.11% - 3%);
	}

	& > button:nth-of-type(4) {
		left:calc(22.22% - 3%);
	}

	& > button:nth-of-type(7) {
		left:calc(44.44% - 3%);
	}

	& > button:nth-of-type(9) {
		left:calc(55.55% - 3%);
	}

	& > button:nth-of-type(11) {
		left:calc(66.66% - 3%);
	}

	& > button:nth-of-type(14) {
		left:calc(88.88% - 3%);
	}
`;

export const SynthKeyboard: React.FC = () => {
	/* @ts-expect-error: TODO: Provide default in definition of context */
	const { octave, keyboardLetters } = useContext<{octave: "low" | "middle" | "high"}>(SynthContext);
	const notes = frequencies[octave];
	const triggers = triggerData.triggers;
	return (
		<Keyboard>
			{notes.map((note, i) => {
				let color: string;
				switch (i) {
					case 1:
					case 3:
					case 6:
					case 8:
					case 10:
					case 13:
						color = 'black';
						break;
					default:
						color = 'white';
				}
				return (
					<Key
						key={note}
						frequency={note}
						color={color}
						{...(keyboardLetters && {
							trigger: triggers[i]
						})}
					/>
				)
			})}
		</Keyboard>
	)
}
