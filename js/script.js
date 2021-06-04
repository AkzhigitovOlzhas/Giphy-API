function sendRequest() {
    let request = document.getElementById('search-form__input');
    let api_key = 'dhKdJPGvHEvathrKcK0WVQ3DCl4FPY0A';
    console.log(request.value);
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${request.value}&limit=25&offset=0&rating=g&lang=en`)
        .then(createGyph)
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
           
} 

function createGyph(response) {
    if (response.status !== 200) {
        console.log('Status Code: ' +
            response.status);
        return;
    }

    response.json().then(function (data) {
        let gifBox = document.getElementById('gifBox');

        while (gifBox.firstChild) {
            gifBox.removeChild(gifBox.firstChild);
        }

        for (let i = 0; i < data.data.length; i++) {
            let gifItem = document.createElement('div');
            gifItem.classList.add('gif-box__item');
            let gif = document.createElement('img');
            gif.src = data.data[i].images.original.url;
            gifItem.append(gif);
            gifBox.append(gifItem);
            console.log(data.data[i].images.original.url);
        }
    });
}

