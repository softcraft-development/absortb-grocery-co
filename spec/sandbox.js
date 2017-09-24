afterEach(function() {
    const $old = document.getElementById("jasmine-sandbox");
    // Recreate the sandbox to ensure there's no lingering effects between tests
    const $new = document.createElement("div");
    $old.parentElement.replaceChild($new, $old);
    $new.setAttribute("id", "jasmine-sandbox");
});