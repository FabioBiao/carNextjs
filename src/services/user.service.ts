import Router from 'next/router';

const baseUrl = process.env.NODE_ENV +'/api/users';

export function login({email, password}) {
    console.log(email, password);
    
    return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}