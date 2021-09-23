import { useEffect, useState } from "react";
import RequestTable from "./components/RequestTable";
import Bucket from "./components/Bucket";
import io from "socket.io-client";

const showRequest = async (currentBucket) => {
  let res = await fetch(`http://localhost:5000/b/${currentBucket}/inspect`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
};

const socket = io("http://localhost:5000", {
  path: "/",
});
const App = () => {
  let [bucketRequests, setBucketRequest] = useState([]);
  let [currentBucket, setCurrentBucket] = useState(null);

  socket.emit("chat", { bucketRequests });
  // socket.disconnect();
  useEffect(() => {
    if (!currentBucket) return;
    const getBucketRequests = async () => {
      let requests = await showRequest(currentBucket);
      setBucketRequest(requests);
    };
    getBucketRequests();
  }, [currentBucket]);

  return (
    <div style={{ margin: "20px" }}>
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
