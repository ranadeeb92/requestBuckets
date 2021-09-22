import { useState } from "react";
import "./App.css";

const App = () => {
  let [bucket, setBucket] = useState("");
  let [bucketRequests, setBucketRequest] = useState([]);

  const craeteBucket = async () => {
    let res = await fetch("http://localhost:5000/", { method: "POST" });
    let data = await res.json();
    setBucketRequest([]);
    setBucket(data.bucketId);
  };

  const showRequest = async () => {
    let res = await fetch(`http://localhost:5000/b/${bucket}/inspect`, {
      method: "GET",
    });
    let data = await res.json();
    setBucketRequest(data);
  };

  return (
    <div>
      <button onClick={craeteBucket}>Create bucket</button>
      <br />
      {bucket !== "" ? (
        <div>
          <p>{`http://localhost:5000/b/${bucket}`}</p>
          <br />
        </div>
      ) : null}

      <label>BucketId:</label>
      <input
        type="text"
        onChange={(e) => setBucket(e.target.value)}
        value={bucket}
      />
      <button onClick={showRequest}>Show Requests on My bucket</button>

      {bucketRequests.length !== 0 ? (
        <div>
          {bucketRequests.map((req, index) => {
            return (
              <div key={index}>
                <p>Headers: {JSON.stringify(req.Header)}</p>
                <p>Body: {req.Body}</p>
                <p>RequestType:{req.RequestType}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Ther are no requests</p>
      )}
    </div>
  );
};

export default App;
