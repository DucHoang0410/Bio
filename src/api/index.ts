import axios from 'axios';

export interface ResponseDataType<T> {
  code: number;
  msg: string | string[];
  info?: T;
}

async function returnResponseData(
  response: any,
  callback: () => void
): Promise<any> {
  if (response.data.code === -1001) {
    if (await refreshToken()) return;

    return await callback();
  }

  return response.data;
}

export async function postRequest(
  url: string,
  body?: any,
  type: 'form-data' | 'json' = 'json'
): Promise<any> {
  try {
    let response = await axios.post(
      process.env.REACT_APP_BASE_URL + '/api' + url,
      body,
      type === 'json'
        ? generateRequestHeader()
        : generateRequestFormDataHeader()
    );

    return returnResponseData(
      response,
      async () => await postRequest(url, body, type)
    );
  } catch (error: any) {
    return error?.response?.data;
  }
}

export async function patchRequest(
  url: string,
  body?: any,
  type: 'form-data' | 'json' = 'json'
): Promise<any> {
  try {
    let response = await axios.patch(
      process.env.REACT_APP_BASE_URL + '/api' + url,
      body,
      type === 'json'
        ? generateRequestHeader()
        : generateRequestFormDataHeader()
    );

    return returnResponseData(
      response,
      async () => await patchRequest(url, body, type)
    );
  } catch (error: any) {
    return error?.response?.data;
  }
}

export async function getRequest(url: string): Promise<any> {
  try {
    let response = await axios.get(
      process.env.REACT_APP_BASE_URL + '/api' + url,
      generateRequestHeader()
    );

    return returnResponseData(response, async () => await getRequest(url));
  } catch (error: any) {
    return error?.response?.data;
  }
}

export async function deleteRequest(url: string): Promise<any> {
  try {
    let response = await axios.delete(
      process.env.REACT_APP_BASE_URL + '/api' + url,
      generateRequestHeader()
    );

    return returnResponseData(response, async () => await deleteRequest(url));
  } catch (error: any) {
    return error?.response?.data;
  }
}

export function generateRequestHeader() {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  };
}

export function generateRequestFormDataHeader() {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  };
}

export async function refreshToken() {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + '/api/cms/auth/refreshToken',
      {
        refreshToken: localStorage.getItem('refreshToken'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.code === 200) {
      localStorage.setItem('accessToken', await response.data.info);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('uid');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      window.location.href = '/login?';
      return true;
    }
  } catch (error) {}
}
