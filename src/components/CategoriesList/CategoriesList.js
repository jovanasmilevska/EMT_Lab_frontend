import React, {useEffect} from "react";
import BookService from "../../repository/BookRepository";

const CategoriesList = ()=>{
    const [allCategories, setCategories] = React.useState([])

    useEffect(() => {
        BookService.getCategories().then((c) => {
            console.log(c, "categorii")
            setCategories(c.data)
        })
    }, [])

    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"table-responsive"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Book categories</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allCategories.map((b) => {
                            return (
                                <tr>
                                    <td>{b}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CategoriesList;
