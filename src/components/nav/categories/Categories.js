import React, { Fragment } from 'react'

const Categories = ({ categories, handleChanges }) => {

    return (
        <>
            <p value="" className='categories__parent' id="" defaultValue={true} onClick={handleChanges}> Todos los productos</p>
            {
                categories.map((category, i) => category.categoryIsActive && <Fragment key={i}>
                    <p key={category._id} id={category._id} onClick={handleChanges} className='categories__parent' >{category.categoryName}</p>
                    {category.childCategories.map(c => c.categoryIsActive && <p key={c._id} id={c._id} onClick={handleChanges} className='categories__child' >&nbsp;&nbsp;&nbsp;{c.categoryName}</p>)}
                </Fragment>
                )
            }
        </>
    )
}

export default Categories