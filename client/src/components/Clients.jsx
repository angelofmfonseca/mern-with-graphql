import { gql, useQuery } from "@apollo/client";
// import ClientRow from "./components/ClientRow";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong :(</p>;

  return (
    <>
      {!loading && !error && (
        <div>
          <h2>Clients</h2>
          <table className='table table-hover table-striped mt-3'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                // <ClientRow key={client.id} client={client} />
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Clients;
