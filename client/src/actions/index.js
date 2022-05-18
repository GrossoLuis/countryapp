import axios from 'axios';

export function getCountries(){
    return async function(disptach){

        const json = await axios.get ('http://localhost:3001/countries');
        return disptach({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }

}

export function searchCountryName(country) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/countries?name=${country}`);
        return dispatch({
          type: "SEARCH_COUNTRY",
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  
export function getCountryDetail(id){
  return async function(dispatch){
      try{
          var detail = await axios.get(`http://localhost:3001/countries/${id}`);
          return dispatch({
              type: 'COUNTRY_DETAIL',
              payload: detail.data
          })
      } catch(error) {
        console.log(error)
      }
    }
}
export function getActivities() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/activities`);
      return dispatch({
        type: "GET_ACTIVITIES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/activity`, payload);
      return dispatch({
        type: "POST_ACTIVITY",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderName(payload) {
  return {
    type: "ORDERBYNAME",
    payload,
  };
}


export function orderByPopu(payload) {
  return {
    type: "ORDERBYPOPU",
    payload,
  };
}

export function filterActivity(payload){
  return {
      type: "FILTER_ACT",
      payload
  }
}
export function filterCountriesByContinent(payload) {
  return {
    type: "FILTER_COUNTRIES_BY_CONTINENT",
    payload,
  };
}