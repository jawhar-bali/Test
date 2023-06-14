import React, { useState, useEffect } from 'react';
import { useParams,Link  } from 'react-router-dom';
import axios from 'axios';
import './ResourceDetailPage.css';
import { Button } from '@mui/material';


const ResourceDetailPage = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  const handleSave = () => {
    axios
      .post('https://api.imaginaire.com/save', {
        id: resource.id,
        name: resource.name,
      })
      .then(response => {
        console.log('Ressource sauvegardée avec succès !');
      })
      .catch(error => {
        console.log('Erreur lors de la sauvegarde de la ressource :', error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://api.punkapi.com/v2/beers/${id}`)
      .then(response => {
        setResource(response.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!resource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="resource-detail-container">
      <h1 className="resource-detail-title">{resource.name}</h1>
      <div className="resource-detail-card">
        <div className="resource-detail-image">
          {resource.image_url && <img src={resource.image_url} alt={resource.name} />}
        </div>
        <div className="resource-detail-content">
          <div className="resource-detail-info">
            <div className="resource-detail-field">
              <p className="resource-detail-label">Tagline:</p>
              <p className="resource-detail-value">{resource.tagline}</p>
            </div>
            <div className="resource-detail-field">
              <p className="resource-detail-label">First Brewed:</p>
              <p className="resource-detail-value">{resource.first_brewed}</p>
            </div>
            <div className="resource-detail-field">
              <p className="resource-detail-label">Description:</p>
              <p className="resource-detail-value">{resource.description}</p>
            </div>
            <div className="resource-detail-field">
            <p className="resource-detail-label">ABV:</p>
            <p className="resource-detail-value">{resource.abv}</p>
          </div>
          <div className="resource-detail-field">
            <p className="resource-detail-label">IBU:</p>
            <p className="resource-detail-value">{resource.ibu}</p>
          </div>
          <div className="resource-detail-field">
            <p className="resource-detail-label">Attenuation Level:</p>
            <p className="resource-detail-value">{resource.attenuation_level}</p>
          </div>
          <div className="resource-detail-field">
            <p className="resource-detail-label">Contributed By:</p>
            <p className="resource-detail-value">{resource.contributed_by}</p>
          </div>
          </div>
        </div>
      </div>
      <Button
  variant="contained"
  color="primary"
  onClick={handleSave}
  className="resource-detail-save-button"
>
  Sauvegarder
</Button>

          <Link to="/" className="resource-detail-button">Retour à la liste des ressources</Link>
    </div>
  );
};

export default ResourceDetailPage;
