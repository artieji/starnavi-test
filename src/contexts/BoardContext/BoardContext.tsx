import { Dispatch, createContext, memo, useContext, useEffect, useReducer } from "react";
import { BoardReducer, IState, TActions, initialState } from "./BoardReducer";
import { getSquareConfig } from "@src/services";
import { BoardActions } from ".";
import { ISquareConfig } from "@src/types";

const BoardStateContext = createContext<IState>(initialState);
const BoardDispatchContext = createContext<Dispatch<TActions>>(() => {});

export const useBoardState = () => {
	const ctx = useContext(BoardStateContext);

	if (ctx === undefined) throw new Error('useBoardState must be used within BoardProvider')

	return ctx;
}

export const useBoardDispatch = () => {
	const ctx = useContext(BoardDispatchContext);

	if (ctx === undefined) throw new Error('useBoardDispatch must be used within BoardProvider')

	return ctx;
}

export const BoardProvider = memo(({children}: {children: React.ReactNode}) => {
	const [state, dispatch] = useReducer(BoardReducer, initialState);

	useEffect(() => {
		// for requests better use some libs, but for quick implementation I'll use this simple example
		const fetch = async () => {
			const [err, data] = await getSquareConfig();

			// handle error
			if (err) return;

			// I got in response from request two options with id - 8, I fixed it to prevent React errors about to children with the same key
			const keepUniqueOptions = (arr: ISquareConfig[]) => {
				const uniqueIds = new Set();

				return arr.filter((item) => {
					if (!uniqueIds.has(item.id)) {
						uniqueIds.add(item.id);
						return true;
					}

					return false;
				});

			};
			
			const config = keepUniqueOptions(data);

			dispatch({type: BoardActions.SQUARE_CONFIG_UPDATE, payload: config})
		}

		fetch();
	}, [])

	return (
		<BoardStateContext.Provider value={state}>
			<BoardDispatchContext.Provider value={dispatch}>
				{children}
			</BoardDispatchContext.Provider>
		</BoardStateContext.Provider>
	)
})