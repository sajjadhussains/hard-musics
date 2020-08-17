
    document.getElementById("searchButton").addEventListener("click",function(){
    const searchValue = document.getElementById('search').value;
    fetch('https://api.lyrics.ovh/suggest/' + searchValue)
    .then(response => response.json())
    .then(data => findLyrics(data))
    function findLyrics(info){

        for (let i = 0; i <  10; i++) {
            const songTitle = info.data[i].title;
            const songTitleElement = document.createElement('strong');
            const songTitleName = songTitleElement.innerHTML = songTitle;

            const artistName = info.data[i].artist.name;
            let artistNameElement = document.createElement('span');
                artistNameElement = artistName.innerHTML = artistName;
                
            const paragraph = document.createElement('p');
                paragraph.innerHTML = '';
                paragraph.innerHTML += `<div class = "lyrics-info">
                                            <div class="search-result col-md-8 mx-auto">
                                                <div class="single-result row align-items-center my-3 p-3">
                                                    <div class="col-md-9">
                                                        <h3 class="lyrics-name"> ${songTitleName}</h3>
                                                        <p class="author lead">Album by <span>${artistNameElement}</span></p>
                                                    </div>
                                                    <div class="col-md-3 text-md-right text-center">
                                                        <button  class="btn btn-success get-lyrics">Get Lyrics</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        ` 
            const parent = document.getElementById('song');
            parent.appendChild(paragraph);


           fetch('https://api.lyrics.ovh/v1/' + artistName + '/' + songTitle + '/')
           .then( res => res.json())
           .then( data => lyricsName(data))


           function lyricsName(info){
               const lyrics = info.lyrics;
               const parentElement = document.getElementById('lyrics');


               const lyricsText = document.createElement('p');
                  lyricsText.innerHTML += ` <div class="single-lyrics text-center lyric">
                                                <h2 class="text-success mb-4 song-title">${songTitle}</h2>
                                                <pre class="lyrics-text text-white"> ${lyrics} </pre>
                                            </>`;
              parentElement.appendChild(lyricsText);
           }

            const buttons = document.getElementsByClassName('get-lyrics');
            
            buttons[i].onclick = function(){
                const lyric = document.querySelectorAll('.lyric')[i];
                const parent = document.querySelectorAll('.lyrics-info')[i];
                parent.appendChild(lyric);
                lyric.style.display = 'block';
            }
        }
               
    }  
    document.getElementById('search').value = '';
})

  

