import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { drawGrid } from './helpers';
import variables from '../../../../scss/abstracts/_shared.module.scss';
const { contrast, tabletBreak } = variables;

const Vas = styled.canvas`
	// display: none;
	// @media( min-width: ${tabletBreak} ) {
	// 	display: inline;
	// }
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

		drawGrid(context, width, columns);

	}, [])

	return (
		<Vas ref={canvasRef} width={width} height={height} />
	)
}

export default Canvas;