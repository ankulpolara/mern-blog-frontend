const  getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log("Value", value);
    const parts = value.split(`; ${name}=`);
    console.log("parts" , parts);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  

  export default getCookie ;    