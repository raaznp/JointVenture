const verifyApi = async () => {
    try {
        console.log('Attempting login via http://localhost:5000/api/auth/login...');
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin@example.com',
                password: '123456'
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Login Successful!');
            console.log('Token received:', data.token ? 'Yes' : 'No');
            console.log('User Role:', data.role);
        } else {
            console.log('❌ API Error Status:', response.status);
            const text = await response.text();
            console.log('❌ API Error Message:', text);
        }

    } catch (error) {
        console.log('❌ Error:', error.message);
    }
};

verifyApi();
