// Gestiona mascotas en adopción y seguimiento usando localStorage

document.addEventListener('DOMContentLoaded', () => {
    const petList = document.getElementById('pet-list');
    const adoptedList = document.getElementById('adopted-list');
    const addPetButton = document.getElementById('add-pet-button');
    const addPetForm = document.getElementById('add-pet-form');

    let pets = JSON.parse(localStorage.getItem('pets')) || [
        {
            name: 'Luna',
            age: '2 años',
            breed: 'Labrador',
            color: 'Negro',
            sex: 'Hembra',
            health: 'Vacunada y esterilizada',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-SGDEYRyUbUFmCZ8tvCS63J2Ghk7QR2z6A&s'
        },
        {
            name: 'Milo',
            age: '1 año',
            breed: 'Mestizo',
            color: 'Blanco y naranja',
            sex: 'Macho',
            health: 'Vacunado, no esterilizado',
            image: 'https://blog.terranea.es/wp-content/uploads/2022/12/perros-marrones-blancos.jpg'
        },
        {
            name: 'Bella',
            age: '3 años',
            breed: 'Pastor Alemán',
            color: 'Café y negro',
            sex: 'Hembra',
            health: 'Vacunada, requiere dieta especial',
            image: 'https://placebeahttps://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Pastor_aleman_a.jpg/960px-Pastor_aleman_a.jpgr.com/200/200'
        }
    ];

    let adoptedPets = JSON.parse(localStorage.getItem('adoptedPets')) || [];

    function savePets() {
        localStorage.setItem('pets', JSON.stringify(pets));
    }

    function saveAdopted() {
        localStorage.setItem('adoptedPets', JSON.stringify(adoptedPets));
    }

    function renderPets() {
        petList.innerHTML = '';
        pets.forEach((pet, index) => {
            const card = document.createElement('div');
            card.className = 'pet-card';
            card.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <ul>
                    <li>Edad: ${pet.age}</li>
                    <li>Raza: ${pet.breed}</li>
                    <li>Color: ${pet.color}</li>
                    <li>Sexo: ${pet.sex}</li>
                    <li>Salud: ${pet.health}</li>
                </ul>
                <button data-index="${index}" class="adopt-btn">Adoptar</button>
            `;
            petList.appendChild(card);
        });

        document.querySelectorAll('.adopt-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const i = e.target.getAttribute('data-index');
                const pet = pets.splice(i, 1)[0];
                const adoptionDate = new Date().toLocaleDateString('es-ES');
                const status = prompt('Estado actual (Saludable/En tratamiento/Desconocido):', 'Desconocido') || 'Desconocido';
                adoptedPets.push({ ...pet, adoptionDate, status });
                savePets();
                saveAdopted();
                renderPets();
                renderAdopted();
            });
        });
    }

    function renderAdopted() {
        adoptedList.innerHTML = '';
        adoptedPets.forEach(pet => {
            const card = document.createElement('div');
            card.className = 'pet-card';
            card.innerHTML = `
                <h3>${pet.name}</h3>
                <ul>
                    <li>Raza: ${pet.breed}</li>
                    <li>Sexo: ${pet.sex}</li>
                    <li>Fecha de adopción: ${pet.adoptionDate}</li>
                    <li>Estado actual: ${pet.status}</li>
                </ul>
            `;
            adoptedList.appendChild(card);
        });
    }

    addPetButton.addEventListener('click', () => {
        addPetForm.classList.toggle('hidden');
    });

    addPetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPet = {
            name: document.getElementById('pet-name').value,
            age: document.getElementById('pet-age').value + ' años',
            breed: document.getElementById('pet-breed').value,
            color: document.getElementById('pet-color').value,
            sex: document.getElementById('pet-sex').value,
            health: document.getElementById('pet-health').value,
            image: document.getElementById('pet-image').value
        };
        pets.push(newPet);
        savePets();
        addPetForm.reset();
        addPetForm.classList.add('hidden');
        renderPets();
    });

    renderPets();
    renderAdopted();
});
