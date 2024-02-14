import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCatsFetch } from './catState';


function App() {
  const cats = useSelector(state => state.cats.cats);
  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(getCatsFetch());
  },[dispatch]);

  console.log("cats",cats);
 
  return (
    <div className="App" data-testid='checker' >
      <h1>Cat Species Gallery</h1>
      <p>Images of different species of cats for your viewing pleasure.</p>
      <br />
      <div className='Gallery'>
        {
          Object.keys(cats).map((item, i)=>(
            <div key={i} className='row'>
              <div className='column column-left'>
                {
                <img
                  alt='' 
                  src={cats[item].url}
                  width='200'
                  height='200'
                />  }
              </div>
              <div className='column column-right'>
                <h2>{cats[item].name}</h2>
                <h5>Temperament: {cats[item].temperament}</h5>
                <p>{cats[item].description}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
