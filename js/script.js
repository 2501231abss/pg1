let movies = [];

window.onload = function()
{
    let storageMovies = localStorage.getItem("movies");

    if(storageMovies)
    {
        movies = JSON.parse(storageMovies);
    }
    displayMovies();

    let addBtn = document.getElementById("addBtn");

    addBtn.addEventListener("click", function(){

        let title = document.getElementById("title").value;
        let comment = document.getElementById("comment").value;
        let evaluation = Number(document.getElementById("evaluation").value);
        let da = new Date();
        let y = da.getFullYear();
        let m = da.getMonth() + 1;
        let d = da.getDate();
        let date = `${y}-${m}-${d}`;

        if(title === "")
        {
            alert("タイトルを入力してください。");
            return;
        }

        let movie = {
            date: date,
            title: title,
            comment: comment,
            evaluation: evaluation
        };

        movies.push(movie);
        console.log("配列", movies)
        saveMovies();

        displayMovies();

        document.getElementById("title").value = "";
        document.getElementById("comment").value = "";
    });
}

function displayMovies()
{
    let list = document.getElementById("list");
    list.innerHTML = "";

    movies.forEach(function(movie, index){
        let li = document.createElement("li");
        //映画タイ
        let titleP = document.createElement("h4");
        titleP.textContent = movie.title;

        //評価
        let evaSpan = document.createElement("p");
        let stars = "";

        if(movie.evaluation == 1)
        {
            stars = "★";
            console.log(movie.title + "評価★");
        }
        else if(movie.evaluation == 2)
        {
            stars = "★★";
            console.log(movie.title + "評価★★");
        }
        else if(movie.evaluation == 3)
        {
            stars = "★★★";
            console.log(movie.title + "評価★★★");
        }
        else if(movie.evaluation == 4)
        {
            stars = "★★★★";
            console.log(movie.title + "評価★★★★");
        }
        else if(movie.evaluation == 5)
        {
            stars = "★★★★★";
            console.log(movie.title + "評価★★★★★");
        }

        let colStars = "";

        for(let i = 0; i < stars.length; i++)
        {
            if(stars[i] === "★")
            {
                colStars += `<span class="star">★</span>`
            }
            else
            {
                colStars += stars[i];
            }
        }

        evaSpan.innerHTML = colStars;
        //感想
        let commentP = document.createElement("p");
        commentP.textContent = movie.comment;

        //日
        let dateSpan = document.createElement("span");
        dateSpan.textContent = movie.date;

        //削除
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";

        deleteBtn.addEventListener("click", function(){
            movies.splice(index, 1);
            saveMovies();
            displayMovies();
        });

        li.appendChild(titleP);
        li.appendChild(evaSpan);
        li.appendChild(commentP);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

function saveMovies()
{
    localStorage.setItem("movies", JSON.stringify(movies));
}