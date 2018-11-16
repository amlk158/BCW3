'use strict';

// HTML contains element 'message'. This is used to show the server's response
// Select it and save it as a variable/object

// make function 'upload' which
// - prevents the form from sending
// - writes 'Upload in progress...' into 'message' element
// - selects the file input field
// - makes FormData -object and adds the file selected byt the user into the object
// - send the file to the same url as in task a by using fetch -method
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted
const img = document.getElementById('img');
const message = document.getElementById('message');
const input = document.querySelector('input[type="file');
const submit = document.querySelector('input[type="submit"]');

const upload = async (e) => {
    e.preventDefault();

    message.innerText = 'Uploading to the server ...';

    const formData = new FormData();

    formData.append('image', input.files[0]);

    const setting = {
        method: 'POST',
        body: formData,
    };

    const response = await fetch('http://localhost:3000/file', setting);
    const data = await response.json();

    console.log(data);

    if (data.imgPath) {
        message.innerText = 'file load successfully';
        createLink(data.imgPath);
        img.setAttribute('src', `${data.imgPath}`)
    } else {
        message.innerText = data.message
    }


    // fetch('http://localhost:3000/file', setting).then(res => res.json()).then(e => {
    //     console.log(e.imgPath)
    //     if (e.imgPath) {
    //         message.innerText = 'file load successfully';
    //         img.setAttribute('src', `${e.imgPath}`)
    //     } else {
    //         message.innerText = 'Cannot load the picture'
    //     }
    //
    // });

};

const createLink = (url) => {
    const link = document.createElement("a");
    link.innerText = 'Click to download';
    link.setAttribute('href', url);
    document.body.appendChild(link)
};

submit.addEventListener('click', upload);