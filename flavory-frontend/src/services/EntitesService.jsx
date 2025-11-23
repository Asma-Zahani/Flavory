const getEntities = async (label) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${label}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: 'include'
  }); 
  
  return response;
};

const getEntity = async (label, _id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${label}/${_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: 'include'
  });
  return response;
};
  
const createEntity = async (label, formData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${label}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
    credentials: 'include'
  });

  return response;
};

const updateEntity = async (label, _id, formData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${label}/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
    credentials: 'include'
  });

  return response;
};
  
const deleteEntity = async (label, _id, formData) => {
  const url = _id ? `${process.env.NEXT_PUBLIC_API_URL}/${label}/${_id}` : `${process.env.NEXT_PUBLIC_API_URL}/${label}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
    credentials: 'include'
  });

  return response;
};

export { getEntities, getEntity, createEntity, updateEntity, deleteEntity };