(function(e) {
    var t = "//lab.lepture.com/github-cards/";
    var r, i = 0;
    var a = e.getElementsByTagName("meta");
    var n, l, c, d;
    for (r = 0; r < a.length; r++) {
        var u = a[r].getAttribute("name");
        var f = a[r].getAttribute("content");
        if (u === "gc:url") {
            n = f
        } else if (u === "gc:base") {
            t = f
        } else if (u === "gc:client-id") {
            l = f
        } else if (u === "gc:client-secret") {
            c = f
        } else if (u === "gc:theme") {
            d = f
        }
    }
    function s(t) {
        if (e.querySelectorAll) {
            return e.querySelectorAll("." + t)
        }
        var i = e.getElementsByTagName("div");
        var a = [];
        for (r = 0; r < i.length; r++) {
            if (~i[r].className.split(" ").indexOf(t)) {
                a.push(i[r])
            }
        }
        return a
    }
    function g(e, t) {
        return e.getAttribute("data-" + t)
    }
    function h(e) {
        if (window.addEventListener) {
            window.addEventListener("message",
            function(t) {
                if (e.id === t.data.sender) {
                    e.height = t.data.height
                }
            },
            false)
        }
    }
    function o(r, a) {
        a = a || n;
        if (!a) {
            var u = g(r, "theme") || d || "default";
            a = t + "cards/" + u + ".html"
        }
        var f = g(r, "user");
        var s = g(r, "repo");
        var o = g(r, "github");
        if (o) {
            o = o.split("/");
            if (o.length && !f) {
                f = o[0];
                s = s || o[1]
            }
        }
        if (!f) {
            return
        }
        i += 1;
        var v = g(r, "width");
        var m = g(r, "height");
        var b = g(r, "target");
        var w = g(r, "client-id") || l;
        var p = g(r, "client-secret") || c;
        var A = "ghcard-" + f + "-" + i;
        var y = e.createElement("iframe");
        y.setAttribute("id", A);
        y.setAttribute("frameborder", 0);
        y.setAttribute("scrolling", 0);
        y.setAttribute("allowtransparency", true);
        var E = a + "?user=" + f + "&identity=" + A;
        if (s) {
            E += "&repo=" + s
        }
        if (b) {
            E += "&target=" + b
        }
        if (w && p) {
            E += "&client_id=" + w + "&client_secret=" + p
        }
        y.src = E;
        y.width = v || Math.min(r.parentNode.clientWidth || 400, 400);
        if (m) {
            y.height = m
        }
        h(y);
        r.parentNode.replaceChild(y, r);
        return y
    }
    var v = s("github-card");
    for (r = 0; r < v.length; r++) {
        o(v[r])
    }
    if (window.githubCard) {
        window.githubCard.render = o
    }
})(document);