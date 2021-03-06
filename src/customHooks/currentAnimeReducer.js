function animeReducer(state, action) {
  switch (action.type) {
    case "ADD_ANIME":
      let stateCopy = [
        ...state,
        {
          name: action.anime.name,
          genre: action.anime.genre,
          url: action.anime.url,
          aid: action.anime.aid,
          rating: action.anime.rating,
          description: action.anime.description,
          episodes: action.anime.episodes,
          date: action.anime.date,
          banner: action.anime.banner,
          nextEpisode: action.anime.nextEpisode,
          // id: Date.now(),
        },
      ];
      return stateCopy;

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export default animeReducer;
