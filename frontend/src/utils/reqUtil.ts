import axios from "axios";

type FetchConfig = {
  method: string;
  url: string;
  data?: object | undefined;
  headers?: object | undefined;
}

export default async function reqUtil(method: string, url: string, body?: object) {
  const fetchConfig: FetchConfig = {
    method,
    url,
  }
  if (body && (method !== "GET" && method !== "DELETE")) {
    fetchConfig.data = body;
    fetchConfig.headers = { 'Content-Type': 'application/json' }
  };
  const { status, data } = await axios(fetchConfig);
  return { status, data };

}