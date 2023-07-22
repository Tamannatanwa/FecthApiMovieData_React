import React, { useContext, useEffect, useState } from "react";
 
// `https://www.omdbapi.com/?s=${state}&apikey=addb359d`;
const Api_Url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
const AppContext = React.createContext("");

const AppProvider = ({ children }) => {
  const [isLoading,setIsLoading] = useState(true)
  const [movie,setMovie] = useState([])
  const [isError,setIsError] = useState({show:"false",msg:""})
  const [query , setQuery] = useState("Ram")
  const getMovies = async (url) => {
    try {
      let res = await fetch(url);
      const data = await res.json();
      if (data.Response==="True"){
        setIsLoading(false)
        setMovie(data.Search)
        setIsError({
          show:false,
          msg:"",
        })
      }
      else{
        setIsError({
          show:true,
          msg:data.Error,
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let timerout = setTimeout(()=>{
      getMovies(`${Api_Url}&s=${query}`);
    },500)
    return ()=>clearTimeout(timerout);
  }, [query]);
  return (
    <div>
      <AppContext.Provider value={{isLoading,isError,movie,query , setQuery}}>{children}</AppContext.Provider>
    </div>
  );
};

// Global Custom Hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider};











