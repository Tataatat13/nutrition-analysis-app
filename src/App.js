import { useEffect, useState } from 'react';
import './App.css';
import LoaderPage from './LoaderPage';
import { Nutrition } from './Nutrition';
import Swal from 'sweetalert2';
import Foto from './fotoOne.jpg'

function App() {

  const [mySearch, setMySearch] = useState ();
  const [stateLoader, setStateLoader] = useState(false);
  const [myNutrients, setMyNutrients] = useState();
  const [wordSubmitted, setWordSubmitted]= useState('');

  const MY_ID ="f95060c6";
  const MY_KEY ="9c7ab5e63c6dd356af923e9a15cc3904";
  const APP_URL = "https://api.edamam.com/api/nutrition-details";

  const requestData = async (ingr) => {
    setStateLoader(true);
  const response = await fetch(`${APP_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingr: ingr})
  })
  if (response.ok) {
    setStateLoader(false);
    const data = await response.json();
    setMyNutrients(data);
  
  }
  else {
    setStateLoader(false);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter the correct ingridients",
    });
   }

}

const myRecipeSearch = e => {
  setMySearch(e.target.value);
}

const endSearch = e => {
  e.preventDefault();
  setWordSubmitted(mySearch)
}


useEffect(() =>{
  if (wordSubmitted !== '') {
    let ingr = wordSubmitted.split (/[,,;,\n\r]/);
    requestData (ingr);
  }
}, [wordSubmitted])

  return (
    <div className='App'>
          <div className='head'>
              <img className='foto' src={Foto} alt="foto"/>
              <div className='icons'>
              <img className='one' src='https://img.icons8.com/?size=100&id=DVIax78ExUe5&format=png&color=000000' alt="icon" width='50px'/>
              <img className='one'src='https://img.icons8.com/?size=100&id=ZKIz38iQL8IV&format=png&color=000000' alt="icon" width='50px'/>
              <img className='one' src='https://img.icons8.com/?size=100&id=vGqCV9FnnqWk&format=png&color=000000' alt="icon" width='50px'/>
              <img className='one' src='https://img.icons8.com/?size=100&id=58861&format=png&color=000000' alt="icon" width='50px'/>
              <img className='one' src='https://img.icons8.com/?size=100&id=W6lce1K0VJRN&format=png&color=000000'  alt="icon" width='50px'/>
              <img className='one' src='https://img.icons8.com/?size=100&id=648&format=png&color=000000' alt="icon" width='50px'/>
              </div>
              <h1>Nutrition Analysis</h1>
          </div>
          
        {stateLoader && <LoaderPage/>}
        <div className='center'>
          <h3>Good nutrition is the key to good mental and physical health!</h3>
        </div>
        
      <div className='box'>
        
        
        <form onSubmit={endSearch}>
          <h4>enter the ingredient</h4>
              <input
              placeholder='Search ...'
              onChange={myRecipeSearch}
              />
              
              <li className='example'>for example:</li>
              <li className='example'>
                1 banana 2 apples or
                1 glass of orange juice or
                1 tablespoon of olive oil
                </li>
              
              <button type='Submit'>Click here</button>
              {
          myNutrients && <p className='total'>Total calories - <em className='calories'>{myNutrients.calories} Kcal</em> </p>
          }
          </form>
        

        <div className='nutrients'>
        <h2>Nutrients:</h2>
        { myNutrients && Object.values(myNutrients.totalNutrients)
        .map(({label, quantity, unit}) => 
        <Nutrition 
        label={label}
        quantity={quantity.toFixed(1)}
        unit={unit}
        key={label}
        />
        )
        }
        </div>
    </div>
    <div >
      <img className='buttom' src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='fototwo'/>
    </div>
  </div>
  );
}

export default App;
