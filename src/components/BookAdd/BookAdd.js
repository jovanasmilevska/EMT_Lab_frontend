import React, {useEffect} from "react";
import BookService from "../../repository/BookRepository";

const BookAdd = ()=> {
    const [allCategories, setCategories] = React.useState([])

    useEffect(() => {
        BookService.getCategories().then((c) => {
            console.log(c, "categorii")
            setCategories(c.data)
        })
    }, [])

    const [formData, setFormData] = React.useState({
        author: " ",
        name: " ",
        category: null,
        availableCopies: 0
    })

    const updateCategory = (e) => {
        setFormData({
            ...formData,
            category: e.target.options[e.target.selectedIndex].value
        })
        console.log(" category:",e.target.options[e.target.selectedIndex].value)
    }


    const updateAuthor = (n) => {
        setFormData({
            ...formData,
            author: n.target.value
        })

        console.log("       author:", n.target.value)

    }
    const updateCopies = (n) => {
        setFormData({
            ...formData,
         availableCopies: n.target.value
        })
        console.log("     availableCopies:",n.target.value)

    }

    const updateName = (n) => {
        setFormData({
            ...formData,
            name: n.target.value
        })
        console.log("name:", n.target.value)
    }

    const onFormSubmit = () => {

        if(!(formData.category===null || formData.author===" "
            || formData.name===" " || formData.availableCopies===0)){
            console.log("formadata")
            BookService.addBook(formData).then(() => {
                window.location.href = "/books"
            })
        }
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               onChange={updateName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text"
                               className="form-control"
                               id="author"
                               name="author"
                               onChange={updateAuthor}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Available copies</label>
                        <input type="number"
                               className="form-control"
                               id="author"
                               name="author"
                               onChange={updateCopies}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control form-select"
                                onChange={updateCategory} required>
                            <option value={null}> </option>
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
    )
}
export default BookAdd;
