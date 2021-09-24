import { useEffect, useState } from "react";
import RequestTable from "./components/RequestTable";
import Bucket from "./components/Bucket";
import io from "socket.io-client";

let socket;

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

  socket = io("http://localhost:5000/", { path: "/inspect" });
  socket.on("chat", async (bId) => {
    console.log("connected", bId);
    let requests = await showRequest(bId.bucketId);
    console.log("requests", requests);
    setBucketRequest(requests);
  });
  socket.on("dissconnect", () => {
    console.log("dissconnected");
  });
  console.log(currentBucket);
  // useEffect(() => {
  //   console.log("inside useEffect");
  //   if (!currentBucket) {
  //     setBucketRequest([]);
  //   }
  //   socket = io("http://localhost:5000/", { path: "/inspect" });
  //   socket.on("chat", async (bId) => {
  //     console.log("connected", bId);
  //     let requests = await showRequest(currentBucket);
  //     console.log("requests", requests);
  //     setBucketRequest(requests);
  //   });
  //   socket.on("dissconnect", () => {
  //     console.log("dissconnected");
  //   });
  // }, [currentBucket]);

  useEffect(() => {
    if (!currentBucket) {
      setBucketRequest([]);
      return;
    }
    const getRequest = async () => {
      let requests = await showRequest(currentBucket);
      console.log("requests", requests);
      setBucketRequest(requests);
    };

    getRequest();
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
