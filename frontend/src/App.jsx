import { useState } from "react";

function App() {

  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [questions, setQuestions] = useState([]);

  const [selected, setSelected] = useState([]);


  // Search Questions
  const searchQuestions = async () => {


    let url =
      `http://localhost:8000/questions?company=${company}&category=${category}&difficulty=${difficulty}`;


    const response = await fetch(url);

    const data = await response.json();


    setQuestions(data);

  };


  // Checkbox selection
  const selectQuestion = (id)=>{

    if(selected.includes(id))
    {
      setSelected(
        selected.filter(item=>item!==id)
      );
    }
    else
    {
      setSelected([
        ...selected,
        id
      ]);
    }

  };


  // Download JSON
  const downloadQuestions = async()=>{


    const response = await fetch(
      "http://localhost:8000/download",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(selected)
      }
    );


    const blob = await response.blob();


    const url = window.URL.createObjectURL(blob);


    const link=document.createElement("a");

    link.href=url;

    link.download="questions.json";

    link.click();

  };



return (

<div>


<h1>
AI Interview Question Generator
</h1>



<h3>Search Questions</h3>


<input
placeholder="Company"
value={company}
onChange={
(e)=>setCompany(e.target.value)
}
/>


<input
placeholder="Category"
value={category}
onChange={
(e)=>setCategory(e.target.value)
}
/>



<input
placeholder="Difficulty"
value={difficulty}
onChange={
(e)=>setDifficulty(e.target.value)
}
/>


<button onClick={searchQuestions}>
Search
</button>



<hr/>


<h2>
Results
</h2>



{
questions.map(q=>(

<div key={q.id}>

<input
type="checkbox"
onChange={()=>selectQuestion(q.id)}
/>


<b>{q.title}</b>

<br/>

Company:
{q.companies.join(",")}

<br/>

Category:
{q.category}

<br/>

Difficulty:
{q.difficulty}


<hr/>

</div>


))
}




<button
onClick={downloadQuestions}
disabled={selected.length===0}
>

Download Selected JSON

</button>



</div>

);

}


export default App;