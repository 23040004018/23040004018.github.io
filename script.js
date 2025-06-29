document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Welcome Screen Logic ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const enterButtons = document.querySelectorAll('.enter-btn');

    // Function to hide welcome screen and show main app
    function enterApp() {
        welcomeScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
    }

    // Add a click event listener to each button on the welcome screen
    enterButtons.forEach(button => {
        button.addEventListener('click', enterApp);
    });
    // --- END of Welcome Screen Logic ---


    // --- Original App Logic (Starts here) ---

    // Get references to all necessary HTML elements
    const moodButtons = document.querySelectorAll('.mood-btn');
    const playlistContainer = document.getElementById('playlist-container');
    const errorMessage = document.getElementById('error-message');

    // The following object maps moods to their Spotify embed codes.
    const playlistEmbeds = {
        happy: '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1EIgG2NEOhqsD7?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        sad: '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSqBruwoIXkA?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        love: '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWTbzY5gOVvKd?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        stress: '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXe9gFZP0gtP?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        hype: '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4eRPd9frC1m?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
    };

    // Add click listeners to mood buttons
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedMood = button.dataset.mood;

            // Provide visual feedback by updating button styles
            updateActiveButton(button);

            // Hide any previous error messages
            errorMessage.classList.add('hidden');

            // Show matching Spotify embed
            if (playlistEmbeds[selectedMood]) {
                playlistContainer.innerHTML = playlistEmbeds[selectedMood];
            } else {
                playlistContainer.innerHTML = ''; // Clear the playlist area
                errorMessage.classList.remove('hidden'); // Show the error
            }
        });
    });

    /**
     * Handles the visual feedback for the active mood button.
     */
    function updateActiveButton(activeButton) {
        moodButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
});
