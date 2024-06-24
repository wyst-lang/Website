import { useEffect, useState } from 'react'
import { useTheme } from 'nextra-theme-docs';
import styles from './Grid.module.css';

const Packages = () => {
  const theme = useTheme().theme;
  const isDark = theme!== "light";
  const [CurrentSearchQuery, setCurrentSearchQuery] = useState('');
  const [currentSearch, setCurrentSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = async (value) => {
    if (value === "") {setCurrentSearch([]);return;}
    // https://pms-xdib.onrender.com
    const response = await fetch(`https://pms-xdib.onrender.com/search/${value}/${currentPage}`);
    const data = await response.json();
    if (data && data.items) {
      if (data.items.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        return;
      }
      const items = data.items.map((item, i) => {
        return (
          <div className={isDark ? styles.gridItem : styles.gridItemLight} key={i}>
            <h1 className={styles.pkgTitle}>{item.name}</h1>
            <h4 className={styles.pkgVersion}>{item.latest}</h4>
          </div>
        )
      });
      setCurrentSearch(items);
    }
  };

  const filters = <input type="text" className={styles.searchBox} placeholder='Search packages' onChange={(event) => {setCurrentSearchQuery(event.target.value)}} />;

  const handlePrevClick = () => {
    setCurrentPage(prev => prev > 1 ? prev-1 : prev);
  };
  const handleNextClick = () => {
    setCurrentPage(prev => prev+1);
  };

  useEffect(() => {
    const ac = setTimeout(() => {handleSearchChange(CurrentSearchQuery)}, 600);
    return () => {
      clearTimeout(ac);
    }
  }, [CurrentSearchQuery]);

  useEffect(() => {
    const ac = setTimeout(() => {handleSearchChange(CurrentSearchQuery)}, 100);
    return () => {
      clearTimeout(ac);
    }
  }, [currentPage]);
  

  return (
    <>
      {filters}
      <div>
        <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${3}, 1fr)` }}>
          {currentSearch}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "20px" }}>
        <button className={isDark ? styles.pageBtn : styles.pageBtnLight} onClick={handlePrevClick} style={{marginRight: "20px"}}>{"<"}</button>
        <button className={isDark ? styles.pageBtn : styles.pageBtnLight} onClick={handleNextClick}>{">"}</button>
      </div>
    </>
  );
};

export default Packages;