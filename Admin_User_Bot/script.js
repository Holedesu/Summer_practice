document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const userList = document.getElementById('user-list');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    let timeout = null;

    const users = [
        { id: "1", name: "Alice", avatarUrl: "https://placehold.co/40x40" },
        { id: "2", name: "Bob", avatarUrl: "https://placehold.co/40x40" },
        { id: "3", name: "Charlie", avatarUrl: "https://placehold.co/40x40" },
        { id: "4", name: "David", avatarUrl: "https://placehold.co/40x40" },
        { id: "5", name: "Frank", avatarUrl: "https://placehold.co/40x40" },
        { id: "6", name: "Grace", avatarUrl: "https://placehold.co/40x40" },
        { id: "7", name: "Hannah", avatarUrl: "https://placehold.co/40x40" },
        { id: "8", name: "Ivy", avatarUrl: "https://placehold.co/40x40" },
        { id: "9", name: "Jack", avatarUrl: "https://placehold.co/40x40" },
        { id: "10", name: "James", avatarUrl: "https://placehold.co/40x40" },
        { id: "11", name: "Jared", avatarUrl: "https://placehold.co/40x40" },
        { id: "12", name: "Mark", avatarUrl: "https://placehold.co/40x40" },
        { id: "13", name: "Mable", avatarUrl: "https://placehold.co/40x40" },
        { id: "14", name: "Kate", avatarUrl: "https://placehold.co/40x40" },
        { id: "15", name: "Grace", avatarUrl: "https://placehold.co/40x40" },
        { id: "16", name: "Ganna", avatarUrl: "https://placehold.co/40x40" },
        { id: "17", name: "Sam", avatarUrl: "https://placehold.co/40x40" },
        { id: "18", name: "Ash", avatarUrl: "https://placehold.co/40x40" }

    ];

    let currentPage = 1;
    const usersPerPage = 5;
    let filteredUsers = users;

    searchBar.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const searchTerm = searchBar.value.toLowerCase();
            filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm)
            );
            currentPage = 1;
            displayUsers();
        }, 300);
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            displayUsers();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage * usersPerPage < filteredUsers.length) {
            currentPage += 1;
            displayUsers();
        }
    });

    function displayUsers() {
        userList.innerHTML = '';
        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

        usersToDisplay.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            const avatar = document.createElement('img');
            avatar.src = user.avatarUrl;
            avatar.alt = `${user.name}'s avatar`;
            avatar.className = 'avatar';

            const userName = document.createElement('span');
            userName.textContent = user.name;

            userCard.appendChild(avatar);
            userCard.appendChild(userName);
            userList.appendChild(userCard);
        });

        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredUsers.length / usersPerPage)}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage * usersPerPage >= filteredUsers.length;
    }

    displayUsers();
});


