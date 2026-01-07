s = [];     // movable stack
u = [];     // closed deck
v = [];     // opened deck
w = [u, v]; // game data structure
y = [];     // visibility index
x = 3;      // initial length of the dealt cards stack
// Draw card
z = function(f, d, b, h, o) {
    // f - x position
    // d - y position
    // b - card value
    // h - visible
    // o - skip intersection test

    // Draw card or placeholder rect
    c.fillStyle   = b % 2 ? "#e42" : "#333";
    c.strokeStyle = 0 <= b ? h ? "#fff" : "#669" : "#696";
    c.shadowBlur  = 40;
    c.strokeRect(f, d, 40, 65);
    c.shadowBlur  = 0;
    0 <= b & h && c.fillText(("JQKA"[(h = b >> 2) ? h - 10 : 3] || h + 1) + "♠♦♣♥"[b % 4], f - 5, d + 10);
    // if mouse cursor position inside drawing rect
    !o & f - 20 < n & n < f + 60 & d - 20 < p & p < d + 85
    // save state
    && (
        r = q, // current card index
        m = x, // current stack index
        e = f, // card x
        g = d  // card y
    )
};
// Draw stack
j = function(f, d, b, h, o) {
    // f - x pos
    // d - y pos
    // b - stack
    for (h in b)
        // draw each card in stack 'b'
        z(
            f,                           // x pos
            d += +h ? o ? 30 : 20 : 0,   // y pos
            b[q = h],                    // card value
            o = b == s | h >= y[x],      // visible
            b == s                       // test intersection
        );
};

// Shuffle deck
for (;52 > u.length; u.splice(30 * Math.random(), 0, u.length)){}

// Deal and open first card in each stack
for (;14 > x;)w[x++] = u.splice(0, 7 > x ? 0 : y[x] = x - 7);

// Initialize context2d once
c.shadowColor = "rgba(0,0,0,0.2)";
c.font        = "21px Tahoma";
c.lineWidth   = 40;
c.lineJoin    = "round";

onmouseup = function(f, d, b, h, o) {
    // target stack is set
    t && (
        0 <= m && (
            // active card in slice (source stack)
            d = s[0],
            h = w[m].length,
            // active card in target stack
            b = w[m][h - 1],
            // set source and target stacks:
            0 < s.length &                          // slicing stack of cards
                6 < m                               // cards differs by color
                 &
                   !h &                             // target stack is empty and
                   12 == (d >> 2) |                 // active card is "king" or

                   d % 2 != b % 2 &                 // cards differs by color
                   1 == (b >> 2) - (d >> 2)         // target card value greater by 1
                 |
            1 == s.length &                         // slicing only one card
                7 > m &                             // not dealt
                2 < m
                 &
                    !h &                            // target stack is empty and
                    0 == (d >> 2) |                 // active card is "ace" or

                    d % 4 == b % 4 &                // cards has the same suit
                    -1 == (b >> 2) - (d >> 2)       // target card value smaller by 1
                 &&
                // set target stack
            (t = w[m])
        ),
        // move cards
        t.push.apply(t, s.splice(0))
    );
    // Redraw
    i(f)
};
onmousedown = function(f, d, b, h, o) {
    t = h;         // reset target stack
    0 <= r && (
        k = n - e, // offset x
        l = p - g  // offset y
    );
    // dealt stack
    6 < m ?
        // visible card
        r >= y[m] ?
            // slice cards from stack
            (
                t = w[m],           // target stack
                s = t.splice(r)     // source stack
            )
            :
            // open next card in stack
            1 == w[m].length - r && y[m]--
        :
    // deck
    0 == m ?
        u.length ?
            // open next card
            v.splice(v.length, 0, +u.splice(-1))
            :
            // flip deck
            w[m] = u = v.splice(0).reverse()
        :
    // get one card from opened deck or foundation
    0 <= m &&
        (
            t = w[m],           // target stack
            s = t.splice(-1)    // source stack
        );
    i(f)
};
(i = onmousemove = function(f, d, b, h, o) {
    n = f.pageX;  // current mouse X position
    p = f.pageY;  // current mouse Y position
    c.fillStyle = "#696";
    c.fillRect(0, 0, a.width, a.height);
    r = m = h; // reset variables
    // Draw
    for (x in w)
        f = a.width / 2 - 305 + x % 7 * 95,
        d = x > 6 ? 200 : 60,
        b = w[x],
        b.length ?
            // dealt stack
            6 < x ?
                // draw stack
                j(f, d, b)
                :
                // draw only one top card
                z(f, d, b[q = b.length - 1], 0 < x)
            :
            // draw placeholder
            z(f, d);
    // Draw slice stack
    s.length &&
        j(
          n - k,    // mouse x - offset x
          p - l,    // mouse y - offset y
          s         // slice stack
        )
})(0);