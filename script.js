document.getElementById("ideaForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        idea: formData.get("idea"),
        attachment: formData.get("attachment") ? formData.get("attachment").name : "",
    };

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwh3ucx2WCJuj8Ye8btYUTETEFbdGr28O0zHEVszdCE65CBCgyvD-djul6GJ0r6jYrgKw/exec", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        const responseText = await response.text();
        console.log("Response from server:", responseText);

        if (response.ok && responseText.includes("Success")) {
            alert("Your idea has been submitted successfully!");
            e.target.reset();
        } else {
            alert("There was an error. Response: " + responseText);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    }
});
