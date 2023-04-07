import { getToken } from './authenticate';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function addToFavourites(id) {
  const token = await getToken();
  try {
    const response = await fetch(`${apiUrl}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });
    if (response.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function removeFromFavourites(id) {
  const token = await getToken();
  try {
    const response = await fetch(`${apiUrl}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });
    if (response.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFavourites() {
  const token = await getToken();
  try {
    const response = await fetch(`${apiUrl}/favourites`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });
    if (response.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addToHistory(id) {
  const token = await getToken();
  try {
    const response = await fetch(`${apiUrl}/history/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });
    if (response.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function removeFromHistory(id) {
  const token = await getToken();
  try {
    const response = await fetch(`${apiUrl}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });
    if (response.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getHistory() {
  const token = await getToken();
  try {
    const response = await fetch(`${apiUrl}/history`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });
    if (response.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
