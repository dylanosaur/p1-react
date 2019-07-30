import axios from 'axios'


const patch = async(url:string, body:any) => { 
    let config:any = {
        // `url` is the server URL that will be used for the request
   
      
        // `method` is the request method to be used when making the request
        method: "patch",
      
        // `headers` are custom headers to be sent
        headers: {'X-Requested-With': 'XMLHttpRequest', },
      
  

        // `withCredentials` indicates whether or not cross-site Access-Control requests
        // should be made using credentials
        withCredentials: true, 
    }
    await axios.patch(url, body, config)
    return
}

export default patch