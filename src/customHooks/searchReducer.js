function searchReducer(state, action) {
  switch (action.type) {
    case "SEARCH_ANIME":
      let stateCopy = [
        ...state,
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
      ];
      return stateCopy;

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export default searchReducer;
