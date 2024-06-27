import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import variables from '../../../../scss/abstracts/_shared.module.scss';
import { drawGrid } from './helpers';
const { tabletBreak } = variables;

const Vas = styled.canvas<{width: number, height: number}>`
	max-width: 100%;
	image-rendering: pixelated;

	@media (min-width: ${tabletBreak}) {
		width: calc(${props => props.width}px * 2);
		height: calc(${props => props.height}px * 2);
		object-fit: contain;
	}
`;

interface ICanvas {
	width: number
	height: number
	columns: number
}

const Canvas: React.FC<ICanvas> = (props) => {
	const { columns, width, height } = props;
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {

		if ( ! canvasRef.current ) {
			return;
		}

		const canvas = canvasRef.current
		const context = canvas.getContext('2d')

		if ( ! context ) {
			return;
		}

		context.fillStyle = '#87ceeb';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		context.save();

		drawGrid(context, width, height, columns);

	}, [])

	return (
		<Vas ref={canvasRef} width={width} height={height} />
	)
}

export default Canvas;