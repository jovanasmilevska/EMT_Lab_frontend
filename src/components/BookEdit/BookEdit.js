import {useLocation} from "react-router-dom";
import React, {Component, useEffect} from "react";
import BookService from "../../repository/BookRepository";

const BookEdit = () => {
    const state = useLocation().state
    const id = state.bookID
    console.log("bookID",id)
    const [formData, setFormData] = React.useState({
        author: null,
        name: " ",
        category: null,
        id: 0
    })
    const [bookName, setBookName] = React.useState(null)
    const [author, setAuthor] = React.useState(null)
    const [category, setCategory] = React.useState(null)
    const [allCategories, setCategories] = React.useState([])

    useEffect(() => {
        BookService.getBook(id).then((b) => {
            setFormData(b.data)
            setBookName(b.data.name)
            setAuthor(b.data.author.name)
            setCategory(b.data.category)
        })

        BookService.getCategories().then((c) => {
            console.log(c, "categorii")
            setCategories(c.data)
        })
    }, [])

    const updateName = (n) => {
        setFormData({
            ...formData,
            [n.target.name]: n.target.value
        })
        setBookName(n.target.value)
    }


    const updateAuthor = (n) => {
        setFormData({
            ...formData,
            [n.target.author.name]: n.target.value
        })
        setAuthor(n.target.value)
    }

    const updateCategory = (e) => {
        setFormData({
            ...formData,
            category: e.target.options[e.target.selectedIndex].value
        })
        setCategory(e.target.options[e.target.selectedIndex].value)
    }


    const onFormSubmit = () => {
        BookService.editBook(formData).then(() => {
            window.location.href = "/books"
        })
    }


    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={bookName}
                               onChange={updateName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text"
                               className="form-control"
                               id="author"
                               name="author"
                               placeholder={author}
                               onChange={updateAuthor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control form-select"
                                onChange={updateCategory} value={category} required>
                            {allCategories.map((t, index) => {
                                return (
                                    <option name="category" id={t.index}
                                            key={index} value={t}>{t}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default BookEdit;
