function animeReducer(state, action) {
  switch (action.type) {
    case "LOAD_ANIMES":
      const items = localStorage.getItem("list");
      if (items) {
        const parsedItems = JSON.parse(items);
        for (const parsedItem of parsedItems) {
          state.push(parsedItems);
        }
      }

      return state;

    case "ADD_ANIME":
      return [
        ...state,
        {
          name: action.anime.name,
          genre: action.anime.genre,
          url: action.anime.url,
          aid: action.anime.aid,
          rating: action.anime.rating,
          id: Date.now(),
        },
      ];
    case "REMOVE_ANIME":
      return state.filter((object) => object.id !== action.id);
    default:
      return state;
  }
}

export default animeReducer;
