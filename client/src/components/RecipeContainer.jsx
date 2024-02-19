import React from "react";
import Card from "./Card";


export default function RecipeContainer({data}){

  if(data === undefined) return(<h1>no saved data</h1>);
  // debugger;

  return(<div className="flex flex-wrap justify-left gap-14 mx-16 p-12">
    {
      data.map((item, index) => (
        <Card key={index} foodName={item.name} timeTaken={item.total_time} imageUrl={item.image} id={item.id}/>
      ))
  }
  </div>
  );
}