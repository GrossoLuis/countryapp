const initialState = {
  countries: [],
  allCountries: [],
  countryDetail: [],
  activities: [],
};

function rootReducer(state = initialState, action) {
  const allContinents = state.allContinents;
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
        allContinents: action.payload,
      };
    case "SEARCH_COUNTRY":
      return {
        ...state,
        countries: action.payload,
      };
    case "COUNTRY_DETAIL":
      return {
        ...state,
        countryDetail: action.payload,
      };
    case "POST_ACTIVITY":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case "ORDERBYNAME":
      let sortedArr =
        action.payload === "Ascendant"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };
    case "ORDERBYPOPU":
      let sortedArr2 =
        action.payload === "Descendant population"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr2,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "FILTER_ACT":
      const all = state.allCountries;
      const filter = all.filter((c) => {
        let countryAct = c.activities.map((el) => el.name);
        return countryAct.includes(action.payload) ? c : null;
      });
      return {
        ...state,
        countries: filter,
      };
    case "FILTER_COUNTRIES_BY_CONTINENT":
      const statusFilter =
        action.payload === "All"
          ? allContinents
          : allContinents.filter(
              (country) => country.continent === action.payload
            );
      return {
        ...state,
        countries: statusFilter,
      };

    default:
      return state;
  }
}
export default rootReducer;
