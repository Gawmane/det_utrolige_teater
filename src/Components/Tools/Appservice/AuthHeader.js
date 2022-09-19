export const authHeader = () => {
  // Conditional ternary operator  - hvis localstorge har en værdi så skal du sætte jasonparse eller tom string
  //Henter localstorge hvis den ekstitere 
  const currentToken = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : "";

  // Sender beare token ind i authheader hvis currentToken er sand 
  if (currentToken) {
    return {
      // Alle api og dommar kan tilgå den her - *=anything(asteristk)
      //"" da - betyder minus i js
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${currentToken.access_token}`,
    };
  } else {
    return {};
  }
}


