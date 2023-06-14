export const fetchResource = async (id) => {
  const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  const data = await response.json();
  return data;
};

export const saveResource = async (id, name) => {
  // Faux appel à l'API d'enregistrement
  try {
    const response = await fetch('https://api.imaginaire.com/save', {
      method: 'POST',
      body: JSON.stringify({ id, name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'enregistrement');
    }

  
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de l\'enregistrement');
  }
};
