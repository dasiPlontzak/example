import axios from 'axios';
// import keys from '../config/keys';

export function updateFavorite({ userId, newFavorite }) {
    axios
        .post(`/users/updateFavoriteFieldById`, { "userId": userId, "newFavorite": newFavorite })
        .then(response => {
            console.log("response.data  SUCCESS FAVORITTTTEEE");
        })
        .catch(() => {
            console.log("send email ERROR")
        });

}