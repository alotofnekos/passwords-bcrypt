document.getElementById("register").addEventListener("click", async function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const secret = document.getElementById("secret").value;

    try {
        const response = await fetch('/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                secret
            }),
        });

        if (response.ok) {
            window.location.href = "/"; // Redirect to the login page after successful registration
        } else {
            console.error('Failed to register user');
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
});
