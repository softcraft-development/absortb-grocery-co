Absorb.GroceryCo.Checkout.loadJson = function(url) {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw Object.assign(new Error("Response is not OK"), {
                status: response.status,
                statusText: response.statusText,
                url
            });
        }

        return response.json();
    }).catch((reason) => {
        if (window.location.protocol === "file:"){
            Absorb.GroceryCo.Checkout.ErrorHandling.log("Can't load data from a local file.");
        }
        else {
            Absorb.GroceryCo.Checkout.ErrorHandling.log(reason);
        }
        return Promise.reject(reason);
    });
};
