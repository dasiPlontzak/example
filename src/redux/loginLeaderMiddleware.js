import { actions } from './actions';

export const extractJwt = ({ dispatch, getState }) => (next) => (action) => {

  if (action.type === 'EXTRACT_JWT') {
    let params = (new URL(document.location)).searchParams;
    let userName = (window.location.pathname.split('/')[2]);
    console.log('userName: ', userName);
    dispatch(actions.setUserName(userName));
    let jwtGlobal =  params.get('jwt');
    if (jwtGlobal) {
      let newUrl = window.location.href
      newUrl = newUrl.split('?jwt=')
      newUrl = newUrl[0]
      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      var expires = "expires=" + date;
      document.cookie = "devJwt" + "=" + jwtGlobal + ";" + expires + ";path=/";
      window.location.replace(newUrl)
    }
  }
  return next(action);
}