document.getElementById('jsonForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const optionsDiv = document.getElementById('options');
    const responseDiv = document.getElementById('response');

    try {
        const parsedInput = JSON.parse(jsonInput);
        if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
            throw new Error('Invalid JSON input');
        }

        const result = await fetch('<YOUR_BACKEND_API_URL>/bfhl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: parsedInput.data })
        });

        const data = await result.json();
        errorElement.textContent = '';
        optionsDiv.style.display = 'block';

        document.getElementById('alphabets').checked = false;
        document.getElementById('numbers').checked = false;
        document.getElementById('highestLowercase').checked = false;

        document.getElementById('alphabets').addEventListener('change', () => renderResponse(data));
        document.getElementById('numbers').addEventListener('change', () => renderResponse(data));
        document.getElementById('highestLowercase').addEventListener('change', () => renderResponse(data));
    } catch (err) {
        errorElement.textContent = 'Invalid JSON input';
        optionsDiv.style.display = 'none';
        responseDiv.innerHTML = '';
    }
});

function renderResponse(data) {
    const responseDiv = document.getElementById('response');
    const options = {
        alphabets: document.getElementById('alphabets').checked,
        numbers: document.getElementById('numbers').checked,
        highestLowercase: document.getElementById('highestLowercase').checked,
    };

    let output = {};

    if (options.alphabets) output.alphabets = data.alphabets;
    if (options.numbers) output.numbers = data.numbers;
    if (options.highestLowercase) output.highestLowercaseAlphabet = data.highest_lowercase_alphabet;

    responseDiv.innerHTML = `<h3>Response</h3><pre>${JSON.stringify(output, null, 2)}</pre>`;
}
