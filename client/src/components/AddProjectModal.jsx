import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/project";
import { GET_CLIENTS } from "../queries/client";
import { GET_PROJECTS } from "../queries/project";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }
    addProject(name, description, status, clientId);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return null;

  if (error) {
    return "Something went wrong";
  }

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <span>New Project</span>
            </div>
          </button>

          <div
            className='modal fade'
            id='addProjectModal'
            tabIndex='-1'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1 className='modal-title fs-5' id='addProjectModalLabel'>
                    New Project
                  </h1>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor='name' className='form-label'>
                        Name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        aria-describedby='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='description' className='form-label'>
                        Description
                      </label>
                      <textarea
                        className='form-control'
                        id='description'
                        aria-describedby='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='status' className='form-label'>
                        Status
                      </label>
                      <select
                        name='status'
                        id='status'
                        value={status}
                        className='form-select'
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='clientId' className='form-label'>
                        Client
                      </label>
                      <select
                        name='clientId'
                        id='clientId'
                        value={clientId}
                        className='form-select'
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className='btn btn-primary'
                      type='submit'
                      data-bs-dismiss='modal'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
