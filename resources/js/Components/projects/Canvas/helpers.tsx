export const getCellDimensions = ( width: number, columns: number ) => {
	return width / columns;
}

const drawColumns = ( context: CanvasRenderingContext2D, width: number, height: number, factor: number ) => {
	for ( let i = 0; i <= width; i += factor ) {
		context.moveTo(i, 0);
    	context.lineTo(i, height);
	}
}

const drawRows = ( context: CanvasRenderingContext2D, width: number, height: number, factor: number ) => {
	for ( let i = 0; i <= height; i += factor ) {
		context.moveTo(0, i);
    	context.lineTo(width, i);
	}
}

export const drawGrid = ( context: CanvasRenderingContext2D, width: number, height: number, columns: number ) => {
	const factor = getCellDimensions(width, columns);
	drawColumns(context, width, height, factor);
	drawRows(context, width, height, factor);
	context.lineWidth = 1;
	context.stroke();
}
