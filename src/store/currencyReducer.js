export function currencyReducer(state, action) {
  switch (action.type) {
    case "UPDATE_SEND":
      return {
        ...state,
        send: {
          value: action.payload.value,
          currency: action.payload.currency,
        },
        receive: {
          ...state.receive,
          value: action.payload.value * action.payload.rate,
        },
      };

    case "UPDATE_RECEIVE_CURRENCY":
      return {
        ...state,
        receive: {
          currency: action.payload.currency,
          value: state.send.value * action.payload.rate,
        },
      };

    case "SWAP":
      return {
        ...state,
        send: state.receive,
        receive: state.send,
      };

    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.some(
        (item) =>
          item.send.currency === action.payload.send.currency &&
          item.receive.currency === action.payload.receive.currency,
      );

      return {
        ...state,
        favorites: exists
          ? state.favorites.filter(
              (item) =>
                !(
                  item.send.currency === action.payload.send.currency &&
                  item.receive.currency === action.payload.receive.currency
                ),
            )
          : [...state.favorites, action.payload],
      };
    }

    case "ADD_LOG": {
      return {
        ...state,
        log: [
          ...state.log,
          {
            send: state.send,
            receive: state.receive,
            rate: action.payload.rate,
            timestamp: Date.now(),
          },
        ],
      };
    }

    case "DELETE_LOG": {
      return {
        ...state,
        log: state.log.filter((entry) => entry.timestamp !== action.payload),
      };
    }

    default:
      return state;
  }
}
