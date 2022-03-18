import { types } from "../types/types";

export const commentsReducer = (state = [], action) => {
	switch (action.type) {
		case types.commentsLoad:
			return [...action.payload];

		case types.commentsVoteAdd:
		case types.commentsVoteRemove:
			return [
				...state.map((comment) =>
					comment.id === action.payload.id
						? {
								...comment,
								usersWhoVoted: action.payload.usersWhoVoted,
						  }
						: comment
				),
			];

		case types.commentsAndOpinionsLoad:
			return [...state];

		case types.commentsCleanLogout:
			return [];

		default:
			return state;
	}
};
