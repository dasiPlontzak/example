
export const getJwtFromCookie = (key) => {
	return  document.cookie!==""?document.cookie.split(",").filter(s => s.includes(key))[0].split("=").pop():null; 
}