document.getElementById('error-message').classList.add('d-none');

   /*search area*/
const loadSearch = ()=> {
    const searchInput = document.getElementById('input-filed');
    const searchText = searchInput.value;
    // clear data
    searchInput.value = '';
   
    //// when search empty then show this error message////

    if(searchText === ""){
      document.getElementById('error-message').classList.add('d-block');
      document.getElementById('error-message').classList.remove('d-none');
    }
    else{
      document.getElementById('error-message').classList.remove('d-block');
      document.getElementById('error-message').classList.add('d-none');
    }
    // API CALL
    const url = ` http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs))
}

   /* search result show on the display*/

const displaySearchResult = (books) => {
  
    const searchResult = document.getElementById('search-result');
    // clear data
    searchResult.textContent = "";

    // found Result
    if(books.length === 0){
      document.getElementById('error-message').classList.add('d-block');
      document.getElementById('error-message').classList.remove('d-none');
    }
    else{
      const foundResult = document.getElementById('found-result');
      foundResult.innerHTML = `
      Result Found ${books.length}
      `;
      // error
    document.getElementById('error-message').classList.remove('d-block');
 document.getElementById('error-message').classList.add('d-none');

        // result card

    books.forEach(book => {
        const detailesDiv = document.createElement('div');
        detailesDiv.classList.add('col');
        detailesDiv.innerHTML = `
        <div class="col">
                  <div class="card h-100">
                    <img height="200 px" src="https://covers.openlibrary.org/b/id/${book.cover_i? book.cover_i: "no image found"}-M.jpg" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Name: ${book.title}</h5>
                      <h6>Author : ${book.author_name}</h6>
                      <h6 class="card-text">1st Publish Date : ${book.first_publish_year}</h6>
                      
                    </div>
                  </div>
                </div>
        `;
        searchResult.appendChild(detailesDiv);
        
    });
}
}