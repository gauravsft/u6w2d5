import React from "react";
import EmployeeForm from "./Form";
import MakeTable from "./Table";

export default function Main() {
  const [allEmployeData, setAllEmployeData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const [lastPage, setLastPage] = React.useState();

  const addEmployeToDataBase = async (employeData) => {
    try {
      await fetch(`http://localhost:7000/employeDetails`, {
        method: "POST",
        body: JSON.stringify(employeData),
        headers: { "Content-Type": "application/json" },
      });
      getEmployeData();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const getEmployeData = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        `http://localhost:7000/employeDetails?_page=${page}&_limit=3`
      );
      let res = await response.json();
      setAllEmployeData(res);
      let last = response.headers.get("X-Total-Count");
      setLastPage(Math.ceil(last / 3));
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  const handlePage = (value) => {
    setPage(page + value);
  };

  React.useEffect(() => {
    getEmployeData();
  }, [page]);

  return (
    <>
      <EmployeeForm addEmployeToDataBase={addEmployeToDataBase} />
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>Something went wrong</h1>
      ) : (
        <MakeTable
          allEmployeData={allEmployeData}
          handlePage={handlePage}
          page={page}
          lastPage={lastPage}
        />
      )}
    </>
  );
}