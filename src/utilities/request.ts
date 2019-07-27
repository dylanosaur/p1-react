
const request = async (httpMethod: string, url: string, body = '') => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let response = await fetch(url, {
      method: httpMethod,
      mode: 'cors',
      redirect: 'follow',
      credentials: 'include', // Don't forget to specify this if you need cookies
      headers: headers,
      body: body
    })
    // read stream of data
    let data = await response.json();
    console.log(`retrieve ${url} with method ${httpMethod} gives results:`);
    console.log(data);
    return data
}

export default request;