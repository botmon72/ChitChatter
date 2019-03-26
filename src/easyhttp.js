class EasyHTTP {

  //get
  async get(url){
    const response = await fetch(url);
    const dataRes = await response.json();
    return dataRes;
  }

  //post
  async post(url, data){
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })

    const dataRes = await response.json();
    return dataRes;
  }

  //put
  async put(url, data){
    const response = await fetch(url, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })

    const dataRes = await response.json();
    return dataRes;
  }

  //delete
  async delete(url){
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {'Content-type' : 'application/json'}
    })

    const dataRes = await `${url} removed`;

    return dataRes;
  }
}

export const http = new EasyHTTP();