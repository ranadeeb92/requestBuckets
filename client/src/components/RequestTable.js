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
    <div>
      <h1>Simple Table</h1>
      <table>
        <thead>
          <tr>
            <th>Request Type</th>
            <th>Request Body</th>
            <th>Request Header</th>
          </tr>
        </thead>
        <tbody>
          {data.map((req, index) => (
            <tr key={index}>
              <td>{req.RequestType}</td>
              <td>
                {formateRequestHeaders(JSON.stringify(req.Header)).map(
                  (header, index) => {
                    return (
                      <div>
                        <tr>
                          <th>{header[0]}</th>
                          <td>{header[1]}</td>
                        </tr>
                      </div>
                    );
                  }
                )}
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
