
let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected to server.');
});

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('LT');
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
        // let li = document.createElement('li');
    // let a = document.createElement('a');
    // a.setAttribute('target', '_blank');
    // li.innerText = `${message.from} ${formattedTime}`;

    // a.setAttribute('href', message.url);
    // a.innerText = 'My Current location ';
    // li.appendChild(a);

    // document.querySelector('body').appendChild(li);

    const div = document.createElement('div');
    div.innerHTML = html;

    document.querySelector('body').appendChild(div);
});

socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('LT');
    console.log("newLocationMessage", message);
    const template = document.querySelector('#location-message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });


    const div = document.createElement('div');
    div.innerHTML = html;

    document.querySelector('body').appendChild(div);
    // let li = document.createElement('li');
    // let a = document.createElement('a');
    // a.setAttribute('target', '_blank');
    // li.innerText = `${message.from} ${formattedTime}`;

    // a.setAttribute('href', message.url);
    // a.innerText = 'My Current location ';
    // li.appendChild(a);

    // document.querySelector('body').appendChild(li);
});


document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault();

socket.emit("createMessage", {
    from: "User",
    text:document.querySelector('input[name="message"]')
    .value
    }, () =>{

    })
});

document.querySelector("#send-location").addEventListener('click', (e) => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });

    }, () => {
        alert("Unable to fetch location.");
    });
});

