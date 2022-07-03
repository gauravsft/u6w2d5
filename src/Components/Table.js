import React from "react";

export default function MakeTable({
  allEmployeData,
  handlePage,
  page,
  lastPage,
}) {
  return (
    <div id="tableDiv">
      <h2 style={{ marginTop: "30px" }}>Employe Details</h2>
      <table id="Table">
        <thead>
          <tr>
            <th className="tr">Id</th>
            <th className="tr">Name</th>
            <th className="tr">Age</th>
            <th className="tr">Department</th>
            <th className="tr">Married</th>
            <th className="tr">Salary</th>
            <th className="tr">Address</th>
          </tr>
        </thead>
        <tbody>
          {allEmployeData.map((item) => {
            return (
              <tr key={item.id}>
                <td className="tr">{item.id}</td>
                <td className="tr">{item.name}</td>
                <td className="tr">{item.age}</td>
                <td className="tr">{item.department}</td>
                <td className="tr">{item.isMarried ? "Yes" : "No"}</td>
                <td className="tr">{item.salary}</td>
                <td className="tr">{item.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => handlePage(-1)} disabled={page === 1}>
        PREV
      </button>
      <button onClick={() => handlePage(1)} disabled={page === lastPage}>
        NEXT
      </button>
    </div>
  );
}