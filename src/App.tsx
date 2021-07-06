import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [ name, setName ] = useState({})
  const { register, handleSubmit } = useForm();

  async function postData(url: string, data = {} ) {
    const request: RequestInit = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    };
    return fetch(url, request).then(response => response.json());
  }
  
  const onSubmit = (data: any) => {
    postData('http://localhost:8080/names', {
      tags: data.Tags,
      name: data.Name,
      address: data.Address,
      source: data.Source,
      description: data.Description,
    }).then(data => {
      setName(data);
      console.log("data: ", JSON.stringify(data.data, null, 2));
    });
  };

  return (
    <div className="App" style={{display: "grid", gridTemplateColumns: "1fr 20fr"}}>
      <div></div>
      <div>
        <h3>Add Name</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 4fr 5fr'}}>
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" value="0x1111111122222222333333334444444455555555" {...register("Address", {})} />
            <div></div>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" value="Junk" {...register("Name", {})} />
            <div></div>
            <label htmlFor="tags">Tags: </label>
            <input type="text" id="tags" value="33-Junk" {...register("Tags", {})} />
            <div></div>
            <label htmlFor="source">Source: </label>
            <input type="text" id="source" value="Junk" {...register("Source", {})} />
            <div></div>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" value="Junk Description" {...register("Description", {})} />
            <div></div>
            <div></div>
            <div>
              <br />
              <input type="submit" />
            </div>
          </div>
        </form>
        <br />
        <div style={{border: '1px solid black', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', width: '50%'}}>
        <div> </div>
        <pre style={{fontSize: '8pt'}}>{JSON.stringify(name, null, 2)}</pre>
        <div> </div>
        </div>
      </div>
    </div>
  );
}

export default App;
