import { useEffect, useState } from "react";
import RequestTable from "./components/RequestTable";
import Bucket from "./components/Bucket";

const showRequest = async (currentBucket) => {
  let res = await fetch(`http://localhost:5000/b/${currentBucket}/inspect`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
};

const App = () => {
  let [bucketRequests, setBucketRequest] = useState([]);
  let [currentBucket, setCurrentBucket] = useState(null);

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
