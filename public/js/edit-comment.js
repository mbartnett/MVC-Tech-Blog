async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('Trying to update comment')
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-comment-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete').addEventListener('click', deleteFormHandler);