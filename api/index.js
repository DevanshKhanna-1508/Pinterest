import axios from "axios";
 const API_KEY="43318491-aebdbae61eebf442cfc9a72b9";

 const apiURL=`https://pixabay.com/api/?key=${API_KEY}`;




 const formatUrl=(params)=>{
    let url=apiURL+"&per_page=25&safesearch=false&editor_choice=true"// need to add safesearch later for  non-adult content
    if(!params) return url;
    let paramKeys=Object.keys(params)
    paramKeys.map(key=>{
        let value=key=='q'?encodeURIComponent(params[key]): params[key];
        url+=`&${key}=${value}`;
    })
    // console.log(url);
    return url;
 }

 export const apicall=async(params)=>{
    try {
        const response=await axios.get(formatUrl(params));
        const{data}=response;
        return{succes:true,data};
    } catch (err) {
        console.log(err);
        return{succes:false,message:err};
    }
 }
 