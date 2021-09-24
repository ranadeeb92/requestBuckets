import { useState, useEffect } from "react";

const Bucket = ({ setCurrentBucket }) => {
  let [bucketInput, setBucketInput] = useState("");
  let [validBucket, setvalidBucket] = useState(false);

  useEffect(() => {
    if (bucketInput) {
      checkBucketValidation(bucketInput);
    }
  }, [bucketInput]);

  const craeteBucket = async () => {
    let res = await fetch("http://localhost:5000/", { method: "POST" });
    let data = await res.json();
    setBucketInput(data.bucketId);
  };

  const checkBucketValidation = (value) => {
    if (value.length === 8) {
      setCurrentBucket(bucketInput);
      setvalidBucket(true);
    } else {
      setvalidBucket(false);
      setCurrentBucket(null);
    }
  };

  return (
    <div>
      <div className="ui placeholder segment">
        <div className="ui two column stackable center aligned grid">
          <div className="ui vertical divider">Or</div>
          <div className="middle aligned row">
            <div className="column">
              <div className="ui icon header">
                <i className="search icon"></i>
                Inspect Your Bucket
              </div>
              <div className="field">
                <div className="ui search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Inspect bucket requests..."
                      onChange={(e) => setBucketInput(e.target.value)}
                      value={bucketInput}
                    />
                    <i className="search icon"></i>
                  </div>
                  <div className="results"></div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui icon header">
                <i className="bitbucket icon"></i>
                Create New Bucket
              </div>
              <div className="ui teal button" onClick={craeteBucket}>
                Create
              </div>
            </div>
          </div>
        </div>
      </div>
      {validBucket ? (
        <div className="ui segment">
          <h3 className="ui centered header">{`http://localhost:5000/b/${bucketInput}`}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Bucket;
