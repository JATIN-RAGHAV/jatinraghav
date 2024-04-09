const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

var count = 0;
var text = document.getElementById('text');
setInterval(function() {
    if(count%2 === 0){
        text.innerHTML = 'Will make it better in due time.';
    }
    else{
        text.innerHTML = 'Working on it in realTime.';
    }
    count++;
}, 2* 1000);