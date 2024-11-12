document.addEventListener('DOMContentLoaded', () => {
    animateImages();
});

function animateImages() {
    // Board image animation
    const boardImg = document.getElementById('boardImg');
    const rightImg = document.getElementById('rightImg');
    const leftImg = document.getElementById('leftImg');

    // Show board image
    setTimeout(() => {
        boardImg.style.transform = 'translateY(0)';
    }, 100);

    // Show right image
    setTimeout(() => {
        rightImg.style.transform = 'translateX(0px)';
        rightImg.style.opacity = '1';
    }, 1200);

    // Show left image
    setTimeout(() => {
        leftImg.style.transform = 'translateX(50px)';
        leftImg.style.opacity = '1';
    }, 2200);

    // Trigger fade-up animation for sections
    setTimeout(() => {
        const sections = document.querySelectorAll('.menu-section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('fade-up');
            }, index * 100);
        });
        window.location.href = "#";
    }, 3200);
}

function toggleSection(sectionId, containerId) {
    const container = document.getElementById(containerId);
    container.classList.toggle('expanded');

    const section = document.getElementById(sectionId);
    if (container.classList.contains('expanded')) {
        section.classList.add('expanded-section');
    } else {
        section.classList.remove('expanded-section');
    }
}

fetch('../data/sodaMenu.json')
    .then(response => response.json())
    .then(data => {
        const menuContainer = document.getElementById('sodaMenu');
        data.menu.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            sectionDiv.id = section.section.replace(/\s+/g, '') + 'Section';

            const header = document.createElement('h2');
            header.className = 'menu-header';
            header.textContent = section.section;
            header.onclick = () => toggleSection(sectionDiv.id, sectionDiv.id + 'Container');
            sectionDiv.appendChild(header);

            const itemContainer = document.createElement('div');
            itemContainer.className = 'menu-item-container';
            itemContainer.id = sectionDiv.id + 'Container';

            section.items.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';

                const itemName = document.createElement('div');
                itemName.className = 'item-name';
                itemName.textContent = item.name;

                const itemPrice = document.createElement('div');
                itemPrice.className = 'menu-item-price';
                itemPrice.textContent = `₹${item.price}`;

                menuItem.appendChild(itemName);
                menuItem.appendChild(itemPrice);
                itemContainer.appendChild(menuItem);
            });

            sectionDiv.appendChild(itemContainer);
            menuContainer.appendChild(sectionDiv);
        });

        // Trigger animations after content is loaded
        setTimeout(animateImages, 100);
    })
    .catch(error => console.error('Error loading menu data:', error));