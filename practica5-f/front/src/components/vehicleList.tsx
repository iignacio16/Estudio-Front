import { VehiclesConnection } from "@/types";

const VehicleList = ({ data }: { data?: VehiclesConnection }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Total Vehicles: {data.totalCount}</h3>
      <br />
      <h4>Vehicles: </h4>
      <br />
      <ul>
        {data.vehicles.map((v) => (
          <li key={v.name}>
            <p>Cost: {v.costInCredits}</p>
            <p>Name: {v.name}</p>
            <p>Model: {v.model}</p>
            <p>Length: {v.length}</p>
            <p>Passengers: {v.passengers}</p>
            <p>Capacity: {v.cargoCapacity}</p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
