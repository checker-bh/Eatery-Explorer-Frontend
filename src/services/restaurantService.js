const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;

// Fetch all restaurants
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return res.json();
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};

// Fetch a specific restaurant by ID
const show = async (restaurantId) => {
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error("Failed to fetch restaurant");
    return res.json();
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return null;
  }
};

const deleter = async (restaurantId) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  
  };
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}`,options);
    if (!res.ok) throw new Error("Failed to delete restaurant");
    return res.json();
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return null;
  }
};


// Create a new restaurant
const getOwnerById = async (ownerId) => {
  try {
    const response = await fetch(`${BASE_URL}/owners/${ownerId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch owner");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching owner:", error);
  }
};

// Update an existing restaurant
const update = async (restaurantId, formData) => {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}`, options);
    if (!res.ok) throw new Error("Failed to update restaurant");
    return res.json();
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return null;
  }
};

const create = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  const res = await fetch(BASE_URL, options);

  return res.json();
};

const showFood = async (restaurantId, foodId) => {
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}/menu/${foodId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
// add food
const addFood = async (restaurantId, foodData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/${restaurantId}/menu`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(foodData),
  });

  if (!response.ok) throw new Error('Failed to add food'); 

  return response.json();
};

const updateFood = async (restaurantId, foodId, foodData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/${restaurantId}/menu/${foodId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(foodData),
  });

  if (!response.ok) throw new Error('Failed to update food');

  return response.json();
};

async function deleteFood(restaurantId, foodId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${restaurantId}/menu/${foodId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete food');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting food:', error);
    throw error;
  }
}

const like = async (restaurantId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${BASE_URL}/${restaurantId}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();  
    return data;  
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}





export default { index, show, create, getOwnerById, showFood, update, addFood, deleter, updateFood, deleteFood , like};