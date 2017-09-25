Absorb.GroceryCo.Checkout.Inventory = class {
    constructor() {
    }

    handleData() {

    }

    load() {
        return fetch("./api/inventory.json", { mode: "no-cors" }).then((response) => {
            if (!response.ok) {
                throw Object.assign(new Error("Inventory response is not OK"), {
                    status: response.status,
                    statusText: response.statusText
                });
            }
        }).catch((reason) => {
            if (window.location.protocol === "file:"){
                Absorb.GroceryCo.Checkout.ErrorHandling.log("Can't load inventory data from a local file.");
            }
            else {
                Absorb.GroceryCo.Checkout.ErrorHandling.log(reason);
            }
        });
    }
};
