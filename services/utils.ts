"use server";
const BASE_URL = "https://vapi.vnappmob.com";
export const fetcherProvince = async (url: string) =>
  fetch(`${BASE_URL}/api${url}`).then((response) => {
    return response.json();
  });
