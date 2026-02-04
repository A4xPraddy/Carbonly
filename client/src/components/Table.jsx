import React from "react";

const Table = ({ data }) => {
  const types = {
    transport: "border-blue-400 bg-blue-400/20",
    food: "border-orange-400 bg-orange-400/20",
    energy: "border-green-400 bg-green-400/20",
  };

  const cols = ["Type", "SubType", "CO2 Emission", "Consumption", "Date"];
  return (
    data.length > 0 && (
      <div className="mt-12 w-full max-w-200 min-w-60  relative overflow-scroll">
        <table className="bg-white  rounded-md  w-full">
          <thead>
            <tr>
              {cols.map((e, i) => {
                return <th key={i}>{e}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => {
              return (
                <tr key={i}>
                  <td>
                    <div
                      className={`${types[e.type]} px-4 py-1 border rounded-full text-center`}
                    >
                      {e.type}
                    </div>
                  </td>
                  <td>{e.subType}</td>
                  <td>{e.co2}</td>
                  <td>{e.consumption}</td>
                  <td>{e.date.split("T")[0]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;
