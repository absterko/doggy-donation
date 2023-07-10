const BASE_URL = "https://frontend-assignment-api.goodrequest.dev/api/v1";

export const fetchAll = async () => {
  const res = await fetch(`${BASE_URL}/shelters`);
  return res.json();
};
