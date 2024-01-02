document.getElementById("login").addEventListener("click", async function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        });

        if (response.ok) {
            window.location.href = "/secret/" + username; // Redirect to the secret page after successful login
        } else {
            console.error('Invalid username or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});
