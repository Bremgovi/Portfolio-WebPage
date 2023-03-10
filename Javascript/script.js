showDiv('div1');

// Get the navigation links and content sections
var navLinks = document.querySelectorAll('nav ul li a');
var contentSections = document.querySelectorAll('#content > div');

var navLinks = document.querySelectorAll('nav ul li a');
var container = document.querySelector('.main-container');

function showDiv(divId) {
  // Get all divs on the page
  var divs = document.getElementsByTagName('div');

  // Loop through each div and hide or show it based on the ID
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].id === divId) {
      // Show the selected div
      divs[i].style.display = 'block';
    } else if (divs[i].id === 'div1' || divs[i].id === 'div2') {
      // Hide div1 and div2
      divs[i].style.display = 'none';
    }
  }
}

function selectOption(option) {
  // Remove the "active" class from all options
  var options = document.querySelectorAll('nav ul li a');
  for (var i = 0; i < options.length; i++) {
    options[i].classList.remove('active');
  }

  // Add the "active" class to the selected option
  var selectedOption = document.querySelector('nav ul li:nth-child(' + option + ') a');
  selectedOption.classList.add('active');
}

//Acceder a la API
const token = process.env.TOKEN_KEY;
const images = [
  '../Media/icons/css.png',
  '../Media/icons/html.png',
  '../Media/icons/java.png',
  '../Media/icons/python.png',
  // ...
];

fetch(`https://api.github.com/user/repos`, {
  headers: {
    'Authorization': `token ${token}`
  }
})
  .then(response => response.json())
  .then(repos => {
    const reposContainer = document.querySelector('#repos-container');
    repos.forEach((repo,index) => {
      const repoContainer = document.createElement('div');
      repoContainer.classList.add('repo');
      
      const avatarImg = document.createElement('img');
      avatarImg.classList.add('repo-img');
      avatarImg.src = images[index % images.length]; // set the image URL based on index
      repoContainer.appendChild(avatarImg);

      // Add an event listener to the repoContainer element
      repoContainer.addEventListener('click', () => {
        window.location.href = repo.html_url;
      });
      const repoNameEl = document.createElement('h2');
      repoNameEl.textContent = repo.name;

      const repoDescEl = document.createElement('p');
      repoDescEl.textContent = repo.description;

      repoContainer.appendChild(repoNameEl);
      repoContainer.appendChild(repoDescEl);
      reposContainer.appendChild(repoContainer);
    });
  });

