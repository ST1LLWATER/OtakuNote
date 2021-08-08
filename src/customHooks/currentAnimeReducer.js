function animeReducer(state, action) {
  switch (action.type) {
    case "ADD_ANIME":
      let stateCopy = [
        ...state,
        {
          name: action.anime.name,
          genre: action.anime.genre,
          url: action.anime.url,
          id: action.anime.aid,
          rating: action.anime.rating,
          episodes: action.anime.episodes,
          date: action.anime.date,
          // id: Date.now(),
        },
      ];
      return stateCopy;
  }
}

export default animeReducer;
