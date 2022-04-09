import React, {Component, useEffect} from "react";
import ReactPaginate from "react-paginate";
import BookService from "../../repository/BookRepository";
import {Link} from "react-router-dom";

const Books = () => {
    const size = 5;
    const [booksLength, setBooksLength] = React.useState(0)
    const pageCount = Math.ceil(booksLength / size); //kolku vkupno strani ke ima pagingot
    const [booksPerPage, setBooksPerPage] = React.useState([]);


    useEffect(() => {
        BookService.getTotalBooksLength().then((n) => {
            setBooksLength(n.data)
        })
        BookService.getPaginatedBooksPerPage(0).then(p => {
            setBooksPerPage(p.data)
        })
    }, [])


    const getPaginatedPage = (n) => {
        BookService.getTotalBooksLength().then((n) => {
            setBooksLength(n.data)
        }).then(BookService.getPaginatedBooksPerPage(n).then(p => {
            setBooksPerPage(p.data)
        }))
    }

    const handlePageClick = (event) => {
        BookService.getPaginatedBooksPerPage(event.selected).then((b) => {
            setBooksPerPage(b.data)
        })
        console.log(event, "eventtttt")
    }

    const deleteBook = (b) => {
        BookService.deleteBook(b.target.id).then((b) => {
            getPaginatedPage(0)
        })

    }

    const takeBook = ((b) => {
        BookService.markTaken(b.target.id).then(()=>{
            window.location.href = "/books"
        })
    })

    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"table-responsive"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Author</th>
                            <th scope={"col"}>Category</th>
                            <th scope={"col"}>Available Copies</th>
                        </tr>
                        </thead>
                        <tbody>
                        {booksPerPage.map((b) => {
                            console.log("bookss", b)
                            return (
                                <tr>
                                    <td>{b.name}</td>
                                    <td>{b.author.name}</td>
                                    <td>{b.category}</td>
                                    <td>{b.availableCopies}</td>
                                    <td className={"text-right"}>
                                        <a className={"btn btn-danger"}
                                           onClick={deleteBook} id={b.id}>
                                            Delete
                                        </a>
                                        <Link className={"btn btn-success mx-2"}
                                              id={b.id}
                                              to={`/books/edit/${b.id}`}
                                              state={{bookID: b.id}}>
                                            Edit
                                        </Link>
                                        <a title={"Decreases number of available copies"} className={"btn btn-info"}
                                           onClick={takeBook} id={b.id}>
                                            Mark as taken
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link className={"btn btn-block btn-dark w-100"} to={"/books/add"}>Add new book</Link>
                    </div>
                </div>
                <ReactPaginate previousLabel={"back"}
                               nextLabel={"next"}
                               nextClassName={"btn btn-outline-primary"}
                               previousClassName={"btn btn-outline-primary"}
                               breakLabel={<a href="/#">...</a>}
                               breakClassName={"break-me"}
                               pageClassName={"mx-1 btn btn-outline-primary"}
                               pageCount={pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination m-4 justify-content-center"}
                               activeClassName={"active"}/>
            </div>
        </div>
    );

}

export default Books;


