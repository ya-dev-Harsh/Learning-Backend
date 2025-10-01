document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('resetBtn');
    const bandNameH1 = document.getElementById('bandName');
  
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        bandNameH1.innerHTML = '<h1>Click the button below ⬇️ to generate band name</h1>';
      });
    }
  });
  