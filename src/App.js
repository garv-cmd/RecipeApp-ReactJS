import React,{useEffect,useState} from 'react';
import "./App.css";
import Recipe from './Recipe';
const App = ()=>{
  const APP_ID = "1e0fc60e";
  const APP_KEY = "c01cd732bae645b59c6f84d8dd4b6924";

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState("Chicken");

  useEffect(()=>{
    getRecipe();
  },[query]);

  const getRecipe = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = e=>{
    setSearch(e.target.value);
  };

  const getSearch =e=>{
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
          <form className="search-form" onSubmit = {getSearch}>
            <input className="search-bar" type="text" onChange = {updateSearch} value = {search}></input>
            <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">{recipes.map(recipe=>(
        <Recipe title={recipe.recipe.label} calories = {recipe.recipe.calories}
        image = {recipe.recipe.image} key={recipe.recipe.label} ingredients={recipe.recipe.ingredients}
         />
      ) )}</div>
    </div>
  );
}

export default App;
