import axios from 'axios';

export function subscribe(subject, body, emailTo, username) {
    axios
        .post(`/subscriber/sendEmail`, { "subject": subject, "body": body, "emailTo": emailTo, "username": username })
        .then(response => {
            console.log(response.data);
        })
        .catch(() => {
            console.log("send email ERROR")
        });

}