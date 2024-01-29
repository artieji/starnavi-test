import { ISquareConfig } from "@src/types";
import { BoardActions } from "./actions";

export interface IState {
	activeSquares: string[],
	pickedMode: string | null;
	squareConfig: ISquareConfig[];
}

export const initialState = {
	activeSquares: [],
	pickedMode: null,
	squareConfig: []
}

export type TActions = 
	{type: typeof BoardActions.SQUARE_CONFIG_UPDATE, payload: ISquareConfig[]} | 
	{type: typeof BoardActions.PICKED_MODE_UPDATE, payload: string} |
	{type: typeof BoardActions.ADD_ACTIVE_SQUARE, payload: string} |
	{type: typeof BoardActions.DELETE_ACTIVE_SQUARE, payload: string}

export const BoardReducer = (state: IState = initialState, action: TActions) => {
	switch(action.type) {
		case BoardActions.SQUARE_CONFIG_UPDATE: {
			return {...state, squareConfig: action.payload}
		}
		case BoardActions.PICKED_MODE_UPDATE: {
			return {...state, pickedMode: action.payload, activeSquares: []}
		}
		case BoardActions.ADD_ACTIVE_SQUARE: {
			const activeSquares = [...state.activeSquares, action.payload]

			return {...state, activeSquares}

		}
		case BoardActions.DELETE_ACTIVE_SQUARE: {
			const activeSquares = state.activeSquares.filter((item) => item !== action.payload)

			return {...state, activeSquares}

		}
		default: {
			return state
		}
	}
}