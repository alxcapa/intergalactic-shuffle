import axios from "axios";

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/`,
    withCredentials: true,
  }),
  profile() {
    return this.service
      .get("/game/profile")
      .then((response) => {
        console.log(response)
        return response.data;
      })
      .catch((err) => {
        console.error("Error connecting to mongo", err);
      });
  },

  ranking() {
    return this.service
      .get("/game/ranking-game")
      .then((score) => {
        console.log(score)
        return score;
      })
      .catch((err) => {
        console.error("Error connecting to mongo", err);
      });
  },

  stats() {
    return this.service
      .get("/game/stats")
      .then((resp) => {
        console.log(resp)
        return resp;
      })
      .catch((err) => {
        console.error("Error connecting to mongo", err);
      });
  },
  game(high_score, object_one, object_two, object_three, user_ref) {
    return this.service.post('/game/game', {
      high_score,
      object_one,
      object_two,
      object_three,
      user_ref

    })
      .then(response => response.data)
  },




};
