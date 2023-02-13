export const $ = (sel, el = document) => el.querySelector(sel)

export const times = (n, cb) => {
    for (let i = 0; i < n; i++) cb(i)
}