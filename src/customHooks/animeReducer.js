function animeReducer(state, action) {
  switch (action.type) {
    case "LOAD_ANIMES":
      let items = localStorage.getItem("list");
      if (items) {
        const parsedItems = JSON.parse(items);
        return parsedItems;
      } else {
        return [...state];
      }

    case "ADD_ANIME":
      let stateCopy = [
        {
          name: action.anime.name,
          genre: action.anime.genre,
          url: action.anime.url,
          aid: action.anime.aid,
          rating: action.anime.rating,
          episodes: action.anime.episodes,
          date: action.anime.date,
          description: action.anime.description,
          banner: action.anime.banner,
          nextEpisode: action.anime.nextEpisode,
          id: action.anime.id,
        },
        ...state,
      ];
      localStorage.setItem("list", JSON.stringify(stateCopy));
      return stateCopy;

    case "REMOVE_ANIME":
      let newStateCopy = state.filter((object) => object.id !== action.id);
      localStorage.setItem("list", JSON.stringify(newStateCopy));
      return newStateCopy;

    default:
      return state;
  }
}

export default animeReducer;
