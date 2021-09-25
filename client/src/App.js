import { useEffect, useState } from "react";
import RequestTable from "./components/RequestTable";
import Bucket from "./components/Bucket";
import io from "socket.io-client";

let socket;

const App = () => {
  let [bucketRequests, setBucketRequest] = useState([]);
  let [currentBucket, setCurrentBucket] = useState(null);

  useEffect(() => {
    if (!currentBucket) {
      setBucketRequest([]);
      return;
    }
    let reqs = [];
    socket = io("http://localhost:5000/", {
      query: `bucketID=${currentBucket}`,
    });

    socket.on("chat", (arr) => {
      console.log("connected", arr);
      reqs = [...reqs, ...arr];
      setBucketRequest(reqs);
    });
  }, [currentBucket]);

  return (
    <div className="ui segments" style={{ padding: "20px" }}>
      <div class="ui teal center aligned basic segment huge header">
        Request Buckets
      </div>
      <Bucket setCurrentBucket={setCurrentBucket} />
      {bucketRequests.length !== 0 ? (
        <div>
          <RequestTable data={bucketRequests} />
        </div>
      ) : (
        <p>Ther are no requests</p>
      )}
    </div>
  );
};

export default App;
