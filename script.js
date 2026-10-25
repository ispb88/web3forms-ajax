
for (const form of document.getElementsByTagName("form")) {
    const result = document.getElementById("result");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = new FormData(form);
        result.innerHTML = "";
        for (const element of form.elements) {
            element.setAttribute("disabled", "");
        }
        try {
            const res = await fetch(form.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(Object.fromEntries(data)),
            });
            const json = await res.json();
            if (res.status === 200) {
                form.reset();
                result.innerHTML = `<span style="color:green;" id="success">Your message has been sent.</span>`;
            }
            else {
                throw new Error(json.message ?? "Unspecified Error");
            }
        }
        catch (e) {
            result.innerHTML = `<span style="color:red;" id="failure">${e}</span>`;
        }
        finally {
            for (const element of form.elements) {
                element.removeAttribute("disabled");
            }
        }
    });
}
