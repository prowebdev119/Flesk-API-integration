function searchAPI() {
    let keyword = document.getElementById("idMedia").value.replace(" ", "%20");
    let service = document.getElementById("idService").value
    let type = (document.getElementById("idMovie").checked) ?
                document.getElementById("idMovie").value :
                document.getElementById("idShow").value;

    let apiKey = "tKNnbtMEiOUld3sEN6XGf4Nd93P96kid";
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=" + service + "&type=" + type + "&keyword=" + keyword + "&output_language=en",
        // "url": "https://api.flixed.io/v1/streaming-providers?apiKey=" + apiKey,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
            "x-rapidapi-key": "ab64c10c89mshab8c24dd2d9c5f7p1676f4jsne83727335602"
        }
    };

    $.ajax(settings).done(async function (response) {
        // console.log(settings.url)
        const responseArr = parseAPIResponse(response);
        printResponse(responseArr);
    });
}

function parseAPIResponse(response) {
    return JSON.parse(response)
}

function printResponse(responseArr) {
    // responseArr.forEach(response => console.log(response))
    // console.log(responseArr.results[0].originalTitle)
    // responseArr.results.forEach(result => console.log(result));
    // responseArr.results.forEach(result => console.log(result.originalTitle + ": " + result.imdbID));
    // responseArr.results.forEach(result => console.log(getFlixedData(result.imdbID.slice(2))));

    const { results } = responseArr;

    results.map(async (item) => {
        const { imdbID } = item;
        const newId = imdbID.slice(2);
        await getFlixedData(newId);
    })
}

async function getFlixedData(imdbID) {
    let type = (document.getElementById("idMovie").checked) ? "movies" : "shows";
    return new Promise(resolve => {
        let url = "https://api.flixed.io/v1/shows/1837492?idType=imdb&apiKey=tKNnbtMEiOUld3sEN6XGf4Nd93P96kid";
        console.log(url);

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "GET",
            "headers": [{ "Access-Control-Allow-Origin": "*"}, 
                {"Access-Control-Allow-Headers":"Content-Type,Authorization"},
                { "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"}, 
                { "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"},
                {"Access-Control-Allow-Credentials":"true"}
            ]
        };

        $.ajax(settings).done(async function (response) {
            console.log(response);
        });
    });
}
