const form = document.getElementById("urlForm");
const longUrl = document.getElementById("longUrl");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = longUrl.value;

    result.innerHTML = "Shortening...";

    try {
        const response = await fetch("http://localhost:5000/api/urls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                longUrl: url
            })
        });

        const data = await response.json();

        if (!response.ok) {
            result.innerHTML = data.message;
            return;
        }

       result.innerHTML = `
    <p>Your shortened URL:</p>

   <a href="${data.shortUrl}" target="_blank">
    ${data.shortUrl}
</a>

<button id="copyBtn">Copy URL</button>

<p id="stats">Clicks: 0</p>
`;

const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(data.shortUrl);

    copyBtn.innerText = "Copied!";

    setTimeout(() => {
        copyBtn.innerText = "Copy URL";
    }, 2000);
});
const stats = document.getElementById("stats");

const statsResponse = await fetch(
    `http://localhost:5000/api/urls/${data.shortCode}`
);

const statsData = await statsResponse.json();

stats.innerText = `Clicks: ${statsData.clicks}`;
const refreshBtn = document.createElement("button");

refreshBtn.innerText = "Refresh Stats";

refreshBtn.addEventListener("click", async () => {
    const response = await fetch(
        `http://localhost:5000/api/urls/${data.shortCode}`
    );

    const statsData = await response.json();

    stats.innerText = `Clicks: ${statsData.clicks}`;
});

result.appendChild(refreshBtn);

    } catch (error) {
        result.innerHTML = "Something went wrong.";
        console.error(error);
    }
});