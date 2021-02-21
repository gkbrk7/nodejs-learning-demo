exports.get404Page = (req, res) => {
    // res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
    res.status(404).render("404", { title: "404 Not Found" })
}