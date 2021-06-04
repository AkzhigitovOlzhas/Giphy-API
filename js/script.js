function sendRequest() {
    let request = document.getElementById('search-form__input');
    let api_key = 'dhKdJPGvHEvathrKcK0WVQ3DCl4FPY0A';
    console.log(request.value);
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${request.value}&limit=32&offset=0&rating=g&lang=en`)
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
        if (data.data.length == 0) {
            console.log("Нечего не найдено");
            gifBox.classList.remove('gif-box');
            let notFound = document.createElement('h1');
            notFound.textContent = 'No results found :(';
            notFound.classList.add('not-found');
            gifBox.append(notFound);
        } else {
            gifBox.classList.add('gif-box');
            for (let i = 0; i < data.data.length; i++) {
                let gifItem = document.createElement('div');
                gifItem.classList.add('gif-box__item');
                let gif = document.createElement('img');
                gif.src = data.data[i].images.original.url;
                gif.setAttribute('height', '250px');
                gif.setAttribute('width', '100%');
                gifItem.append(gif);
                gifBox.append(gifItem);
                console.log(data.data[i].images.original.url);
            }
        }
    });
}