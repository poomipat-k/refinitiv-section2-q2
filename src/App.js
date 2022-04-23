import { useState, useEffect } from 'react';

import styles from './App.module.css';

const API_ENDPOINT = 'https://api.publicapis.org/categories';

function App() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');

  const onChangeFilterHandler = e => {
    setFilterText(e.target.value);
  }

  const renderFilterTable = (allData, filter) => {
    if (allData && allData.length === 0) return;
    if (filterText === '') {
      return allData.map(row => (
        <tr key={row}>
          <td>{row}</td>
        </tr>
      ))
    }
    return allData.filter(row => row.toLowerCase().includes(filter.toLowerCase())).map(row => (
      <tr key={row}>
        <td>{row}</td>
      </tr>
    ))
  };

  // Effect to fetch data when component is mount
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const json = await response.json();
        setData(json?.categories);
      } catch (error) {
        console.error(error.message);
        setData([]);
      }
    })()
  }, [])

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={filterText}
        onChange={onChangeFilterHandler}
      />
      <table>
        <tbody>
          {renderFilterTable(data, filterText)}
        </tbody>
      </table>

    </div>
  );
}

export default App;
