import { memo } from "react";
import { ISquareConfig } from "@src/types";

import css from './style.module.css';
import { SquareItem } from "./SquareItem";

const boardSizes = [5, 5];

export const Squares = memo(({mode, squaresConfig, handleSquareMouseEnter, handleSquareMouseLeave, activeSquares}: {mode: string, squaresConfig: ISquareConfig[], handleSquareMouseEnter: (arg0: string) => void, handleSquareMouseLeave: (arg0: string) => void, activeSquares: string[]}) => {
	const activeConfig = squaresConfig.find((item) => mode === item.id);
	const rows = Array.from({length: boardSizes[0]});
	const elementsInRow = Array.from({length: boardSizes[1]});

	if (!activeConfig) return null;
	
	return (
		<div className={css.wrapper} style={{width: boardSizes[1] * activeConfig.field + 1, height: boardSizes[0] * activeConfig.field + 1}}>
			{rows.map((_, rowIndex) => {
				return elementsInRow.map((_, columnIndex) => (
					<SquareItem key={[rowIndex, columnIndex].join('.')} size={activeConfig.field} id={[rowIndex, columnIndex].join('.')} handleSquareMouseEnter={handleSquareMouseEnter} handleSquareMouseLeave={handleSquareMouseLeave} isSquareActive={activeSquares.includes([rowIndex, columnIndex].join('.'))} />
				))
			})}
		</div>
	)
})