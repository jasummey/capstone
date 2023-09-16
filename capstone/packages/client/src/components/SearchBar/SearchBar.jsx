import React from "react";


const SearchBar= ({value,isLoading,handleSubmit,onChange}) =>
{return (
    <div>
   <form onSubmit = {handleSubmit}>
    <input 
    value = {value}
    disabled ={isLoading}
    onChange={onChange}
    placeholder="Search By Name"
    className="form-control" />
    <input type="submit"
    disabled= {isLoading || !value}
    className="btn"
     value= "Search"/>
   </form>
    </div>)
}
export default SearchBar;