interface requestProps {
  url: string;
  method?: string;
  body?: object;
  withAuth?: boolean;
}

export async function request({ url, method, body }: requestProps): Promise<any> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const options: RequestInit = { method, headers };
  const hasBody = !!body;
  if (hasBody) {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options);
}

interface fetchHolidaiesProps {
  year: string;
  month: string;
}

export function fetchHolidaies({ year, month }: fetchHolidaiesProps) {
  const url = `/getRestDeInfo`;
  const apiKey = process.env.REACT_APP_API_KEY;
  const requestUrl = `${url}?serviceKey=${apiKey}&solYear=${year}&solMonth=${month}&pageNo=1&numOfRows=100`;
  return request({ url: requestUrl, method: "GET" });
}
