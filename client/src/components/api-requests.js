import axios from "axios";

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/`,
    withCredentials: true,
  }),
  profile() {
    return this.service
      .get("/profile")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error("Error connecting to mongo", err);
      });
  },

  ranking() {
    return this.service
      .get("/ranking-game")
      .then((score) => {
        console.log(score)
        return score;
      })
      .catch((err) => {
        console.error("Error connecting to mongo", err);
      });
  },
};
