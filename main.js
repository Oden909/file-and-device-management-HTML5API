document.querySelector('.file-input').addEventListener('change', function(){
    const files = this.files;
    const  fileArea = document.querySelector('.file-area');
    fileArea.innerHTML = '';
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            fileArea.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

const dropZone = document.querySelector('.drop-zone');
const dragfileArea = document.querySelector('.drag-file-area');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#0056b3';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = '#333';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if(files.length === 0){
        alert('Файлы не обнаружены');
        return;
    }
    dragfileArea.innerHTML = '';
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e){
            const img = document.createElement('img');
            img.src = e.target.result;
            dragfileArea.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

document.querySelector('.get-location-btn').addEventListener('click', () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            document.querySelector('.location-output').textContent = 
                `Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`;
        }, () => {
            document.querySelector('.location-output').textContent = 
                'Невозможно получить местоположение.';
        });
    } 
    else{
        document.querySelector('.location-output').textContent = 'Geolocation не поддерживается вашим браузером.';
    }
});

const video = document.querySelector('.video');
const canvas = document.querySelector('.photo-canvas');
document.querySelector('.capture-photo-btn').addEventListener('click', async () => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
        document.querySelector('.capture-photo-btn').textContent = 'Сделать снимок';
        document.querySelector('.capture-photo-btn').onclick = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            canvas.style.display = 'block';
            video.style.display = 'none';
            stream.getTracks().forEach(track => track.stop());
        };
    } 
    catch(err){
        alert('Ошибка при доступе к камере: ' + err.message);
    }
});
