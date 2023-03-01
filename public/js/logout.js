async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'POST', // GET or POST?
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/'); // Is there a problem here?
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);