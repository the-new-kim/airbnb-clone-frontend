import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getRooms = async () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = async ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;

  return instance.get(`rooms/${roomPk}/`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews/`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get("users/me/").then((response) => response.data);

export const logout = () =>
  instance
    .post("users/logout/", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken"),
      },
    })
    .then((response) => response.data);

export const githubLogin = (code: string) =>
  instance
    .post(
      "users/github/",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken"),
        },
      }
    )
    .then((response) => response.status);
