import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ countriesPerPage, allCountries, paginate }) {
  const pageNumb = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumb.push(i);
  }

  return (
    <nav>
      <ul className={styles.paginado}>
        {pageNumb &&
          pageNumb.map((number) => (
            <li className="number" key={number}>
              <button
                className={number > 25 ? styles.displaynone : styles.buttonpag}
                onClick={() => paginate(number)}
              >
                {number <= 25 ? number : ""}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}




























// export default function Paginado ({page,cpp,total,nextPageCB,prevPageCB}){
//     const prevPageButton = page!==1 ?
//         (<button onClick={prevPageCB}>&lt;</button>) :
//         (<button>&lt;</button>);

//     const lastPage = Math.ceil(total/cpp);

//     const nextPageButton = page === lastPage?
//         (<button >&gt;</button>):
//         (<button onClick={nextPageCB}>&gt;</button>);

//     return(
//         <div>
//             <div>
//                 {prevPageButton}
//                 <span>{page} / {lastPage}</span>
//                 {nextPageButton}
//             </div>
//         </div>
//     )
// }
