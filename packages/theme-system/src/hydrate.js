// Inline script to prevent Flash of Unstyled Content (FOUC)
// Must be injected in <head> before CSS loads
(function() {
    try {
        var saved = localStorage.getItem('dxp-reality');
        var reality = saved || 'reality-deep-space';
        document.documentElement.setAttribute('data-reality', reality);
    } catch (e) {
        // Fallback for private browsing mode or restricted environments
        document.documentElement.setAttribute('data-reality', 'reality-deep-space');
    }
})();
