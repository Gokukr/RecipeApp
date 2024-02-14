import React from "react";
import Card from "./Card";


export default function RecipeContainer({data}){

  return(<div className="flex flex-wrap justify-left gap-14 mx-16 p-12">
    {
      data.map((item, index) => (
        <Card key={index} {...item}/>
      ))
  }
  </div>
  );
}