const RequestTable = ({ data }) => {
  const formateRequestHeaders = (headers) => {
    let result = [];
    let headersObject = JSON.parse(headers);
    result = Object.keys(headersObject).map((key) => {
      return [key, headersObject[key]];
    });
    console.log(result);
    return result;
  };

  return (
    <div className="ui segment">
      <table className="ui celled teal table">
        <thead>
          <tr>
            <th>Request Type</th>
            <th>Request Headers</th>
            <th>Request Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((req, index) => (
            <tr key={index}>
              <td>{req.RequestType}</td>
              <td>
                <div className="ui list">
                  {formateRequestHeaders(JSON.stringify(req.Header)).map(
                    (header, index) => {
                      return (
                        <div key={index} class="item">
                          <b>{header[0] + ": "}</b>
                          {header[1]}
                        </div>
                      );
                    }
                  )}
                </div>
              </td>
              <td>{req.Body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
