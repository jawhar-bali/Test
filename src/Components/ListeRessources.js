import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListResources.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import '@mui/material/styles';


const ListResources = () => {
  const [resources, setResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(20);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://api.punkapi.com/v2/beers')
      .then(response => {
        setResources(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  

  const totalPages = Math.ceil(resources.length / resourcesPerPage);


  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = resources.slice(
    indexOfFirstResource,
    indexOfLastResource
  );
  

  const goToPage = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = event => {
    const selectedCriteria = event.target.value;
    if (selectedCriteria === sortCriteria) {
      setSortCriteria(null);
    } else {
      setSortCriteria(selectedCriteria);
    }
  };

  useEffect(() => {
    let sortedResources = [...resources];
    if (sortCriteria === 'name') {
      sortedResources.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === 'first_brewed') {
      sortedResources.sort((a, b) => a.first_brewed.localeCompare(b.first_brewed));
    } else if (sortCriteria === 'tagline') {
      sortedResources.sort((a, b) => a.tagline.localeCompare(b.tagline));
    }
    setResources(sortedResources);
  }, [sortCriteria]);
  

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredResources = currentResources.filter(resource => {
    return (
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tagline.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Resources</h1>
      <div>
  <FormControl variant="outlined" sx={{ marginRight: '1rem' }}>
    <InputLabel id="sortSelect-label">Trier par :</InputLabel>
    <Select
  labelId="sortSelect-label"
  id="sortSelect"
  value={sortCriteria || ''}
  onChange={handleSortChange}
  label="Trier par"
  startAdornment={<Search />}
>
  <MenuItem value="">None</MenuItem>
  <MenuItem value="name">Name</MenuItem>
  <MenuItem value="first_brewed">First Brewed</MenuItem>
  <MenuItem value="tagline">Tagline</MenuItem> // Nouvelle option
</Select>

  </FormControl>
  <TextField
    id="searchInput"
    label="Search"
    type="text"
    value={searchTerm}
    onChange={handleSearch}
    variant="outlined"
    InputProps={{
      startAdornment: <Search />,
    }}
  />
</div>

      <table className="resource-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tagline</th>
            <th>First Brewed</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.map(resource => (
            <tr key={resource.id}>
              <td>
                <Link to={`/resources/${resource.id}`}>
                  {resource.name}
                </Link>
              </td>
              <td>{resource.tagline}</td>
              <td>{resource.first_brewed}</td>
              <td>{resource.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        
        {currentPage > 1 && (
          <button onClick={() => goToPage(currentPage - 1)}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => goToPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default ListResources;
