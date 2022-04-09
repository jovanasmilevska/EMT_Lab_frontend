import axios from "../custom-axios/axios";


const BookService = {
    getAllBooks: () => {
        return axios.get(`/books/all`)
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    getPaginatedBooksPerPage: (pageNum) => {
        return axios.get(`/books/paginated/${pageNum}`)
    },
    getTotalBooksLength: () => {
        return axios.get(`/books/totalLength`)
    },
    editBook: (formData) => {
        return axios.post(`/books/edit`, formData)
    },
    getCategories: () => {
        return axios.get(`/books/allCategories`)
    },
    addBook: (formData) =>{
        return axios.post(`/books/add`,formData)
    },
    markTaken: (id) => {
        return axios.get(`/books/markTaken/${id}`)
    }

}
export default BookService
