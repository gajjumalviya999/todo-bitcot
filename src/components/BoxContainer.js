import React,{useEffect,useState} from 'react';
import '../css/boxContainer.css';

const BoxContainer=()=>{
    const [data, setdata] = useState([]);
    const [state, setstate] = useState("");
    const [action,setaction]=useState("Add Task");  
    const saveValue=(event)=>{
        setstate(event.target.value);
    }
    const deleteItem=(ind)=>{
        const filterdData= data.filter((item,index)=>{
            return ind !== index;
        });
        setdata(()=>{ return filterdData});
        localStorage.setItem("localdata",JSON.stringify(filterdData));
     }
     const completeItem=(ind)=>{
        setdata((olddata)=>{ 
          const olddatanew= olddata!=null?olddata.map((item,index)=>{
                if(ind==index){
                  if(item.completeStatus) 
                    return {
                            ...item,
                            "completeStatus":false
                        }
                   else 
                    return {
                        ...item,
                        "completeStatus":true
                }
                }
                else
                    return item;
            }
           ):[];
           localStorage.setItem("localdata",JSON.stringify(olddatanew));
           return olddatanew;
        }
        )};
     const progressItem=(ind)=>{
        setdata((olddata)=>{ 
            const olddatanew= olddata!=null?olddata.map((item,index)=>{
                  if(ind==index){
                    if(item.inProgressStatus) 
                      return {
                              ...item,
                              "inProgressStatus":false
                          }
                     else 
                      return {
                          ...item,
                          "inProgressStatus":true
                  }
                  }
                  else
                      return item;
              }
             ):[];
             localStorage.setItem("localdata",JSON.stringify(olddatanew));
             return olddatanew;
            })
     }
     const editItem=(item,index)=>{
        if(state===""||state.trim()==="")
            {   
                setstate(item.content);
                setaction("Edit");
                deleteItem(index);
            }
        else {
            alert("Add or remove the task of input field first ")
        }
     }
    const getFormData=(event)=>{
        event.preventDefault();
        if(state !== "" && state.trim()!=="")
            {  
                setdata((olddata)=>{ 
                const olddatanew=olddata!=null?[...olddata]:[];
                olddatanew.unshift({
                    "content":state,
                    "completeStatus":false,
                    "inProgressStatus":false
                });
                localStorage.setItem("localdata",JSON.stringify(olddatanew));
                return olddatanew;
               });
               
            }
         else if(state.length!==0 && state.trim()===""){
            alert("Only White Spaces Not Allowed");
        }  
        setstate("");
        setaction("Add Task");
        localStorage.setItem("localdata",JSON.stringify(data)); 
    };
   useEffect(() => {
      setdata(JSON.parse(localStorage.getItem("localdata")))
   }, []);
   
      return(
        <React.Fragment>  
            <div className="box-container">
            <div className="AddEventContainer">
                    <form id="form" onSubmit={getFormData}>
                        <div className="text">
                            <input type="text" id="eventInputtext" placeholder="Enter Task" value={state} onChange={saveValue}  />
                        </div>
                        <div className="submitbtn">
                            <input type="submit" id="submitbtn" value={action}/>
                        </div>
                    </form>
                </div>
                <div className="List">
                    <ul id="listUl">
                        {   
                            data!=null?data.map((item,index)=>{
                                return(     
                                    <li key={index} className={item.completeStatus?"completedClass":item.inProgressStatus?"progressClass":""}>
                                        <div>
                                            <p>{item.content}</p>
                                        </div>
                                        <div>
                                        <button className="editbtn" onClick={()=>editItem(item,index)}>Edit</button>
                                        <button className="completedbtn" onClick={()=>completeItem(index)}>Completed</button>
                                        <button className="progressbtn" onClick={()=>progressItem(index) } disabled={item.completeStatus?true:false}>In Progress</button>
                                        <button className="deletebtn" onClick={()=>deleteItem(index)}>Delete</button>
                                        </div>
                                    </li>    
                            )
                            }):<></>
                        }
                    </ul>
                </div>
            </div>
        </React.Fragment>
        );
    
}
export default BoxContainer;